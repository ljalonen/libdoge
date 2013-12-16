var doge = function(name) {
  var d = {};
  var id;
  var figure;
  var max_statements = 6;
  var statementNmbr = 1;
  var statements = [];
  var doge_direction;
  var doge_directions = {
    'right' : 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png',
    'left' : 'https://raw.github.com/ljalonen/libdoge/master/img/doge_r.png'
  };

  // constructor like function
  (function() {
    id = 'doge-' + name + '-' + (new Date().getTime());

    figure = document.createElement('img');

    figure.setAttribute('id', id);

    var possible_directions = ['left', 'right'];
    doge_direction =
      possible_directions[util.random(0, possible_directions.length-1)];

    figure.setAttribute(
      'src', doge_directions[doge_direction]);
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

    var fadeOutIn = util.random(300, 1000);
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
    if (Math.random() < 0.33) {
      d.turnAround();
    }

    if (Math.random() < 0.5) {
      var distance = util.random(500, 1000);
      d.run(distance);
    }
    else {
      d.hide();
    }
  };

  d.hide = function() {
    var callback = function() {
      setTimeout(function() {
        d.teleport(true);
        d.ambush();
      }, util.random(0, 2500));
    };
    animation.hide(this, callback);
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
    var callback = function() {
      setTimeout(function() {
        d.plz();
      }, util.random(0, 2500));
    };
    animation.ambush(this, callback);
  };

  d.run = function(distance) {
    animation.run(this, distance, function() {d.plz();});
  };

  d.escape = function() {
    figure.parentNode.removeChild(figure);
    max_statements = 0;
  }

  d.getDirection = function() {
    return doge_direction;
  }

  d.turnAround = function() {
    if (doge_direction == 'right') {
      figure.src = doge_directions['left'];
      doge_direction = 'left';
    }
    else {
      figure.src = doge_directions['right'];
      doge_direction = 'right'
    }
  }

  return d;
};