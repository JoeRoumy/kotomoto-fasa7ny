myapp.controller('signupController',function ($window,$scope,$state,signupSRV) {


  $scope.isUser = function() {
    if(!($window.localStorage['tempSignup']==undefined)){
      return JSON.parse($window.localStorage['tempSignup']).type==0;

  }}

  $scope.isSP = function() {
      return $state.params.type!='user';
  }

  $scope.isLoggedIn = function() {
    return !($window.localStorage['tempSignup']==undefined);
  }

// @@@@@@@@@@@@@@@@@@@@@@@@
//account creation
  $scope.signupStepOne = function() {
    console.log("here");
   signupSRV.sendAccountDetails($scope.userName,$scope.password,$scope.email,$state.params.type=='user'? 0:1).success(function(data) {
     if(data=='Already a username') return toastr.error("User name taken!");
     if(data=='Duplicate email') return toastr.error("Email already registered!");
     if(data.stepOneOK){
     $window.localStorage['tempSignup'] = angular.toJson(data.userAccount);
     console.log('okkk');
     if($state.params.type=='user')
     signupStepTwoUSER();
     else {
       signupStepTwoSP();
     }
   }
   else {
     toastr.error("Failed");
   }
   });
  }

//sp profile creation
  signupStepTwoSP = function() {
    signupSRV.sendServiceProviderProfileDetails($scope.title,$scope.description,$scope.legalProof).success(function(data) {
      if(data.stepTwoOK){
        $window.localStorage['userAccount']=$window.localStorage['tempSignup'];
        $window.localStorage['spProfile'] = angular.toJson(data.spProfile);
        $state.go('home');
    }
    else {
      toastr.error((data.validationErrors)?data.validationErrors:data.errors);
    }
    });
   }


////////,$scope.profilePicture

//user profile creation
   signupStepTwoUSER = function() {
    signupSRV.sendUserProfileDetails($scope.firstName,$scope.lastName,$scope.bdate,$scope.gender==undefined? true:$scope.gender,$scope.privacy,$scope.mobileNumber,$scope.profession).success(function(data) {
      if(data.stepTwoOK){
        $window.localStorage['userAccount']=$window.localStorage['tempSignup'];
        $window.localStorage['userProfile'] = angular.toJson(data.userProfile);
        $state.go('home');
    }
    else {
      console.log('hesbhd');
      toastr.error((data.validationErrors)?data.validationErrors:data.errors);
    }
    });
   }



});
