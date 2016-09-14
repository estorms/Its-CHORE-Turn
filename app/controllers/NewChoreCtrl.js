"use strict";
console.log('NewChoreCtrl connected')
app.controller("NewChoreCtrl", function ($scope, ChoreFactory, $location){
// console.log($scope.$parent.getUser())
$scope.title = "Add a New Chore";
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


// "use strict";

// app.controller("NewBoardCtrl", function ($scope, PinFactory, $location){
//     $scope.title = "Add New Board";
//     $scope.btnText = "Save Board";
//     $scope.newBoard = {
//         name: "",
//         description: "",
//         uid: $scope.$parent.getUser()
//     };


// $scope.addNewBoard = function () {
//     PinFactory.postNewBoard($scope.newBoard)
//     .then(function(){
//         $location.url('#/allboards');
//     });
//  };
// });
