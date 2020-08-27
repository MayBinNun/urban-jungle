let redis = require('redis');
let client = redis.createClient(); // this creates a new client
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
function addUser() {
    let email = document.getElementsByName("email");
    let pass = document.getElementsByName("psw");
    let user = document.getElementsByName("user");
    alert(email);
}