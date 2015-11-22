(function() {
  'use strict';

  angular.module('app')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['userFactory'];

  function UserCtrl(userFactory) {

    var self = this;

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

    userFactory.getUserInfo(function(user) {
      user.hostrating = self.makeStarArr(user.hostrating);
      user.userrating = self.makeStarArr(user.userrating);
      self.user = user;
    });

    userFactory.getFacebookInfo(function(fbInfo) {
      //  Received data: {
      //   "id": 1,
      //   "username": "Michelle Lee",
      //   "facebookId": "10153694652967731",
      //   "createdAt": "2015-11-21T19:20:45.136Z",
      //   "updatedAt": "2015-11-21T19:20:45.136Z"
      // }
      self.user.facebookId = fbInfo.facebookId;
      self.user.name = fbInfo.username;
      self.user.facebookImg = 'http://graph.facebook.com/v2.5/' + fbInfo.facebookId + '/picture?type=large';
    });

    console.log('User Info ' + JSON.stringify(self.user));
  }

})();
