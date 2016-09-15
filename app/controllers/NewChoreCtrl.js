"use strict";
console.log('NewChoreCtrl connected')
app.controller("NewChoreCtrl", function ($scope, ChoreFactory, $location, $window){

let hId;
let houseID;
let householdMembersObj;
let householdMembersArr = [];
let houseMem1;
let houseMem2;

angular.element(document).ready(function () {
    console.log('page loading completed');
});


$scope.title = "Add This Week's Chores";
$scope.btnText = "Save That Nasty Chore!";
$scope.newChore = {
    name: '',
    description: '',
    dueDate: '', //when pushing to FB, was registering a blank string until you put in ng-model to the partial, now it's not registering at all as a key on newChore
    irritationPoints: '',
    assignedMember: '',
    completed: false
};
$('select').material_select();
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 3 // Creates a dropdown of 3 years to control year
  });

$scope.accesshousehold = () =>{
    hId = $scope.$parent.getUser();
    console.log('you are inside accesshousehold, this is the first result, a user ID:', hId);
    ChoreFactory.getHouseholdId(hId)
    .then((results) => {
        houseID = results;
        console.log('you are inside accesshousehold, this should be the info you want to pass in to get members: ', houseID)
        ChoreFactory.getHouseholdMembers(houseID)
        .then((householdMembers) => {

            console.log('you are inside accesshousehold', householdMembers)
            for (var prop in householdMembers) {
                console.log('hello');
                console.log(householdMembers[prop].name)
                householdMembersArr.push(householdMembers[prop].name)
                console.log(householdMembersArr)
                houseMem1=householdMembersArr[0];
                houseMem2=householdMembersArr[1];
            }
            console.log('this is houseMem1', houseMem1, 'this is houseMem2', houseMem2)
            console.log('woot!')
        })
    })
}
$scope.addNewChore =  () => {

    $scope.newChore.householdId = houseID;
    // let anotherKey;
    // let memberResults;
    // $scope.newChore.householdId = $scope.$parent.getUser();
    // console.log('you clicked addnewchore', $scope.newChore);
    ChoreFactory.postNewChore($scope.newChore)
    .then((result) => {
        console.log('wow! you posted a chore!', result);

    });
}
    // accesshousehold();
});




