"use strict";
console.log('app js connected')
var app = angular.module("ChoreApp", ["ngRoute"])
.constant('FirebaseURL','https://its-chore-turn.firebaseio.com');


app.config(function($routeProvider){

    let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>
     {
        if(AuthFactory.isAuthenticated()) {
            resolve();
        } else {
            reject();
        }
    });

    $routeProvider.
        when("/", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/allboards", {
            templateUrl: 'partials/allBoards.html',
            controller: "AllBoardsCtrl",
            resolve: {isAuth}
        }).

        when("/allpins", {
            templateUrl: 'partials/pinListView.html',
            controller: "PinListViewCtrl",
            resolve: {isAuth}
        }).

        // when("/:pinId", {
        //     templateUrl: "partials/savePin.html",
        //     controller: "SavePinCtrl",
        // }).

        when("/board/:boardId", {
            templateUrl: "partials/oneBoard.html",
            controller: "OneBoardCtrl",
            resolve: {isAuth}
        }).

        when("/newboard", {
            templateUrl: "partials/newBoard.html",
            controller: "NewBoardCtrl",
            resolve: {isAuth}
        }).

         when("/newpin", {
            templateUrl: "partials/newPin.html",
            controller: "NewPinCtrl",
            resolve: {isAuth}
        }).

         when('/:boardId/edit', {
            templateUrl: "partials/newBoard.html",
            controller: "EditBoardCtrl",
            resolve: {isAuth}
        }).

        when('/:pinId/pinedit', {
            templateUrl: "partials/newPin.html",
            controller: "EditPinCtrl",
            resolve: {isAuth}
        }).
        otherwise("/");
});


app.run( ($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});
