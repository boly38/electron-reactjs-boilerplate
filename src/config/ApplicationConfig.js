import {ContainerBuilder} from 'node-dependency-injection';
import ApplicationProperties from './ApplicationProperties.js';
import ApiController from "../server/controller/ApiController.js";
import ExpressServer from '../server/expressServer.js';
import AboutService from "../service/aboutService.js";

export default class ApplicationConfig {
    constructor() {
        this.container = new ContainerBuilder();

        this.container
            .register('config', ApplicationProperties);

        this.container
            .register('aboutService', AboutService)
        ;

        this.container
            .register('apiController', ApiController)
            .addArgument(this.container.get('aboutService'))
        ;

        this.container
            .register('expressServer', ExpressServer)
            .addArgument(this.container.get('apiController'))
        ;
    }

    get(beanName) {
        return this.container.get(beanName);
    }

}

ApplicationConfig.singleton = null;
ApplicationConfig.getInstance = function () {
    if (ApplicationConfig.singleton === null) {
        ApplicationConfig.singleton = new ApplicationConfig();
    }
    return ApplicationConfig.singleton;
}