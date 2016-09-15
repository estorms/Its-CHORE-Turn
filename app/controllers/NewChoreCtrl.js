"use strict";
console.log('NewChoreCtrl connected')
app.controller("NewChoreCtrl", function ($scope, ChoreFactory, $location, $window){




// console.log($scope.$parent.getUser())
$scope.title = "Add This Week's Chores"; //need to have a way to retrieve saved chores from week to week
$scope.btnText = "Save That Nasty Chore!";
$scope.newChore = {
    name: '',
    description: '',
    dueDate: '',
    irritationPoints: '',
    householdId: '',
    assignedMember: '',
    completed: false
};
$('select').material_select();

  $('.datepicker').pickadate({

    selectMonths: true, // Creates a dropdown to control month
    selectYears: 3 // Creates a dropdown of 3 years to control year
  });


$scope.addNewChore =  () => {
    let householdkey = [];
    let anotherKey;
    let memberResults;

    $scope.newChore.householdId = $scope.$parent.getUser();
    console.log('you clicked addnewchore', $scope.newChore);
    ChoreFactory.getHouseholdId($scope.newChore.householdId)
    .then((result) => {
        console.log('this is the data from getHouseholdId it should be the houseid', result)
        anotherKey = result;
        console.log('this should also be the houseid', anotherKey);
        //this is
        ChoreFactory.getHouseholdMembers(anotherKey)
         //here you need to pass in the result of getHouseholdId, where you are going to index on houseID property of members. Maybe it is working and you just need to use it somewhere in DOM to get it displayed?
        .then((data) => {
            memberResults = data;
            console.log('this is the result of getHouseholdMembers', memberResults);
            $window.alert(memberResults)
            memberResults.forEach(function(member) {
                console.log(member)
            })

        })
        // $location.url('#/newchore');
    });
};

});


