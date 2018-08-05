const mongoose  = require('mongoose');
const Image     = require('../models/image');

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const should    = chai.should();

const serverAddr = 'http://simage.us:3000';

chai.use(chaiHttp);

describe('Image', () => {
  beforeEach((done) => {
    Image.remove({}, (err) => {
      done();
    });
  }); 

  describe('/GET image', () => {
    it('it should GET all images', (done) => {
      chai.request(serverAddr)
        .get('/i')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    })
  })
})