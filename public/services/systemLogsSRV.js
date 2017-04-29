myapp.factory('systemLogsSRV', function($http) {
  return{
    deleteLog:function(){
      return $http.get('/delete_logs')
    },
  viewLogs:function(){
    return $http.get('/view_system_logs/');

  }
};

});
