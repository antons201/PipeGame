function writeUserData() {
    let name;

    name = document.getElementById("name").value;
    if (name == "") {
        document.getElementById("entryerr").innerHTML = "Введите ник";
    }
    else {
        name = document.getElementById("name").value;
        firebase.database().ref('users/' + name).once('value').then(function (snapshot) {
            baseName = (snapshot.val());
            console.log(baseName);
            if (!baseName) {
                firebase.database().ref('users/' + name).set({
                    score: 0,
                });
            }
            close_window();
        })
    }
}

function updateScore(score) {

    let name = document.getElementById("name").value;
    firebase.database().ref('users/' + name).once('value').then(function (snapshot) {
        baseScore = (snapshot.val().score);
        console.log(baseScore);
        if (baseScore < score) {
            let updates = {};
            updates['/users/' + name + '/score'] = score;
            firebase.database().ref().update(updates);
        }
    });
}