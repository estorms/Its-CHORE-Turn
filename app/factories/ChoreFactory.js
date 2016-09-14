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

return {addNewChore, addNewHouse, addMember}

});
