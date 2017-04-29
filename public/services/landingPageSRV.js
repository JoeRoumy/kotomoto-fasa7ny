myapp.factory('landingPageSRV', function($http) {
  return {
    getStatistics: function() {
      return $http.get('/get_statistics')
    },
      getNearbyActivities: function(lat,long) {
        return $http.post('/get_nearby_activities',{'lat':lat,'long':long});
    },
      getLatest6Reviews: function() {
      return $http.get('/get_latest_6_reviews');
    },
      getTopRatedActivities: function() {
      return $http.get('/get_top_rated_activities');
    },
      getFeaturedActivities:function(){
        return $http.get('/get_featured_activities');
    },
      logout:function(){
        return $http.get('/logout');
    },
      validateSession:function(account) {
        return $http.post('/validate',{'usr':account});
      }
  };
});
