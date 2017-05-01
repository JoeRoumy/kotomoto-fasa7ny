myapp.controller('logInController', function($window,$scope,logInSRV, $state,$uibModal){
  //$scope.logIn not used now
  $scope.logIn = function () {
    logInSRV.login($scope.u, $scope.p).success(function(data){
      if(!data.userAccount){
        console.log('Not logged in :((  look at logincontroller');
      }
      else {
        $window.localStorage['userAccount'] = angular.toJson(data.userAccount);
      if(data.type==0){
        $state.go("userPage");
        $window.localStorage['userProfile'] = angular.toJson(data.userProfile);
      }
      if(data.type==1){
        $state.go("spPage");
        $window.localStorage['spProfile'] = angular.toJson(data.spProfile);
      }
      if(data.type==3){
        $state.go("admin");
        $window.localStorage['adminProfile'] = angular.toJson(data.adminProfile);
      }
    }
    });
  }

  $scope.loginModal = function(){
    $uibModal.open({
      templateUrl: 'loginModal.html',
      controller: 'loginModalController'
    })
    .result.then(
      function () {
      //  alert("OK");
      },
      function () {
      //  alert("Cancel");
      }
    );
  }

})

.controller("loginModalController", function ($uibModalInstance,$window,$scope,logInSRV, $state) {

  $scope.login = function () {
    logInSRV.login($scope.username, $scope.password).success(function(data){
      if(data=='No User found') return toastr.error("User name not found!");
      if(data=='invalid password') return toastr.error("Password is incorrect!");
      if(data.banned==0){
      if(!data.userAccount){
        console.log('Not logged in :((  look at logincontroller');
        toastr.error('please try again', {timeOut: 500000});
      }
      else {
        $window.localStorage['userAccount'] = angular.toJson(data.userAccount);
        toastr.success('logged in successfully');
        if(data.type==0){
          $state.go("userPage");
          $window.localStorage['userProfile'] = angular.toJson(data.userProfile);
        }
        if(data.type==1){
          $state.go("spPage");
          $window.localStorage['spProfile'] = angular.toJson(data.spProfile);
        }
        if(data.type==3){
          $state.go("admin");
          $window.localStorage['adminProfile'] = angular.toJson(data.adminProfile);
        }
        $uibModalInstance.close();
    }
  }
else {
  if(data.banned)
  toastr.error("Account banned for "+data.banned+" days :(");
  else
  toastr.error(data);
  console.log(data);
  }
});
};


  $scope.signupStatechange = function(){
    $state.go("signupLocal");
    $uibModalInstance.close();
    }

  $scope.cancelLogin = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
