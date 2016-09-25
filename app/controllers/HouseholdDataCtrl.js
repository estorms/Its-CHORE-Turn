app.controller("HouseholdDataCtrl", function ($scope, ChoreFactory, $routeParams, $window, $location) {
    // $scope.bgimg = "http://img.wikinut.com/img/19hgv38l3mly4kn3/jpeg/0/Happy-Couple.jpeg";


$scope.series = ['Points Earned To Date', 'Not sure yet']

let hId;
let houseID;
$scope.householdMembersNamesArr = [];
let householdMembersArr=[];
$scope.choresArr = [];
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
let mem1Chores = [];
let mem2Chores= [];
let mem1totalPoints = 0;
let mem2totalPoints = 0;
let memPointsEarnedToDateArr = [];
let test = [];
$scope.pointsToChart =[];  //must be formatted as an array of arrays: internal arrays are NOT scoped

//call the promise that returns userId, then pass that in to access household to burrow through data

$scope.$parent.getUser()
  .then ( (user) => {
    console.log('this is user returned by promise', user)
    hId = user;
    accesshousehold();
  })

//access the household with userID, called hId

let accesshousehold = () =>{
    ChoreFactory.getHouseholdId(hId)
    .then((results) => {
        houseID = results;
        console.log('results outside loop', results)
        // for (var key in results) {
        // results = results[key]
        // console.log('results inside loop', results)
        // }

       //pass in the upper-level and internal ID on the household object to get the household members
        ChoreFactory.getHouseholdMembers(houseID)
        .then((householdMembers) => {
            //now within householdMembers object, which contains other objects, so cycling through to extract each member's name and points earned
            for (var prop in householdMembers) { //householdMembers is an object full of other objects. Prop is the name of each internal object (in this case, the 'name' = FB returned numeric value)
                // console.log('hello');
                console.log(householdMembers[prop].name) //here, we are inside *each* object, regardless of its name (aka top-levelprop) and as identified by houseMembers[prop], and accessing a property specific to that object with dot notation. We have to use brackets on "prop" b/c we are access more than one object.

                //put the householdmembers into an array of objects(rather than objects within objects)
                householdMembersArr.push(householdMembers[prop])

                $scope.householdMembersNamesArr.push(householdMembers[prop].name)
                memPointsEarnedToDateArr.push(householdMembers[prop].pointsEarned)

                $scope.pointsToChart.push(memPointsEarnedToDateArr)

            }
                $scope.houseMem1=$scope.householdMembersNamesArr[0];
                $scope.houseMem2=$scope.householdMembersNamesArr[1];
            console.log('this is houseMem1', $scope.houseMem1, 'this is houseMem2', $scope.houseMem2)
            console.log('hId', hId, 'houseID', houseID)

            //now call all get chores and filter by top-level/internal key on household to get chores
            ChoreFactory.getAllChores(houseID)
            .then((choresObj) => {
                choresObj.forEach(function(chore){
                    if (chore.assignedMember === $scope.houseMem1){
                        console.log('we have a housemem1', $scope.houseMem1)
                        mem1Chores.push(chore)
                    }
                    else {
                       mem2Chores.push(chore)
                    }
                    console.log('these are mem1Chores', mem1Chores, 'these are mem2Chores', mem2Chores)
                })

                for (var i = 0; i < mem1Chores.length; i++){
                    mem1totalPoints = mem1totalPoints + parseInt(mem1Chores[i].irritationPoints)
                }

                for(var i = 0; i < mem2Chores.length; i++){
                   mem2totalPoints = mem2totalPoints + parseInt(mem2Chores[i].irritationPoints)
                }



                $scope.choresArr= choresObj;


            })
        })
    })
}





})
