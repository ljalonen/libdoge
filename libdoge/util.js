var util = (function() {
  var u = {};

  u.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  u.locate = function(id) {
    var element = document.getElementById(id);
    return {left : parseInt(element.style.left.replace('px', '')),
      bottom : parseInt(element.style.bottom.replace('px', '')),
      side : element.getAttribute('rel')};
  };

  u.flipElement = function(figure, rotation) {
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    var sides = {0 : 'bottom', 270 : 'right', 180 : 'top', 90 : 'left'};
    figure.setAttribute('rel', sides[rotation]);

    for(i in properties) {
      figure.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  };

  return u;
})();