var flag;

function registr() {
    $('#nic').css({"visibility": "visible"});
    $('#entry').css({"visibility": "hidden"});
    $('#reg').val("Регистрация и вход");
    if (flag) {
        registration();
    }
    flag = true;
}

function registration() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        close_window();
        writeUserData();
    });
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        document.getElementById("err").innerHTML = error.message;
    });

}

function signin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        document.getElementById("err").innerHTML = error.message;
    });
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        close_window();
    });


}

function close_window() {
    let modal = $('.modal_div');
    let overlay = $('#overlay');
    modal.animate({opacity: 0, top: '45%'}, 200,
        function () {
            $(this).css('display', 'none');
            overlay.fadeOut(400);
        });
}
