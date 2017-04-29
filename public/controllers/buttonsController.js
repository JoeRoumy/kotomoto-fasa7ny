myapp.controller('buttonsController', function($scope,ButtonsSRV) {
    //getting latest reviews

      $scope.applyGoldenSp= function(){
        console.log("2y neela")
        ButtonsSRV.applyGoldenSp().success(function(data){
      console.log(data);
    })
  },

$scope.viewAnalytics = function(){
   ButtonsSRV.getAnalysis().success(function(data){
      console.log(data);
        $scope.topActivity=data.topActivity;
        $scope.topSP=data.topSP;
        $scope.topU=data.topU;
        $scope.dates=data.dates;










    })
}






});
