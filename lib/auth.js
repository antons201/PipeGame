//var flag;

function registr() {
    /*$('.nic').css({"visibility": "visible"});
    $('.entry').css({"visibility": "hidden"});
    $('.reg').val("Регистрация и вход");
    console.log(flag);
    if (flag) {
        registration();
    }
    flag = true;*/
    $('#modal0').css({"z-index": "6"});
    display_window(modal0);
}
function back() {
    $('#modal0').css({"z-index": "5"});
    display_window(modal01);
}
function registration() {
    var email = document.getElementById("regemail").value;
    var password = document.getElementById("regpass").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        display_window(modal0);
        document.getElementById("regerr").innerHTML = error.message;
    });
    close_window();
    setTimeout(function(){
        writeUserData()
        },1000);
}

function signin() {
    var email = document.getElementById("entryemail").value;
    var password = document.getElementById("entrypass").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        document.getElementById("entryerr").innerHTML = error.message;
    });
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        close_window();
    });


}