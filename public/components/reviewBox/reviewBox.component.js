angular.module('myapp').
component('reviewBox',{
  templateUrl:'components/reviewBox/reviewBox.template.html',
  controller: function ReviewBoxController($rootScope){

  },
   bindings: {
     data: '='
   }
})
