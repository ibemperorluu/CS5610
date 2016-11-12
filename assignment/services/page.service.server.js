module.exports = function (app) {

    var pages = [
        {_id: 321, name: "Post 1", websiteId: 456, description: "Lorem"},
        {_id: 432, name: "Post 2", websiteId: 456, description: "Lorem"},
        {_id: 543, name: "Post 3", websiteId: 456, description: "Lorem"}
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.send(pages);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = parseInt(req.params.wid);
        var result = [];
        for (var p in pages) {
            if (pages[p].websiteId === wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pid = parseInt(req.params.pid);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = parseInt(req.params.pid);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages[p] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req, res) {
        var pid = parseInt(req.params.pid);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages.splice(p, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
};