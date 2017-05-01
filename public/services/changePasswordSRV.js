myapp.factory('changePasswordSRV',function($http){
  return{
    changepassword:function(oldPassword,newPassword,confirmPassword){
      console.log({'oldPassword':oldPassword,'newPassword':newPassword,'confirmPassword':confirmPassword});
      return $http.post('/change_password',{'oldPassword':oldPassword,'newPassword':newPassword,'confirmPassword':confirmPassword});
    }
  };
});
