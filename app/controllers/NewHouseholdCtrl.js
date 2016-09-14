"use strict";
console.log("NewHouseholdCtrl connected")
app.controller("NewHouseholdCtrl", function ($scope, ChoreFactory, $location) {

$scope.title = "Register Your HouseHold";
$scope.btnText = "Save";

$scope.newHouse = {
    name: '',
    householdId: ''
};


//register the household, returns the ID of the household, take ID and add to member

$scope.newMember1 = {
    name: '',
    houseId: ''
}

$scope.newMember2 = {
    name: '',
    houseId: ''
}


$scope.addNewHouse = () => {
    let housekey;

    $scope.newHouse.householdId = $scope.$parent.getUser();
    console.log('you clicked addnewhouse', $scope.newHouse);
    ChoreFactory.addNewHouse($scope.newHouse)
        .then((result) => {
            console.log('this is the household registered. It will become the housekey', result)
            housekey = result.name;
            console.log('this is the housekey', housekey)
            $scope.newMember1.houseId = housekey;
            $scope.newMember2.houseId = housekey;
            console.log($scope.newMember1, $scope.newMember2);
            ChoreFactory.addMember($scope.newMember1)
            .then((result) => {
                console.log('this is the result of firstadd new member', result);
            })
            ChoreFactory.addMember($scope.newMember2)
            .then((result) => {
                console.log('this is the result of second add new member', result);
                $location.url('/newchore');
            })


                 //.then means we are waiting for the promise resolution, anything that happens a level out will fire before what's inside the then --addMembers was firing before promise in addNewHouse was resolved, that's why we have to put the second then within the first
            })
    };

});
