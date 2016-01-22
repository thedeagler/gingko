(function() {
  'use strict';

  angular.module('app')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['userFactory', 'userData'];

  function UserCtrl(userFactory, userData) {
    console.log("userData: ", userData);

    var self = this;
    self.starview = 'host';
    self.makeStarArr = function(rating) {
      var fullStarPath = '../../styles/star.png';
      var halfStarPath = '../../styles/star-half.png';
      var emptyStarPath = '../../styles/star-empty.png';
      var starArr = [emptyStarPath, emptyStarPath,
        emptyStarPath, emptyStarPath, emptyStarPath
      ];
      var i = 0;
      while (i < rating) {
        if (i + 0.5 === rating) {
          starArr[i] = halfStarPath;
        } else {
          starArr[i] = fullStarPath;
        }
        i++;
      }
      return starArr;
    };

    // userFactory.getUserInfo(function(user) {
    self.hostrating = self.makeStarArr(4);
    self.guestrating = self.makeStarArr(5);
    self.firstName = userData.data.firstName;
    self.lastName = userData.data.lastName;
    self.facebookImg= userData.data.profilePicture;
    self.email = userData.data.email;
    self.numhostratings = 3;
    self.numguestratings = 10;

    // Getting data from Facebook - userFactory method called
    userFactory.getFacebookInfo(function(fbInfo) {
      self.user.facebookId = fbInfo.facebookId;
      self.user.name = fbInfo.username;
      self.user.userId = fbInfo.id;
      self.user.facebookImg = 'http://graph.facebook.com/v2.5/' + fbInfo.facebookId + '/picture?type=large';
    });

    // console.log('User Info ' + JSON.stringify(self.user));
  }

})();
