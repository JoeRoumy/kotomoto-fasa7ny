myapp.controller('ActivitiesController', function($scope,$stateParams,$state,activitiesSRV,loaderSRV) {

  $scope.currentPage=1;

  if($stateParams.searchInput != undefined || $stateParams.day != undefined){
      loaderSRV.start();
      activitiesSRV.search($stateParams.searchInput,$stateParams.day)
      .success(function(data){
        let offers = data.offers;
        let activities= data.activities;
        for(var i=0;i<offers.length;i++){
          for(var j=0;j<offers[i].activities.length;j++){
            for(var k=0;k<activities.length;k++){
                if(activities[k].isOffer && activities[k]._id.toString() == offers[i].activities[j].toString()){
                  var oldPrice=activities[k].prices[0].price;
                  activities[k].newPrice=oldPrice - offers[i].discount*oldPrice;
                }
            }
          }
        }
        $scope.activities=activities;
        loaderSRV.end();
      })
  }


  if($stateParams.filter != undefined || $stateParams.value != undefined){
      loaderSRV.start();
      activitiesSRV.filter($stateParams.filter,$stateParams.value)
      .success(function(data){
        let offers = data.offers;
        let activities= data.activities;
        for(var i=0;i<offers.length;i++){
          for(var j=0;j<offers[i].activities.length;j++){
            for(var k=0;k<activities.length;k++){
                if(activities[k].isOffer && activities[k]._id.toString() == offers[i].activities[j].toString()){
                  var oldPrice=activities[k].prices[0].price;
                  activities[k].newPrice=oldPrice - offers[i].discount*oldPrice;
                }
            }
          }
        }
        $scope.activities=activities;
        loaderSRV.end();
      })
  }



  $scope.openActivity= function(activityID){
    $state.go("activity", {activityID:activityID});
  }
});
