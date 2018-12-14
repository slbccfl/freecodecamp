var projectName = "scatter-plot";
localStorage.setItem('example_project', 'D3: Scatter Plot');
var jsonDataURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40 };

var width = 920 - margin.left - margin.right;
var height = 630 - margin.top - margin.bottom;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var x = d3.scaleLinear().
range([0, width]);

var y = d3.scaleTime().
range([0, height]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var timeFormat = d3.timeFormat("%M:%S");
var xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));

var yAxis = d3.axisLeft(y).tickFormat(timeFormat);


var div = d3.select("body").append("div").
attr("class", "tooltip").
attr("id", "tooltip").
style("opacity", 0);

var svg = d3.select("body").append("svg").
attr("width", width + margin.left + margin.right).
attr("height", height + margin.top + margin.bottom).
attr("class", "graph").
append("g").
attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json(jsonDataURL, function (error, data) {
  if (error) throw error;
  data.forEach(function (d) {

    var parsedTime = d.Time.split(':');
    d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));

    x.domain([
    d3.min(data, function (d) {return d.Year - 1;}),
    d3.max(data, function (d) {return d.Year + 1;})]);


    y.domain(d3.extent(data, function (d) {return d.Time;}));

  });
  svg.append("g").
  attr("class", "x axis").
  attr("id", "x-axis").
  attr("transform", "translate(0," + height + ")").
  call(xAxis).
  append("text").
  attr("class", "x-axis-label").
  attr("x", width).
  attr("y", 0);

  svg.append("g").
  attr("class", "y axis").
  attr("id", "y-axis").
  call(yAxis).
  append("text").
  attr("class", "label").
  attr("transform", "rotate(-90)").
  attr("y", 0);

  svg.selectAll(".dot").
  data(data).
  enter().
  append("circle").
  attr("class", "dot").
  attr("r", 6).
  attr("cx", function (d) {
    return x(d.Year);
  }).
  attr("cy", function (d) {
    return y(d.Time);
  }).
  attr("data-xvalue", function (d) {
    return d.Year;
  }).
  attr("data-yvalue", function (d) {
    return d.Time.toISOString();
  }).
  style("fill", function (d) {return color(d.Doping == "");}).
  on("mouseover", function (d) {
    div.style("opacity", .9);
    div.attr("data-year", d.Year);
    div.html(d.Name + ": " + d.Nationality + "<br/>" +
    "Year: " + d.Year + ", Time: " + timeFormat(d.Time) + (
    d.Doping ? "<br/><br/>" + d.Doping : "")).
    style("left", d3.event.pageX + "px").
    style("top", d3.event.pageY + "px");
  }).
  on("mouseout", function (d) {
    div.style("opacity", 0);
  });

  var legend = svg.selectAll(".legend").
  data(color.domain()).
  enter().append("g").
  attr("class", "legend").
  attr("id", "legend").
  attr("transform", function (d, i) {
    return "translate(0," + (height / 2 - i * 20) + ")";
  });
  legend.append("circle").
  attr("cx", width - 18).
  attr("r", 6).
  style("fill", color);

  legend.append("text").
  attr("x", width - 26).
  attr("y", 0).
  attr("dy", ".35em").
  style("text-anchor", "end").
  text(function (d) {
    if (d) return "Riders with doping allegations";else
    {
      return "Riders with no doping allegations";
    };
  });

});