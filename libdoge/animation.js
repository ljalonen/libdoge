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

  return a;
})();