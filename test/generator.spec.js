/*jshint unused:false*/
'use strict';

var should = require('chai').should();
var Generator = require('../modules/generator');

describe('Generator', function () {

  it('should assing candidate for every day in time interval', function () {
    var generator = new Generator();
    generator.setInitialDate('2014-07-20');
    generator.setFinalDate('2014-07-25');
    generator.setCandidates(['A','B','C','D']);

    generator.scheduleDuties().should.have.length(6);
  });

});
