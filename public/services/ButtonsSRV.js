myapp.factory('ButtonsSRV', function($http) {
  return {
    applyGoldenSp: function() {
      return $http.get('/apply_to_golden')
    },

    getAnalysis: function() {
      return $http.get('/get_analysis')
    }


  };
});
