myapp.controller('recoverPasswordController', function($scope, recoverPasswordSRV, $state){
  $scope.recover=function(userName){
    if(userName==undefined){
        toastr.warning('No username is entered');
    }
    else{
      toastr.info('Please wait while sending');
      recoverPasswordSRV.recover(userName).success(function(data){
        $state.go("home");
        if(data.user=='null')
        toastr.warning('Incorrect username!');
        else {
          if(data.ok)
          toastr.success('An e-mail was sent with your new password :)');
          else
          toastr.error(data);
        }

      })
    }
  }
})
