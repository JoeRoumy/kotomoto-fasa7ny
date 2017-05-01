myapp.controller('IndexNavbarController',function($window,$scope,$state,landingPageSRV){


  $scope.logout = function(){
    landingPageSRV.logout().success(function(data){
      $window.localStorage.clear();
      toastr.success("Logged out!");
      $state.go("home");
    })
  }

  $scope.isLoggedIn = function() {
    return !($window.localStorage['userAccount']==undefined);
  }
  $scope.userType = function() {
    return ($window.localStorage['userAccount']==undefined)? -1:JSON.parse($window.localStorage['userAccount']).type;
  }

  $scope.myFasa7ny = function(index){
    let type=JSON.parse($window.localStorage['userAccount']).type;
    switch (index) {
      case 0: switch (type) {
        case 0:$state.go('userPage'); break;
        case 1:$state.go('spPage'); break;
        case 3:$state.go('admin'); break;
        default:  console.log('myProfile with wrong account type : '+type);return;
      } break;
      default: console.log('myFasa7ny with wrong index : '+index);return;

    }
  }

  $scope.myReviews= function(){
    $state.go('userReviews');
  }

  $scope.myWishList= function(){
    $state.go('user wishList');
  }

});
