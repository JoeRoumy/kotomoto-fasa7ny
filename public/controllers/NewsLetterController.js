myapp.controller('NewsLetterController', function($scope, newsLetterSRV){
$scope.subscribe=function(email){

  //if user doesn't enter an e-mail
  if(email==undefined){
    newsLetterSRV.signUpForNewsletter(email).success(function(data){
      toastr.warning('No e-mail was entered');
      //var coming= data;
      //console.log(coming);
      })
  }
  else{
    newsLetterSRV.signUpForNewsletter(email).success(function(){
      toastr.success('Successfull subscription for newsletter');
      console.log("newsletter");
      })
  }

}
});
