'use strict';

var $ = require('jquery');
var autocomplete = require('jquery-ui/autocomplete');

var languages = [
  "English",
  "Spanish",
  "Portugese"
];

$(document).ready(function() {
  $( "#language" ).autocomplete({
    source: languages
  });
});