myapp.controller('complainsController', function($scope,$state,complainsSRV) {
  complainsSRV.viewComplains().success(function(data){
    $scope.complains= data;
  });


 $scope.delete= function(i){
    var id= $scope.complains[i]._id;
    complainsSRV.deletecomplain(id).success(function(){
      $state.reload();
      toastr.success('Complaint deleted succesfully');

    })
  };



   $scope.isSeen= function(i){
    var id= $scope.complains[i]._id;
    complainsSRV.ChangeIsSeen(id).success(function(){
      toastr.success('Complaint openned');
      $state.reload();
    })
  };

  $scope.banForever = function(i) {
    complainsSRV.banForever($scope.complains[i]._id,$scope.complains[i].isUserToProvider,($scope.complains[i].isUserToProvider)? $scope.complains[i].serviceProviderId:$scope.complains[i].userId).success(function(data){
      if (data!='ban successful') {
        toastr.success(data);
      }
      else {
        toastr.success('Banned forever succesfully');
        $scope.delete(i);
      }
    })
  };

  $scope.ban30 = function(i) {
    complainsSRV.ban30($scope.complains[i]._id,$scope.complains[i].isUserToProvider,($scope.complains[i].isUserToProvider)? $scope.complains[i].serviceProviderId:$scope.complains[i].userId).success(function(data){
      if (data!='ban successful') {
        toastr.success(data);
      }
      else {
        toastr.success('Banned 30 days succesfully');
        $scope.delete(i);
      }
    })
  };

});
