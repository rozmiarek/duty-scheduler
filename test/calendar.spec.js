/*jshint unused:false*/
'use strict';

var should = require('chai').should();
var Calendar = require('../modules/calendar');

describe('Calendar', function () {
  var calendar;

  beforeEach(function () {
    calendar = new Calendar();
  });

  it('should properly count number of days in time interval', function () {
    calendar.setInitialDate('2014-02-20');
    calendar.setFinalDate('2014-03-02');

    calendar.getDaysCount().should.equal(11);

    calendar.setInitialDate('2012-02-20');
    calendar.setFinalDate('2012-03-02');

    calendar.getDaysCount().should.equal(12);
  });

  it('should return list of days', function () {
    calendar.setInitialDate('2014-05-30');
    calendar.setFinalDate('2014-06-02');

    var days = [
      '2014-05-30',
      '2014-05-31',
      '2014-06-01',
      '2014-06-02'
    ];

    calendar.getDays().should.have.length(4);
    calendar.getDays().should.deep.equal(days);
  });
});
