/* global describe it after */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server, { stop } from '../server';
import { ImagesResponse, SearchHistoryResponse } from '../types';

chai.should();

chai.use(chaiHttp);

describe('api tests', () => {
  after(async () => {
    stop();
  });
  describe('/api/imagesearch', () => {
    describe('GET', () => {
      it('returns search values with no offset given', (done) => {
        chai
          .request(server)
          .get('/api/imagesearch/cars')
          .end((err, res) => {
            res.status.should.equal(200);

            const { body }: { body: ImagesResponse } = res;
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

      it('gives search values with offset < 10', (done) => {
        const offset = 1;

        chai
          .request(server)
          .get('/api/imagesearch/cars')
          .query({ offset })
          .end((err, res) => {
            res.status.should.equal(200);

            const { body }: { body: ImagesResponse } = res;
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

      it('gives search values with offset > 10', (done) => {
        const offset = 20;

        chai
          .request(server)
          .get('/api/imagesearch/cars')
          .query({ offset })
          .end((err, res) => {
            res.status.should.equal(200);

            const { body }: { body: ImagesResponse } = res;
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
  });

  describe('/api/latest/imagesearch', () => {
    describe('GET', () => {
      it('returns at most 5 results containing search term and search time', (done) => {
        chai
          .request(server)
          .get('/api/latest/imagesearch')
          .end((err, res) => {
            res.status.should.equal(200);

            const { body }: { body: SearchHistoryResponse } = res;
            body.should.be.an('Array');

            body.length.should.be.at.most(5);

            body.forEach((search) => {
              search.should.have.property('searchTerm');
              search.searchTerm.should.be.a('String');

              search.should.have.property('date');
              search.date.should.be.a('number');
            });

            done();
          });
      });
    });

    describe('POST', () => {
      const newSearchTerm = 'test';

      it('accepts a new searchTerm ', (done) => {
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
            body.date.should.be.a('number');

            done();
          });
      });

      it('now returns the previously POSTed request at the top of a GET response', (done) => {
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
  });
});
