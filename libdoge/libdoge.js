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

  var bark = function(text) {
    return text.replace(/[\-!^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, ' ');
  }

  doge.digest = function(words) {
    var digested = words.filter(function(value, index, self) {
      if (value.length < 2) {
        return false;
      }

      if (value in stopWords) {
        return false;
      }

      if (self.indexOf(value) !== index) {
        return false;
      }

      if (prefixes.indexOf(value) != -1) {
        return false;
      }

      if (suffixes.indexOf(value) != -1) {
        return false;
      }

      if (parseInt(value).toString() == value) {
        return false;
      }

      return true;
    });

    return digested;
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

    words = bark(strings.join(' ').toLowerCase())
      .split(/[\s\/]+/g).sort();

    if (textPresets != null) {
      words = words.concat(textPresets);
    }

    return doge.digest(words);
  };

  doge.tearContent = function() {
    var words = bark(document.body.innerText.toLowerCase().trim())
      .split(/[\s\/]+/g).sort();

      return doge.digest(words);
  };


  doge.say = function() {
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
    element.innerHTML = doge.say();

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
    staring_doge.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    staring_doge.style.position = 'fixed';
    staring_doge.style.left = '0px';
    staring_doge.style.bottom = '0px';
    staring_doge.style.zIndex = 999999;

    doge_staring = true;

    document.body.appendChild(staring_doge);
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

  return doge;
}());

setInterval(function() {
  LIBDOGE.moar();
}, 1500);
