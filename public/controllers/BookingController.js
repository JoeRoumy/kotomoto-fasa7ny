myapp.controller('BookingController', function($scope,$stateParams,activitySRV,$window) {
var self = this;
$scope.Math=Math;
$scope.today= new Date();
//getting activity
  if($stateParams.activityID != undefined){
      activitySRV.getActivityById($stateParams.activityID)
      .success(function(data){
        $scope.activity=data.activity;
        self.activity=data.activity;
      })
  }



  //istantiating variable for views
  $scope.active=new Array(3).fill("");
  $scope.disabled=new Array(3).fill("disabled");
  $scope.completed=new Array(3).fill("");
  $scope.active[0]="active";
  $scope.disabled[0]="";

  $scope.dateOptions = {
    minDate: new Date(),
    dateDisabled: disabled,
    showWeeks:false
  };

  function disabled (data) {
    var result= false;
    var date = data.date,
    mode = data.mode;
    days=$window.localStorage['days'];
    days=days.split(',').map(Number);

      for(var i=0;i<days.length;i++){
        if(days[i]!=-1){
          result |=  date.getDay() == i;
        }
      }
      result &= mode === 'day';
      return result;
  }


$scope.$watch('activityDate',function(newVal, oldVal, scope){
    if(newVal != oldVal){
         $scope.activityDate = newVal;
         console.log(newVal.getDay());
     }
},true);

$scope.chosenTime= function(time,activityDate){
  $scope.time=time;
  $scope.activityDate=activityDate;
}

$scope.submitTiming = function(){
  if($scope.time== undefined)
    toastr.error("please select a timing to proceed");
  else{
    toastr.success("timing is selected perfectly.. 2 steps to go ;)");
  console.log($scope.time);
  $scope.completed[0]="completed";
  $scope.active[0]="";
  $scope.active[1]="active";
  $scope.disabled[1]="";
}
}



//step2
$scope.planTitles=["basic","standard","Premium","platinum"];

$scope.submitPlan = function(plan,planTitle){
  $scope.plan=plan;
  $scope.plan.planTitle=planTitle;
  console.log($scope.plan);
  toastr.success("plan is selected perfectly..only 1 step to go ;)");
  $scope.completed[1]="completed";
  $scope.active[1]="";
  $scope.active[2]="active";
  $scope.disabled[2]="";
console.log($scope.activity);
}


  // $scope.$watch('activity', function (activity,oldValue) {
  //   if(activity!= undefined){
  //     console.log(disabled);
  //     $scope.dateOptions.dateDisabled=disabled;
  //     console.log($scope.dateOptions);
  //     }
  // }, true);


//payment

$scope.processPayement = function(token) {
activitySRV.processStripe(token,$scope.plan.numberOfClients*$scope.plan.price*100,$scope.activity.title+"("+JSON.parse($window.localStorage['userAccount']).userName+")").success(function(data) {
  if(data.ok){
    var datetime=new Date($scope.activityDate+" UTC");
    datetime.setHours($scope.time.startTime/60);
    datetime.setMinutes($scope.time.startTime%60);
    console.log(datetime.toString());
    activitySRV.insertBooking(data.charge,$scope.activity._id,$scope.activity.serviceproviderId,datetime).success(function(data) {
      if(data.success){
        console.log(data.booking);
        toastr.success('Booked successfully :D');
      }else {
        console.log(data.error);
        toastr.error(data.error);
      }
    });
  }
  else {
    toastr.error(data.error.message);
    toastr.error("Paymen failed :(");

  }
})
}




















});
