var doge = function(name) {
  var d = {};
  var id;
  var figure;
  var max_statements = 6;
  var statementNmbr = 1;
  var statements = [];

  // constructor like function
  (function() {
    id = 'doge-' + name + '-' + (new Date().getTime());

    figure = document.createElement('img');

    figure.setAttribute('id', id);
    figure.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    figure.setAttribute('rel', 'bottom');
    figure.style.position = 'fixed';
  
    figure.style.left = '0px';
    figure.style.bottom = '0px';
    figure.style.zIndex = 999999;

    document.body.appendChild(figure);

    setInterval(
      function() {
        d.bark();
      },
      util.random(300,500));
  })();
 
  d.getID = function() {
    return id;
  };

  d.getFigure = function() {
    return figure;
  };

  d.getLocation = function() {
    return {left : parseInt(figure.style.left.replace('px', '')), 
      bottom : parseInt(figure.style.bottom.replace('px', '')),
      side : figure.getAttribute('rel')};
  };

  d.bark = function() {
    if (statements.length >= max_statements) {
      return false;
    }

    var statement_id = id + '-statement-' + statementNmbr;
    statementNmbr++;

    var statement = document.createElement('div');
    statement.style.display = 'inline-block';
    statement.setAttribute('id', statement_id);
    statement.innerHTML = dataminer.getSentence();

    statements.push(statement_id);
    document.body.appendChild(statement);

    var widthBoundaries = {
      left : Math.floor(0.075*window.innerWidth),
      right : Math.floor((0.925*window.innerWidth) - statement.clientWidth)
    };

    var heightBoundaries = {
      bottom : Math.floor(0.075*window.innerHeight),
      top : Math.floor((0.925*window.innerHeight) - statement.clientHeight)
    };

    statement.style.position = 'fixed';
    statement.style.bottom = util.random(heightBoundaries.bottom,
      heightBoundaries.top) + 'px';
    statement.style.left = util.random(widthBoundaries.left,
      widthBoundaries.right) + 'px';
    statement.style.zIndex = 999999;
    statement.style.opacity = 1;
    statement.style.fontSize = '2.75em';
    statement.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
    statement.style.fontFamily = 'Comic Sans MS';
    statement.style.color = 'rgb(' + 
      util.random(0, 255) + ',' +
      util.random(0, 255) + ',' + 
      util.random(0, 255) + ')';

    var fadeOutIn = util.random(100, 800);
    setTimeout(
      function() {
        animation.fadeOut(statement_id, 1);
        setTimeout(function() {
          statements.splice(statements.indexOf(statement_id), 1);
        }, fadeOutIn);
      },
      fadeOutIn);
  };

  d.plz = function() {
    if (Math.random() < 0.5) {
      var distance = util.random(500, 1000);
      d.run(distance);
    }
    else {
      d.hide();
    }

  };

  d.hide = function() {
    var location = d.getLocation();
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
      setTimeout(function() {d.hide()}, 1);
    }
    else {
      setTimeout(function() {
        d.teleport(true);
        d.ambush();
      }, util.random(0, 2500));
    }
  };

  d.teleport = function(is_hidden) {
    var sides = ['top', 'bottom', 'left', 'right'];
    var side = sides[util.random(0, sides.length-1)];
    figure.setAttribute('rel', side);

    if (is_hidden == null) {
      is_hidden = false;
    }

    if (side == 'top') {
      util.flipElement(figure, 180);
      var bottom = (is_hidden) ? 
        window.innerHeight : (window.innerHeight - figure.clientHeight);
      figure.style.bottom = bottom + 'px';
      figure.style.left = util.random(0, window.innerWidth - figure.clientWidth) + 'px';
    }
    else if (side == 'bottom') {
      util.flipElement(figure, 0);
      var bottom = (is_hidden) ? -figure.clientHeight : 0;
      figure.style.bottom = bottom + 'px';
      figure.style.left = util.random(0, window.innerWidth - figure.clientWidth) + 'px';
    }
    else if (side == 'left') {
      util.flipElement(figure, 90);
      figure.style.bottom = util.random(0, window.innerHeight - figure.clientWidth) + 'px';
      var left = (is_hidden) ? -figure.clientHeight : 0;
      figure.style.left = left + 'px';
    }
    else if (side == 'right') {
      util.flipElement(figure, 270);
      figure.style.bottom = util.random(0, window.innerHeight - figure.clientWidth) + 'px';
      var left = (is_hidden) ? window.innerWidth : (window.innerWidth - figure.clientHeight);
      figure.style.left = left + 'px';
    }
  };

  d.ambush = function() {
    var location = d.getLocation();
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
      setTimeout(function() {d.ambush()}, 1);
    }
    else {
      setTimeout(function() {
        d.plz();
      }, util.random(0, 2500));
    }
  };

  d.run = function(distance) {
    var location = d.getLocation();

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

    setTimeout(
      function() {
        if (--distance < 0) {
          d.plz();
        }
        else {
          d.run(distance);
        }
      }, 1);
  };

  d.escape = function() {
    figure.parentNode.removeChild(figure);
    max_statements = 0;
  }

  return d;
};