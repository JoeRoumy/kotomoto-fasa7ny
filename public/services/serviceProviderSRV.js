myapp.factory('serviceProviderSRV',function ($http) {
  return{
    submitComplain:function(complain) {
      return $http.post('/complain',{'complain': complain});
    },

    
    viewServiceProvider:function(serviceProviderId){
      return $http.post('/view_service_provider',{'providerId':serviceProviderId})
    }

  }
});
