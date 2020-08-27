//Import packages
const express = require("express");
let app = express();
const fetch = require("node-fetch");
const redis = require("redis");
let fs = require('fs');
//Declare express server port and redis client port
const PORT = process.env.PORT || 3500;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
app.get("/repos/:username", cache, getPublicReposNumber);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});

//Create Redis client on Redis port
const redisClient = redis.createClient(REDIS_PORT);
//Create an app const by excecuting express like a function

app.get("/repos/:username", cache, getPublicReposNumber);


//Login user
app.get('/api/user/login/:email/:password/:remember', async (req, res) => {
    try {
        const data = require('./data'),
            email = req.params.email,
            password = req.params.password,
            maxAge = req.params.remember === "true" ? (10 * 365 * 24 * 60 * 60) : (60 * 5 * 1000);
        if (data[email] && data[email].password === password) {
            const token = jwt.sign({email}, SECRET);
            res.cookie('token_mama', token, {maxAge: maxAge});
            res.status(200).send({msg: 'Login successful', data: data[email]});
        } else {
            res.status(500).send({msg: 'Login failed... Either email or password are incorrect'});
        }
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

//Authenticate user with cookie on lunching the app and getting user's data
app.get('/api/user/auth', async (req, res) => {
    try {
        const data = require('./data');
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



//Cache midleware
function cache(req, res, next) {
    const { username } = req.params;
    redisClient.get(username, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(setResponse(username, cachedData));
        } else {
            next();
        }
    });
}