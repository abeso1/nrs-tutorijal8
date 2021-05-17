let server = require("../server")
let chai = require("chai")
let chaiHttp = require("chai-http")
let mocha = require("mocha")
import { startDb } from '../server.js';
import { closeDb } from '../server.js';
import { beforeAndAfterEachShowGradove } from '../server.js'

chai.should()
chai.use(chaiHttp)


describe('Apis', () => {

    before(function () {
        startDb()
    });

    after(function () {
        closeDb()
    });

    beforeEach(function () {
        beforeAndAfterEachShowGradove()
    });

    afterEach(function () {
        beforeAndAfterEachShowGradove()
    });

    it("should return status code 200, json,not array and not 0 for GET /gradovi/{id}", (done) => {
        chai.request(server).get("/gradovi/2").end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.not.be.a('array');
            res.body.length.should.not.be.eql(0);
            done()
        });
    });

    it("should return status code 200, and text that Post succeded for POST /grad", (done) => {
        chai.request(server).post("/grad").end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.equal("Successfull post");
            done()
        });
    });

    it("should return status code 200 and json for GET /gradovi", (done) => {
        chai.request(server).get("/gradovi").end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            done()
        });
    });

    it("should return status code 200 and successful put for PUT /gradovi/{id}", (done) => {
        chai.request(server).put("/gradovi/2").end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.equal("Successfull put");
            done()
        });
    });

    it("should return status code 200 for DELETE /gradovi/{id}", (done) => {
        chai.request(server).get("/gradovi/1").end((err, res) => {
            res.should.have.status(200);
            done()
        });
    });
})