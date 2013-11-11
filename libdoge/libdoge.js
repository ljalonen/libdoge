LIBDOGE = (function() {
  var doge = {};

  var id = 1;
  var prefixes = ['wow', 'so', 'such', 'so much', 'very', 'many', 'lots', 
    'most', 'beautiful', 'all the', 'the', 'very much', 'pretty', 'lol'];

  var suffixes = ['wow', 'plz', 'lol'];
  var texts = ['doge'];

  var stopWords = {'a' : true, 'able' : true, 'about' : true, 'across' : true, 'after' : true, 'all' : true, 'almost' : true, 'also' : true, 'am' : true, 'among' : true, 'an' : true, 'and' : true, 'any' : true, 'are' : true, 'as' : true, 'at' : true, 'be' : true, 'because' : true, 'been' : true, 'but' : true, 'by' : true, 'can' : true, 'cannot' : true, 'could' : true, 'dear' : true, 'did' : true, 'do' : true, 'does' : true, 'either' : true, 'else' : true, 'ever' : true, 'every' : true, 'for' : true, 'from' : true, 'get' : true, 'got' : true, 'had' : true, 'has' : true, 'have' : true, 'he' : true, 'her' : true, 'hers' : true, 'him' : true, 'his' : true, 'how' : true, 'however' : true, 'i' : true, 'if' : true, 'in' : true, 'into' : true, 'is' : true, 'it' : true, 'its' : true, 'just' : true, 'least' : true, 'let' : true, 'like' : true, 'likely' : true, 'may' : true, 'me' : true, 'might' : true, 'most' : true, 'must' : true, 'my' : true, 'neither' : true, 'no' : true, 'nor' : true, 'not' : true, 'of' : true, 'off' : true, 'often' : true, 'on' : true, 'only' : true, 'or' : true, 'other' : true, 'our' : true, 'own' : true, 'rather' : true, 'said' : true, 'say' : true, 'says' : true, 'she' : true, 'should' : true, 'since' : true, 'so' : true, 'some' : true, 'than' : true, 'that' : true, 'the' : true, 'their' : true, 'them' : true, 'then' : true, 'there' : true, 'these' : true, 'they' : true, 'this' : true, 'tis' : true, 'to' : true, 'too' : true, 'twas' : true, 'us' : true, 'wants' : true, 'was' : true, 'we' : true, 'were' : true, 'what' : true, 'when' : true, 'where' : true, 'which' : true, 'while' : true, 'who' : true, 'whom' : true, 'why' : true, 'will' : true, 'with' : true, 'would' : true, 'yet' : true, 'you' : true, 'your' : true};

  var meta_words = null;
  var content_words = null;

  var doge_staring = false;

  var doge_says = [];

  doge.wagTail = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  doge.chew = function(text) {
    return text.replace(/\W/g, ' ');
  };

  doge.digest = function(words) {
    var selected_words = {};

    var stopList = stopWords;
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

  doge.tearMeta = function(textPresets) {
    var words;
    var strings = [];
    strings.push(document.title.trim());

    var treats = ['keywords','description','author'];
    var metadata = document.getElementsByTagName('meta');

    for (i in metadata) {
      if (treats.indexOf(metadata[i].name) != -1 && 
        typeof metadata[i].content != 'undefined') {
        strings.push(metadata[i].content.trim());
      }
    }

    words = doge.chew(unescape(strings.join(' ').toLowerCase()))
      .split(/[\s\/]+/g);

    if (textPresets != null) {
      words = words.concat(textPresets);
    }

    return doge.digest(words);
  };

  doge.tearContent = function() {
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

    var words = doge.chew(unescape(content.textContent.toLowerCase().trim()))
      .split(/[\s\/]+/g);

    return doge.digest(words);
  };

  doge.bark = function() {
    var text = [];
    var selected_words = [];
    selected_words.push((Math.random() < 0.5) ? content_words : meta_words);

    if (Math.random() < 0.4) {
      selected_words.push((Math.random() < 0.5) ? content_words : meta_words);
    }

    text.push(prefixes[doge.wagTail(0, prefixes.length-1)]);

    var beef = [];
    for(i in selected_words) {
      var seed = doge.wagTail(0, selected_words[i].length-1);
      if (beef.indexOf(selected_words[i][seed]) == -1 ) {
        beef.push(selected_words[i][seed]);
      }
    }
    text.push(beef.join(' '));

    if (Math.random() <= 0.33) {
      text.push(suffixes[doge.wagTail(0, suffixes.length-1)]);
    }

    return text.join(' '); 
  };

  doge.come = function(id) {
    var statement = document.createElement('div');
    statement.style.display = 'inline-block';
    statement.setAttribute('id', id);
    statement.innerHTML = doge.bark();
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
    statement.style.bottom = doge.wagTail(heightBoundaries.bottom,
      heightBoundaries.top) + 'px';
    statement.style.left = doge.wagTail(widthBoundaries.left,
      widthBoundaries.right) + 'px';
    statement.style.zIndex = 999999;
    statement.style.opacity = 1;
    statement.style.fontSize = '2.75em';
    statement.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
    statement.style.fontFamily = 'Comic Sans MS';
    statement.style.color = 'rgb(' + doge.wagTail(0, 255) + ',' +
      doge.wagTail(0, 255) + ',' + 
      doge.wagTail(0, 255) + ')';

    setTimeout(function() {doge.go(id,1);}, doge.wagTail(100, 800));
  };

  doge.go = function(id, k) {
    var element = document.getElementById(id);
    element.style.opacity = k;
    if (k > 0) {
      setTimeout(function() { doge.go(id,k-0.1); },100);
    }
    else {
      if (doge_says.indexOf(id) != -1) {
        doge_says.splice(doge_says.indexOf(id), 1);  
      }

      element.parentElement.removeChild(element);
    }
  };

  doge.stare = function() {
    var staring_doge = document.createElement('img');
    staring_doge.setAttribute('id', 'thedoge');
    staring_doge.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    staring_doge.setAttribute('rel', 'bottom');
    staring_doge.style.position = 'fixed';
    staring_doge.style.left = '0px';
    staring_doge.style.bottom = '0px';
    staring_doge.style.zIndex = 999999;

    doge_staring = true;

    document.body.appendChild(staring_doge);

    doge.run(document.getElementById('thedoge'), doge.wagTail(500,1000));
  };

  doge.moar = function() {
    if (!doge_staring) {
      doge.stare();
    }

    if (meta_words == null) {
      meta_words = doge.tearMeta(texts);
    }

    if (content_words == null) {
      content_words = doge.tearContent();
    }

    while(doge_says.length < 7) {
      var say_id = 'doge_says_' + id;
      doge_says.push(say_id);

      id++;

      setTimeout(
        (function(say_id) {
          return function() {
            doge.come(say_id);
          }
        })(say_id), 
        doge.wagTail(0, 2500));
    }
  };

  doge.puke = function() {
    return {meta_words : meta_words, content_words : content_words};
  };

  doge.flip = function(thisdoge, rotation) {
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    var sides = {0 : 'bottom', 270 : 'right', 180 : 'top', 90 : 'left'};
    thisdoge.setAttribute('rel', sides[rotation]);

    for(i in properties) {
      thisdoge.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  };

  var locate = function(thisdoge) {
    return {left : parseInt(thisdoge.style.left.replace('px', '')), 
      bottom : parseInt(thisdoge.style.bottom.replace('px', '')),
      side : thisdoge.getAttribute('rel')};
  };

  doge.teleport = function(thisdoge, is_hidden) {
    var sides = ['top', 'bottom', 'left', 'right'];
    var side = sides[doge.wagTail(0, sides.length-1)];
    thisdoge.setAttribute('rel', side);

    if (is_hidden == null) {
      is_hidden = false;
    }

    if (side == 'top') {
      doge.flip(thisdoge, 180);
      var bottom = (is_hidden) ? 
        window.innerHeight : (window.innerHeight - thisdoge.clientHeight);
      thisdoge.style.bottom = bottom + 'px';
      thisdoge.style.left = doge.wagTail(0, window.innerWidth - thisdoge.clientWidth) + 'px';
    }
    else if (side == 'bottom') {
      doge.flip(thisdoge, 0);
      var bottom = (is_hidden) ? -thisdoge.clientHeight : 0;
      thisdoge.style.bottom = bottom + 'px';
      thisdoge.style.left = doge.wagTail(0, window.innerWidth - thisdoge.clientWidth) + 'px';
    }
    else if (side == 'left') {
      doge.flip(thisdoge, 90);
      thisdoge.style.bottom = doge.wagTail(0, window.innerHeight - thisdoge.clientWidth) + 'px';
      var left = (is_hidden) ? -thisdoge.clientHeight : 0;
      thisdoge.style.left = left + 'px';
    }
    else if (side == 'right') {
      doge.flip(thisdoge, 270);
      thisdoge.style.bottom = doge.wagTail(0, window.innerHeight - thisdoge.clientWidth) + 'px';
      var left = (is_hidden) ? window.innerWidth : (window.innerWidth - thisdoge.clientHeight);
      thisdoge.style.left = left + 'px';
    }
  };

  doge.hide = function(thisdoge) {
    var location = locate(thisdoge);
    var doge_hidden = false;

    if (location.side == 'bottom') {
      thisdoge.style.bottom = (location.bottom - 1) + 'px';
      doge_hidden = ((location.bottom - 1) == -thisdoge.clientHeight);
    }
    else if (location.side == 'right') {
      thisdoge.style.left = (location.left + 1) + 'px';
      doge_hidden = ((location.left + 1) == window.innerWidth);
    }
    else if (location.side == 'top') {
      thisdoge.style.bottom = (location.bottom + 1) + 'px';
      doge_hidden = ((location.bottom + 1) == window.innerHeight);
    }
    else if (location.side == 'left') {
      thisdoge.style.left = (location.left - 1) + 'px';
      doge_hidden = ((location.left - 1) == -thisdoge.clientHeight);
    }

    if (!doge_hidden) {
      setTimeout(function() {doge.hide(thisdoge)}, 1);
    }
    else {
      setTimeout(function() {
        doge.teleport(thisdoge, true);
        doge.ambush(thisdoge);
      }, doge.wagTail(0, 2500));
    }
  };

  doge.ambush = function(thisdoge) {
    var location = locate(thisdoge);
    var doge_visible = false;

    if (location.side == 'bottom') {
      thisdoge.style.bottom = (location.bottom + 1) + 'px';
      doge_visible = ((location.bottom + 1) == 0);
    }
    else if (location.side == 'right') {
      thisdoge.style.left = (location.left - 1) + 'px';
      doge_visible = ((location.left - 1) == window.innerWidth - thisdoge.clientHeight);
    }
    else if (location.side == 'top') {
      thisdoge.style.bottom = (location.bottom - 1) + 'px';
      doge_visible = ((location.bottom - 1) == window.innerHeight - thisdoge.clientHeight);
    }
    else if (location.side == 'left') {
      thisdoge.style.left = (location.left + 1) + 'px';
      doge_visible = ((location.left + 1) == 0);
    }

    if (!doge_visible) {
      setTimeout(function() {doge.ambush(thisdoge)}, 1);
    }
    else {
      setTimeout(function() {
        doge.plz(thisdoge);
      }, doge.wagTail(0, 2500));
    }
  };

  doge.plz = function(thisdoge) {
    var location = locate(thisdoge);

    if (Math.random() < 0.5) {
      var distance = doge.wagTail(500, 1000);

      doge.run(thisdoge, distance);
    }
    else {
      doge.hide(thisdoge);
    }
  };

  doge.run = function(thisdoge, distance) {
    var location = locate(thisdoge);

    if (location.side == 'bottom') {
      if (location.left + thisdoge.clientWidth >= window.innerWidth) {
        doge.flip(thisdoge, 270);
      }
      else {
        thisdoge.style.left = (location.left + 1) + 'px';  
      }      
    }
    else if (location.side == 'right') {
      if (location.bottom + thisdoge.clientWidth >= window.innerHeight) {
        doge.flip(thisdoge, 180);
      }
      else {
        thisdoge.style.bottom = (location.bottom + 1) + 'px';
      }
    }
    else if (location.side == 'top') {
      if (location.left <= 0) {
        doge.flip(thisdoge, 90);
      }
      else {
        thisdoge.style.left = (location.left - 1) + 'px';
      }
    }
    else if (location.side == 'left') {
      if (location.bottom <= 0) {
        doge.flip(thisdoge, 0);
      }
      else {
        thisdoge.style.bottom = (location.bottom - 1) + 'px';
      }
    }

    setTimeout(
      function() {
        if (--distance < 0) {
          doge.plz(thisdoge);
        }
        else {
          doge.run(thisdoge, distance);
        }
      }, 1);

  };

  return doge;
}());
