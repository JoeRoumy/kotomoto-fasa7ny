let Activity = require('../models/activity.js');
let ServiceProvider = require('../models/serviceProvider.js');
let Account = require('../models/account.js');
let Offer = require('../models/offer.js');
let Booking = require('../models/booking.js');
let User = require('../models/user.js');
let globalCTRL = require('../controllers/globalCTRL.js');
let Complain = require('../models/complain.js');
var ObjectId = require('mongoose').Types.ObjectId;


let ServiceProviderCTRL = {
  isServiceProvider: function (req, res) {
    if (!req.user.type == 1)
      res.send("you are not a Service Provier.. you are not authorized to do this function");
  },

  //tested
  //As a service provider I shall add activities that my firm provides so that I can schedule them for my clients.
  addActivity: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('type', 'type is required').notEmpty();
    req.checkBody('prices', 'prices are required').notEmpty().isArray();
    // req.checkBody('timings', 'timings is required').notEmpty().isArray();
    req.checkBody('durationInMinutes', 'durationInMinutes is required of type int').notEmpty().isInt({ min: 1 });
    req.checkBody('minClientNumber', 'minClientNumber is a required of positive number').notEmpty().isInt({ min: -1 });
    req.checkBody('maxClientNumber', 'maxClientNumber is a required of positive number').notEmpty().isInt({ min: -1 });
    req.sanitize('minClientNumber').toInt();
    req.sanitize('maxClientNumber').toInt();
    req.checkBody('maxClientNumber', 'maxClientNumber should be greater then or equal minClientNumber').gte(req.body.minClientNumber);
    req.checkBody('minAge', 'minClientNumber is a positive number').optional().isInt({ min: -1 });
    req.checkBody('maxAge', 'maxClientNumber is a positive number').optional().isInt({ min: -1 });
    var errors = req.validationErrors();
    if (errors) {
      res.send({"errors":errors});
      return;
    }
    //end validating
    else {
      ServiceProvider.findOne({ serviceProviderAccountId: req.user._id }).exec(function (err, thisProvider) {


        let newActivity = new Activity(
          {
            "title": req.body.title,
            "type": req.body.type,
            "serviceProviderId": thisProvider._id,
            "timings": req.body.timings,
            "durationInMinutes": req.body.durationInMinutes,
            "minClientNumber": req.body.minClientNumber,
            "maxClientNumber": req.body.maxClientNumber,
            "media": [],
            "prices": [],
            "location": req.body.location,
            "theme": req.body.theme,
            "rating": 0,
            "ratingCount": 0
          });
        if (req.files && req.files.length > 0) {
          for (var i = 0; i < req.files.length; i++) {
            newActivity.media.push({ "type": req.body.mediaTypes[i], "url": req.files[i].path });
          }
        }

        if (req.body.prices && req.body.prices.length > 0) {
          for (var i = 0; i < req.body.prices.length; i++) {
            newActivity.prices.push(req.body.prices[i]);
          }
        }

        if (req.body.minAge) {
          newActivity.minAge = req.body.minAge;
        }
        if (req.body.maxAge) {
          newActivity.maxAge = req.body.maxAge;
        }

        newActivity.save(function (err) {
          if (err) {
            globalCTRL.addErrorLog(err);
            console.log(err);
                        res.send({'errors':err});
          }
          else {
            res.send("activity added succesfully");
          }

        });
      });



    }

  },

  //tested
  //3.2.1 As a service provider I can update my activities
  updateActivity: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('activityID', 'serviceProviderAccountId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating

    Activity.findOne({ "_id": new ObjectId(req.body.activityID) }, function (err, activity) {

      if (!activity)
        res.send("activity not found");

      if (req.body.title) {
        activity.title = req.body.title;
      }
      if (req.body.type) {
        activity.type = req.body.type;
      }

      if (req.body.minClientNumber) {
        activity.minClientNumber = req.body.minClientNumber;
      }
      if (req.body.maxClientNumber) {
        activity.maxClientNumber = req.body.maxClientNumber;
      }
      if (req.body.theme) {
        activity.theme = req.body.theme;
      }
      if (req.body.location) {
        activity.location = req.body.location;
      }
      if (req.files && req.files.length > 0) {
        activity.media = [];//assuming that the whole array will be sent again
        for (var i = 0; i < req.files.length; i++) {
          activity.media.push({ "type": req.body.mediaTypes[i], "url": req.files[i].path });
        }
      }

      if (req.body.prices && req.body.prices.length > 0) {
        activity.prices = [];
        for (var i = 0; i < req.body.prices.length; i++) {
          activity.prices.push(req.body.prices[i]);
        }
      }

      if (req.body.minAge) {
        activity.minAge = req.body.minAge;
      }
      if (req.body.maxAge) {
        activity.maxAge = req.body.maxAge;
      }

      activity.save(function (err) {
        if (err) {
          globalCTRL.addErrorLog(err.message);
        }
        else {
          res.send("activity updated succesfully");
        }

      });
    });
  },
  //tested
  //3.2.2 As a service provider I can delete my activities
  deleteActivity: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('activityID', 'activityID is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Activity.findOne({ "_id": new ObjectId(req.body.activityID) }).remove().exec(function (err) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send("activity deleted succesfully");
      }
    })

  },

  //tested
  //3.2.3 As a service provider I can reschedule my activities
  rescheduleActivity: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('activityID', 'activityID is required').isMongoId();
    req.checkBody('timings', 'timings is required').notEmpty().isArray();
    req.checkBody('durationInMinutes', 'durationInMinutes is required of type int').notEmpty().isInt({ min: 1 });
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Activity.findOne({ "_id": req.body.activityID }, function (err, activity) {

      if (req.body.durationInMinutes) {
        activity.durationInMinutes = req.body.durationInMinutes;
      }

      if (req.body.timings && req.body.timings.length > 0) {
        activity.timings = req.body.timings;
      }


      activity.save(function (err) {
        if (err) {
          globalCTRL.addErrorLog(err.message);
        }
        else {
          res.send("rescheduled activity succesfully");
        }
      });
    });
  },

  //tested
  viewAllActivities: function (req, res) {
    Activity.find(function (err, activities) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send(activities);
      }
    })
  },


  createServiceProvider: function (req, res) {
    //validating
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('serviceProviderAccountId', 'serviceProviderAccountId is required').isMongoId();
    req.checkBody('description', 'description are required').notEmpty();
    req.checkBody('entertainmentType', 'entertainmentType is required').notEmpty().isArray();
    req.checkBody('branches', 'branches is a required').notEmpty().isArray();
    req.checkBody('contactMobile', 'contactMobile is a required').notEmpty().isArray();
    req.checkBody('legalProof', 'legalProof is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    let serviceProvider = new ServiceProvider(req.body);
    serviceProvider.serviceProviderAccountId = req.session.account._id;
    if (req.files.length > 0) {

      serviceProvider.media = [];
      for (var i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "legalProof") {
          serviceProvider.legalProof.push({ "type": req.body.mediaTypes[i], "url": req.files[i].path });
        }

        serviceProvider.media.push({ "type": req.body.mediaTypes[i], "url": req.files[i].path });
      }
    }
    serviceProvider.save(function (err, account) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      }
      else {
        req.session.serviceProvider = serviceProvider._id;
        res.send(200);
      }
    });
  },

  //tested
  getSPbyID: function (req, res) {
    ServiceProvider.findOne({ _id: req.body.spID }, function (err, SP) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      } else {
        res.send({ SP });
      }
    })


  },

  //tested
  //3.1 Login as a service Provider
  serviceProviderLoginStep2: function (req, res) {
    ServiceProvider.findOne({ serviceProviderAccountId: req.user._id }).exec(function (err, thisProvider) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        if (!thisProvider) {
          globalCTRL.addErrorLog('Account ' + req.user._id + 'has no provider profile!!');
          res.redirect('/logout');
        }
        else {
          if (thisProvider.banned == 0) {
            req.session.serviceProvider = thisProvider;
            res.send({ 'type': 1, 'userAccount': req.user, 'spProfile': thisProvider, 'banned': 0 });
          }
          else {
            res.send({ 'banned': thisProvider.banned });
          }
        }

      }

    });

  },

  //karim and andrea's code
  //tested
  viewAddOffer: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    ServiceProvider.findOne({ _id: req.session.ServiceProvider._id })
      .populate({ path: 'activities' })
      .exec(function (err, provider) {
        if (err) {
          globalCTRL.addErrorLog(err.message);
        }
        res.send(provider);
      })


      res.send(provider.activities);
    },


    //tested
    addOffer:function(req,res){
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('title','title is required').notEmpty();
      req.checkBody('description','description are required').notEmpty();
      req.checkBody('discount','discount is required of type int>=0').isDecimal({min:0});
      req.checkBody('deadline','deadline is required valid date in the following format: 2017-04-20T00:00:00.000Z').isISO8601(); //check if the string is a valid ISO 8601 date.
      req.checkBody('deadline','deadline should be in the future').isAfter();
      req.checkBody('isActive','isActive is a required of type Boolean').optional().isBoolean();
      req.sanitize('isActive').toBoolean();
      req.checkBody('activities','activities is a required').notEmpty().isArray();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      let offer = new Offer(req.body);
      offer.save(function(err,offer){
        if(err){
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }else{
          Activity.update({_id:{$in:req.body.activities}},{$set: {'isOffer': true}}).exec();
          res.send('offer added');//same redirection as update
        }
      })
    },

    //tested
    deleteOffer:function(req,res){
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('offerId','title is required').isMongoId();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      Activity.update({_id:{$in:offer.activities}},{$set: {'isOffer': false}}).exec();
      Offer.findOne({_id:req.body.offerId},function(err,offer){
        if(err){
          globalCTRL.addErrorLog(err.message);
        }else{
          Offer.remove(offer).exec(function(err){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }
            else
            res.send('offer deleted');//same redirection as update
          })
        }
      })
    },

    //tested
    updateOffer: function (req, res) {
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('offerId','offerId is required').isMongoId();
      req.checkBody('title','title is required').optional().notEmpty();
      req.checkBody('description','description are required').optional().notEmpty();
      req.checkBody('discount','discount is required of type int>=0').optional().isDecimal({min:0});
      req.checkBody('deadline','deadline is required valid date in the following format: 2017-04-20T00:00:00.000Z').optional().isISO8601(); //check if the string is a valid ISO 8601 date.
      req.checkBody('deadline','deadline should be in the future').optional().isAfter();
      req.checkBody('isActive','isActive is a required of type Boolean').optional().isBoolean();
      req.sanitize('isActive').toBoolean();
      req.checkBody('activities','activities is a required').optional().notEmpty().isArray();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      Offer.update({ _id: new ObjectId(req.body.offerId) },{$set:req.body})
      .exec(function (err,status) {
        if (err){
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }else
        if(status.nModified!=0)
        res.send('should redirect to service provider logged in page');
        else
        res.send("offer not found");
      })
    },

    //tested
    //session var to be edited
    viewHoldingReservations:function(req, res){
     ServiceProvider.findOne({serviceProviderAccountId: req.user._id}, function(err, sp){
       if(err){
         res.send(err.message);
       }
       else{
 Booking.find({serviceProviderId:sp._id, isHolding: true}).populate({path: "userId"}).exec(function(err, bookings){
        //when a booking is canceled, isHolding is set to false
        if(err){
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }else
        {
          res.send(bookings);
        }
      })
       }
     })
    },

     // ServiceProviderCTRL.isServiceProvider(req,res);


  //tested
  //missing payment
  applyToGolden: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    ServiceProvider.update({ _id: req.session.serviceProvider._id }, { $set: { 'isGolden': true } }).exec(function (err, status) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      } else {
        res.send('should redirect to serviceProvider home page');
      }

    });
  },

  //tested
  //3.6 confirm checkins
  viewBookings: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    Booking.find({ "serviceProviderId": req.session.serviceProvider._id, "isConfirmed": false }, function (err, bookings) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send(bookings);
      }
    })
  },


  //tested
  confirmCheckIn: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('bookingid', 'bookingid is required').isMongoId();
    req.checkBody('serviceProviderId', 'serviceProviderId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    //req. is a booking
    Booking.update({ _id: req.body.bookingid }, { $set: { isConfirmed: true } }).exec(function (err, status) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        if (status.nModified == 0)
          res.send('booking is not found');
        else {
          ServiceProvider.findOne({ "_id": req.body.serviceProviderId }, function (err, sp) {
            if (err) {
              globalCTRL.addErrorLog(err.message);
              res.send(err);
            }
            else {
              sp.previousClients.push(req.body.userId);
              sp.save(function (err) {
                if (err) {
                  globalCTRL.addErrorLog(err.message);
                  res.send(err);
                }
                else {
                  res.send("Booking is confirmed");
                }
              });
            }
          })
        }
      }
    })
  },

  //tested
  //required for testing
  viewAllUsers: function (req, res) {
    User.find(function (err, users) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send(users);
      }
    })
  },
  //tested
  submitServiceProviderComplain: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    //validating
    req.checkBody('providerId', 'providerId is required').isMongoId();
    req.checkBody('complain', 'complain is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    ServiceProvider.findOne({'serviceProviderAccountId':req.user._id},function(err,sp) {
      if(err)
      globalCTRL.addErrorLog(err);
      if(!sp)
      console.log('no sp found');
      else {

        //end validating
        let complain = new Complain(req.body);
        complain.providerId = sp._id;
        complain.isUserToProvider = false;
        complain.save(function (err, complain) {
          if (err) {
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          } else {
            res.send(200)
          }
    })
  }  })
  },


  //tested
  serviceProviderSignupStep2: function (req, res) {

    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('legalProof', 'legalProof is required').notEmpty();
    req.checkBody('entertainmentType', 'entertainment Types are required').notEmpty().isArray();
    req.checkBody('branches', 'branches are required').notEmpty().isArray();
    req.checkBody('contactMobile', 'mobile numbers are required').notEmpty().isArray();
    req.checkBody('mediaTypes', 'media Types are required').isArray();

    var errors = req.validationErrors();
    if (errors) {
      res.send({ 'stepTwoOK': 0, 'validationErrors': errors });
      return;
    }
    else {
      let newSP = new ServiceProvider();
      newSP.title = req.body.title;
      newSP.description = req.body.description;
      newSP.legalProof = req.body.legalProof;
      newSP.entertainmentType = req.body.entertainmentType;
      newSP.branches = req.body.branches;
      newSP.contactMobile = req.body.contactMobile;
      newSP.serviceProviderAccountId = req.user._id;
      newSP.activities = [];
      newSP.media = [];
      newSP.previousClients = [];
      newSP.subscribedUsers = [];
      newSP.banned = 0;

      if (req.files && req.files.length > 0) {
        for (var i = 0; i < req.files.length; i++) {
          newSP.media.push({ "type": req.body.mediaTypes[i], "url": req.files[i].path });
        }
      }

      newSP.save(function (err) {
        if (err) {
          globalCTRL.addErrorLog(err.message);
          res.send({ 'stepTwoOK': 0, 'errors': err });
        }
        else {
          console.log(newSP);
          res.send({ 'stepTwoOK': 1, 'spProfile': newSP });
        }

      });
    }

  },
