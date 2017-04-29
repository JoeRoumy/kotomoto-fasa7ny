myapp.controller('systemLogsController', function($scope,systemLogsSRV,$state){
  systemLogsSRV.viewLogs().success(function(data){
    $scope.logs=data.log;
    console.log($scope.logs);
  })



$scope.deleteLog = function() {
  systemLogsSRV.deleteLog().success(function(){
      console.log("Deletion is successfull");
      $state.go('admin');
      toastr.success('All logs are deleted successfully');
    })
}

});
