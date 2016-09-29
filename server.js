/**
 * Created by Dustin on 9/29/2016.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/task/:name', createTask);
app.get('/tasks', getAllTasks);

var tasks = [];

function getAllTasks(req, res) {
    res.send(tasks);
}

function createTask(req, res) {
    var name = req.params['name'];

    var task = {
        name: name
    };

    tasks.push(task);
    res.send(tasks);
}

app.listen(3000);