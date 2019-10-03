'use strict';

process.env.SECRET = 'secret';

const {server} = require('../src/server');
const supergoose = require('./supergoose');
const mockRequest = supergoose.server(server);
const errorFile = require('../src/middleware/not-found');
const serverError = require('../src/middleware/server-error');


describe('should check error routes', () => {
  describe( 'hits 404 on bad route', () => {
    test('can create one', () => {
      let req = {};
      mockRequest.get('/totallywrong')
        .set('Content-Type', "application/json")
        .then((res) => {
          expect(errorFile(req,res)).toEqual(404);
        })
    });
  });
});

describe( 'hits 500 on server error', () => {
  test('can create one', () => {
    const req = {};
    const err = {};
    const res = {setHeader : (a,b) => {}, write : () => {}, end : () => {}};
    const errorResponse = serverError(err,req,res);
    expect(res.statusCode).toEqual(500);
  });
});

