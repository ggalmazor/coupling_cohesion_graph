function Cluster(ctrl, service, dao) {
  this.nodes = [ctrl, service, dao];
  this.links = [Link.of(ctrl, service), Link.of(service, dao)];
}