"use strict";
console.log("NavCtrl connected")
app.controller("NavCtrl", function($scope, $location) {
    // $scope.searchText = SearchTermData;
    $scope.navItems = [    //create an array of objects
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: '#/login', name: "Login", showState: "!$parent.isLoggedIn"},

            {url: '#/newchore', name: "New Chore", showState: "$parent.isLoggedIn"},
            {url: '#/newhousehold', name: "New Household", showState: "$parent.isLoggedIn"},
            {url: '#/allchores', name: "All Chores", showState: "$parent.isLoggedIn"}
            // {url: '#/newpin', name: "New Pin", showState: "$parent.isLoggedIn"}

    ];

    $scope.isActive = (viewLocation) => viewLocation === $location.path();

    // $scope.goToAddNew = function () {
    // console.log('you clicked goToAddNew')
    //   $location.url('/newchore');
    // }
});
