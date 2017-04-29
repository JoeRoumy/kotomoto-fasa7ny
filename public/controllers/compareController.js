myapp.controller('compareController', function($scope,compareSRV,loaderSRV,$window,activitySRV) {
    //getting latest reviews
    loaderSRV.start();
    compareSRV.getFirstList().success(function(data){
      console.log(data.ACs);
      console.log(data.SPs);
        $scope.Activities=data.ACs;
        $scope.serviceProviders=data.SPs;
        loaderSRV.end();


    });

    $scope.lat= parseInt($window.localStorage['lat']);
    $scope.long= parseInt($window.localStorage['long'] );


    var rad = function(x) {
      return x * Math.PI / 180;
    };

    $scope.getDistance = function(lat,long) {
      var mylat= $scope.lat;
      var  mylong= $scope.long;
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(lat - mylat);
      var dLong = rad(long - mylong);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(mylat)) * Math.cos(rad(lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };

    $scope.compareActivities=  function(selectedActivities,selectedActivities2){
        // $scope.selectedActivities
        compareSRV.compareActivities(selectedActivities,selectedActivities2).success(function(data){
            console.log(data)
             $scope.activity1=data.activity1;
              $scope.activity2=data.activity2;
        })
         console.log(selectedActivities)
         console.log(selectedActivities2)

    };


 $scope.compareServiceProvider=  function(selectedServiceProvider,selectedServiceProvider2){
        // $scope.selectedActivities
        // console.log($scope.selectedActivities)

        compareSRV.compareServiceProvider(selectedServiceProvider,selectedServiceProvider2).success(function(data){
           
            $scope.serviceProvider1=data.SP1;
             console.log("serviceProvider1")
            console.log($scope.serviceProvider1)
              $scope.serviceProvider2=data.SP2;
        })
        console.log(selectedServiceProvider)
         console.log(selectedServiceProvider2)

    };


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

});
