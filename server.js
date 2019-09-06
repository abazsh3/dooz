let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT || 3000;
let users = [];
app.use(bodyParser.json());
app.post('/users', (req, res) => {
    console.log("post called");
    console.log(req.body.userName, req.body.id);
    users.push({
        name: req.body.userName,
        id: req.body.id,
        roomId:req.body.roomId
    });

    console.log(users);
})
;
app.get('/users', (req, res) => {
    console.log("get");
    let userNames = [];
    let roomIds=[];
    for (let i = 0; i < users.length; i++) {
        userNames.push(users[i].name);
        roomIds.push(users[i].roomId);
    }
    res.send({"users": userNames,"roomIds":roomIds});
});
app.post('/remove',(req,res)=>{
    console.log(req.body.id);
    users=users.filter(function (user) {
        return user.id!==req.body.id;
    })
});
app.listen(port, () => {
    console.log('app is running on port ', port);
});

