'use strict';

var _ = require('underscore');

var Candidates = function () {
  this.candidates = [];
  this.dutyLength = 1;
  this.dutiesSource = [];
};

Candidates.prototype = {
  setCandidates: function (data) {
    this.candidates = _.compact(_.flatten(data)).map(function (item) {
      return item.replace(/:/g, ',');
    });
  },

  setDutyLength: function (nr) {
    this.dutyLength = nr;
  },

  getCandidates: function () {
    return this.candidates;
  },

  buildSourceList: function (count) {
    var duties = [];
    var repeat = Math.ceil(count / this.dutyLength / this.candidates.length);

    _.times(repeat, _.bind(function () {
      duties = duties.concat(this.candidates);
    }, this));

    this.dutiesSource = duties;
  },

  getRandomItem: function (last) {

    this.dutiesSource = _.shuffle(this.dutiesSource);
    if (_.first(this.dutiesSource) !== last) {
      return this.dutiesSource.shift();
    }
    return this.getRandomItem(last);
  },

  getSchedule: function (count) {
    if (this.candidates.length < 2) {
      throw new Error('lack of candidates');
    }

    this.buildSourceList(count);
    var lastItem;
    var duties = [];

    _.times(Math.ceil(count / this.dutyLength), _.bind(function () {
      try {
        lastItem = this.getRandomItem(lastItem);
      } catch (e) {
        this.getSchedule(count);
      }
      _.times(this.dutyLength, function () {
        duties.push(lastItem);
      });
    }, this));

    return _.first(duties, count);
  }
};

module.exports = Candidates;
