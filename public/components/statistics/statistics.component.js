angular.module('myapp').
  component('statistics',{
    templateUrl:'components/statistics/statistics.template.html',
    controller: function StatisticsController(landingPageSRV){
        var self=this;
        landingPageSRV.getStatistics().success(function(data){

          self.activityCount=data.activityCount;
          self.BookingsCount=data.BookingsCount;
          self.SPcount=data.SPcount;

          // Counter
          angular.element(document).ready($('.statistic-counter').counterUp({
                          delay: 10,
                          time: 3000
                      }));
        });
    }
});
