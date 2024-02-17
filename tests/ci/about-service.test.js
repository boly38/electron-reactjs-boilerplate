import 'supertest';

import chai from 'chai';
import chaiHttp from 'chai-http';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import ApplicationConfig from '../../src/config/ApplicationConfig.js';

const should = chai.should;
const expect = chai.expect;
should();
chai.use(chaiHttp);
chai.use(deepEqualInAnyOrder);

const DEBUG_TEST = process.env.DEBUG_TEST === 'true' || false;
const appConfig = ApplicationConfig.getInstance();

const expressServer = appConfig.get('expressServer');
let agent = null;
describe('service test', () => {
    before(async () => {
        DEBUG_TEST && console.info("service test::before");
        await expressServer.listen();
        agent = chai.request.agent(expressServer.listeningInstance)
    });
    after(() => {
        DEBUG_TEST && console.info("service test::after");
        expressServer.stop();
    });

    it('should get API ABOUT return 200', done => {
        agent
            .get("/about")
            .set('Accept', 'application/json; charset=utf-8')
            .end(async function (err, res) {
                res.status.should.equal(200);
                console.log(res.body)
                done();
            });
    });
});

