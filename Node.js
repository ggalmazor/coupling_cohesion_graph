function Node(typeFocus, clusterFocus, x, y, className) {
  this.typeFocus = typeFocus;
  this.clusterFocus = clusterFocus;
  this.x = x;
  this.y = y;
  this.className = className;
}

Node.ctrl = function (typeFocus, clusterFocus) {
  return new Node(
      typeFocus, clusterFocus,
      (Math.random() * width) | 0,
      (Math.random() * height) | 0,
      'ctrl'
  );
};

Node.service = function (typeFocus, clusterFocus) {
  return new Node(
      typeFocus, clusterFocus,
      (Math.random() * width) | 0,
      (Math.random() * height) | 0,
      'service'
  );
};

Node.dao = function (typeFocus, clusterFocus) {
  return new Node(
      typeFocus, clusterFocus,
      (Math.random() * width) | 0,
      (Math.random() * height) | 0,
      'dao'
  );
};