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




return {addNewChore}

});
