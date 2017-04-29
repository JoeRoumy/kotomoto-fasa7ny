myapp.factory('newsLetterSRV', function($http) {
  return{
    signUpForNewsletter :function(mail){
      return $http.post('/signup_for_newsletter', {email:mail})
    },
  }
})
