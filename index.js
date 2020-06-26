const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

//create margins and dimensions
const margins = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left}, ${margins.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

//scales
const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

//create  the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + " orders");

//update x axis text
xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "orange");

//update function
const update = (data) => {
  //updating scale domains
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((item) => item.name));

  // join the data to rects
  const rects = graph.selectAll("rect").data(data);

  //remove exit selection
  rects.exit().remove();

  //update current shapes in dom
  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  //append the enter selection to the DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  //call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

let data = [];

//get data from firestore
db.collection("dishes").onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    console.log(change.doc.data());
  });

  update(data);
});
