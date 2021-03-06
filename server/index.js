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
                if (obj.orders.name) {
                    const orders = JSON.parse(data.orders);
                    orders.push({
                        name: title,
                        desc: description
                    })
                    obj.orders = JSON.stringify(orders);
                    client.hmset(email, obj);
                }
            }
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});


//Authenticate user with cookie on lunching the app and getting user's data
app.get('/api/user/auth', async (req, res) => {
    try {
        if (req.cookies && req.cookies.token) {
            const token = req.cookies.token,
                decoded = jwt.verify(token, SECRET);
            if (true) {
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
        if (req.params.email === 'Admin') {
            client.hgetall('users', (err,data) => {
                if (err){
                    alert("couldnt load data");
                }
                else if (data != null) {
                    res.status(200).send({msg: 'data sent', data: data});
                }
            })
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
                let user = JSON.parse(data);
                if (user.password === password) {
                    const token = jwt.sign({email}, SECRET);
                    res.cookie('token_mama', token, {maxAge: maxAge});
                    res.status(200).send({msg: `The user ${email},signed in succesfully...`, success: true});
                } else {
                    res.status(500).send({msg: `inncocrect password`, success: false});
                }
            } else {
                res.status(500).send({msg: `couldnt log in.`, success:false});
            }
        });
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Logout user
app.post('/api/user/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({msg: 'Logout successful'});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Signup new user
app.post('/api/user/signup', async (req, res) => {
    try {
        let email = req.body.email;
        let obj = {
            password: req.body.password, address: req.body.address, houseNumber: req.body.houseNum, city: capitalize(req.body.city), zipCode: req.body.zip, firstName: capitalize(req.body.firstName),
            lastName: capitalize(req.body.lastName), country: req.body.country, orders: {}, currentItems: {}
        }
        client.hget('users', email, (err, data) => {
            if (err)  res.redirect('/');
            else if (data != null) {
               return res.status(500).send({msg: `The user ${email}, is already signed up...`});
            } else {
                client.hmset('users', email, JSON.stringify(obj));
               return res.status(200).send({msg: `The user ${email}, signed up succesfully...`});
            }
        });
    } catch (e) {
        return res.status(500).send({msg: e.message});
    }
});

//Get all tickets
app.get('/api/tickets/get', async (req, res) => {
    try {
        client.hgetall('tickets', (err,data) => {
            if (err){
                alert("couldnt load data");
            }
            else if (data != null) {
                res.status(200).send({msg: 'data sent', data: data});
            }
        })
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


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;