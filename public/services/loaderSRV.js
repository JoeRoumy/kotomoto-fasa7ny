myapp.factory('loaderSRV', function($http) {
  return {
    start: function() {
      $('#preloader').css({'display': ''});
      $('#status').css({'display': ''});
    },
    end: function() {
      $('#preloader').css({'display': 'none'});
      $('#status').css({'display': 'none'});
    },
  };
});
