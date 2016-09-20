"use strict";

app.controller("ChoreTurnCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location) {

let hId;
let houseID;
let householdMembersNamesArr = [];
let householdMembersArr=[];
$scope.chores = [];
let singleChore;
let choreId;
let singleMember;
let houseMem1ID;
let houseMem2ID;
let selectedMember;
let houseMemID;
let alreadyPoints;
let chorePointsNum;
let frequencyLimit;
let chorePoints;

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
            for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersNamesArr.push(householdMembers[prop].name)
                householdMembersArr.push(householdMembers[prop])
                console.log('this is the householdMembersNamesArr', householdMembersNamesArr)
            }
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('woot!')
        })
    })
}

$scope.showPoints = () => {
  let houseMem1PointstoDate = householdMembersArr[0].pointsEarned
  let houseMem2PointstoDate = householdMembersArr[1].pointsEarned
  let houseMem1Name = householdMembersNamesArr[0];
  let houseMem2Name = householdMembersNamesArr[1];
  let showPointsToast = `<span><h5>${houseMem1Name} has ${houseMem1PointstoDate} points. ${houseMem2Name} has ${houseMem2PointstoDate} points.</h5></span>`
  Materialize.toast(showPointsToast, 2500)
}

$scope.choreTurn = () => {
  let houseMem1PointstoDate = householdMembersArr[0].pointsEarned
  let houseMem2PointstoDate = householdMembersArr[1].pointsEarned
  let houseMem1Name = householdMembersNamesArr[0];
  let houseMem2Name = householdMembersNamesArr[1];
  let pointsAhead;
  let choreTurnToast;
  if (houseMem1PointstoDate > houseMem2PointstoDate) {
    console.log(houseMem1Name, 'wins!')
    pointsAhead = houseMem1PointstoDate - houseMem2PointstoDate;
    choreTurnToast = `<span><h5>${houseMem1Name} has ${pointsAhead} more points to date than ${houseMem2Name}. You're on the hook, ${houseMem2Name}</h5></span>`

  }
    else if (houseMem2PointstoDate > houseMem1PointstoDate) {
      console.log(houseMem2Name, 'wins')
      pointsAhead = houseMem2PointstoDate - houseMem2PointstoDate;
      choreTurnToast = `<span><h5>${houseMem2Name} has ${pointsAhead} more points to date than $houseMem1Name}. You're on the hook, ${houseMem1Name}</h5></span>`

    }
    else{
      console.log('your points are identical. Looks like you need a divorce lawyer')
      choreTurnToast = `<span><h5>Your points are identical. Looks like you need a divorce lawyer</h5></span>`
    }
    Materialize.toast(choreTurnToast, 4000)
}

})
