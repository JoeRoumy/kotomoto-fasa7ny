myapp.factory('userSRV', function($http) {
  return {
    addToWishList: function(activityId) {
      return $http.post('/add_to_wishList',{activity:activityId});
    },

    viewWishList: function() {
      return $http.get('/view_my_wishList');
    },

    dropActivity:function(id){
      return $http.post('/drop_from_wishlist',{activity:id});
    },

    subscribe: function(serviceProviderId){
      return $http.post('/subscribe', {serviceProviderId:serviceProviderId})
    },

    changePrivacy: function(privacyLevel){
      return $http.post('/change_privacy',{privacy:privacyLevel})
    },
    sumbitInterests: function(interests) {
      return $http.post('/add_user_interest',{'interests':interests})
    },
    viewReviews: function() {
      return $http.get('/view_my_reviews');
    },
    updateReview:function(id,review){
      return $http.post('/update_review',{reviewId:id,review:review});
    },
    deleteReview:function(id){
      return $http.post('/delete_review',{reviewId:id});
    },
    viewHistoryBookings:function(){
      return $http.get('/view_history_bookings');
    },
    updateProfile:function(mobileNumber,profession){
      return $http.post('/update_my_profile',{mobileNumber:mobileNumber,profession:profession});
    }

  };
});
