myapp.controller('changePasswordController',function($scope, changePasswordSRV, $state){
  $scope.changePassword=function(oldPassword,newPassword,confirmPassword){
    toastr.info('Please wait while changing password..');
        changePasswordSRV.changepassword(oldPassword,newPassword,confirmPassword).success(function(data){
          console.log("entered");
          if(data.ok=='bad pass')
          toastr.warning('Wrong password!');
          else
          if(data.ok=='ok'){
          $state.go("userPage");
          toastr.success('Password is successfully changed!');
          }
          else{
            toastr.error(data);

          }
        })

  }
});
