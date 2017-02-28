// app.js is the main JS file which you should define your Angular module
'use strict'
angular
  .module('CardsAgainstHumanity', [
    'ui.router',
    'ngResource',
    'angular-jwt',
    'ui.bootstrap',
    // 'ngWebSocket'
    'ngActionCable'
  ]);
