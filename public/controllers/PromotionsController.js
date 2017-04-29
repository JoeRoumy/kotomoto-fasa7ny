myapp.controller('PromotionsController', function($scope,promotionsSRV) {
    //getting latest reviews

      promotionsSRV.getBDClients().success(function(data){
        $scope.clients=data;
        $scope.clientNames=data.firstname;
        $scope.profilepic=data.profilePicture;

      })



});
