'use strict';

describe('Service: Mediator', function () {

  // load the service's module
  beforeEach(module('yhApp'));

  // instantiate service
  var Mediator;
  beforeEach(inject(function (_Mediator_) {
    Mediator = _Mediator_;
  }));

  it('should do something', function () {
    expect(!!Mediator).toBe(true);
  });

});
