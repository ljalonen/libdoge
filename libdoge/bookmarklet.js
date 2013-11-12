if (typeof LIBDOGE == 'undefined') {
  var libdoge = document.createElement("script");
  libdoge.setAttribute("src",
    "https://github.com/ljalonen/libdoge/libdoge/libdoge-min.js");
  libdoge.onload = function() {
    LIBDOGE.controller.buyDoge();
  }

  document.body.appendChild(libdoge);
}
else {
  LIBDOGE.controller.buyDoge();
}
