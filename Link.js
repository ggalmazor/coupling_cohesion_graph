function Link(source, target) {
  this.source = source;
  this.target = target;
}

Link.of = function (source, target) {
  return new Link(source, target);
};