myapp.factory('chatSRV', function($http) {
  return {
    search: function() {
      return $http.get('/view_all_chats');
    }
  };
});