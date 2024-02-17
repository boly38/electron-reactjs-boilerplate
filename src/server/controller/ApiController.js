import express from "express";

export default class ApiController {
    constructor(aboutService) {
        this.aboutService = aboutService;
    }

    getAbout() {
        return this.aboutService.getAbout();
    }

    getSpecs() {
        return {
            "/about": this.aboutRoute()
        };
    }

    aboutRoute() {
        const controller = this;
        const router = express.Router();
        router.get('/', async function (req, res) {
            res.send(controller.getAbout());
        });
        return router;
    }

}

