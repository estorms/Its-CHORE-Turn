"use strict";
console.log('app.js connected');

var app = angular.module("ChoreApp", ["ngRoute"])

.constant('FirebaseURL', 'https://its-chore-turn.firebaseio.com');

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: '/partials/flower-arrangements.html',
            controller: "flowerCtrl"
        });
    });

app.run( ($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});
