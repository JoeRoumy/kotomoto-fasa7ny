let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/user');
let Booking         = require('../models/booking');
let Activity        = require('../models/activity');
let Offer           = require('../models/offer');
let Account           = require('../models/account');
let Review           = require('../models/review');
let globalCTRL=require('../controllers/globalCTRL.js');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


let visitorCTRL={
  //tested
  //1.9
  shareOnSocialMedia:function(req, res){
    //validating
    req.checkBody('url','url is required').isURL();
    req.checkBody('socialService','socialService is either facebook, twitter or google').isIn(["facebook","twitter","google"]);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }

    //end validating
    switch(req.body.socialService){
      case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
      case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url="+req.body.url);break;
      case 'google': res.redirect("https://plus.google.com/share?url="+req.body.url);break;
    }
  },

  //tested
  // 1.3 filtering activities
  viewActivities:function(req,res){
    Activity.find(function(err,activities){
      if(err)
      {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      }else
      {
        res.send({activities})
      }
    })
  },

  //tested
  //1.5 As a visitor, I can search for activities either by name or type or day to find certain activities directly
  searchForActivities:function(req,res){
    //validating
    //req.checkBody('input','input is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    req.params.searchInput=req.params.searchInput=='_'?'':req.params.searchInput;
    req.params.day=req.params.day=='_'?'':req.params.day;
    //end validating
    Activity.$where('(this.title.includes("'+req.params.searchInput+'") ||  this.type.includes("'+req.params.searchInput+'")) && (this.timings.filter(function(timing){return timing.day.includes("'+req.params.day+'")}))').exec(
      function(err, activities){
        if(err){
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }
        else{
          Offer.find().exec(function(err,offers){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }
            else{
              res.send({activities,offers});
            }
          })
        }
      })
    },
    //tested
  filterActivitiesBy:function(req, res){
      req.session.j=1;
      if(req.params.filter=="price")
      {
        console.log(req.params.value);
        Activity.$where('this.prices[0].price > parseInt('+req.params.value+')').limit(10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            Offer.find().exec(function(err,offers){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else{
                res.send({activities,offers});
              }
            })
          }
        })
      } else 	if(req.params.filter=="offer")
      {
        console.log("okokokok");
        Activity.find({isOffer: 1}).limit(10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            Offer.find().exec(function(err,offers){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else{
                res.send({activities,offers});
              }
            })
          }
        })
      }else
      // if(req.body.filter=="location")
      // {
      //   Activity.find({location: req.body.value}).limit(10).exec(function(err,activities){
      //     if(err){
      //       globalCTRL.addErrorLog(err.message);
      //       res.send(err.message);
      //     }else {
      //       res.send({activities});
      //     }
      //   })
      // }
      // else
      	if(req.params.filter=="theme")
      {
        Activity.find({theme: req.params.value}).limit(10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            Offer.find().exec(function(err,offers){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else{
                res.send({activities,offers});
              }
            })
          }
        })
      }
      else 	if(req.params.filter=="rating")
      {
        Activity.$where('this.rating >' + req.params.value).limit(10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            Offer.find().exec(function(err,offers){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else{
                res.send({activities,offers});
              }
            })
          }
        })
      }else {
        res.send("invalid filter");
      }


    },

    filterActivitiesByNext:function(req, res){
      req.session.j++;
      if(req.body.filter=="price")
      {
        Activity.find({prices: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            res.send({activities});
          }
        })
      } else 	if(req.body.filter=="offer")
      {
        Activity.find({isOffer: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            res.send({activities});
          }
        })
      }else 	if(req.body.filter=="location")
      {
        Activity.find({location: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            res.send({activities});
          }
        })
      }
      else 	if(req.body.filter=="theme")
      {
        Activity.find({theme: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            res.send({activities});
          }
        })
      }
      else 	if(req.body.filter=="count")
      {
        Activity.find({count: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else {
            res.send({activities});
          }
        })
      }else{
        res.send("invalid filter")
      }


    },



    filterActivitiesByPrev:function(req, res){
      if(req.session.j!=1){
        req.session.j--;}
        if(req.body.filter=="price")
        {
          Activity.find({prices: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }else {
              res.send({activities});
            }
          })
        } else 	if(req.body.filter=="offer")
        {
          Activity.find({isOffer: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }else {
              res.send({activities});
            }
          })
        }else 	if(req.body.filter=="location")
        {
          Activity.find({location: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }else {
              res.send({activities});
            }
          })
        }
        else 	if(req.body.filter=="theme")
        {
          Activity.find({theme: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }else {
              res.send({activities});
            }
          })
        }
        else 	if(req.body.filter=="count")
        {
          Activity.find({count: req.body.value}).limit(10).skip((req.session.j-1)*10).exec(function(err,activities){
            if(err){
              globalCTRL.addErrorLog(err.message);
              res.send(err.message);
            }else {
              res.send({activities});
            }
          })
        }else{
          res.send("invalid filter")
        }


      },

      //1.2
      //tested
      viewAllServiceProvidersCommentedByTweety:function(req, res){
        if(!req.session.pageID){
          req.session.pageID=1;

        }
        if(req.body.page){
          req.session.pageID=req.body.page;
        }

        ServiceProvider.find({Approved:1}).skip(10*(req.session.pageID-1)).limit(11).populate({path:'activities'}).exec(function(err, providers){

          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else
          {
            res.send(providers);
          }
        })

      },

      viewAllServiceProviders:function(req, res){

        ServiceProvider.$where('this.Approved == 1').exec(function(err, providers){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else
          {
            res.send(providers);
          }
        })

      },

      //tested
      //view service provider with all its activities
      viewServiceProvider:function(req, res){
        //validating
        req.checkBody('providerId','providerId is required').isMongoId();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        ServiceProvider.findOne({ _id :req.body.providerId,Approved:1})
        .populate({path: 'activities', options:{sort:{'rating':-1}}})
        .exec( function(err, provider){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }else   {
            //get number of booked users for this service provider
            Booking.aggregate(
              {$group: {_id: req.body.activityId, count: {$sum:1}}},
              {$sort: {count:-1}},
              {$limit: 1},
              (function(err,booking)
              {
                if(err){
                  res.send(err.message);
                }
                else{
                  //get best seller activity
                  Activity.findOne({_id:booking.activityId},function(err,bestSelledActivity){
                    if(err){
                      globalCTRL.addErrorLog(err.message);
                      res.send(err.message);
                    }
                    else{
                      //get newest offer
                      Offer.find().sort({'_id':-1}).limit(1).populate({path: 'activities'}).exec(function(err, hottestOffer){
                        if(err){
                          globalCTRL.addErrorLog(err.message);
                          res.send(err.message);
                        }
                        else{
                          res.send({provider,bestSelledActivity, hottestOffer});
                        }
                      })
                    }
                  })
                }	})
              )}
            })
          },

          //1.1 explore differet activities
          //tested
          getDifferentActivities:function(req,res){
            req.session.j=1;
            Activity.find().limit(10).exec(function(err,ACs)
            {
              if(err)
              {
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else

              {
                res.send({ACs});
              }
            })
          },

          getDifferentActivitiesnext:function(req,res){
            req.session.j++;
            Activity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,ACs)
            {
              if(err)
              {
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else

              {
                res.send({ACs});
              }
            })
          },

          getDifferentActivitiesprev:function(req,res){
            if(req.session.J!=1){
              req.session.j--;
            }

            Activity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,Acs)
            {
              if(err)
              {
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }
              else

              {
                res.send({ACs});
              }
            })

          },

          viewFAQ:function(req,res){
            res.send("viewFAQ is a static HTML page");
            //viewFAQ is a static HTML page
          },


          registerAsUser:function(req, res){
            //validating
            req.checkBody('firstName','firstName is required and contain letters only').isAlpha();
            req.checkBody('lastName','lastName is required and contain letters only').isAlpha();
            req.checkBody('userAccountId','userAccountId is required').isMongoId();
            req.checkBody('birthDate','birthDate should be in  valid in the following format: 2017-04-20T00:00:00.000Z').isISO8601(); //check if the string is a valid ISO 8601 date.
            req.checkBody('age','age should be a postive number').optional().isInt({min:1,max:100});
            req.checkBody('gender','gender should be a Boolean').isBoolean();
            req.checkBody('privacy','privacy should be a number').isInt();
            req.checkBody('mobileNumber','mobileNumber should be numeric').isNumeric();
            var errors = req.validationErrors();
            if (errors) {
              res.send(errors);
              return;
            }
            //end validating
            let user=new User(req.body);
            user.save(function(err, user){

              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
              }else
              {
                res.redirect('/');
              }
            })
          },


                    //2.1.2 recover password
                    recoverPassword:function(req,res){
                      //validating
                      req.checkBody('userName','userName is required').notEmpty();
                      var errors = req.validationErrors();
                      if (errors) {
                        res.send(errors);
                        return;
                      }
                      //end validating
                      Account.findOne({"userName": req.body.userName}, function(err, user){
                        if(err){
                          globalCTRL.addErrorLog(err.message);
                          res.send(err);
                        }
                        else{
                          if(!user){
                            res.send("no account with this username");
                          }
                          randomPass=randomstring.generate(12);//generating randompass
                          user.password=user.generateHash(randomPass);
                          user.save(function(err){
                            if(err){
                              globalCTRL.addErrorLog(err.message);
                              res.send(err);
                            }
                            else{
                              var transporter = nodemailer.createTransport(smtpTransport({
                                service: 'Hotmail',
                                auth: {
                                  user: 'fasa7ny@outlook.com', // Your email id
                                  pass: 'ITJumoynyoj1' // Your password
                                }
                              }));

                              var mailOptions = {
                                from: 'fasa7ny@outlook.com', // sender address
                                to: user.email, // list of receivers
                                subject: 'Change Password', // Subject line
                                //text: text //, // plaintext body
                                html: "Your password for now is "+randomPass// You can choose to send an HTML body instead
                              };
                              transporter.sendMail(mailOptions, function(error, info){
                                if(error){
                                  globalCTRL.addErrorLog(error);
                                  res.send(error);
                                }else{
                                  res.send('Message sent: ' + info.response);
                                };
                              });
                            }
                          })


                        }
                      })

                    },


          //tested
          signupForNewsletter:function(req,res){
            //validating
            req.checkBody('email','valid email is required').isEmail();
            var errors = req.validationErrors();
            if (errors) {
              res.send(errors);
              return;
            }
            //end validating
            let newAccount = new Account();
            newAccount.userName=newAccount._id;//visitor doesn't need to login to subscribe
            newAccount.password=newAccount._id;
            newAccount.email=req.body.email;
            newAccount.type=2;
            newAccount.save(function(err){
              if(err){
                if(err.message.includes("duplicate"))
                res.send("email already signed up");
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else {
                res.send(200);
              }
            })
          },
          //tested
          unsubscribeForNewsletter:function(req,res){
            //validating
            req.checkBody('email','valid email is required').isEmail();
            var errors = req.validationErrors();
            if (errors) {
              res.send(errors);
              return;
            }
            //end validating
            Account.findOne({email:req.body.email}).remove().exec(function(err){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else {
                res.send(200);
              }
            })
          },
          getStatistics:function(req,res){
            Activity.count().exec(function(err,activityCount){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else {
                ServiceProvider.count({approved:0}).exec(function(err,SPcount){
                  if(err){
                    globalCTRL.addErrorLog(err.message);
                    res.send(err);
                  }else {
                    Booking.count({isCancelled:0}).exec(function(err,BookingsCount){
                      if(err){
                        globalCTRL.addErrorLog(err.message);
                        res.send(err);
                      }else {
                        res.send({'activityCount':activityCount,'SPcount':SPcount,'BookingsCount':BookingsCount})
                      }
                    })
                  }
                })
              }

            })
          },
          getNearbyActivities:function(req,res){
            Activity.$where('(Math.abs(parseFloat((this.location.split(","))[0])-parseFloat('+req.body.lat+'))<0.2) && (Math.abs(parseFloat((this.location.split(","))[1])-parseFloat('+req.body.long+'))<0.2)').exec(
              function(err,activities){
                if(err){
                  globalCTRL.addErrorLog(err.message);
                  res.send(err);
                }else{
                  res.send({activities});
                }
              })
          },
          getActivityById:function(req,res){
            Activity.findOne({_id:req.params.activityID}).populate('serviceProviderId').exec(function(err,activity){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else{
                res.send({activity});
              }
            })
          },
          getLatest6Reviews:function(req,res){
            Review.$where('this.rate>=4')
            .sort({time: -1})
            .limit(6)
          //  .populate([{path:'userId', select:'firstName lastName profilePicture'},{path:'activityId', select:'title'}])
            .populate('userId', {firstName: 1, lastName: 1,profilePicture: 1,gender :1})//get only this attributes from the populate
            .populate('activityId',{title:1})
            .exec(
              function(err,reviews){
                if(err){
                  globalCTRL.addErrorLog(err.message);
                  res.send(err);
                }else{
                  Review.count().exec(function(err,reviewsCount){
                    if(err){
                      globalCTRL.addErrorLog(err.message);
                      res.send(err);
                    }else{
                      res.send({reviews,reviewsCount});
                    }
                  })
                }
              })
          },
          getActivityReviews:function(req,res){
            Review.find({activityId:req.body.activityID})
            .sort({time: -1})
          //  .populate([{path:'userId', select:'firstName lastName profilePicture'},{path:'activityId', select:'title'}])
            .populate('userId', {firstName: 1, lastName: 1,profilePicture: 1,gender :1})//get only this attributes from the populate
            .populate('activityId',{title:1})
            .exec(
              function(err,reviews){
                if(err){
                  globalCTRL.addErrorLog(err.message);
                  res.send(err);
                }else{
                  res.send(reviews);
                }
              })
          },
          getTopRatedActivities:function(req,res){
            Activity.find().sort([['rating', -1], ['ratingCount', -1]])
            .limit(6)
            .exec(function(err,activities){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else{
                res.send({activities});
              }
            })
          },
          getFeaturedActivities: function(req,res){
            ServiceProvider.$where('this.isGolden==true').populate('activities').exec(function(err,serviceProviders){
              if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err);
              }else{
                let activities=[];
                for(var i=0;i<8;i++){
                  let randomServiceProvider= serviceProviders[Math.floor(Math.random() * serviceProviders.length)];//getting random golden sp
                  activities.push(randomServiceProvider.activities[Math.floor(Math.random() * randomServiceProvider.activities.length)]);// getting random activity from this sp
                }
                res.send({activities});
              }
            })
          }

}
        module.exports = visitorCTRL;
