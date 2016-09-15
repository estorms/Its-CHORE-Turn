"use strict";
app.factory("ChoreFactory", ($q, $http, FirebaseURL) => {

let postNewChore = (newChore) => {
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

    })
    .error( (error) => {
      reject(error);
    });
})
}
return {postNewChore, addNewHouse, addMember, getHouseholdMembers, getHouseholdId}

});
