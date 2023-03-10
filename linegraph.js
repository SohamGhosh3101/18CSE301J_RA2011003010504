// Set the dimensions of the chart
/*const width = 600;
const height = 400;

// Create the SVG element
const svg = d3.select("#linegraph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define the color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Define the bubble pack layout
const pack = d3.pack()
  .size([width, height])
  .padding(1.5);

// Load the data
d3.json("data.json").then(function(data) {

  // Convert the data to the correct format
  const root = d3.hierarchy(data)
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.value - a.value; });

  // Run the pack layout on the data
  pack(root);

  // Create a circle for each node in the hierarchy
  const node = svg.selectAll("circle")
    .data(root.descendants())
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.depth); });

  // Add a label for each node that is not a leaf
  const label = svg.selectAll("text")
    .data(root.descendants())
    .enter().append("text")
      .attr("class", "label")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("dy", "0.3em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function(d) { return d.data.name; });

});*/

// Define the data
var data = [
    { date: "2018-01-01", value: 100 },
    { date: "2018-01-02", value: 150 },
    { date: "2018-01-03", value: 200 },
    { date: "2018-01-04", value: 250 },
    { date: "2018-01-05", value: 300 },
  ];
  
  // Define the dimensions of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  
  // Define the scales
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  
  // Define the line function
  var line = d3
    .line()
    .x(function (d) {
      return x(new Date(d.date));
    })
    .y(function (d) {
      return y(d.value);
    });
  
  // Append the SVG to the body of the page
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Parse the dates
  data.forEach(function (d) {
    d.date = new Date(d.date);
  });
  
  // Set the domains of the scales
  x.domain(d3.extent(data, function (d) { return d.date; }));
  y.domain(d3.extent(data, function (d) { return d.value; }));
  
  // Add the line path
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
  
  // Add the X axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Add the Y axis
  svg.append("g")
    .call(d3.axisLeft(y));

