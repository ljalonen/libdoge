LIBDOGE = (function() {
  var doge = {};

  var id = 1;
  var prefixes = ['wow', 'so', 'such', 'so much', 'very', 'many', 'lots', 
    'most'];
  var suffixes = ['wow', 'plz', 'lol'];
  var texts = ['doge'];

  var meta_words = null;
  var content_words = null;

  var doge_staring = false;

  var divs = [];

  var parseWordsFromString = function(text) {
    var words = {};

    var all_words = text.replace(new RegExp('[-!^&*()_+|~={}:";\'<>?,.\/]', 'g'), ' ')
      .toLowerCase().split(' ');

    for (i in all_words) {
      if (all_words[i].length>=4) {

        if (prefixes.indexOf(all_words[i]) != -1 || 
          suffixes.indexOf(all_words[i]) != -1) {
          continue;
        }

        if (words[all_words[i]] == null) {
          words[all_words[i]] = 1;
        }
        else words[all_words[i]]++;
      }
    }

    return words;
  }

  var extractMeta = function(presetWords) {
    var meta_content = [];
    if (presetWords != null) meta_content.push(presetWords.join(' '));

    meta_content.push(document.title);

    var metadata = document.getElementsByTagName('meta');
    for (i in metadata) {
      if (metadata[i].name == "keywords" || 
        metadata[i].name == "description" || 
        metadata[i].name == "author") {
        meta_content.push(metadata[i].content);
      }
    }

    return parseWordsFromString(meta_content.join(' '));
  }

  var extractContent = function() {
    var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'div'];
    var content = [];
    for (i in tags) {
      var elements = document.getElementsByTagName(tags[i]);
      for(j in elements) {
        content.push(elements[j].textContent);
      }
    }

   return parseWordsFromString(content.join(' '));
  }

  doge.say = function() {
    var text = [];
    text.push(prefixes[Math.floor(Math.random()*prefixes.length)]);

    var selected_words = (Math.random() < 0.33) ? content_words : meta_words;

    text.push(selected_words[Math.floor(Math.random()*selected_words.length)]);

    if (Math.random() <= 0.33) {
      text.push(suffixes[Math.floor(Math.random()*suffixes.length)]);
    }

    return text.join(' '); 
  }

  doge.come = function(id) {
    var element = document.createElement('div');
    element.style.cssText = 'opacity: 0; position: fixed; font-size: 3em; ' +
      'text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; ' +
      'font-family: "Comic Sans MS";';

    element.innerHTML = doge.say();
    element.setAttribute('id',id);
    document.body.appendChild(element);

    element.style.display = 'block';
    element.style.opacity = 1;
    element.style.zIndex = 999999;
    element.style.top = 
      Math.floor((Math.random() * window.innerHeight * 0.9)) + 'px';
    element.style.left = 
      Math.floor((Math.random() * window.innerWidth * 0.9)) + 'px';
    element.style.color = 'rgb(' + Math.floor(Math.random()*255) + ',' + 
      Math.floor(Math.random()*255) + ',' + 
      Math.floor(Math.random()*255) + ')';
    
    setTimeout(function() { doge.go(id,1); },Math.floor(Math.random()*500));
  }

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
  }

  doge.stare = function() {
    var staring_doge = document.createElement('img');
    staring_doge.setAttribute(
      'src', 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png');
    staring_doge.zIndex = 999999;
    staring_doge.style.left = 0;
    staring_doge.style.bottom = 0;
    staring_doge.style.position = 'fixed';
    doge_staring = true;

    document.body.appendChild(staring_doge);
  }

  doge.moar = function() {
    if (meta_words == null) {
      meta_words = Object.keys(extractMeta(texts));
    }

    if (content_words == null) {
      content_words = Object.keys(extractContent());
    }

    if (!doge_staring) {
      doge.stare();
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
  }

  return doge;
}());

setInterval(function() {
  LIBDOGE.moar();
}, 1500);
