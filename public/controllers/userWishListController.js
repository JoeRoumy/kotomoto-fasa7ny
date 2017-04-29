myapp.controller('userWishListController', function($scope,userSRV) {
  userSRV.viewWishList().success(function(data){
    $scope.wishList = data.wishlist;
  });

  $scope.dropActivity= function(i){
    var id= $scope.wishList[i]._id;
    userSRV.dropActivity(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Review deleted succesfully');
    })
  }

});
