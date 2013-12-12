var dataminer = (function() {
  var m = {};

  var contentStopWords = {'a' : true, 'able' : true, 'about' : true, 'across' : true, 'after' : true, 'all' : true, 'almost' : true, 'also' : true, 'am' : true, 'among' : true, 'an' : true, 'and' : true, 'any' : true, 'are' : true, 'as' : true, 'at' : true, 'be' : true, 'because' : true, 'been' : true, 'but' : true, 'by' : true, 'can' : true, 'cannot' : true, 'could' : true, 'dear' : true, 'did' : true, 'do' : true, 'does' : true, 'either' : true, 'else' : true, 'ever' : true, 'every' : true, 'for' : true, 'from' : true, 'get' : true, 'got' : true, 'had' : true, 'has' : true, 'have' : true, 'he' : true, 'her' : true, 'hers' : true, 'him' : true, 'his' : true, 'how' : true, 'however' : true, 'i' : true, 'if' : true, 'in' : true, 'into' : true, 'is' : true, 'it' : true, 'its' : true, 'just' : true, 'least' : true, 'let' : true, 'like' : true, 'likely' : true, 'may' : true, 'me' : true, 'might' : true, 'most' : true, 'must' : true, 'my' : true, 'neither' : true, 'no' : true, 'nor' : true, 'not' : true, 'of' : true, 'off' : true, 'often' : true, 'on' : true, 'only' : true, 'or' : true, 'other' : true, 'our' : true, 'own' : true, 'rather' : true, 'said' : true, 'say' : true, 'says' : true, 'she' : true, 'should' : true, 'since' : true, 'so' : true, 'some' : true, 'than' : true, 'that' : true, 'the' : true, 'their' : true, 'them' : true, 'then' : true, 'there' : true, 'these' : true, 'they' : true, 'this' : true, 'tis' : true, 'to' : true, 'too' : true, 'twas' : true, 'us' : true, 'wants' : true, 'was' : true, 'we' : true, 'were' : true, 'what' : true, 'when' : true, 'where' : true, 'which' : true, 'while' : true, 'who' : true, 'whom' : true, 'why' : true, 'will' : true, 'with' : true, 'would' : true, 'yet' : true, 'you' : true, 'your' : true};

  var prefixes = ['wow', 'so', 'such', 'so much', 'very', 'many', 'lots', 
    'most', 'beautiful', 'all the', 'the', 'very much', 'pretty', 'lol'];

  var suffixes = ['wow', 'plz', 'lol'];
  var presetWords = ['doge'];

  var dictionary = {meta : null, contetn: null};

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

  dictionary = {
    'meta' : readMeta(),
    'content' : readContent()
  };

  m.getSentence = function() {
    var text = [];
    var selected_dictionaries = [];
    selected_dictionaries.push((Math.random() < 0.5) ? 
      dictionary.content :
      dictionary.meta);

    if (Math.random() < 0.4) {
      selected_dictionaries.push((Math.random() < 0.5) ? 
        dictionary.content :
        dictionary.meta);
    }

    text.push(prefixes[util.random(0, prefixes.length-1)]);

    var content = [];
    for(i in selected_dictionaries) {
      var word = util.random(0, selected_dictionaries[i].length-1);
      if (content.indexOf(selected_dictionaries[i][word]) == -1 ) {
        content.push(selected_dictionaries[i][word]);
      }
    }
    text.push(content.join(' '));

    if (Math.random() <= 0.33) {
      text.push(suffixes[util.random(0, suffixes.length-1)]);
    }

    return text.join(' '); 
  };

  return m;
}());