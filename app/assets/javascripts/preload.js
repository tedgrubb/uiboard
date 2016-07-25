window.preloadedImages = new Array();

$.fn.preload = function() {
  self = this;

  var i = window.preloadedImages.length;
          window.preloadedImages[i] = new Image();
          window.preloadedImages[i].onload = function() {
            self.css({'background-image': 'url(' + self.data('src') + ')', 'opacity': '1'});
          }
          window.preloadedImages[i].src = self.data('src');
};