angular.module('myapp').
component('chats',{
  templateUrl:'components/chats/chats.template.html',
  controller: function chatController($scope,$state){
      $scope.openChat = function(messageID){
        $state.go("message",{messageID:messageID})
      }
  },
   bindings: {
     data: '='
   }
})
