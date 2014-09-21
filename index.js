#!/usr/bin/env node
'use strict';

var Generator = require('./modules/generator');
var nomnom = require('nomnom');

var params = nomnom
    .script('duty')
    .option('startDate', {
      abbr: 's',
      full: 'start-date',
      metavar: 'YYYY-MM-DD',
      required: true,
    help: 'Inital date'
    })
    .option('endDate', {
      abbr: 'e',
      full: 'end-date',
      metavar: 'YYYY-MM-DD',
      required: true,
      help: 'End date'
    })
    .option('dutyLength', {
      abbr: 'd',
      full: 'duty-length',
      metavar: 'DAYS',
      'default': 1,
      help: 'Duty length (how many days in a row)'
    })
    .option('candidates', {
      abbr: 'c',
      full: 'candidates',
      list: true,
      help: 'Comma seperated list of candidates',
      transform: function (candidates) {
        return candidates.split(',');
      }
    })
    .option('version', {
       abbr: 'v',
       flag: true,
       help: 'Print version and exit',
       callback: function() {
         return 'version ' + require('./package.json').version;
       }
    })
    .help(
      'A list of candidates for on-duty can be attached in several ways, for example:\n' +
      '   duty -c name1:email1,name2:email2\n' +
      '   duty -c name1:email1 -c name2:email2\n' +
      '   cat candidates.txt | duty\n'
    )
    .parse();

var generateSchedule = function () {
  var generator = new Generator();

  generator.setInitialDate(params.startDate);
  generator.setFinalDate(params.endDate);
  generator.setCandidates(params.candidates);
  generator.setDutyLength(params.dutyLength);

  try {
    var dutySchedule = generator.scheduleDuties();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  console.log(dutySchedule.join('\n'));
  process.exit(0);
}

if (params.candidates) {
  generateSchedule();
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
  params.candidates = data.trim().split(/,|\n/);
  generateSchedule();
});
process.on('SIGINT', function () {
  process.exit(0);
});
