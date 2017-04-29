myapp.controller('promotionController', function($scope,promotionSRV,loaderSRV,$window,activitySRV) {
    //getting latest reviews
        loaderSRV.start();
        promotionSRV.getBDCLients().success(function(data){
     
        $scope.BDClients=data;
        console.log(data);
        
        loaderSRV.end();


    });




    

 

    


 


   

});
