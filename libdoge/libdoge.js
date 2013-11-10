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

  var divs = [];

  doge.chew = function(text) {
    return text.replace(/[\-!^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, ' ');
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
      if (words[i].length < 2 || words[i].length > 20) {
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

    var metadata = document.getElementsByTagName('meta');
    for (i in metadata) {
      if (metadata[i].name == "keywords" || 
        metadata[i].name == "description" || 
        metadata[i].name == "author") {
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
    var content;
    if(document.all){
      content = document.body.innerText;
    } else{
      content = document.body.textContent;
    }

    var words = doge.chew(unescape(content.toLowerCase().trim()))
      .split(/[\s\/]+/g);

    return doge.digest(words);
  };


  doge.bark = function() {
    var text = [];
    text.push(prefixes[Math.floor(Math.random()*prefixes.length)]);

    var selected_words = (Math.random() < 0.33) ? content_words : meta_words;

    text.push(selected_words[Math.floor(Math.random()*selected_words.length)]);

    if (Math.random() <= 0.33) {
      text.push(suffixes[Math.floor(Math.random()*suffixes.length)]);
    }

    return text.join(' '); 
  };

  doge.come = function(id) {
    var element = document.createElement('div');
    element.setAttribute('id',id);
    element.innerHTML = doge.bark();

    element.style.position = 'fixed';
    element.style.top = 
      Math.floor((Math.random() * window.innerHeight * 0.9)) + 'px';
    element.style.left = 
      Math.floor((Math.random() * window.innerWidth * 0.9)) + 'px';
    element.style.display = 'block';
    element.style.zIndex = 999999;
    element.style.opacity = 1;
    element.style.fontSize = '3em';
    element.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
    element.style.fontFamily = 'Comic Sans MS';
    element.style.color = 'rgb(' + Math.floor(Math.random()*255) + ',' + 
      Math.floor(Math.random()*255) + ',' + 
      Math.floor(Math.random()*255) + ')';

    document.body.appendChild(element);
    
    setTimeout(function() { doge.go(id,1); },Math.floor(Math.random()*750));
  };

  doge.go = function(id, k) {
    var element = document.getElementById(id);
    element.style.opacity = k;
    if (k > 0) {
      setTimeout(function() { doge.go(id,k-0.1); },100);
    }
    else {
      if (divs.indexOf(id) != -1) {
        divs.splice(divs.indexOf(id), 1);  
      }

      element.parentElement.removeChild(element);
    }
  };

  doge.stare = function() {
    var staring_doge = document.createElement('img');
    staring_doge.setAttribute('id', 'thedoge');
    staring_doge.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    staring_doge.style.position = 'fixed';
    staring_doge.style.left = '0px';
    staring_doge.style.bottom = '0px';
    staring_doge.style.zIndex = 999999;

    doge_staring = true;

    document.body.appendChild(staring_doge);

    doge.run();
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

    while(divs.length < 7) {
      var div_id = 'doge_' + id;
      divs.push(div_id);

      id++;

      setTimeout(
        (function(div_id) {
          return function() {
            doge.come(div_id);
          }
        })(div_id), 
        Math.floor(Math.random()*2500));
    }
  };

  doge.puke = function() {
    return {meta_words : meta_words, content_words : content_words};
  };

  doge.flip = function(doge, rotation) {
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    for(i in properties) {
      doge.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  }

  doge.run = function(direction) {
    if (direction == null) direction = 'right';

    var element = document.getElementById('thedoge');
    var posLeft = parseInt(element.style.left.replace('px',''));
    var posBottom = parseInt(element.style.bottom.replace('px',''));

    if (direction == 'right') {
      if (posLeft + element.clientWidth >= window.innerWidth) {
        doge.flip(element, 270);
        doge.run('up');
        return;
      }

      element.style.left = (++posLeft) + 'px';
    }
    else if (direction == 'up') {
      if (posBottom + element.clientWidth >= window.innerHeight) {
        doge.flip(element, 180);
        doge.run('left');
        return;
      }

      element.style.bottom = (++posBottom) + 'px';
    }
    else if (direction == 'left') {
      if (posLeft <= 0) {
        doge.flip(element, 90);
        doge.run('down');
        return;
      }

      element.style.left = (--posLeft) + 'px';
    }
    else if (direction == 'down') {
      if (posBottom <= 0) {
        doge.flip(element, 0);
        doge.run('right');
        return;
      }

      element.style.bottom = (--posBottom) + 'px';
    }

    setTimeout(
      function() {
        doge.run(direction);
      },1);

  }

  return doge;
}());

setInterval(function() {
  LIBDOGE.moar();
}, 1500);
