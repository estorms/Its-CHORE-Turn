"use strict";

app.controller("AllChoresCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location) {

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

$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    hId = user;
    accesshousehold();
})





let accesshousehold = () =>{
    // hId = $scope.$parent.getUser();
    console.log('you are inside accesshousehold, this is the first result, a user ID:', hId);
    ChoreFactory.getHouseholdId(hId)
    .then((results) => {
        houseID = results;
        console.log('you are inside accesshousehold, this should be the info you want to pass in to get members: ', houseID)
        ChoreFactory.getHouseholdMembers(houseID)
        .then((householdMembers) => {

              console.log('you are inside accesshousehold, these are your household members', householdMembers)
                for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersArr.push(householdMembers[prop])
                householdMembersNamesArr.push(householdMembers[prop].name)
                console.log('names array', householdMembersNamesArr, 'members array', householdMembersArr)
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
                console.log(householdMembersArr);
                console.log(householdMembersNamesArr);
                }
                householdMembersArr.forEach(function (member) {
                console.log(member, member.id);
                ChoreFactory.updateMembers(member.id, member)
                 .then((results) =>{
                   console.log('These are the results of updateMembers', results)
                 });
             });
          });
            chorePop();

        });
    };




let chorePop = () => {

  ChoreFactory.getAllChores(houseID)
    .then( (choresObj) => {
      $scope.chores = choresObj;
        console.log("the result of call to getAllChores", choresObj);
      choresObj.forEach(function (chore) {
        choreId = chore.id;
        ChoreFactory.updateChore(choreId, chore)
        .then((result) =>{
          console.log('this is the result of updateChore', result)
        })
      });
    });
  };




$scope.deleteChore = (choreId) => {
  console.log('you are inside delete chore; this is the choreId', choreId, 'you are inside delete chore; this is the $scope.chore.choreId')
    let choreDeleteToast = `<span><h6>Warning! You are deleting this chore without completing it! No one will earning points!</h6></span>`;
    Materialize.toast(choreDeleteToast, 2500)
  //I think the last choreID created in getchores above is what's preserved here and therefore the last chore is the one being completed, no matter what
    ChoreFactory.deleteAChore(choreId)
    .then( () => {
      console.log('you deleted that chore, badass');
      ChoreFactory.getAllChores(houseID)
      .then( (choresObj) => {
        $scope.chores = choresObj;
     })
  })    // $location.url("#/chore..s");
}


$scope.completeChore = (choreId) => {

  ChoreFactory.getSingleChore(choreId)
  .then( (result) =>{
    console.log('this is the result of getSingleChore outside the loop', result)
    singleChore = result;
      for (var key in singleChore) {
      singleChore = singleChore[key];
      // console.log('singleChore now that it has been through for-in', singleChore)
      }
      singleChore.completed = true;
      singleChore.frequency = singleChore.frequency - 1;

      ChoreFactory.updateChore(choreId, singleChore)
      .then((result) => {
        // console.log('this is the result of updateChore', result)
         chorePoints = result.irritationPoints;
        // move these up so that as you update chore, you're decrementing frequency
        let assignedMember = result.assignedMember;
         frequencyLimit = result.frequency;
        // console.log('these should be chorepoints', chorePoints, 'this should be an assigned member', assignedMember)
        // console.log(chorePoints)
        // console.log(householdMembersArr)

        for (var i = 0; i < householdMembersArr.length; i++){
          if( householdMembersArr[i].name === assignedMember) {
            // console.log('we have a match')
            selectedMember = householdMembersArr[i]
            // console.log('this should be a member with an id on it', selectedMember)
            houseMemID = selectedMember.id
          }
        }
        ChoreFactory.getSingleMember(houseMemID)
        .then((result) => {
          singleMember = result;
            for (var key in singleMember) {
            singleMember = singleMember[key];
            }
              console.log('frequencyLimit', frequencyLimit)
             alreadyPoints = parseInt(singleMember.pointsEarned);
              if (frequencyLimit >= 0) {
                console.log('this is the frequencyLimit above zero', frequencyLimit)
                chorePointsNum = parseInt(chorePoints);
                singleMember.pointsEarned = alreadyPoints + chorePointsNum
                let memberId = singleMember.id
                let choreCompleteToast = `<span><h5>Good job, ${assignedMember}! You've earned ${chorePointsNum} points for completing this chore!</h5></span>`
                Materialize.toast(choreCompleteToast, 2500)

                ChoreFactory.updateSingleMember(memberId, singleMember)
                .then( (result) =>{
                  console.log('here is your updated member, check their pointsEarned, bitches', result)
                 ChoreFactory.getAllChores(houseID)
                 .then( (choresObj) => {
                  console.log('this is the chores obj, which means you can ignore the colors?', choresObj)
                  $scope.chores = choresObj;
                 })
              });
            }

            else {
              let cheatingToast = `<span><h5>No cheating, ${assignedMember}! You've completed this chore for the week!</h5></span>`
              Materialize.toast(cheatingToast, 2500);
            }
        });
    });
});

};

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
});
