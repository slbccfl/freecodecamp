var projectName = 'heat-map';
localStorage.setItem('example_project', 'Heat Map');

var jsonDataURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

// Used Color Brewer 2.0 website to determine color palette
// http://colorbrewer2.org
var colorbrew = ['#bd0026', '#f03b20', '#fd8d3c', '#feb24c', '#fed976', '#ffffb2', '#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'];

d3.json(jsonDataURL).then(function (data) {

  data.monthlyVariance.forEach(function (val) {val.month -= 1;});

  d3.select('#container').
  append("h2").
  attr('id', 'description').
  html(data.monthlyVariance[0].year + " - " + data.monthlyVariance[data.monthlyVariance.length - 1].year + ": base temperature " + data.baseTemperature + "&#8451;");
  var fontSize = 16;
  var width = 1200;
  var height = 400;
  var padding = { left: 120, right: 20, top: 20, bottom: 120 };

  var tip = d3.tip().
  attr("class", "d3-tip").
  attr("id", "tooltip").
  html(function (d) {return d;}).
  direction("nw").
  offset([-10, 0]);

  var svg = d3.select("section").
  append("svg").
  attr("width", width + padding.left + padding.right).
  attr("height", height + padding.top + padding.bottom).
  call(tip);

  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


  var yScale = d3.scalePoint().
  domain(monthNames).
  range([0, height]);

  var yAxis = d3.axisLeft(yScale).
  tickSize(16, 1).
  tickValues(yScale.pointScale);
  // .tickFormat(d3.timeFormat("%B"));

  svg.append("g").
  classed("y-axis", true).
  attr("id", "y-axis").
  attr("transform", "translate(" + padding.left + "," + (padding.top + yScale.step() / 2) + ")").
  call(yAxis);


  var xScale = d3.scaleBand().
  domain(data.monthlyVariance.map(function (val) {return val.year;})).
  range([0, width]).
  padding(0);

  var xAxis = d3.axisBottom(xScale).
  tickValues(xScale.domain().filter(function (year) {
    //set ticks to years divisible by 10
    return year % 10 === 0;
  }))
  // .tickFormat(function(year){
  //   var date = new Date(0);
  //   date.setUTCFullYear(year);
  //   return d3.time.format.utc("%Y")(date);
  // })
  .tickSize(10, 1);

  svg.append("g").
  classed("x-axis", true).
  attr("id", "x-axis").
  attr("transform", "translate(" + (padding.left + 1) + "," + (height + padding.top + (yScale.step() - 3)) + ")").
  call(xAxis);

  var legendColors = colorbrew.reverse();
  var legendWidth = 1200;
  var legendHeight = 300 / legendColors.length;

  var variance = data.monthlyVariance.map(function (val) {
    return val.variance;
  });
  var minTemp = data.baseTemperature + Math.min.apply(null, variance);
  var maxTemp = data.baseTemperature + Math.max.apply(null, variance);

  var legendThreshold = d3.scaleThreshold().
  domain(function (min, max, count) {
    var array = [];
    var step = (max - min) / count;
    var base = min;
    for (var i = 1; i < count; i++) {
      array.push(base + i * step);
    }
    return array;
  }(minTemp, maxTemp, legendColors.length)).
  range(legendColors);

  var legendX = d3.scaleLinear().
  domain([minTemp, maxTemp]).
  range([0, legendWidth]);

  var legendXAxis = d3.axisBottom(legendX).
  tickSize(10, 0).
  tickValues(legendThreshold.domain()).
  tickFormat(d3.format(".1f"));

  var legend = svg.append("g").
  classed("legend", true).
  attr("id", "legend").
  attr("transform", "translate(" + padding.left + "," + (padding.top + height + padding.bottom - 2 * legendHeight) + ")");

  legend.append("g").
  selectAll("rect").
  data(legendThreshold.range().map(function (color) {
    var d = legendThreshold.invertExtent(color);
    if (d[0] == null) d[0] = legendX.domain()[0];
    if (d[1] == null) d[1] = legendX.domain()[1];
    return d;
  })).
  enter().append("rect").
  style("fill", function (d, i) {return legendThreshold(d[0]);}).
  attr("x", function (d, i) {return legendX(d[0]);}).
  attr("y", 0).
  attr("width", function (d, i) {return legendX(d[1]) - legendX(d[0]);}).
  attr("height", legendHeight);

  legend.append("g").
  attr("transform", "translate(" + 0 + "," + legendHeight + ")").
  call(legendXAxis);

  svg.append("g").
  classed("map", true).
  attr("transform", "translate(" + (padding.left + 1) + "," + padding.top + ")").
  selectAll("rect").
  data(data.monthlyVariance).
  enter().append("rect").
  attr('class', 'cell').
  attr('data-month', function (d) {
    return d.month;
  }).
  attr('data-year', function (d) {
    return d.year;
  }).
  attr('data-temp', function (d) {
    return data.baseTemperature + d.variance;
  }).
  attr("x", function (d, i) {return xScale(d.year);}).
  attr("y", function (d, i) {return yScale(monthNames[d.month]);}).
  attr("width", function (d, i) {return xScale.bandwidth(d.year);}).
  attr("height", height / 12).
  attr("fill", function (d, i) {return legendThreshold(data.baseTemperature + d.variance);}).

  on("mouseover", function (d) {
    var date = new Date(d.year, d.month);
    var str = "<span class='date'>" + d3.timeFormat("%Y - %B")(date) + "</span>" + "<br />" +
    "<span class='temperature'>" + d3.format(".1f")(data.baseTemperature + d.variance) + "&#8451;" + "</span>" + "<br />" +
    "<span class='variance'>" + d3.format("+.1f")(d.variance) + "&#8451;" + "</span>";
    tip.attr("data-year", d.year);
    tip.show(str, this);
  }).
  on("mouseout", tip.hide);
});