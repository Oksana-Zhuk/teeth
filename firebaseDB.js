let db = firebase.firestore();
let nimimumScore = 0;
let highscoreList = [];
let usersAmount = 5;
let userName;

function writeUsersHighscores(id, userName, userScores) {
    firebase.firestore().collection("users").doc(`user_${id}`).set({
        name: `${userName}`,
        scores: `${userScores}`
    }).then(() => {
        //console.log("Document written");
    }).catch((error) => {
        // console.error("Error adding document: ", error);
    });
}

function updateUsersHighscores(userName, userScores) {
    if (userScores > nimimumScore) {
        let newHighscoreList = [];
        let userPosition = 0;
        for (s = 0; s < highscoreList.length; s++) {
            if (highscoreList[s][1] > userScores) {
                newHighscoreList[s] = highscoreList[s]
            } else {
                userPosition = s;
                break;
            }
        }
        newHighscoreList[userPosition] = [userName, userScores]
        for (s = userPosition + 1; s < highscoreList.length - 1; s++) {
            newHighscoreList[s] = highscoreList[s - 1]
        }
        highscoreList = newHighscoreList;
        for (i = 0; i < highscoreList.length; i++) {
            writeUsersHighscores(i, highscoreList[i][0], highscoreList[i][1])
        }
    }
    getUsersHighscores();
}

function getUsersHighscores() {
    let i = 0;
    firebase.firestore().collection("users").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                i++
                if (i <= usersAmount) {
                    highscoreList[i - 1] = [doc.data().name, doc.data().scores]
                }
            });
            nimimumScore = (highscoreList[highscoreList.length - 1][1])
        })

}
getUsersHighscores();
