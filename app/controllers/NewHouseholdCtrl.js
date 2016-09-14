"use strict";
console.log("NewHouseholdCtrl connected")
app.controller("NewHouseholdCtrl", function ($scope, ChoreFactory, $location) {

$scope.title = "Register Your HouseHold";
$scope.btnText = "Save";

$scope.newHouse = {
    name: '',
    member1: '',
    member2: '',
    householdId: ''
};

$scope.addNewHouse = () => {
    $scope.newHouse.householdId = $scope.$parent.getUser();
        console.log('you clicked addnewhouse', $scope.newHouse)
        ChoreFactory.addNewHouse($scope.newHouse)
        .then((result) => {
            console.log('this is the household registered', result)
            $location.url('/newchore');
       });
    };
});
