"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/", (req, res, next) => {
            console.log("passou no /");
            new IndexRoute().index(req, res, next);
        });
        router.get("/loginteste", (req, res, next) => {
            new IndexRoute().loginTeste(req, res, next);
        });
    }
    constructor() {
        super();
    }
    loginTeste(req, res, next) {
        this.title = "Home | Tour of Heros";
        let options = {
            "message": "Welcome to the Tour of Heros"
        };
        res.send("yeah! it's worked! ");
    }
    index(req, res, next) {
        this.title = "Home | Tour of Heros";
        let options = {
            "message": "Welcome to the Tour of Heros"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRoute = IndexRoute;
