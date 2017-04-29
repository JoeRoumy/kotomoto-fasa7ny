myapp.factory('activitySRV', function($http) {
  return {
    getActivityById: function(activityID) {
      return $http.get('/get_activity_by_id/'+activityID+'/');
    },
    getUsernames:function(){
      return $http.get('/view_usernames');
    },
    getActivityReviews:function(activityID){
      return $http.post('/get_activity_reviews',{activityID});
    },
    rateReviewActivity:function(activityId,review,inputRating,rating,ratingCount){
      return $http.post('/ratereview_activity',{activityId:activityId,inputRating:inputRating,review:review,rating:rating,ratingCount:ratingCount});
    },
    processStripe:function(token,amount,desc) {
      return $http.post('/payment',{'stripeToken':token,'chargeAmount':amount,'describe':desc});
    },
    insertBooking:function(charge,activityId,serviceProviderId,time) {
      return $http.post('/book_Activity',{'charge':charge,'activityId':activityId,'serviceProviderId':serviceProviderId,'price':charge.amount/100,'time':time});
    },
    addActivity:function(title,type,durationInMinutes,
      minClientNumber,maxClientNumber,minAge,maxAge,theme,prices,location,timings){
        return $http.post('/add_activity',{
          title:title,
          type:type,
          durationInMinutes:durationInMinutes,
          minClientNumber:minClientNumber,
          maxClientNumber:maxClientNumber,
          minAge:minAge,
          theme:theme,
          prices:prices,
          location:location,
          timings:timings
        });
      }
  };
});
