myapp.factory('activitiesSRV', function($http) {
  return {
    search: function(searchInput,day) {
      return $http.get('/search_for_activities/'+searchInput+'/'+day+'/');
    },
    explore: function(searchInput,day) {
      return $http.get('/search_for_activities/'+'_' +'/'+'_'+'/');
    },

    filter: function(filter,value){
      return $http.get('/get_filtered_activities/'+filter+'/'+value+'/')
    }

  };
});
