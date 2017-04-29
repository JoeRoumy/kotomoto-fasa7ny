myapp.factory('compareSRV', function($http) {
  return {
    getFirstList: function() {
      return $http.get('/comparison')
    },

      compareActivities: function(selectedActivities,selectedActivities2) {
      return $http.get('/compare_activities/'+selectedActivities+'/'+selectedActivities2+'/')
    },

      compareServiceProvider: function(selectedServiceProvider,selectedServiceProvider2) {
      return $http.get('/compare_serviceProviders/'+selectedServiceProvider+'/'+selectedServiceProvider2+'/')
    }

  };
});