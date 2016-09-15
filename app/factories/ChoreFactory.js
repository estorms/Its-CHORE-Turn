"use strict";
app.factory("ChoreFactory", ($q, $http, FirebaseURL) => {

let addNewChore = (newChore) => {
    return $q( (resolve, reject) => {
        $http.post(`${FirebaseURL}/chores.json`, JSON.stringify(newChore))
        .success( (ChoreFromFB) => {
            resolve(ChoreFromFB);
        })
        .error ((error) => {
            reject(error);
        });
    });
};

let addNewHouse = (newHouse) => {

    return $q((resolve, reject) =>{
        $http.post(`${FirebaseURL}/households.json`, JSON.stringify(newHouse))
        .success((householdFromFB) =>{
            resolve(householdFromFB);
        })
        .error((error) =>{
            reject(error);
        });
    });
};

let addMember = (member) => {

    return $q((resolve, reject) =>{
        $http.post(`${FirebaseURL}/members.json`,
            JSON.stringify(member))
        .success((data)=>{
            resolve(data);
        })
        .error((error) =>{
            reject(error);
        });
    });
};

let getHouseholdMembers = (housekey) => {
  return $q ( (resolve, reject) => {
    $http.get(`${FirebaseURL}/members.json?orderBy="houseId"&equalTo="${housekey}"`)
    .success( (members) => {
      console.log('you are inside getHouseholdmembers, this is the result', members)
      resolve(members);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let getHouseholdId = (householdId) =>{
    // let houseId = [];
    let houseId;
    return $q ( (resolve, reject) => {
    $http.get(`${FirebaseURL}/households.json?orderBy="householdId"&equalTo="${householdId}"`)
    .success( (household) => {
        console.log('in getHouseholdId', household)
        Object.keys(household).forEach((key) => {
             household[key].id = key;
             // houseId.push(household[key])
             houseId = key
        });
      resolve(houseId);
      // console.log('you are inside getHouseholdId and this is the data you want to pass in to getmembers', houseId)
    })
    .error( (error) => {
      reject(error);
    });
})
}
return {addNewChore, addNewHouse, addMember, getHouseholdMembers, getHouseholdId}

});
