'use strict';

var _ = require('underscore');
var should = require('chai').should();
var Candidates = require('../modules/candidates');

describe('Candidates', function () {
  var candidates;
  var setCandidates = function (list) {
    var users = list || ['A B:a.b@c', 'D F:d.f@e', 'G H:g.h@i'];
    candidates.setCandidates(users);
  };

  beforeEach(function () {
    candidates = new Candidates();
  });

  it('throws error when there is no candidates', function () {
    should.Throw(candidates.getSchedule.bind(candidates), Error, 'lack of candidates');
  });

  it('should accept array of candidates', function () {
    setCandidates();

    candidates.getCandidates().should.have.length(3);
  });

  it('should ignore empty fields', function () {
    setCandidates(['a', '', 'b:a.b@c', null, 'G H:g.h@i']);

    candidates.getCandidates().should.have.length(3);
  });

  it('should seperate candidate blocks with commas', function () {
    setCandidates(['name:mail:phone']);

    candidates.getCandidates().should.contain('name,mail,phone');
  });

  it('should flatten array of candidates', function () {
    setCandidates([['a'], ['b'], ['c']]);

    candidates.getCandidates()[0].should.equal('a');
  });

  it('should return schedule', function () {
    setCandidates();
    var list = candidates.getSchedule(20);

    list.should.have.length(20);
    list[0].should.not.equal(list[1]);
    list[1].should.not.equal(list[2]);
    list[2].should.not.equal(list[3]);
    list[3].should.not.equal(list[4]);
  });

  it('should return two days long schedule', function () {
    setCandidates();
    candidates.setDutyLength(2);
    var list = candidates.getSchedule(20);

    list.should.have.length(20);
    list[0].should.equal(list[1]);
    list[0].should.not.equal(list[2]);
    list[1].should.not.equal(list[2]);
    list[2].should.equal(list[3]);
  });

  it('should return three days long schedule', function () {
    setCandidates();
    candidates.setDutyLength(3);
    var list = candidates.getSchedule(20);

    list.should.have.length(20);
    list[0].should.equal(list[1]);
    list[0].should.equal(list[2]);
    list[0].should.not.equal(list[3]);
    list[3].should.equal(list[4]);
    list[3].should.equal(list[5]);
    list[3].should.not.equal(list[6]);
  });

  it('should ensure similar number of on duty', function () {
    setCandidates();
    var users = candidates.getCandidates();
    var list = candidates.getSchedule(18);

    _.filter(list, function (i) { return i === users[0]; }).should.have.length(6);
    _.filter(list, function (i) { return i === users[1]; }).should.have.length(6);
    _.filter(list, function (i) { return i === users[2]; }).should.have.length(6);
  });
});
