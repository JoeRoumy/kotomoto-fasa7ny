myapp.controller('contactPlatformController', function($scope,contactPlatformSRV, $state) {
   $scope.contactPlatform=function(message){

     if(message==undefined){
       contactPlatformSRV.contactPlatform(message).success(function(){
         $state.go("contactPlatform");
         toastr.warning('No message was entered :(');

     })
     }
     else{
       contactPlatformSRV.contactPlatform(message).success(function(){
         console.log("message");
         $state.go("userPage");
         toastr.success('Message successfully saved');

     })
     }

 }
});
