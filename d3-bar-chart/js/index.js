var projectName = 'bar-chart';
localStorage.setItem('example_project', 'D3: Bar Chart');

var width = 800;
var height = 400;
var Quarters = { "01": "Q1", "04": "Q2", "07": "Q3", "10": "Q4" };

var svgContainer = d3.select('#chartContainer').
append('svg').
attr('width', width + 100).
attr('height', height + 60);

var tooltip = d3.select('#chartContainer').append("div").
attr("id", "tooltip").
style("opacity", 0);

var overlay = d3.select('#chartContainer').append('div').
attr('class', 'overlay').
style('opacity', 0);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (err, data) {

  var barwidth = width / data.data.length;
  var yq = data.data.map(function (item) {return item[0].substring(0, 4) + Quarters[item[0].substring(5, 7)];});
  var dates = data.data.map(function (item) {return new Date(item[0]);});

  var xMax = new Date(d3.max(dates));
  xMax.setMonth(xMax.getMonth() + 3);
  var xScale = d3.scaleTime().
  domain([d3.min(dates), xMax]).
  range([0, width]);

  var GDP = data.data.map(function (item) {
    return item[1];
  });


  var linearScale = d3.scaleLinear().
  domain([0, d3.max(GDP)]).
  range([0, height]);

  var scaledGDP = GDP.map(function (item) {
    return linearScale(item);
  });

  var xAxis = d3.axisBottom().
  scale(xScale);

  var xAxisGroup = svgContainer.append('g').
  call(xAxis).
  attr('id', 'x-axis').
  attr('transform', 'translate(60, 400)');

  var yAxisScale = d3.scaleLinear().
  domain([0, d3.max(GDP)]).
  range([height, 0]);

  var yAxis = d3.axisLeft(yAxisScale);

  var yAxisGroup = svgContainer.append('g').
  call(yAxis).
  attr('id', 'y-axis').
  attr('transform', 'translate(60, 0)');

  d3.select('svg').selectAll('rect').
  data(scaledGDP).
  enter().
  append('rect').
  attr('data-date', function (d, i) {
    return data.data[i][0];
  }).
  attr('data-gdp', function (d, i) {
    return data.data[i][1];
  }).
  attr('class', 'bar').
  attr('x', function (d, i) {
    return xScale(dates[i]);
  }).
  attr('y', function (d, i) {
    return height - d;
  }).
  attr('width', barwidth).
  attr('height', function (d) {
    return d;
  }).

  style('fill', '#2dbc45').
  attr('transform', 'translate(61, 0)').
  on('mouseover', function (d, i) {
    overlay.transition().
    duration(0).
    style('height', d + 'px').
    style('width', barwidth + 'px').
    style('opacity', .9).
    style('left', i * barwidth + 0 + 'px').
    style('top', height - d + 'px').
    style('transform', 'translateX(61px)');
    tooltip.transition().
    duration(200).
    style('opacity', .9);
    tooltip.html(yq[i] + '<br> $' + GDP[i].toFixed(0) + ' Billion').
    attr('data-date', data.data[i][0]).
    style('left', i * barwidth + 30 + 'px').
    style('top', height - 100 + 'px').
    style('transform', 'translateX(61px)');
  }).
  on('mouseout', function (d) {
    tooltip.transition().
    duration(200).
    style('opacity', 0);
    overlay.transition().
    duration(200).
    style('opacity', 0);
  });

});