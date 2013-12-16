var animation = (function() {
  var a = {};

  a.fadeOut = function(id, opacity) {
    opacity = (opacity > 1) ? 1 : parseFloat(opacity.toFixed(2));
    opacity = (opacity < 0) ? 0 : parseFloat(opacity.toFixed(2));

    var element = document.getElementById(id);
    element.style.opacity = opacity;
    if (opacity > 0) {
      setTimeout(function() { a.fadeOut(id, opacity-0.1); },100);
    }
    else {
      element.parentElement.removeChild(element);
    }
  };

  var moveRight = function(figure, location) {
    if (location.side == 'bottom') {
      if (location.left + figure.clientWidth >= window.innerWidth) {
        util.flipElement(figure, 270);
      }
      else {
        figure.style.left = (location.left + 1) + 'px';
      }
    }
    else if (location.side == 'right') {
      if (location.bottom + figure.clientWidth >= window.innerHeight) {
        util.flipElement(figure, 180);
      }
      else {
        figure.style.bottom = (location.bottom + 1) + 'px';
      }
    }
    else if (location.side == 'top') {
      if (location.left <= 0) {
        util.flipElement(figure, 90);
      }
      else {
        figure.style.left = (location.left - 1) + 'px';
      }
    }
    else if (location.side == 'left') {
      if (location.bottom <= 0) {
        util.flipElement(figure, 0);
      }
      else {
        figure.style.bottom = (location.bottom - 1) + 'px';
      }
    }
  };

  var moveLeft = function(figure, location) {
    if (location.side == 'bottom') {
      if (location.left == 0) {
        util.flipElement(figure, 90);
      }
      else {
        figure.style.left = (location.left - 1) + 'px';
      }
    }
    else if (location.side == 'left') {
      if (location.bottom + figure.clientWidth >= window.innerHeight) {
        util.flipElement(figure, 180);
      }
      else {
        figure.style.bottom = (location.bottom + 1) + 'px';
      }
    }
    else if (location.side == 'top') {
      if (location.left + figure.clientWidth >= window.innerWidth) {
        util.flipElement(figure, 270);
      }
      else {
        figure.style.left = (location.left + 1) + 'px';
      }
    }
    else if (location.side == 'right') {
      if (location.bottom <= 0) {
        util.flipElement(figure, 0);
      }
      else {
        figure.style.bottom = (location.bottom - 1) + 'px';
      }
    }
  };

  a.run = function(doge, distance, callback) {
    var location = doge.getLocation();
    var figure = doge.getFigure();

    if (doge.getDirection() == 'left') {
      moveLeft(figure, location);
    }
    else {
      moveRight(figure, location);
    }

    setTimeout(
      function() {
        if (distance <= 0) {
          callback();
        }
        else {
          a.run(doge, --distance, callback);
        }
      }, 1);
  };

  a.hide = function(doge, callback) {
    var location = doge.getLocation();
    var figure = doge.getFigure();
    var doge_hidden = false;

    if (location.side == 'bottom') {
      figure.style.bottom = (location.bottom - 1) + 'px';
      doge_hidden = ((location.bottom - 1) == -figure.clientHeight);
    }
    else if (location.side == 'right') {
      figure.style.left = (location.left + 1) + 'px';
      doge_hidden = ((location.left + 1) == window.innerWidth);
    }
    else if (location.side == 'top') {
      figure.style.bottom = (location.bottom + 1) + 'px';
      doge_hidden = ((location.bottom + 1) == window.innerHeight);
    }
    else if (location.side == 'left') {
      figure.style.left = (location.left - 1) + 'px';
      doge_hidden = ((location.left - 1) == -figure.clientHeight);
    }

    if (!doge_hidden) {
      setTimeout(function() {a.hide(doge, callback)}, 1);
    }
    else {
      callback();
    }
  };

  a.ambush = function(doge, callback) {
    var location = doge.getLocation();
    var figure = doge.getFigure();
    var doge_visible = false;

    if (location.side == 'bottom') {
      figure.style.bottom = (location.bottom + 1) + 'px';
      doge_visible = ((location.bottom + 1) == 0);
    }
    else if (location.side == 'right') {
      figure.style.left = (location.left - 1) + 'px';
      doge_visible = ((location.left - 1) == window.innerWidth - figure.clientHeight);
    }
    else if (location.side == 'top') {
      figure.style.bottom = (location.bottom - 1) + 'px';
      doge_visible = ((location.bottom - 1) == window.innerHeight - figure.clientHeight);
    }
    else if (location.side == 'left') {
      figure.style.left = (location.left + 1) + 'px';
      doge_visible = ((location.left + 1) == 0);
    }

    if (!doge_visible) {
      setTimeout(function() {a.ambush(doge, callback)}, 1);
    }
    else {
      callback();
    }
  };

  return a;
})();