var width = window.innerWidth,
    height = window.innerHeight,
    totalClusters = 30,
    mode = "type",
    linkDistanceTypeMode = Math.sqrt(Math.pow(width / 3, 2) + Math.pow(height / 3, 2)) | 0,
    linkDistanceClusterMode = 30;

var fociByType = {
      ctrl: {x: (width / 2) | 0, y: (height / 3) | 0},
      service: {x: (width / 3) | 0, y: (2 * height / 3) | 0},
      dao: {x: (2 * width / 3) | 0, y: (2 * height / 3) | 0}
    },
    fociByCluster = R.range(0, totalClusters).map(function (i) {
      // 6 by 5 grid
      return {
        x: ((i % 6) * (width / 6) + width / 12) | 0,
        y: ((i % 5) * (height / 5) + height / 10) | 0
      }
    }),
    clusters = R.range(0, totalClusters).map(function (i) {
      return new Cluster(
          Node.ctrl(fociByType.ctrl, fociByCluster[i]),
          Node.service(fociByType.service, fociByCluster[i]),
          Node.dao(fociByType.dao, fociByCluster[i])
      );
    }),
    nodes = R.flatten(clusters.map(R.prop('nodes'))),
    links = R.flatten(clusters.map(R.prop('links')));

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .linkDistance(linkDistanceTypeMode)
    .gravity(0)
    .size([width, height])
    .on("tick", tick)
    .start();

var node = svg.selectAll("circle"),
    link = svg.selectAll(".link")
        .attr("class", "link");

document.getElementById('toggle_mode').onclick = function (e) {
  mode = mode === "type" ? "cluster" : "type";
  force.stop();

  force.linkDistance(mode === "type" ? linkDistanceTypeMode : linkDistanceClusterMode);
  force.start();
  return false;
};

function tick(e) {
  var k = .1 * e.alpha;

  if (mode === "type")
    nodes.forEach(function (o, i) {
      o.y += (o.typeFocus.y - o.y) * k;
      o.x += (o.typeFocus.x - o.x) * k;
    });
  else
    nodes.forEach(function (o, i) {
      o.y += (o.clusterFocus.y - o.y) * k;
      o.x += (o.clusterFocus.x - o.x) * k;
    });

  node = node
      .attr("class", function (d) {
        return "node " + d.className;
      })
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", 8)
      .data(nodes)
      .call(force.drag);

  node.enter().append("circle")
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", 8)
      .call(force.drag);

  link = link
      .attr("class", "link")
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })
      .data(links);

  link.enter().append("line")
      .attr("class", "link")
      .attr("class", "link")
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

}