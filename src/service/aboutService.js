import {app} from "electron";
import {loadJsonFile} from "./util.js";

export default class AboutService {
    constructor() {
        const application = electronBuildAboutApplication();
        this.about = {application};
    }

    getAbout() {
        return this.about;
    }
}

function electronBuildAboutApplication() {
    const appName = app.getName();
    const appVersion = app.getVersion();
    const startDate = new Date();
    return {
        startDate, "name": appName, "version": appVersion
    };
}

/**
 * @deprecated : please use electronBuildAboutApplication with electron
 * @returns {{name, version, startDate: Date}}
 */
function pureReactJSBuildAboutApplication() {
    const packageJson = loadJsonFile("package.json");
    const packageAppName = packageJson["name"];
    const packageAppVersion = packageJson["version"];
    const startDate = new Date();
    return {
        startDate, "name": packageAppName, "version": packageAppVersion
    };
}