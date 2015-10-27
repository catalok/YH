'use strict';

describe('Service: lokBlog', function () {

  // load the service's module
  beforeEach(module('yhApp'));

  // instantiate service
  var lokBlog;
  beforeEach(inject(function (_lokBlog_) {
    lokBlog = _lokBlog_;
  }));

  it('should do something', function () {
    expect(!!lokBlog).toBe(true);
  });

});
