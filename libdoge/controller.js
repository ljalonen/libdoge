var controller = (function() {
  var c = {};
  var doges = [];
  var name = 1;

  c.buyDoge = function() {
    var d = new doge(name++);
    d.plz();
    doges.push(d);
  }

  c.sellDoge = function() {
    if (doges.length == 0) {
      return;
    }

    var doge = doges.pop();

    // Y U NO SELL DOGE
    doge.escape();
    delete doge;
  }

  return c;
})();