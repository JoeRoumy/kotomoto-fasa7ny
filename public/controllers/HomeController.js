myapp.controller('HomeController', function($scope,landingPageSRV) {
    //getting latest reviews
    landingPageSRV.getLatest6Reviews().success(function(data){
      $scope.reviews=data.reviews;
      $scope.reviewsCount=data.reviewsCount;
      console.log($scope.reviews);
    })

    landingPageSRV.getTopRatedActivities().success(function(data){
      $scope.activities=data.activities;
      console.log($scope.activities);
    })

    landingPageSRV.getFeaturedActivities().success(function(data){
      $scope.FeaturedActivities=data.activities;
      console.log($scope.FeaturedActivities);
    })

});
