"use strict";
console.log('app js connected')
var app = angular.module("ChoreApp", ["ngRoute", "ui.materialize"])
.constant('FirebaseURL','https://its-chore-turn.firebaseio.com');


app.config(function($routeProvider){

    let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>
     {
        if(AuthFactory.isAuthenticated()) {
            resolve();
        } else {
            reject();
        }
    })

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
        }).

        when("/allchores", {
            templateUrl: "partials/allchores.html",
            controller: "AllChoresCtrl"
        }).

        when("/home", {
            templateUrl: "partials/landing.html",
            controller: "LandingCtrl"
        }).

        // when("/howdoesitwork", {
        //     templateUrl: "partials/showme.html"
        // }).

        when("/choreturn", {
            templateUrl: "partials/choreturn.html",
            controller: "ChoreTurnCtrl"
        }).

        // when("/modal1", {
        //     templateUrl: "partials/showme.html"
        //     // controller: "ModalCtrl"
        // }).

        //apparently there needs to be consistency between quotation marks (single vs double) for this config to work!!!!
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
