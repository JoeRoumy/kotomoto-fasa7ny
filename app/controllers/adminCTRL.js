let Log = require('../models/log.js');
let Complain = require('../models/complain');
let User = require('../models/user');
let ServiceProvider = require('../models/serviceProvider');
let Account         = require('../models/account');
let Message         = require('../models/message');
let Booking         = require('../models/booking');
let Activity         = require('../models/activity');
let globalCTRL=require('../controllers/globalCTRL.js');
let Admin = require('../models/admin');

var ObjectId = require('mongoose').Types.ObjectId;

let adminCTRL={
  //used to test if the user is admin or not
  isAdmin: function(req,res){
    if(!req.user.type==3)
    res.send("you are not an admin.. you are not authorized to do this function");
  },



  //4.6 admin manages bans permenantly
  //tested without exception
  banForever:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('isUserToProvider','isUserToProvider is required of type boolean').notEmpty().isBoolean();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    req.sanitize('isUserToProvider').toBoolean(); //converting to boolean in case it's a string
    if (req.body.isUserToProvider) {
      ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:-1}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        res.send('ban successful');

      })
    } else {
      User.update({_id:req.body.userId},{$set:{banned:-1}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        res.send('ban successful');

      })

    }
  },

  //4.6 admin manages bans for a period of time
  //tested without exception
  ban30Days:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('isUserToProvider','isUserToProvider is required of type boolean').notEmpty().isBoolean();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    req.sanitize('isUserToProvider').toBoolean(); //converting to boolean in case it's a string
    if (req.body.isUserToProvider) {
      ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:30}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        res.send('ban successful');

      })
    } else {
      User.update({_id:req.body.userId},{$set:{banned:30}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        res.send('ban successful');

      })

    }
  },
  //tested without exception
  updateBanStatus:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
    req.checkBody('banDuration','banDuration is required of type int').notEmpty().isInt();
    req.checkBody('isBanUser','isBanUser is required of type Boolean').notEmpty().isBoolean();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    req.sanitize('isBanUser').toBoolean(); //converting to boolean in case it's a string
    if (req.body.isBanUser == false) {
      ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:req.body.banDuration}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        if(status.nModified!=0)
        res.send('sp ban status updated successful');
        else
        res.send('sp not found');

      })
    } else {
      User.update({_id:req.body.userId},{$set:{banned:req.body.banDuration}}).exec(function(err,status){
        if(err)
        res.send(err.message);
        else
        if(status.nModified!=0)
        res.send('user ban status updated successful');
        else
        res.send('user not found');

      })

    }
  },
  //tested
  viewComplains:function(req,res){
    adminCTRL.isAdmin(req,res);
    Complain.find(function(err, complains){
      if(err)
      res.send(err.message);
      else
      res.send(complains);
    })
  },
  //tested without exception
  removeComplain:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('complainId','complainId is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Complain.findOne({_id:req.body.complainId},function(err,val){
      if(err){
        globalCTRL.addErrorLog(err.message);
      }
      else{
        if(val.isSeen){
          Complain.remove(val).exec(function(err){
            if(err)
            res.send(err.message);
            else
            res.send('complain deleted');
          })
        }
      }
    })
  },
  //tested without exception
  viewServiceProviderRequests:function(req,res){
    adminCTRL.isAdmin(req,res);
    ServiceProvider.find({Approved:0},function(err,serviceProviders){
      if(err)
      res.send(err.message);
      else
      res.send(serviceProviders);
    })
  },
  //tested without exception
  //link sent to be edited when views are ready
  acceptServiceProviderRequests:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{Approved:1}}).exec(function(err){
      if(err)
      res.send(err.message);
      else{


        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');
        ServiceProvider.findOne({_id:req.body.serviceProviderId}).populate('serviceProviderAccountId').exec(function(err,serviceProvider){
          var transporter = nodemailer.createTransport(smtpTransport({
            service: 'Hotmail',
            auth: {
              user: 'fasa7ny@outlook.com', // Your email id
              pass: 'ITJumoynyoj1' // Your password
            }
          }));

          var mailOptions = {
            from: 'fasa7ny@outlook.com', // sender address
            to: serviceProvider.serviceProviderAccountId.email, // sp email
            subject: 'Congratulations..your account is APPROVED!!', // Subject line
            //text: "fasa7ny platform is happy to welcome you, next step is to add activities .." //, // plaintext body
            html: '<p>fasa7ny platform is happy to welcome you, next step is to add activities ..</p> <a href="http://localhost:8080/add_activity">click here to add activity </a>'// You can choose to send an HTML body instead
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              res.send(error);
            }else{
              res.send('approved successfully');
            };
          });
        });

      }
    })
  },
  //tested without exception
  //link sent to be edited when views are ready
  rejectServiceProviderRequests:function(req,res){
    adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{Approved:-1}}).exec(function(err){
      if(err)
      res.send(err.message);
      else{


        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');
        ServiceProvider.findOne({_id:req.body.serviceProviderId}).populate('serviceProviderAccountId').exec(function(err,serviceProvider){
          var transporter = nodemailer.createTransport(smtpTransport({
            service: 'Hotmail',
            auth: {
              user: 'fasa7ny@outlook.com', // Your email id
              pass: 'ITJumoynyoj1' // Your password
            }
          }));

          var mailOptions = {
            from: 'fasa7ny@outlook.com', // sender address
            to: serviceProvider.serviceProviderAccountId.email, // sp email
            subject: 'account rejected', // Subject line
            //text: "fasa7ny platform is happy to welcome you, next step is to add activities .." //, // plaintext body
            html: '<p>We are sorry that your account was rejected .. still thinking that you are qualified to join fasa7ny ? </p> <a href="#">Contact us</a>'// You can choose to send an HTML body instead
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              res.send(error);
            }else{
              res.send('rejected successfully');
            };
          });
        });

      }
    })
  },


  //3.1 Login as a service Provider
  adminLoginStep2: function(req,res){
    Admin.findOne({adminAccountId:req.user._id}).exec(function(err,thisAdmin){
      if(err){
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        if(!thisAdmin){
          globalCTRL.addErrorLog('Account '+req.user._id+'has no provider profile!!');
          res.redirect('/logout');
        }
        else {
            req.session.admin=thisAdmin;
            res.send({'type':3,'userAccount':req.user,'adminProfile':thisAdmin,'banned':false});

        }

      }

    });



  },

  //tested
  //4.5 admin views system logs
  viewSystemLogs: function(req,res){
    adminCTRL.isAdmin(req,res);
    Log.find(function(err, log){
      if(err)
      res.send(err.message); //display messages
      else{
        res.send({log});
      }

    })
  },

  //tested
  //4.5 admin deletes system logs
  deleteLogs: function(req,res){
    adminCTRL.isAdmin(req,res);
    Log.remove(function(err, log){

      if(err)
      res.send(err.message);
      else {
        res.send(200);
      }
    })
  },
  //tested without exception

  viewAllChats:function(req, res){

    Message.find(function(err, messages){
      if(err){
        globalCTRL.addErrorLog(err.message);
        //res.send(err.message);
      }else{
        res.send(messages);
      }
    })

  },
  //tested without exception
  //admin view a certain chat messages by id
  viewChatMessages:function(req, res){
  //  adminCTRL.isAdmin(req,res);
    //validating
    req.checkBody('messageId','messageId is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Message.findOne({_id: req.body.messageId }, function(err, chat){

      if(err){
        globalCTRL.addErrorLog(err.message);
      }else{

        User.findOne({_id:chat.fromId},function(err,user){

      if(err){
        globalCTRL.addErrorLog(err.message);}
        else{
          chat.isSeen=true;

        res.send({chat,sender:user.firstName});
        }
        })



      }
    })

  },

  //4.8 analytics
  //testing - waiting for bookings to be able to analyze them
  getAnalyticsPage:function(req,res){
  adminCTRL.isAdmin(req,res);
    // finding top activity
    Booking.aggregate(
      {$group : {_id : "$activityId", "count" : {$sum : 1}}},
      {$sort : {"count" : -1}},
      {$limit : 1},function(err,topBooking){
        if(err)
        {
          globalCTRL.addErrorLog(err.message);
          res.send(err.message)
        }else
        {

          Activity.findOne({_id:topBooking},function(err,topActivity){
            if(err)
            {

              globalCTRL.addErrorLog(err.message);
              res.send(err.message)
            }
            else
            {
              Booking.aggregate(
      {$group : {_id : "$serviceProviderId", "count" : {$sum : 1}}},
      {$sort : {"count" : -1}},
      {$limit : 1},function(err,topBooking){
        if(err)
        {
          globalCTRL.addErrorLog(err.message);
          res.send(err.message)
        }else
        {
              console.log(topBooking);
                            ServiceProvider.findOne({_id:topBooking},function(err,topSP){
                              if(err)
                              {
                                globalCTRL.addErrorLog(err.message);
                                res.send(err.message)
                              }
                              else
                              {
                                User.aggregate(
                                  {$group : {_id : "$numberOfLogins", "count" : {$sum : 1}}},
                                  {$sort : {"count" : -1}},
                                  {$limit : 1},function(err,topUser){
                                    if(err)
                                    {
                                      globalCTRL.addErrorLog(err.message);
                                      res.send(err.message)
                                    }else{


                                      User.findOne({numberOfLogins:topUser[0]._id},function(err,topU){
                                        if(err)
                                        {
                                          res.send(err.message);
                                        }else
                                        {

                                  Booking.aggregate(
                                  {$group : {_id : "$time", "count" : {$sum : 1}}},
                                  {$sort : {"_id" : 1}},function(err,dates){
                                        if(err)
                                        {
                                          res.send(err.message)
                                        }else
                                        {
                                          res.send({topActivity,topSP,topU,dates});
                                        }

                                  })



                                        }
                                      })

                                    }

                                  })
                                }
                              })
              }})}
            })
          }
        }
      )
    },
    //tested
    viewBookings:function(req,res){
      adminCTRL.isAdmin(req,res);
      Booking.find(function(err,bookings){
        if(err)
        {
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }else
        {
          res.send({bookings});
        }
      })
    },
    updateComplainIsSeen:function(req,res){
        adminCTRL.isAdmin(req,res);


        //validating
        req.checkBody('complainId','complainId is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        Complain.update({_id:req.body.complainId},{$set:{isSeen:true}}).exec(function(err,val){
          if(err){
            globalCTRL.addErrorLog(err.message);
          }
          else{
            res.send(val);
          }
        })
      },
    adminSignupStep2: function(req,res){

      req.checkBody('firstName','first name is required').notEmpty();
      req.checkBody('lastName','last name is required').notEmpty();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      else {
        let newAdmin= new Admin();
        newAdmin.firstName=req.body.firstName;
        newAdmin.lastName=req.body.lastName;
        newAdmin.adminAccountId=req.user._id;

        newAdmin.save(function(err){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err);
          }
          else {
            res.send('signup step 2 succesfull!!');
          }

        });
      }

    }

  }

  module.exports = adminCTRL;
