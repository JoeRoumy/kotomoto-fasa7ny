myapp.controller('contactPlatformController', function($scope,contactPlatformSRV, $state) {
   $scope.contactPlatform=function(message){
     contactPlatformSRV.contactPlatform(message).success(function(){
       //if(message==undefined || message==''  )
         //message='_'
       console.log("message");
       $state.go("userPage");
       toastr.success('Message successfully saved');

   })
 }
});
