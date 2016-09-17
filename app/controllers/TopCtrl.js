"use strict";

app.controller("TopCtrl", function($scope, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;
  let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user.uid;
      $scope.isLoggedIn = true;
      console.log("Current user logged in?", user.uid);
    } else {
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
    }
      $scope.apply();
  });

  $scope.getUser = function() {
    // console.log(currentUser)
    return currentUser;
  };

  $scope.logout = function () {
    AuthFactory.logoutUser()
    .then(function(data) {
      console.log("logged out", data);
    });
  };

  $scope.goToAddNew = function () {
    console.log('you clicked goToAddNew')
      $window.location.href = "#/newchore";
    };

    $scope.goToAllChores = function () {
    console.log('you clicked goToAllChores')
      $window.location.href = "#/allchores";
    };

});
