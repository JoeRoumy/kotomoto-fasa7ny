angular.module('myapp').component('chooseInterests',{
  templateUrl:'components/interests/interests.template.html',
  controller: function interestsController($scope,$window,userSRV) {
      var self = this;
      var profile = JSON.parse($window.localStorage['userProfile']);

  this.interestEnums1 = ["Action","Adventure","Animals","Architecture","Banquets","Children","Cinema","Circus","Comedy","Court entertainment","Crime","Dance","Danger","Drama"];
  this.interestEnums2 = ["Fantasy","Film","Fireworks","Forms","Games","History","Horror","Industry","Magic","Music","Mystery","Parades","Paranoid","Performance"];
  this.interestEnums3 = ["Philosophy","Political","Psychology","Public punishment","Reading","Romance","Satire","Science Fiction","Speculative","Sport","Storytelling","Street Performance","Theatre","Thriller"];
  this.vals1 = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  this.vals2 = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  this.vals3 = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
   this.show = function () {
      return profile.interests.length==0;
    }
    this.submitInterests = function() {
      var list=[];
      for (var i = 0; i < self.vals1.length; i++) {
        if(self.vals1[i])
        list.push(self.interestEnums1[i]);
      }
      for (var i = 0; i < self.vals2.length; i++) {
        if(self.vals2[i])
        list.push(self.interestEnums2[i]);
      }
      for (var i = 0; i < self.vals3.length; i++) {
        if(self.vals3[i])
        list.push(self.interestEnums3[i]);
      }
      userSRV.sumbitInterests(list).success(function(data) {
        if(data.succesfull){
          $window.localStorage['userProfile']=angular.toJson(data.userProfile);
          profile=data.userProfile;
        }else {
          console.log(data.errors);
          self.errs=data.errors;
        }
      });
    }

  }
});
