"use strict";

app.controller("AllChoresCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location){

$scope.chores = [];

let householdId = $scope.$parent.getUser();

    ChoreFactory.getAllChores(householdId)
    .then( (choresObj) => {
      $scope.chores = choresObj;
        console.log("the result of call to getAllChores", choresObj);

      choresObj.forEach(function (chore) {
        let choreId = chore.id;
        // console.log(board);
        ChoreFactory.updateChore(choreId, chore)
        console.log("choreId", choreId);
      });
    });


let deleteChore = (choreId) => {
  ChoreFactory.deleteAChore(choreId)
  .then( (result) => {
    console.log('you deleted that chore, badass', result)
  })
}
});
//     $scope.boards = [];
//     PinFactory.getUserBoards(userId)
//     .then( (boardsArray) => {
//       $scope.boards = boardsArray;
//         console.log("auto running get user boards",boardsArray);

//       boardsArray.forEach(function (board) {
//         let boardId = board.id;
//         // console.log(board);
//         PinFactory.updateBoard(boardId, board);
//         console.log("boardId", boardId);
//       });
//     });

// $scope.addNewPin = (clickedPin ) => {
//     console.log(clickedPin);
//   PinFactory.postNewPin(clickedPin)
//     .then( (response) => {
//       $location.url("/allpins");
//   });
// };

// $scope.addBoardIdtoPin = (pin, boardId, pinId) =>{
//     let pinToEdit;
// PinFactory.getSinglePin(pinId)
// .then(function(result) {
//     pinToEdit = result;
//     console.log('this is the pin to which we are taking the board ID', pinToEdit);
//   let pinSaveToast = `<span><h4 style="color:orchid">You've saved this pin to a board! Good job!</h4></span>`;
//   Materialize.toast(pinSaveToast, 2000);


// pinToEdit.boardId = boardId;
// console.log('this pin should have the board ID attached', pinToEdit);
// // let pinWithBoardId = pin;
// // console.log(pinWithBoardId)
// PinFactory.updatePin(pinId, pinToEdit)
// .then(()=> {console.log('pin updated');
//     $location.url("/allpins");
// });
// });
// };
