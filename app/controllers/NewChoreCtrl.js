"use strict";
console.log('NewChoreCtrl connected')
app.controller("NewChoreCtrl", function ($scope, ChoreFactory, $location){
// console.log($scope.$parent.getUser())
$scope.title = "Add This Week's Chores"; //need to have a way to retrieve saved chores from week to week
$scope.btnText = "Save That Nasty Chore!";
$scope.newChore = {
    name: '',
    description: '',
    frequency: '',
    irritationPoints: '',
    householdId: ''
};

$scope.addNewChore =  () => {
    $scope.newChore.householdId = $scope.$parent.getUser();
    console.log('you clicked addnewchore', $scope.newChore)
    ChoreFactory.addNewChore($scope.newChore)
    .then((result)=>{
        console.log(result)
        $location.url('#/newchore');
    });
};
});


