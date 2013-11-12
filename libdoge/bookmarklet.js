if (typeof LIBDOGE == 'undefined') {
  var libdoge = document.createElement("script");
  libdoge.setAttribute("src",
    "https://raw.github.com/ljalonen/libdoge/master/libdoge/libdoge-min.js");
  libdoge.onload = function() {
    LIBDOGE.controller.buyDoge();
  }

  document.body.appendChild(libdoge);
}
else {
  LIBDOGE.controller.buyDoge();
}
