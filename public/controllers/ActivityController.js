myapp.controller('ActivityController', function($scope,$stateParams,activitySRV,$window) {
  $scope.Math= Math;
//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data.activity;
        console.log($scope.activity);
        $scope.media=data.activity.media;
      })

      activitySRV.getActivityReviews($stateParams.activityID)
      .success(function(data){
        $scope.reviews=data;
      })
  }

  var rate=0;

//rating and reviewing activity
  $scope.rateReviewActivity = function(){
    if($window.localStorage['userProfile'] == undefined){
      toastr.error("please sign up to review this activity");
    }else if(rate==0){
      toastr.error("please give a rating");
    }
    else{
      var review='';
      if($scope.reviewObj!=undefined)
          review=$scope.reviewObj.review;
        console.log(review);
        console.log(typeof review);
      activitySRV.rateReviewActivity($stateParams.activityID,review,rate,$scope.activity.rating,$scope.activity.ratingCount).success(function(data){
        console.log(data);
        if(data=="review submitted successfully"){
          toastr.success("review submitted succesfully");
        }else{
          toastr.error(data);
        }

      })
    }

  }
  $scope.rateChanged = function($event){
    rate=$event.rating;
  }
});
