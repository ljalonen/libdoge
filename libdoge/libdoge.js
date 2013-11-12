var LIBDOGE = (function(libdoge) {
  return libdoge;
}(LIBDOGE || {}));

LIBDOGE.util = (function() {
  var util = {};

  var contentStopWords = {'a' : true, 'able' : true, 'about' : true, 'across' : true, 'after' : true, 'all' : true, 'almost' : true, 'also' : true, 'am' : true, 'among' : true, 'an' : true, 'and' : true, 'any' : true, 'are' : true, 'as' : true, 'at' : true, 'be' : true, 'because' : true, 'been' : true, 'but' : true, 'by' : true, 'can' : true, 'cannot' : true, 'could' : true, 'dear' : true, 'did' : true, 'do' : true, 'does' : true, 'either' : true, 'else' : true, 'ever' : true, 'every' : true, 'for' : true, 'from' : true, 'get' : true, 'got' : true, 'had' : true, 'has' : true, 'have' : true, 'he' : true, 'her' : true, 'hers' : true, 'him' : true, 'his' : true, 'how' : true, 'however' : true, 'i' : true, 'if' : true, 'in' : true, 'into' : true, 'is' : true, 'it' : true, 'its' : true, 'just' : true, 'least' : true, 'let' : true, 'like' : true, 'likely' : true, 'may' : true, 'me' : true, 'might' : true, 'most' : true, 'must' : true, 'my' : true, 'neither' : true, 'no' : true, 'nor' : true, 'not' : true, 'of' : true, 'off' : true, 'often' : true, 'on' : true, 'only' : true, 'or' : true, 'other' : true, 'our' : true, 'own' : true, 'rather' : true, 'said' : true, 'say' : true, 'says' : true, 'she' : true, 'should' : true, 'since' : true, 'so' : true, 'some' : true, 'than' : true, 'that' : true, 'the' : true, 'their' : true, 'them' : true, 'then' : true, 'there' : true, 'these' : true, 'they' : true, 'this' : true, 'tis' : true, 'to' : true, 'too' : true, 'twas' : true, 'us' : true, 'wants' : true, 'was' : true, 'we' : true, 'were' : true, 'what' : true, 'when' : true, 'where' : true, 'which' : true, 'while' : true, 'who' : true, 'whom' : true, 'why' : true, 'will' : true, 'with' : true, 'would' : true, 'yet' : true, 'you' : true, 'your' : true};

  var prefixes = ['wow', 'so', 'such', 'so much', 'very', 'many', 'lots', 
    'most', 'beautiful', 'all the', 'the', 'very much', 'pretty', 'lol'];

  var suffixes = ['wow', 'plz', 'lol'];
  var presetWords = ['doge'];

  var dictionary = {meta : null, contetn: null};

  util.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var readMeta = function() {
    var words;
    var strings = [];
    strings.push(document.title.trim());

    var intrests = ['keywords','description','author'];
    var metadata = document.getElementsByTagName('meta');

    for (i in metadata) {
      if (intrests.indexOf(metadata[i].name) != -1 && 
        typeof metadata[i].content != 'undefined') {
        strings.push(metadata[i].content.trim());
      }
    }

    words = unescape(strings.join(' ').toLowerCase())
      .replace(/\W/g, ' ')
      .split(/[\s\/]+/g);

    words = words.concat(presetWords);

    return filterWords(words);
  };

  var readContent = function() {
    var content = document.createElement('div');
    // this magic, doge now understand good
    content.innerHTML = document.body.innerHTML.replace(/>/g, '> ');

    var dump = ['script','style'];

    for(i in dump) {
      var dump_pile = content.getElementsByTagName(dump[i]);
      for (var i = (dump_pile.length - 1);  i >= 0;  i--) {
        dump_pile[i].parentElement.removeChild(dump_pile[i]);
      }      
    }

    var words = unescape(content.textContent.toLowerCase().trim())
      .replace(/\W/g, ' ')
      .split(/[\s\/]+/g);

    return filterWords(words);
  };

  var filterWords = function(words) {
    var selected_words = {};

    var stopList = contentStopWords;
    for(i in prefixes) {
      stopList[prefixes[i]] = true;
    }
    for(i in suffixes) {
      stopList[suffixes[i]] = true;
    }

    for (i in words) {
      if (words[i].length <= 2 || words[i].length > 20) {
        continue;
      }

      if (words[i] in stopList) {
        continue;
      }

      if (words[i] in selected_words) {
        selected_words[words[i]]++;
        continue;
      }

      if (parseInt(words[i]).toString() == words[i]) {
        continue;
      }

      selected_words[words[i]] = 1;

    }
    return Object.keys(selected_words);
  };

  util.loadDictionary = function() {
    dictionary = {
      meta : readMeta(),
      content : readContent()
    };
  };  

  util.getTextPrefixes = function() {
    return prefixes;
  };

  util.getTextSuffixes = function() {
    return suffixes;
  };

  util.getDictionary = function() {
    return dictionary;
  };

  util.fadeOut = function(id, opacity) {
    var element = document.getElementById(id);
    element.style.opacity = opacity;
    if (opacity > 0) {
      setTimeout(function() { util.fadeOut(id, opacity-0.1); },100);
    }
    else {
      element.parentElement.removeChild(element);
    }
  };

  util.flipElement = function(id, rotation) {
    var element = document.getElementById(id);
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    var sides = {0 : 'bottom', 270 : 'right', 180 : 'top', 90 : 'left'};
    element.setAttribute('rel', sides[rotation]);

    for(i in properties) {
      element.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  };

  util.locate = function(id) {
    var element = document.getElementById(id);
    return {left : parseInt(element.style.left.replace('px', '')), 
      bottom : parseInt(element.style.bottom.replace('px', '')),
      side : element.getAttribute('rel')};
  };

  util.calculateTrajectory = function(start, end) {
    throw "Not implemented";
  };

  util.loadDictionary();

  return util;
}());

LIBDOGE.doges = (function() {
  var doges = {};

  var next_doge_id = 1;

  var doge_list = [];

  doges.create = function() {
    var doge = document.createElement('img');
    var doge_id = 'doge_' + (next_doge_id++);

    doge.setAttribute('id', doge_id);
    doge.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    doge.setAttribute('rel', 'bottom');
    doge.style.position = 'fixed';
  
    doge.style.left = '0px';
    doge.style.bottom = '0px';
    doge.style.zIndex = 999999;

    doge_list.push(doge_id);

    document.body.appendChild(doge);

    doges.run(doge_id, LIBDOGE.util.random(500,1000));
  };

  doges.suspend = function(doge_id) {
    throw "Not implemented";
  };

  /* ACTIONS */
  doges.run = function(doge_id, distance) {
    var doge = document.getElementById(doge_id);
    var location = LIBDOGE.util.locate(doge_id);

    if (location.side == 'bottom') {
      if (location.left + doge.clientWidth >= window.innerWidth) {
        LIBDOGE.util.flipElement(doge_id, 270);
      }
      else {
        doge.style.left = (location.left + 1) + 'px';  
      }      
    }
    else if (location.side == 'right') {
      if (location.bottom + doge.clientWidth >= window.innerHeight) {
        LIBDOGE.util.flipElement(doge_id, 180);
      }
      else {
        doge.style.bottom = (location.bottom + 1) + 'px';
      }
    }
    else if (location.side == 'top') {
      if (location.left <= 0) {
        LIBDOGE.util.flipElement(doge_id, 90);
      }
      else {
        doge.style.left = (location.left - 1) + 'px';
      }
    }
    else if (location.side == 'left') {
      if (location.bottom <= 0) {
        LIBDOGE.util.flipElement(doge_id, 0);
      }
      else {
        doge.style.bottom = (location.bottom - 1) + 'px';
      }
    }

    setTimeout(
      function() {
        if (--distance < 0) {
          doges.plz(doge_id);
        }
        else {
          doges.run(doge_id, distance);
        }
      }, 1);
  };

  doges.teleport = function(doge_id, is_hidden) {
    var doge = document.getElementById(doge_id);

    var sides = ['top', 'bottom', 'left', 'right'];
    var side = sides[LIBDOGE.util.random(0, sides.length-1)];
    doge.setAttribute('rel', side);

    if (is_hidden == null) {
      is_hidden = false;
    }

    if (side == 'top') {
      LIBDOGE.util.flipElement(doge_id, 180);
      var bottom = (is_hidden) ? 
        window.innerHeight : (window.innerHeight - doge.clientHeight);
      doge.style.bottom = bottom + 'px';
      doge.style.left = LIBDOGE.util.random(0, window.innerWidth - doge.clientWidth) + 'px';
    }
    else if (side == 'bottom') {
      LIBDOGE.util.flipElement(doge_id, 0);
      var bottom = (is_hidden) ? -doge.clientHeight : 0;
      doge.style.bottom = bottom + 'px';
      doge.style.left = LIBDOGE.util.random(0, window.innerWidth - doge.clientWidth) + 'px';
    }
    else if (side == 'left') {
      LIBDOGE.util.flipElement(doge_id, 90);
      doge.style.bottom = LIBDOGE.util.random(0, window.innerHeight - doge.clientWidth) + 'px';
      var left = (is_hidden) ? -doge.clientHeight : 0;
      doge.style.left = left + 'px';
    }
    else if (side == 'right') {
      LIBDOGE.util.flipElement(doge_id, 270);
      doge.style.bottom = LIBDOGE.util.random(0, window.innerHeight - doge.clientWidth) + 'px';
      var left = (is_hidden) ? window.innerWidth : (window.innerWidth - doge.clientHeight);
      doge.style.left = left + 'px';
    }
  };

  doges.ambush = function(doge_id) {
    var doge = document.getElementById(doge_id);
    var location = LIBDOGE.util.locate(doge_id);
    var doge_visible = false;

    if (location.side == 'bottom') {
      doge.style.bottom = (location.bottom + 1) + 'px';
      doge_visible = ((location.bottom + 1) == 0);
    }
    else if (location.side == 'right') {
      doge.style.left = (location.left - 1) + 'px';
      doge_visible = ((location.left - 1) == window.innerWidth - doge.clientHeight);
    }
    else if (location.side == 'top') {
      doge.style.bottom = (location.bottom - 1) + 'px';
      doge_visible = ((location.bottom - 1) == window.innerHeight - doge.clientHeight);
    }
    else if (location.side == 'left') {
      doge.style.left = (location.left + 1) + 'px';
      doge_visible = ((location.left + 1) == 0);
    }

    if (!doge_visible) {
      setTimeout(function() {doges.ambush(doge_id)}, 1);
    }
    else {
      setTimeout(function() {
        doges.plz(doge_id);
      }, LIBDOGE.util.random(0, 2500));
    }
  };

  doges.hide = function(doge_id) {
    var location = LIBDOGE.util.locate(doge_id);
    var doge = document.getElementById(doge_id);
    var doge_hidden = false;

    if (location.side == 'bottom') {
      doge.style.bottom = (location.bottom - 1) + 'px';
      doge_hidden = ((location.bottom - 1) == -doge.clientHeight);
    }
    else if (location.side == 'right') {
      doge.style.left = (location.left + 1) + 'px';
      doge_hidden = ((location.left + 1) == window.innerWidth);
    }
    else if (location.side == 'top') {
      doge.style.bottom = (location.bottom + 1) + 'px';
      doge_hidden = ((location.bottom + 1) == window.innerHeight);
    }
    else if (location.side == 'left') {
      doge.style.left = (location.left - 1) + 'px';
      doge_hidden = ((location.left - 1) == -doge.clientHeight);
    }

    if (!doge_hidden) {
      setTimeout(function() {doges.hide(doge_id)}, 1);
    }
    else {
      setTimeout(function() {
        doges.teleport(doge_id, true);
        doges.ambush(doge_id);
      }, LIBDOGE.util.random(0, 2500));
    }
  };

  doges.plz = function(doge_id) {
    var doge = document.getElementById(doge_id);
    var location = LIBDOGE.util.locate(doge_id);

    if (Math.random() < 0.5) {
      var distance = LIBDOGE.util.random(500, 1000);

      doges.run(doge_id, distance);
    }
    else {
      doges.hide(doge_id);
    }
  };

  doges.list = function() {
    return doge_list;
  };

  return doges;
}());

LIBDOGE.statements = (function() {
  var statements = {};

  var next_statement_id = 1;
  var statement_list = [];
  var max_statements = 7;

  var prefixes = LIBDOGE.util.getTextPrefixes();
  var suffixes = LIBDOGE.util.getTextSuffixes();

  var state = function() {
    var text = [];
    var selected_dictionaries = [];
    selected_dictionaries.push((Math.random() < 0.5) ? 
      LIBDOGE.util.getDictionary().content :
      LIBDOGE.util.getDictionary().meta);

    if (Math.random() < 0.4) {
      selected_dictionaries.push((Math.random() < 0.5) ? 
        LIBDOGE.util.getDictionary().content :
        LIBDOGE.util.getDictionary().meta);
    }

    text.push(prefixes[LIBDOGE.util.random(0, prefixes.length-1)]);

    var content = [];
    for(i in selected_dictionaries) {
      var word = LIBDOGE.util.random(0, selected_dictionaries[i].length-1);
      if (content.indexOf(selected_dictionaries[i][word]) == -1 ) {
        content.push(selected_dictionaries[i][word]);
      }
    }
    text.push(content.join(' '));

    if (Math.random() <= 0.33) {
      text.push(suffixes[LIBDOGE.util.random(0, suffixes.length-1)]);
    }

    return text.join(' '); 
  };

  statements.create = function() {
    if (statement_list.length >= max_statements) {
      return false;
    }

    var statement_id = 'statement_' + (next_statement_id++);
    var statement = document.createElement('div');
    statement.style.display = 'inline-block';
    statement.setAttribute('id', statement_id);
    statement.innerHTML = state();

    statement_list.push(statement_id);
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
    statement.style.bottom = LIBDOGE.util.random(heightBoundaries.bottom,
      heightBoundaries.top) + 'px';
    statement.style.left = LIBDOGE.util.random(widthBoundaries.left,
      widthBoundaries.right) + 'px';
    statement.style.zIndex = 999999;
    statement.style.opacity = 1;
    statement.style.fontSize = '2.75em';
    statement.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
    statement.style.fontFamily = 'Comic Sans MS';
    statement.style.color = 'rgb(' + 
      LIBDOGE.util.random(0, 255) + ',' +
      LIBDOGE.util.random(0, 255) + ',' + 
      LIBDOGE.util.random(0, 255) + ')';

    var fadeOutIn = LIBDOGE.util.random(100, 800);
    setTimeout(
      function() {
        LIBDOGE.util.fadeOut(statement_id, 1);
        setTimeout(function() {
          statement_list.splice(statement_list.indexOf(statement_id), 1);
        }, fadeOutIn);
      },
      fadeOutIn);
  };

  return statements;
}());


LIBDOGE.controller = (function() {
  var controller = {};

  controller.askDoge = function() {
    setInterval(
      function() {
        LIBDOGE.statements.create();
      },
      300);
  };

  controller.buyDoge = function() {
    LIBDOGE.doges.create();
    if (LIBDOGE.doges.list().length == 1) {
      controller.askDoge();
    }
  };

  return controller;
}());
