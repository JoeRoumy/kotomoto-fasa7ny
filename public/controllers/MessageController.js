myapp.controller('MessageController', function($scope,$stateParams,$state,messageSRV,loaderSRV) {
//loaderSRV.start();
     if($stateParams.messageId != undefined){
      messageSRV.getMessages($stateParams.messageId)
      .success(function(data){
        $scope.messages=data;
        $scope.contents=data.chat.message;
        $scope.sender=data.sender;
               // loaderSRV.end();

           })
     }
  

});