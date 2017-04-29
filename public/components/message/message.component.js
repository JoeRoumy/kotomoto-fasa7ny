angular.module('myapp').
component('message',{
  templateUrl:'components/message/message.template.html',
  controller: function MessageController($scope,$state){
      $scope.openChat = function(messageId){
        $state.go("message",{messageId:messageId})
      }
  },
   bindings: {
     data: '='
   }
})
