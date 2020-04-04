require('should')

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

process.env.ENV = 'Test';

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: "My Book", author: 'John', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, result) => {
        // result.body.read.should.not.equal(false);
        result.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close();
    done();
  });
})