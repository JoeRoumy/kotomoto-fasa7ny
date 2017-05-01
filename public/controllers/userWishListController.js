myapp.controller('userWishListController', function($scope,userSRV) {
  userSRV.viewWishList().success(function(data){
    if(!data.error)
    $scope.wishList = data.wishlist;
    else {
      toastr.error(data.error.message);
    }
  });

  $scope.dropActivity= function(i){
    var id= $scope.wishList[i]._id;
    userSRV.dropActivity(id).success(function(){
      document.getElementById("row_"+i).remove();
      toastr.success('Review deleted succesfully');
    })
  }

});
