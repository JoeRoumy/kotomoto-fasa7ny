//add dependencies
var express= require('express');
var mongoose = require('mongoose');

var Router = express.Router();

//var bodyParser = require('body-parser').json();
//exporting to be used in server.js
module.exports = function(passport){

var visitorCTRL= require('./controllers/visitorCTRL');
var userCTRL= require('./controllers/userCTRL');
var serviceProviderCTRL = require('./controllers/serviceProviderCTRL');
var adminCTRL= require('./controllers/adminCTRL');
var globalCTRL= require('./controllers/globalCTRL');


Router.get('/',function(req,res){
  var path = require('path');
  res.sendFile(path.resolve('public/index.html'));
})

///////globalCTRL/////////////
Router.get('/check_user_session',globalCTRL.checkUserSession);



/////// userCTRL /////////////

//2.6 comparison
Router.get('/comparison', userCTRL.getFirstListOfChoices);
//Router.post('/second_choice', userCTRL.getSecondListOfChoices);//remove
Router.get('/compare_serviceProviders/:SP1ID/:SP2ID', userCTRL.getServiceProviderToCompare);
Router.get('/compare_activities/:activity1ID/:activity2ID', userCTRL.getActivitiesToCompare);

//2.5 user add his interests
Router.post('/add_user_interest', userCTRL.addUserInterest);
Router.post('/delete_user_interest', userCTRL.deleteUserInterest);
Router.get('/view_user_interest', userCTRL.viewAllUserInterest);
Router.get('/view_usernames', userCTRL.findUsernames);

//2.13 contact platform
Router.post('/contact_platform', userCTRL.contactPlatform);

//book activity
 Router.post('/book_Activity', userCTRL.bookActivity);

//user sign up
 Router.post('/signup_user', userCTRL.userSignupStep2);

//2.10 user wishlists
Router.post('/add_to_wishlist', userCTRL.userAddToWishList);
Router.post('/drop_from_wishlist', userCTRL.userDropFromWishList);
Router.get('/view_my_wishList',userCTRL.userViewWishList);

Router.post('/change_password', userCTRL.changePassword);
Router.post('/change_privacy', userCTRL.changePrivacy);
Router.post('/subscribe', userCTRL.subscribe);
Router.get('/view_my_profile', userCTRL.viewMyProfile);
Router.post('/update_my_profile', userCTRL.updateMyProfile);
Router.post('/delete_my_profile', userCTRL.deleteMyProfile);
Router.post('/update_review', userCTRL.updateReview);
Router.post('/delete_review', userCTRL.deleteReview);
Router.get('/view_my_reviews', userCTRL.viewMyReviews);
Router.get('/view_history_bookings', userCTRL.viewHistoryBookings);
Router.post('/cancel_booking', userCTRL.cancelBooking);
Router.post('/unsubscribe', userCTRL.unSubscribe);
Router.post('/ratereview_activity', userCTRL.rateReviewActivity);

//2.8 user Complain serviveprovider
Router.post('/complain', userCTRL.submitUserComplain);
Router.post('/complain_update', userCTRL.updateComplainBody);
Router.post('/complain_status', userCTRL.viewStatusOfComplain);





////////////////////adminCTRL//////////////////


// view bookings
Router.get('/view_bookings', adminCTRL.viewBookings);

Router.get('/view_sp_requests', adminCTRL.viewServiceProviderRequests);
Router.post('/accept_sp_requests', adminCTRL.acceptServiceProviderRequests);
Router.post('/reject_sp_requests', adminCTRL.rejectServiceProviderRequests);
Router.post('/ban_forever', adminCTRL.banForever);
Router.post('/ban_30_days', adminCTRL.ban30Days);
Router.post('/update_ban_status', adminCTRL.updateBanStatus);
Router.get('/view_complains', adminCTRL.viewComplains);
Router.post('/remove_complain', adminCTRL.removeComplain);
Router.get('/view_all_chats', adminCTRL.viewAllChats);
Router.post('/view_chat_messages', adminCTRL.viewChatMessages);


//4.8 analytics
Router.get('/get_analysis', adminCTRL.getAnalyticsPage);

  //4.5 view system logs
  Router.get('/view_system_logs',adminCTRL.viewSystemLogs);
  Router.get('/delete_logs', adminCTRL.deleteLogs);


//4.6 managing bans
Router.post('/banforever',adminCTRL.banForever);

//admin sign up
  Router.post('/signup_admin', adminCTRL.adminSignupStep2);

//4.7 messages
Router.get('/view_all_chats', adminCTRL.viewAllChats);
Router.post('/view_chat_history', adminCTRL.viewChatMessages);
Router.post('/update_isSeen', adminCTRL.updateComplainIsSeen);








////////////////////serviceProviderCTRL//////////////////

//1.10 apply as a service provider
Router.post('/continue_sp_creation', serviceProviderCTRL.createServiceProvider);

Router.post('/add_activity', serviceProviderCTRL.addActivity);
Router.post('/update_activity', serviceProviderCTRL.updateActivity);
Router.post('/delete_activity', serviceProviderCTRL.deleteActivity);
Router.post('/reschedule_activity', serviceProviderCTRL.rescheduleActivity);

Router.post('/create_sp', serviceProviderCTRL.createServiceProvider);
Router.post('/view_add_offer', serviceProviderCTRL.viewAddOffer);
Router.post('/add_offer', serviceProviderCTRL.addOffer);
Router.post('/delete_offer', serviceProviderCTRL.deleteOffer);
Router.post('/update_offer', serviceProviderCTRL.updateOffer);
Router.get('/apply_to_golden', serviceProviderCTRL.applyToGolden);

Router.post('/get_sp_byid', serviceProviderCTRL.getSPbyID);

//viewAllActivities
Router.get('/viewAllActivities',serviceProviderCTRL.viewAllActivities);


//3.6 confirm checkIns
Router.get('/bookingUsers', serviceProviderCTRL.viewAllUsers);
Router.get('/SP_CTRL_bookings', serviceProviderCTRL.viewBookings);
Router.post('/bookings', serviceProviderCTRL.confirmCheckIn);

 Router.post('/signup_sp', serviceProviderCTRL.serviceProviderSignupStep2);

Router.get('/holding_reservations', serviceProviderCTRL.viewHoldingReservations);
Router.post('/submit_sp_complain', serviceProviderCTRL.submitServiceProviderComplain);
Router.get('/view_provider_bookings', serviceProviderCTRL.viewProviderBookings);

Router.get('/view_birthDay_clients', serviceProviderCTRL.viewBirthDayClients);
Router.post('/promote_to_clients', serviceProviderCTRL.promoteToHistoryClient);


////////////////////visitorCTRL//////////////////

Router.get('/get_featured_activities',visitorCTRL.getFeaturedActivities);
Router.get('/get_latest_6_reviews',visitorCTRL.getLatest6Reviews);
Router.post('/get_activity_reviews',visitorCTRL.getActivityReviews);
Router.get('/get_top_rated_activities',visitorCTRL.getTopRatedActivities);
Router.get('/get_statistics', visitorCTRL.getStatistics);
Router.get('/get_activity_by_id/:activityID', visitorCTRL.getActivityById);

//1.3  filter activities as a visitor and moving back and forth each 10 activities
Router.get('/get_filtered_activities/:filter/:value', visitorCTRL.filterActivitiesBy);
Router.post('/get_filtered_activities_next', visitorCTRL.filterActivitiesByNext);
Router.post('/get_filtered_activities_prev', visitorCTRL.filterActivitiesByPrev);

// view activities _NEEDED_FOR_Testing
Router.get('/view_activity', visitorCTRL.viewActivities);

Router.post('/get_nearby_activities/', visitorCTRL.getNearbyActivities);
Router.post('/share_on_social_media/', visitorCTRL.shareOnSocialMedia);


//1.2 view service providers
Router.get('/view_all_service_providers', visitorCTRL.viewAllServiceProviders);
Router.post('/view_service_provider', visitorCTRL.viewServiceProvider);
//1.7 view FAQ
Router.get('/view_FAQ', visitorCTRL.viewFAQ);
//1.4 user registration
Router.get('/register_as_user', visitorCTRL.registerAsUser);

Router.get('/search_for_activities/:searchInput/:day', visitorCTRL.searchForActivities);
Router.post('/signup_for_newsletter', visitorCTRL.signupForNewsletter);
Router.post('/unsubscribe_for_newsletter', visitorCTRL.unsubscribeForNewsletter);
Router.post('/recover_password', visitorCTRL.recoverPassword);

// 1.1 A Visitor can explore different activities
Router.get('/explore_activities', visitorCTRL.getDifferentActivities);
Router.get('/explore_activities_next', visitorCTRL.getDifferentActivitiesnext);
Router.get('/explore_activities_prev', visitorCTRL.getDifferentActivitiesprev);



/////////////////////////PASSPORT///////////////////////

//LogIn Passport
Router.get('/login', function(req, res){
  res.send("login page here");
});

Router.post('/login', function(req, res, next) {

  passport.authenticate('local-login',function(err, user, info){
    if (err) { return res.send(err); }
   if (!user) { console.log('failed'); return res.send('failed'); }
   req.logIn(user, function(err) {
     if (err) { console.log(22,err);return next(err); }
     switch (req.user.type) {
         case 0:
         userCTRL.userLoginStep2(req,res);
             break;
         case 1:
         serviceProviderCTRL.serviceProviderLoginStep2(req,res);
             break;
         case 3:
             adminCTRL.adminLoginStep2(req,res);
             break;
         default:
             globalCTRL.addErrorLog('login attempt with profile type '+req.body.type);
             res.redirect('/logout');
             break;
       }
        });
      })(req, res, next);

  });


//2.1.3 log out
Router.get('/logout', function(req, res){
    req.logout();
    req.session.regenerate(function(err){});
    res.send({ok:'logged out!'});
    //res.redirect('/');
  });



//SignUp passport
  // Router.get('/signup', function(req, res){
	// 	res.send('signup page here');
	// });
  // Router.get('/signup_user', function(req, res){
  // 		res.send('user signup page here');
  // 	});
  // Router.get('/signup_sp', function(req, res){
  //   		res.send('sp signup page here');
  //   	});
  // Router.get('/signup_admin', function(req, res){
  //     		res.send('admin signup page here');
  //     	});




	Router.post('/signup', passport.authenticate('local-signup'),function(req,res){
    if (!req.user) { return res.send({stepOneOK:0}); }
    switch (parseInt(req.body.type)) {
        case 0:
        res.send({stepOneOK:1,userAccount:req.user});
            break;
        case 1:
        res.send({stepOneOK:1,userAccount:req.user});
            break;
        case 3:
        res.send({stepOneOK:1,userAccount:req.user});
            break;
        default:
            globalCTRL.addErrorLog('sign up attempt with profile type '+req.body.type);
            console.log('sign up attempt with profile type '+req.body.type);
            res.redirect('/logout');
            break;
      }

	});


//1.6 read about the platform through the “about us” option
//tested
Router.get('/about_uspage',function(req,res){
  res.render("aboutus_page.ejs");
});


Router.post('/validate', globalCTRL.validateSession);
Router.post('/payment', globalCTRL.stripePayment);










return Router;}
