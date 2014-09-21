'use strict';

var _ = require('underscore');
var Calendar = require('./calendar');
var Candidates = require('./candidates');

var Generator = function () {
  this.calendar = new Calendar();
  this.candidates = new Candidates();
};

Generator.prototype = {
  setInitialDate: function (date) {
    this.calendar.setInitialDate(date);
  },

  setFinalDate: function (date) {
    this.calendar.setFinalDate(date);
  },

  getDaysCount: function () {
    return this.calendar.getDaysCount();
  },

  getDays: function () {
    return this.calendar.getDays();
  },

  setCandidates: function (candidates) {
    this.candidates.setCandidates(candidates);
  },

  setDutyLength: function (nr) {
    this.candidates.setDutyLength(nr);
  },

  scheduleDuties: function () {
    var days = this.calendar.getDays();
    var duties = this.candidates.getSchedule(days.length);

    return _.zip(days, duties);
  }
};

module.exports = Generator;
