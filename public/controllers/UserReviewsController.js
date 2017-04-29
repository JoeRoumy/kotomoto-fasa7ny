myapp.controller('UserReviewsController', function($scope,userSRV) {
  userSRV.viewReviews().success(function(data){
    $scope.reviewEditable= new Array(data.length).fill(false);
    for(var i=0;i<data.length;i++){
      var d = new Date(data[i].time);
      data[i].time=d.toDateString();
    }
    $scope.reviews= data;
  });

  $scope.enableUpdateReview = function(i){
    document.getElementById("review_"+i).setAttribute("contenteditable", "true");
    document.getElementById("review_"+i).focus();
    $scope.reviewEditable[i]=true;
  };

  $scope.cancelEditing = function(i){
    document.getElementById("review_"+i).setAttribute("contenteditable", "false");
    var $review_block = $("#review_"+i).html($scope.reviews[i].review);
    $scope.reviewEditable[i]=false;
    toastr.info('Review update cancelled');
  };

  $scope.update= function(i){
    var review = document.getElementById("review_"+i).innerHTML;
    var id= $scope.reviews[i]._id;
    userSRV.updateReview(id,review).success(function(){
      $scope.reviews[i].review=review;
      document.getElementById("review_"+i).setAttribute("contenteditable", "false");
      var $review_block = $("#review_"+i).html($scope.reviews[i].review);
      $scope.reviewEditable[i]=false;
      toastr.success('Review updated succesfully');
    })
  }

  $scope.delete= function(i){
    var id= $scope.reviews[i]._id;
    userSRV.deleteReview(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Review deleted succesfully');
    })
  }

});
