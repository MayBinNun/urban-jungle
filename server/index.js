const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    {promisify} = require('util'),
    fs = require('fs'),
    uniqid = require('uniqid'),
    cookieParser = require('cookie-parser'),
    jwt = require('jsonwebtoken'),
    rateLimit = require("express-rate-limit"),
    readdirAsync = promisify(fs.readdir),
    readFileAsync = promisify(fs.readFile),
    writeFileAsync = promisify(fs.writeFile),
    creds = require('./creds'),
    nodemailer = require('nodemailer');

const redis = require("redis");
const client = redis.createClient();

client.on("connect", function() {
    console.log("You are now connected to redis");
});

const SECRET = 'secret',
    app = express(),
    port = process.env.PORT || 3005,
    limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again later"
    });

let transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}

app.set('trust proxy', 1);
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

/*const getRedisData = key => new Promise(async (resolve, reject) => {
    client.get(key, (err, reply) => {
        if (reply) {
            console.log("Read data from Redis");
            resolve(JSON.parse(reply));
        } else if (err) {
            console.log("Redis Error - " + err);
        } else {
            console.log("Read data from DB");
        }
        const data = require('./data');
        client.set(key, JSON.stringify(data));
        resolve(data);
    });
});

const setRedisData = (key, data) => {
    // flushall to clean data
    client.set(key, JSON.stringify(data));
    return writeFileAsync('./data.json', JSON.stringify(data));
};

app.get('/getRedisData', async (req, res) => {
    const data = await getRedisData("data");
    res.status(200).send(data);
});*/
//Update user's items in db
app.post('/api/items/:email/:title/:action', async (req, res) => {
    try {
        const email = req.params.email,
            title = req.params.title,
            action = req.params.action,
            description = req.params.description;

        client.hgetall('users', email, (err, data) => {
            if (err) res.redirect('/');
            else if (data != null) {
                let obj = data;
                if(obj.orders.name ){
                    const orders = JSON.parse(data.orders);
                    orders.push({
                        name: title,
                        desc: description;
                    })
                    obj.orders = JSON.stringify(orders);
                    client.hmset(email, obj);
                }
                switch (action) {
                    case 'ADD':
                        if (data[email].currentItems[title]) {
                            data[email].currentItems[title]++;
                        } else {
                            data[email].currentItems[title] = 1;
                        }
                        break;
                    case 'SUB':
                        if (data[email].currentItems[title] > 1) {
                            data[email].currentItems[title]--;
                        } else {
                            delete data[email].currentItems[title];
                        }
                        break;
                    case 'ZERO':
                        delete data[email].currentItems[title];
                        break;
                }
                res.status(200).send({msg: 'Items we\'re updated'});
            } else {
                res.status(500).send({msg: `Couldnt find user orders`});
            }
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});


//Authenticate user with cookie on lunching the app and getting user's data
app.get('/api/user/auth', async (req, res) => {
    try {
        const data = await getRedisData("data");
        if (req.cookies && req.cookies.token_mama) {
            const token = req.cookies.token_mama,
                decoded = jwt.verify(token, SECRET);
            if (data[decoded.email]) {
                res.status(200).send({msg: 'Auth successful', data: data[decoded.email]});
            } else {
                res.status(500).send({msg: 'Auth failed... there is no user with this token'});
            }
        } else {
            res.status(500).send({msg: 'Auth failed... there is no cookie'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Admin get all database
app.get('/api/admin/data/:email', async (req, res) => {
    try {
        if (req.params.email === 'admin@urbanjungle.com') {
            let data = JSON.parse(('users'));
            res.status(200).send({msg: 'Admin data', data: data});
        } else {
            res.status(500).send({msg: 'User can\'t get this data...'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Login user
app.get('/api/user/login/:email/:password/:remember', async (req, res) => {
    try {
       const email = req.params.email,
            password = req.params.password,
            maxAge = req.params.remember === "true" ? (10 * 365 * 24 * 60 * 60) : (60 * 5 * 1000);
        client.hget('users', email, (err, data) => {
            if (err) res.redirect('/');
            else if (data != null) {
                var obj = JSON.parse(data);
                console.log(obj.password);
                if (obj.password === password) {
                    const token = jwt.sign({email}, SECRET);
                    res.cookie('token_mama', token, {maxAge: maxAge});
                    res.status(200).send({msg: `The user ${email}, logged in succesfully...`});
                } else {
                    res.status(500).send({msg: `Wrong password`});
                }
            } else {
                res.status(500).send({msg: `Wrong email adress`});
            }
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Logout user
app.post('/api/user/logout', async (req, res) => {
    try {
        res.clearCookie('token_mama');
        res.status(200).send({msg: 'Logout successful'});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Signup new user
app.post('/api/user/signup', async (req, res) => {
    try {
        let obj = {
            password: req.body.password, address: req.body.address, houseNumber: req.body.houseNum, city: capitalize(req.body.city), zipCode: req.body.zip, firstName: capitalize(req.body.firstName),
            lastName: capitalize(req.body.lastName), country: req.body.country, orders: {}, currentItems: {}
        }
        client.hget('users', email, (err, data) => {
            if (err) res.redirect('/');
            else if (data != null) {
                res.status(500).send({msg: `The user ${email}, is already signed up...`});
            } else {
                client.hmset('users', email, JSON.stringify(obj));
                res.status(200).send({msg: `The user ${email}, signed up succesfully...`});
            }
        });
        const token = jwt.sign({email}, SECRET);
        res.cookie('token_mama', token, {maxAge: 60 * 5 * 1000});
        res.status(200).send({msg: 'Signup successful'});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Get all tickets
app.get('/api/tickets/get', async (req, res) => {
    try {
             debugger
            let data = JSON.parse(client.hgetall('tickets'));
            res.status(200).send({msg: 'Tickets  data', data: data});
      } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Post a new order
app.post('/api/order/new/:email', async (req, res) => {
    try {
        const email = req.params.email,
            payment = req.body.payment,
            items = req.body.items,
            total = req.body.total,
            totalPrice = req.body.totalPrice,
            orderId = uniqid(),
            date = Date.now();
        client.hget('users', email, (err, data) => {
            if (err) res.redirect('/');
            else if (data != null) {
                let obj = data;
                if(obj.order){
                    const orders = JSON.parse(obj.orders);
                    orders.push({
                        name: itemName,
                        price: itemPrice,
                        desc: itemDescription,
                        image: `${req.file.filename}`
                    })
                    newObj.items = JSON.stringify(newArr)

                }
                const ord = {
                    id: orderid,
                    total: total,
                    totalPrice: totalPrice,
                    payment: payment,
                    items: items,
                    date: date
                };
                client.hset('users', email, { orders: JSON.stringify(ord)});
                res.status(200).send({
                    msg: 'Order successfully placed',
                    data: ord,
                    orderId: orderId,
                    date: date
                });
            } else {
                res.status(500).send({msg: `Error placing order`});
            }
            //  let data = await getRedisData("data");
            data[email].currentItems = {};
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Insert new ticket
app.post('/api/tickets/add', async (req, res) => {
    try {
        let obj = {
            id: req.body.id, price: req.body.price, name: req.body.name, description: req.body.description
        }
        client.hget('tickets', id, (err, data) => {
            if (err) res.redirect('/');
            else if (data != null) {
                res.status(500).send({msg: `already exist product with this id`});
            } else {
                client.hmset('tickets', id, JSON.stringify(obj));
                res.status(200).send({msg: `The ticket added succesfully...`});
            }
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Get gallery images (Simulates database access)
app.get('/api/gallery', async (req, res) => {
    try {
        let images = await readdirAsync('./server_assets');
        for (let i in images) {
            let buffer = await readFileAsync('./server_assets/' + images[i], {encoding: 'base64'});
            images[i] = {img: buffer, title: images[i], key: i};
        }
        res.status(200).send({images: images});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//connect transporter
let transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

//send contactUS us message
app.get('/api/contactUS', async (req, res) => {
    const name = req.body.name,
     email = req.body.email,
     message = req.body.message,
     content = `name: ${name} \n email: ${email} \n message: ${message} `

    let mail = {
        from: name,
        to: 'urbanjungle1212@gmail.com',
        subject: 'New Message from Contact Form',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) { res.redirect('/');
        } else {
            res.status(200).send({msg: `Massage sent succesfullyr`});
            }
    });
});

//Serves react client static files
/*
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});
*/

//Private functions
function capitalize(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;