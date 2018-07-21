function registration(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var errormessage = 1;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        errormessage = error.message;

    });
    if (errormessage === 1) {
        close_window();
    }
}
function signin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var errormessage = 1;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        errormessage = error.message;
    });
    if (errormessage === 1) {
        close_window();
    }
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