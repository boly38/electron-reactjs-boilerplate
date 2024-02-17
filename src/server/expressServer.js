import {app} from "electron";
import express from 'express';

import {isSet} from "../service/util.js";
import ApiController from "./controller/ApiController.js";
import BadRequestException from "../model/exception/BadRequestException.js";

const CB_SERVER_DEBUG = process.env.CB_SERVER_DEBUG === 'true' || false;
const X_POWERED_BY = "boly38/electron-reactjs-boilerplate"
const uiStaticPath = app.isPackaged ? 'resources/app/ui/' :
    isSet(process.env.CB_BASEDIR) ? `${process.env.CB_BASEDIR}ui` : 'ui';

export default class ExpressServer {
    constructor(apiController) {
        this.app = express()
        this.listeningInstance = null;
        this.api = apiController;
        this.appMiddlewareAppendResponseHeader();
        this.setupApi();
        this.appMiddlewareFrontEnd();
    }

    appMiddlewareAppendResponseHeader() {
        // middleware with no mount path: gets executed for every request to the app
        this.app.use(function (req, res, next) {
            res.setHeader('charset', 'utf-8');
            res.setHeader('X-Powered-By', X_POWERED_BY);
            next();
        });
    }

    setupApi() {
        this.app.use(express.json());
        for (const [path, router] of Object.entries(this.api.getSpecs())) {
            // this.app.all(path,handler);
            this.app.use(path, router);
        }
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                let badRequestException = new BadRequestException(`Invalid request format: ${err.message}`);
                console.error(badRequestException.details);
                ApiController.errorResponse(res, badRequestException);
                return; // Bad request
            }
            next();
        });
    }

    appMiddlewareFrontEnd() {// Pick up React index.html file
        CB_SERVER_DEBUG && console.log(`appMiddlewareFrontEnd>${uiStaticPath}`)
        this.app.use(express.static(uiStaticPath));
        this.app.get("/", (req, res) => res.redirect("/index.html"));
    }

    listen() {
        return new Promise(async (resolve, reject) => {
            const listeningPort = process.env.PORT || 4000;
            const about = this.api.getAbout();
            this.listeningInstance = this.app.listen(listeningPort, () => {
                console.log(`electron-reactjs-boilerplate - version ${about?.application?.version} - listening ${listeningPort}`);
                resolve(listeningPort);
            })
        });
    }

    stop() {
        console.log(`DEAD`);
        if (this.listeningInstance !== null) {
            this.listeningInstance.close();
        }
    }

}
