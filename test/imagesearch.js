/* global describe it */

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/imagesearch', () => {
  it('should return search values with no offset given', (done) => {
    chai
      .request(server)
      .get('/api/imagesearch/cars')
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;
        body.should.be.an('Object');

        body.should.have.property('page');
        body.page.should.be.a('number');
        body.page.should.equal(1);

        body.should.have.property('totalResults');
        body.totalResults.should.be.a('string');

        body.should.have.property('items');
        body.items.should.be.an('array');
        body.items.length.should.be.at.most(10);

        body.items.forEach((item) => {
          item.should.have.property('title');
          item.title.should.be.a('string');

          item.should.have.property('htmlTitle');
          item.htmlTitle.should.be.a('string');

          item.should.have.property('link');
          item.link.should.be.a('string');

          item.should.have.property('snippet');
          item.snippet.should.be.a('string');

          item.should.have.property('htmlSnippet');
          item.htmlSnippet.should.be.a('string');

          item.should.have.property('src');
          item.src.should.be.a('string');
        });

        done();
      });
  });

  it('should give search values with offset < 10', (done) => {
    const offset = 1;

    chai
      .request(server)
      .get('/api/imagesearch/cars')
      .query({ offset })
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;
        body.should.be.an('Object');

        body.should.have.property('page');
        body.page.should.be.a('number');
        body.page.should.equal(offset + 1);

        body.should.have.property('totalResults');
        body.totalResults.should.be.a('string');

        body.should.have.property('items');
        body.items.should.be.an('array');
        body.items.length.should.be.at.most(10);

        body.items.forEach((item) => {
          item.should.have.property('title');
          item.title.should.be.a('string');

          item.should.have.property('htmlTitle');
          item.htmlTitle.should.be.a('string');

          item.should.have.property('link');
          item.link.should.be.a('string');

          item.should.have.property('snippet');
          item.snippet.should.be.a('string');

          item.should.have.property('htmlSnippet');
          item.htmlSnippet.should.be.a('string');

          item.should.have.property('src');
          item.src.should.be.a('string');
        });

        done();
      });
  });

  it('should give search values with offset > 10', (done) => {
    const offset = 20;

    chai
      .request(server)
      .get('/api/imagesearch/cars')
      .query({ offset })
      .end((err, res) => {
        res.status.should.equal(200);

        const { body } = res;
        body.should.be.an('Object');

        body.should.have.property('page');
        body.page.should.be.a('number');
        body.page.should.equal(10);

        body.should.have.property('totalResults');
        body.totalResults.should.be.a('string');

        body.should.have.property('items');
        body.items.should.be.an('array');
        body.items.length.should.be.at.most(10);

        body.items.forEach((item) => {
          item.should.have.property('title');
          item.title.should.be.a('string');

          item.should.have.property('htmlTitle');
          item.htmlTitle.should.be.a('string');

          item.should.have.property('link');
          item.link.should.be.a('string');

          item.should.have.property('snippet');
          item.snippet.should.be.a('string');

          item.should.have.property('htmlSnippet');
          item.htmlSnippet.should.be.a('string');

          item.should.have.property('src');
          item.src.should.be.a('string');
        });

        done();
      });
  });
});
