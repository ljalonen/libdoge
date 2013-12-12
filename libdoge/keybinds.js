var keybinds = function(e) {
  switch(e.which) {
    case 43:
      controller.buyDoge();
      break;
    case 45:
      controller.sellDoge();
      break;
    default:
      break;
  }
}

document.onkeypress = keybinds;
