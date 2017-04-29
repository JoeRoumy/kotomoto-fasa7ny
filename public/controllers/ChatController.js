myapp.controller('ChatController', function($scope,$stateParams,$state,chatSRV,loaderSRV) {

      chatSRV.search()
      .success(function(data){
        $scope.chats=data;
        
      })


       $scope.openChat= function(messageId){
    $state.go("message", {messageId:messageId});
  }

});