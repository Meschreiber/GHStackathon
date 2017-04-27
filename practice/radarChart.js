var d3 = require("d3"),
    jsdom = require("jsdom");

var document = jsdom.jsdom(),
    svg = d3.select(document.body).append("svg");

var RadarChart = {
  draw: function(id, d, options){
    var config = {
      radius: 5,
      w: 600,
      h: 600,
      factor: 1
    }
  }
}    