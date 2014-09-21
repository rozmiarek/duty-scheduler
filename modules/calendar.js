'use strict';

var moment = require('moment');

var Calendar = function () {
  this.days = [];
};

Calendar.prototype = {
  setInitialDate: function (date) {
    this.initialDate = moment(date);
  },

  setFinalDate: function (date) {
    this.finalDate = moment(date);
  },

  getDaysCount: function () {
    return this.finalDate.diff(this.initialDate, 'days') + 1;
  },

  getDays: function () {
    var currentDate = this.initialDate;

    for (var i = 0, j = this.getDaysCount(); i < j; i++) {
      this.addDay(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }

    return this.days;
  },

  addDay: function (day) {
    this.days.push(day);
  }
};

module.exports = Calendar;
