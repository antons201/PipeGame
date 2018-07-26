function writeUserData() {
    var user = firebase.auth().currentUser;
    var name, uid;

    if (user != null) {
        uid = user.uid;
    }
    name = document.getElementById("name").value;
    firebase.database().ref('users/' + uid).set({
        score: 0,
        name: name,
    });
}
function updateScore(score) {
    var user = firebase.auth().currentUser;
    var uid, baseScore;

    if (user != null) {
        uid = user.uid;
        firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
            baseScore = (snapshot.val().score);
            console.log(baseScore);
            if (baseScore < score){
                let updates= {};
                updates['/users/' + uid + '/score'] = score;
                firebase.database().ref().update(updates);
            }
        });
    }
}