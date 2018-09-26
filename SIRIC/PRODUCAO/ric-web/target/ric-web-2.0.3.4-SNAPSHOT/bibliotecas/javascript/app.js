// Filename: app.js
define([
  'jquery',
  'jqueryui',
  'underscore',
  'backbone',
  'router',
  'ajaxStatus',
  'verificaSessao'
], function($, jqueryui, _, Backbone, Router,ajaxStatus,verificaSessao) {
  var initialize = function(parm){
    // Pass in our Router module and call it's initialize function
    Router.initialize(parm);
  };

  return {
    initialize: initialize
  };
});