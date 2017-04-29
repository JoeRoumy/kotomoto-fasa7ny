myapp.factory('signupSRV',function ($http) {
  return{
    sendAccountDetails:function(userName,password,email,type) {
      return $http.post('/signup',{'userName':userName,'password':password,'email':email,'type':type});
    },

    sendUserProfileDetails:function(firstName,lastName,birthDate,gender,privacy) {
      return $http.post('/signup_user',{'firstName':firstName,'lastName':lastName,'birthDate':birthDate,'gender':gender,'privacy':privacy});
    },

    sendServiceProviderProfileDetails:function(title,description,legalProof) {
      return $http.post('/signup_sp',{'title':title,'description':description,'legalProof':legalProof,'entertainmentType':['alias'],'branches':['alias2'],'contactMobile':['alias3'],'mediaTypes':['alias4']});
    }

  }
});