viewProviderBookings: function (req, res) {
    ServiceProviderCTRL.isServiceProvider(req, res);
    Booking.find({ serviceProviderId: req.session.serviceProvider._id, isCancelled: false, isConfirmed: false }).exec(function (err, bookings) {
      if (err) {
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send(bookings);
      }
    })
  },



  viewBirthDayClients: function (req, res) {
    // var clients = new Array(req.session.serviceProvider.previousClients);
    // var birthDayClients = new Array();
    // var count = 0;

    //   for(var i=0; i<clients.length; i++){

    //   User.findOne({_id: clients[i]._id}, function(err, client){
    //     if(err){
    //       res.send(err.message);
    //     }
    //     else{
    //       var today=(new Date()).toString();
    //       var birthday= Date(client.birthDate);
    //       console.log(today)
    //       console.log(birthday)

    //       var dayToday   = today.slice(8, 10);
    //       var monthToday = today.slice(4, 7);

    //       var dayBD   = birthday.slice(8, 10);
    //       var monthBD = birthday.slice(4, 7);
    //       console.log(dayBD)
    //       console.log(monthBD)
    //       if( dayToday==dayBD && monthToday==monthBD ){
    //         birthDayClients[count]=client;

    //         count++;
    //       }
    //   }
    // })

    // }

    const date = new Date("2017-03-31 00:00:00.000Z");

    // User.find({}, function (err, users) {
    //   users.map(function (user) {
    //     User.findByIdAndUpdate({
    //       _id: user._id
    //     }, {
    //         $set: {
    //           birthDate: new Date(date.setUTCHours(date.getUTCHours() + 24))
    //         }
    //       }, { new: true }, function (err, user) {
    //         console.log(user);
    //       });
    //   });
    // });

    const today = new Date();
    const currentDay = today.getUTCDate();
    const currentMonth = today.getUTCMonth() + 1;

    User.find({}, function (err, users) {
      const filteredUsers = users.filter(function (user) {
        const birthDate = new Date(user.birthDate);

        const birthDay = birthDate.getUTCDate();
        const birthMonth = birthDate.getUTCMonth() + 1;

        return (currentDay === birthDay && currentMonth === birthMonth) ? true : false;
      });

      res.send(filteredUsers);
    });

    // console.log("birthDayClients")
    // console.log(birthDayClients)
    // res.send(birthDayClients);

  },


  promoteToHistoryClient: function (req, res) {

    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'Hotmail',
      auth: {
        user: 'fasa7ny@outlook.com', // Your email id
        pass: 'ITJumoynyoj1' // Your password
      }
    }));
    var mailOptions = {
      from: 'fasa7ny@outlook.com', // sender address
      to: req.body.userAccountId.email,
      subject: 'HAPPY BIRTHDAY TO YOU', // Subject line
      html: '<p>It is our pleasure to invite you to join any of our activities on your Birthday </p> '
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        res.send('promoted succesfully successfully');
      };
    });

  }

}

module.exports = ServiceProviderCTRL;
