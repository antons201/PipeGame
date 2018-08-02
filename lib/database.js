function writeUserData() {
    let name;

    name = document.getElementById("name").value;
    if (name == "") {
        document.getElementById("entry").innerHTML = "Некорректный никнейм";
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

function showResults() {

    firebase.database().ref('users/').once('value').then(function (snapshot) {
        results = (snapshot.val());
        let table = $("#h");
        table.empty();
        let tr = $("<tr>").appendTo(table);
        let td = $("<td class='restable'>").appendTo(tr);
        $('<p>Имя</p>').appendTo(td);
        td = $("<td  class='restable'>").appendTo(tr);
        $('<p>Счет</p>').appendTo(td);

        for (let key in results) {
            let tr = $("<tr>").appendTo(table);
            let td = $("<td  class='restable'>").appendTo(tr);
            $('<p>' + key + '</p>').appendTo(td);
            td = $("<td  class='restable'>").appendTo(tr);
            $('<p>' + results[key]['score'] + '</p>').appendTo(td);

        }


    });
    display_window(modal4);
}