angular.module('myapp').
component('activityBox',{
  templateUrl:'components/activityBox/activityBox.template.html',
  controller: function ActivityBoxController($scope,$state, $uibModal,activitySRV,userSRV,$window){
      $scope.openActivity = function(activityID){
        $state.go("activity",{activityID:activityID})
      },
      $scope.addToWishList = function(activityId){
        if($window.localStorage['userAccount']==undefined){
          toastr.warning('You need to signup to add this activity to your wishlist');
        }else{
          userSRV.addToWishList(activityId).success(function(){
            toastr.success('Activity added to wish list');
          })
        }
      }


      $scope.openBookingPage= function(activityID){
        if($window.localStorage['userAccount']==undefined){
          toastr.error("please signup to book this activity");
          return;
        }
        activitySRV.getActivityById(activityID)
        .success(function(data){
          var days=[0,1,2,3,4,5,6];
          activity = data.activity;
          for(var i=0;i<activity.timings.length;i++){
            switch(activity.timings[i].day.toUpperCase()){
              case "SUNDAY": days[0]= -1; break;
              case "MONDAY": days[1]= -1; break;
              case "TUESDAY": days[2]= -1; break;
              case "WEDNESDAY": days[3]= -1; break;
              case "THURSDAY": days[4]= -1; break;
              case "FRIDAY": days[5]= -1; break;
              case "SATURDAY": days[6]= -1; break;
            }
          }
          $window.localStorage['days']=days;
          $state.go("booking",{activityID:activityID})
        })

      }
      $scope.showSendGiftModal = function(){
        if($window.localStorage['userAccount']==undefined){
          toastr.error("please signup to send this activity as a gift");
          return;
        }
        $uibModal.open({
          templateUrl: 'sendGiftModal.html',
          controller: 'sendGiftModalController',
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

  },
   bindings: {
     data: '='
   }
})

.controller("sendGiftModalController", function ($scope, $uibModalInstance,activitySRV) {
  $scope.selectedUsername = undefined;
  activitySRV.getUsernames().success(function(data){
      $scope.usernames =[];
      for(var i=0;i<data.usernames.length;i++){
        $scope.usernames[i] = data.usernames[i].userName;
      }
      console.log($scope.usernames);
  })
  $scope.ok = function () {
    alert($scope.selectedUsername);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.filter('contains', function() { //checks if selected userName is in usernames array
  return function (array, needle) {
    if(needle != undefined)
      return array.indexOf(needle) >= 0;
    return -1;
  };
});
