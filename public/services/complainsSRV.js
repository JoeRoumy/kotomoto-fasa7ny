myapp.factory('complainsSRV', function($http) {
  return {
    viewComplains: function() {
      return $http.get('/view_complains');
    },
    deletecomplain:function(id){
      return $http.post('/remove_complain',{complainId:id});
    },
    ChangeIsSeen:function(id){
      return $http.post('/update_isSeen',{complainId:id});
    },
    banForever:function (id,isUserToProvider,banned) {
      if(isUserToProvider)
      return $http.post('/ban_forever', {'complainId':id,'isUserToProvider':isUserToProvider, 'serviceProviderId':banned});
      else
      return $http.post('/ban_forever', {'complainId':id,'isUserToProvider':isUserToProvider, 'userId':banned});
    },
    ban30:function (id,isUserToProvider,banned) {
      if(isUserToProvider)
      return $http.post('/ban_30_days', {'complainId':id,'isUserToProvider':isUserToProvider, 'serviceProviderId':banned});
      else
      return $http.post('/ban_30_days', {'complainId':id,'isUserToProvider':isUserToProvider, 'userId':banned});    }
  };
});
