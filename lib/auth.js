function registration(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        document.getElementById("err").innerHTML = error.message;
    });
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        close_window();
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
