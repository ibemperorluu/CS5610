module.exports = function (app) {

    var widgets = [
        {_id: 123, widgetType: "HEADER", pageId: 321, size: 2, text: "GIZMODO"},
        {_id: 234, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
        {
            _id: 345, widgetType: "IMAGE", pageId: 321, width: "100%",
            url: "http://lorempixel.com/400/200/"
        },
        {_id: 456, widgetType: "HTML", pageId: 321, text: "<p>Lorem ipsum</p>"},
        {_id: 567, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
        {
            _id: 678, widgetType: "YOUTUBE", pageId: 321, width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: 789, widgetType: "HTML", pageId: 321, text: "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/api/page/:pid/widget", updateOrder);

    function uploadImage(req, res) {
        var uid = parseInt(req.body.uid);
        var wid = parseInt(req.body.wid);
        var pid = parseInt(req.body.pid);
        var wgid = parseInt(req.body.wgid);
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets[w].url = "/uploads/" + filename;
            }
        }
        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid);
    }

    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.send(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = parseInt(req.params.pid);
        var result = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var wgid = parseInt(req.params.wgid);
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }
    
    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = parseInt(req.params.wgid);
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets[w] = widget;
            }
        }
        res.send(200);
    }
    
    function deleteWidget(req, res) {
        var wgid = parseInt(req.params.wgid);
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateOrder(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }
};