"use strict";

app.controller("AllChoresCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location){


let hId;
let houseID;
let householdMembersObj;
let householdMembersNamesArr = [];
let householdMembersArr=[];
$scope.chores = [];
let singleChore;
let choreId;

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
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
                householdMembersArr.push(householdMembers[prop])
                householdMembersNamesArr.push(householdMembers[prop].name)
                console.log('names array', householdMembersNamesArr, 'members array', householdMembersArr)
                $scope.houseMem1=householdMembersNamesArr[0];
                $scope.houseMem2=householdMembersNamesArr[1];
                console.log(householdMembersArr)
                console.log(householdMembersNamesArr)
                }
                householdMembersArr.forEach(function (member) {
                console.log(member, member.id)
                ChoreFactory.updateMembers(member.id, member)
                 .then((results) =>{
                   console.log('These are the results of updateMembers', results)
                 })
             })
          })
            chorePop()
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('woot!')
        })
    }




let chorePop = () => {
  // console.log('this is what you are calling  to all chores with', houseID, 'it should be  -KRnQ7lPnMu7UOMbeH6L')
  ChoreFactory.getAllChores(houseID)
    .then( (choresObj) => {
      $scope.chores = choresObj;
        console.log("the result of call to getAllChores", choresObj);

      choresObj.forEach(function (chore) {
        choreId = chore.id;
        // console.log(board);
        ChoreFactory.updateChore(choreId, chore)
        .then((result) =>{
          console.log('this is the result of updateChore', result)
        })
    //CHANGED THE ABOVE TO 'CHORE ID', it was working , but now I don't see where I'm attaching choreID to chore
      });
    });
  };




$scope.deleteChore = (choreId) => {
  console.log('you are inside delete chore; this is the choreId', choreId, 'you are inside delete chore; this is the $scope.chore.choreId')
  //I think the last choreID created in getchores above is what's preserved here and therefore the last chore is the one being completed, no matter what
  ChoreFactory.deleteAChore(choreId)
  .then( () => {
    console.log('you deleted that chore, badass');
  })
}


$scope.completeChore = () => {
console.log('you are inside completeChore, this is the choreID', $scope.choreId)
  ChoreFactory.getSingleChore($scope.choreId)
  .then( (result) =>{
    console.log('this is the result of getSingleChores', result)
    singleChore = result;
    for (var key in singleChore) {
    console.log(singleChore[key].completed);
    singleChore = singleChore[key];
    };
    console.log('this is single chore outside the loop', singleChore)
    singleChore.completed = true;
    console.log('this should show a single chore with a true completed value', singleChore)
    ChoreFactory.updateChore($scope.choreId, singleChore)
    .then((result) => {
      console.log('this is the result of updateChore', result)
    });
  });
};

});



// "use strict";

// app.controller("AllChoresCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location){


// let hId;
// let houseID;
// let householdMembersObj;
// let householdMembersNamesArr = [];
// $scope.houseMem1;
// $scope.houseMem2;
// $scope.chores = [];
// let singleChore;

// $scope.accesshousehold = () =>{
//     hId = $scope.$parent.getUser();
//     console.log('you are inside accesshousehold, this is the first result, a user ID:', hId);
//     ChoreFactory.getHouseholdId(hId)
//     .then((results) => {
//         houseID = results;
//         console.log('you are inside accesshousehold, this should be the info you want to pass in to get members: ', houseID)
//         ChoreFactory.getHouseholdMembers(houseID)
//         .then((householdMembers) => {

//             console.log('you are inside accesshousehold, these are your household members', householdMembers)
//             for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
//                 console.log('hello');
//                 console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.
//                 householdMembersNamesArr.push(householdMembers[prop].name)
//                 // console.log(householdMembersNamesArr)
//                 $scope.houseMem1=householdMembersNamesArr[0];
//                 $scope.houseMem2=householdMembersNamesArr[1];
//                 // console.log(householdMembers)
//             }
//             householdMembers.forEach(function (member) {
//                 ChoreFactory.updateMembers(houseID, member)
//                 .then((results) =>{
//                   console.log('These are the results of updateMembers', results)
//                 })
//             })
//             // ChoreFactory.updateMembers(houseID, householdMembers[0])
//             // .then((results) =>{
//             //   console.log('These are the results of updateMembers', results)
//             // })
//             chorePop();
//             console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
//             console.log('woot!')
//         });
//     });
// };



// let chorePop = () => {
//   // console.log('this is what you are calling  to all chores with', houseID, 'it should be  -KRnQ7lPnMu7UOMbeH6L')
//   ChoreFactory.getAllChores(houseID)
//     .then( (choresObj) => {
//       $scope.chores = choresObj;
//         console.log("the result of call to getAllChores", choresObj);

//       choresObj.forEach(function (chore) {
//         $scope.choreId = chore.id;
//         // console.log(board);
//         ChoreFactory.updateChore($scope.choreId, chore)
//         .then((result) =>{
//           console.log(result)
//         })
//         console.log("choreId", $scope.choreId);
//       });
//     });
//   };


// $scope.deleteChore = () => {
//   console.log('you are inside delete chore; this is the choreId', $scope.choreId)
//   ChoreFactory.deleteAChore($scope.choreId)
//   .then( () => {
//     console.log('you deleted that chore, badass')
//   })
// }


// $scope.completeChore = () => {
// console.log('you are inside completeChore, this is the choreID', $scope.choreId)
//   ChoreFactory.getSingleChore($scope.choreId)
//   .then( (result) =>{
//     console.log('this is the result of getSingleChores', result)
//     singleChore = result;
//     for (var key in singleChore) {
//     console.log(singleChore[key].completed);
//     singleChore = singleChore[key];
//     };
//     console.log('this is single chore outside the loop', singleChore)
//     singleChore.completed = true;
//     console.log('this should show a single chore with a true completed value', singleChore)
//     ChoreFactory.updateChore($scope.choreId, singleChore)
//     .then((result) => {
//       console.log('this is the result of updateChore', result)
//     });
//   });
// };

// });
