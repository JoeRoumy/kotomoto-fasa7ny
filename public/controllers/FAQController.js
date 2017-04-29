// myapp.controller('FAQController', function($scope,$stateParams,$state,activitiesSRV,loaderSRV) {

//   if($stateParams.searchInput != undefined || $stateParams.day != undefined){
//       loaderSRV.start();
//       activitiesSRV.search($stateParams.searchInput,$stateParams.day)
//       .success(function(data){
//         $scope.activities=data;
//         loaderSRV.end();
//       })
//   }

//   $scope.openActivity= function(activityID){
//     $state.go("activity", {activityID:activityID});
//   }
// });
