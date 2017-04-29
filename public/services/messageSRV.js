myapp.factory('messageSRV', function($http) {
  return {
    getMessages: function(messageId) {
      return $http.post('/view_chat_messages', {messageId:messageId});
    }
  };
});