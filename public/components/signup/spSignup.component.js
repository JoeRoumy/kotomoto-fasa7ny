angular.module('myapp').
  component('spSignup',{
    templateUrl:'components/signup/spSignup.template.html',
    controller: function spSignupController($window,$scope,$state,signupSRV){
      var self = this;
      this.signupStepTwo = function() {
        signupSRV.sendServiceProviderProfileDetails($scope.title,$scope.description,$scope.legalProof).success(function(data) {
          if(data.stepTwoOK){
            $window.localStorage['userAccount']=$window.localStorage['tempSignup'];
            $window.localStorage['spProfile'] = angular.toJson(data.spProfile);
            $state.go('home');
        }
        else {
          $scope.errors=(data.validationErrors)?data.validationErrors:data.errors;
        }
        });
       }

     }
  });
