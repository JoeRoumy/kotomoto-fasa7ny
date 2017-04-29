myapp.controller('AdminViewSpRequestsController', function($scope,adminSRV,$window) {
  adminSRV.viewServiceProviderRequests().success(function(data){
    $scope.reviewEditable= new Array(data.length).fill(false);
    $scope.requests= data;
  });

  $scope.accept= function(i){
    var id= $scope.requests[i]._id;
    adminSRV.acceptServiceProviderRequests(id).then(function(){
      toastr.success('service provider request accepted');
      $window.location.reload();
    })
  }

  $scope.refuse= function(i){
    var id= $scope.requests[i]._id;
    adminSRV.rejectServiceProviderRequests(id).then(function(){
      toastr.success('service provider request rejjected');
      $window.location.reload();
    })
  }

});
