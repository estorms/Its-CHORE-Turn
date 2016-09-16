"use strict";

app.controller("AllChoresCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location){


let hId;
let houseID;
let householdMembersObj;
let householdMembersArr = [];
$scope.houseMem1;
$scope.houseMem2;

$scope.accesshousehold = () =>{
    hId = $scope.$parent.getUser();
    console.log('you are inside accesshousehold, this is the first result, a user ID:', hId);
    ChoreFactory.getHouseholdId(hId)
    .then((results) => {
        houseID = results;
        console.log('you are inside accesshousehold, this should be the info you want to pass in to get members: ', houseID)
        ChoreFactory.getHouseholdMembers(houseID)
        .then((householdMembers) => {

            console.log('you are inside accesshousehold, these are your household members', householdMembers)
            for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersArr.push(householdMembers[prop].name)
                console.log(householdMembersArr)
                $scope.houseMem1=householdMembersArr[0];
                $scope.houseMem2=householdMembersArr[1];
            }
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('woot!')
        })
    })
}
$scope.chores = [];


    ChoreFactory.getAllChores(houseID)
console.log('this is what you are calling  to all chores with', houseID, 'it should be  -KRnQ7lPnMu7UOMbeH6L')
    .then( (choresObj) => {
      $scope.chores = choresObj;
        console.log("the result of call to getAllChores", choresObj);

      choresObj.forEach(function (chore) {
        $scope.choreId = chore.id;
        // console.log(board);
        ChoreFactory.updateChore($scope.choreId, chore)
        .then((result) =>{
          console.log(result)
        })
        console.log("choreId", $scope.choreId);
      });
    });


$scope.deleteChore = () => {
  console.log('you are inside delete chore; this is the choreId', $scope.choreId)
  ChoreFactory.deleteAChore($scope.choreId)
  .then( (result) => {
    console.log('you deleted that chore, badass', result)
  })
}

$scope.completeChore = () => {
console.log('you are inside completeChore, you need to access this array, pluck out the one you are clicking on, and then update the completed property to true', $scope.chores)

}
});
