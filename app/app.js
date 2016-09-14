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

        when("/newchore", {
            templateUrl: "partials/newchore.html",
            controller: "NewChoreCtrl"
        }).
        when("/newhousehold", {
            templateUrl: "partials/newhousehold.html",
            controller: "NewHouseholdCtrl"
        }). //apparently there needs to be consistency between quotation marks (single vs double) for this config to work!!!!
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
