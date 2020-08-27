//Signup new user
const express = require('express');
let app = express();
let client = require("redis");
app.post('/api/user/signup', async (req, res) => {
    try {
        const email = req.body.email,
            password = req.body.password,
            address = req.body.address,
            houseNum = req.body.houseNum,
            city = capitalize(req.body.city),
            zip = req.body.zip,
            firstName = capitalize(req.body.firstName),
            lastName = capitalize(req.body.lastName),
            country = req.body.country;
        let orders = "";
        if (client.exists(email, function (err,replay) {
            if (err == 1){
                client.hmset(email,{
                    'password': password,
                    'adress' : adress,
                    'House num' : houseNum,
                    'City': city,
                    'Postal Code': zip,
                    'First Name' : firstName,
                    'Last Name' : lastName,
                    'Country': country,
                    'Orders' : orders};
            }
            else {
                res.status(500).send({msg: 'User with this email adress already exist'});
            }
        }))
/*        if (!data[email]) {
            data[email] = {
                "user": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "address": address,
                    "city": city,
                    "country": country,
                    "houseNum": houseNum,
                    "email": email,
                    "zip": zip
                },
                "password": password,
                "orders": {},
                "currentItems": {}
            };*/
            await writeFileAsync('./data.json', JSON.stringify(data));
            const token = jwt.sign({email}, SECRET);
            res.cookie('token_mama', token, {maxAge: 60 * 5 * 1000});
            res.status(200).send({msg: 'Signup successful'});
        } else {
            res.status(500).send({msg: `The user ${email}, is already signed up...`});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Delete a user
app.delete('/api/user/:email/:password', async (req, res) => {
    try {
            email = req.params.email,
            password = req.params.password;
        if (data[email] && data[email].password === password) {
            delete data[email];
            await writeFileAsync('./data.json', JSON.stringify(data));
            res.status(200).send({msg: 'User was deleted successfully', data: data[email]});
        } else {
            res.status(500).send({msg: 'User deletion failed'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});
