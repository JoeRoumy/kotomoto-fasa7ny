myapp.factory('offersSRV', function($http) {
  return {
    add_offer: function(offer) {
      return $http.post('/add_offer', {offer});
    },
    update_offer: function(){
        return $http.post('/update_offer');
    },
    delete_offer: function(){
        return $http.post('/delete_offer');
    }
  };
});
