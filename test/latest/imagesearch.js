/* global describe it after */

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../../server');

chai.use(chaiHttp);

describe('GET /api/latest/imagesearch', () => {
  after(async () => {
    server.stop();
  });

  it('should return at most 5 results containing search term and search time', (done) => {
    chai
      .request(server)
      .get('/api/latest/imagesearch')
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;
        body.should.be.an('Array');

        body.length.should.be.at.most(5);

        body.forEach((search) => {
          search.should.have.property('searchTerm');
          search.searchTerm.should.be.a('String');

          search.should.have.property('date');
          search.date.should.be.a('string');
        });

        done();
      });
  });
});

describe('POST /api/latest/imagesearch', () => {
  after(async () => {
    server.stop();
  });

  const newSearchTerm = 'test';

  it('should accept a new searchTerm ', (done) => {
    chai
      .request(server)
      .post('/api/latest/imagesearch')
      .send({ searchTerm: newSearchTerm })
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;

        body.should.be.an('Object');

        body.should.have.property('searchTerm');
        body.searchTerm.should.equal(newSearchTerm);

        body.should.have.property('date');
        body.date.should.be.a('String');

        done();
      });
  });

  it('should now return the previously POSTed request at the top of a GET response', (done) => {
    chai
      .request(server)
      .get('/api/latest/imagesearch')
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;

        body.should.be.an('Array');

        body[0].should.be.an('Object');
        body[0].should.have.property('searchTerm');
        body[0].searchTerm.should.equal(newSearchTerm);

        done();
      });
  });
});
