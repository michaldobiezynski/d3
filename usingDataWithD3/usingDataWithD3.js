data = [
  {
    width: 200,
    height: 100,
    fill: "purple",
  },
  { width: 100, height: 60, fill: "pink" },
  {
    width: 50,
    height: 30,
    fill: "red",
  },
];

const svg = d3.select("svg");

//join data to rects
const rect = svg.selectAll("rect").data(data);

//add attrs to rects already in the dom
rect
  .attr("width", (d, i, n) => {
    return d.width;
  })
  .attr("height", (d) => {
    return d.height;
  })
  .attr("fill", (d) => {
    return d.fill;
  });

// append the enter selection to the DOM
rect
  .enter()
  .append("rect")
  .attr("width", (d, i, n) => {
    return d.width;
  })
  .attr("height", (d) => {
    return d.height;
  })
  .attr("fill", (d) => {
    return d.fill;
  });

console.log(rect);
