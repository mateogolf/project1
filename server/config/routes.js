const mongoose = require('mongoose');
const controller = require('../controllers/controller');
const path = require("path");
module.exports = function (app) {
    //Users
    app.get('/api/login/:name',controller.login);
    app.get('/api/user',controller.getUser);
    app.get('/api/logout', controller.logout);

    // app.get('/api/contacts/:id',controller.contactUser);
    //Bicycles
    app.get('/api/questions',controller.showAll);
    app.get('/api/questions/:id', controller.showOne);
    app.post('/api/questions',controller.create);
    app.put('/api/questions/:id/answers', controller.addAnswer);
    app.get('/api/answers/:id', controller.addLike);

    // app.put('/api/bicycles/:id', controller.update);
    // app.delete('/api/bicycles/:id',controller.delete);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    });
}
