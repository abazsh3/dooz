let express = require('express');
let bodyParser = require('body-parser');
let {User} = require('./models/User');
let {mongoose} = require('./db/mongoose');
let moment=require('moment');
let app = express();
const port = process.env.PORT || 3000;
let users = [];
app.use(bodyParser.json());
app.post('/users', (req, res) => {
    console.log("post called");
    console.log(req.body.userName, req.body.id);
    let canPush = true;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.body.id) {
            canPush = false;
        }


    }

    if (canPush) {
        users.push({
            name: req.body.userName,
            id: req.body.id,
            roomId: req.body.roomId
        });
    }
    let user = new User({
        id: req.body.id,
        username: req.body.userName,
        date:moment(new Date())
    });
    user.save().then(() => {
        console.log("user saved")
    });
    res.send("saved");


    console.log(users);
})
;
app.get('/usersdb', (req, res) => {

    User.find().then((doc) => {
        if (doc.length > 0) {
            res.send({doc});
        } else {
            res.status(404).send();
        }
    });
});
app.get('/users', (req, res) => {
    console.log("get");
    let userNames = [];
    let roomIds = [];
    for (let i = 0; i < users.length; i++) {
        userNames.push(users[i].name);
        roomIds.push(users[i].roomId);
    }
    res.send({"users": userNames, "roomIds": roomIds});
});
app.post('/remove', (req, res) => {
    console.log(req.body.id);
    users = users.filter(function (user) {
        return user.id !== req.body.id;
    });
    res.send("removed");
});
app.listen(port, () => {
    console.log('app is running on port ', port);
});

