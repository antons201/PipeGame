var timerId;
var score = 0;
var timeLeft = 0;
function draw(pipes) {
    let win = false, animate = false;
    let table = $("#pipes");
    let degree = [];
    table.empty();
    clearInterval(timerId);
    timing();
    $('.levels, #result').css({"visibility": "visible"});
    for (let i = 0; i < pipes.length; i++) {
        degree[i] = [];
        for (let j = 0; j < pipes[i].length; j++) {
            degree[i][j] = 0;
        }
    }

    let tr = $("<tr>").appendTo(table);
    for (let j = 0; j < pipes.length; j++) {
        let td = $("<td>").appendTo(tr);
        if (j === startPoint[1]) {
            $('<img class="pipe" src="img/waterTaps.png">').appendTo(td);
        }
    }

    for (let i = 0; i < pipes.length; i++) {
        let tr = $("<tr>").appendTo(table);
        for (let j = 0; j <= pipes[i].length; j++) {
            let td = $("<td>").appendTo(tr);
            if (j === pipes.length) {
                if (i === endPoint[0]) {
                    $('<img class="pipe" src="img/conPipe.png">').appendTo(td);
                }
                continue;
            }

            let img = $('<img class="pipe" src="img/pipe' + pipes[i][j] + '.png">');
            $(img).appendTo(td);

            td.click(function rotate() {
                if (win === false && animate === false) {
                    if (pipes[i][j]) {
                        degree[i][j] += 90;
                        img.css({
                            "transition": "transform 0.2s",
                            "transform": "rotate(" + degree[i][j] + "deg)",
                        });
                        animate = true;
                        changedirection(i, j);
                        if (CheckPathExistence()) {
                            win = true;
                            clearInterval(timerId);
                            if (marafon){
                                score += points_difficult + (timeLeft * 20);
                                $('#score').html(score);
                                display_window(modal1);
                                updateScore(score);
                            }
                            else{
                                display_window(modal2);
                            }
                        }
                    }
                }
                addEventListener('transitionend', function () {
                    animate = false;
                });
            })
        }
    }
}

function display_window(i) {
    let overlay = $('#overlay');
    let close = $('.modal_close,.close_window, .levels');
    let div = i;
    overlay.fadeIn(100,
        function () {
            $(div).css({
                'display': 'block',
                'opacity': '1',
                'top': '50%'});
        });
    close.click(function close_windows() {
        close_window();
    });
}
function timing() {
    let remaining_time = 30;
    timerId = setInterval(function () {
        let time = $('#Time');
        if (remaining_time <= 0.1) {
            clearInterval(timerId);
            display_window(modal3);
            score = 0;
        }
        remaining_time = (remaining_time - 0.1).toFixed(1);
        timeLeft = remaining_time;
        time.html('Осталось времени:' + remaining_time);
    }, 100);
}
function close_window() {
    let modal = $('.modal_div');
    let overlay = $('#overlay');
    modal.css({'opacity': '0', 'top': '45%',
        'display': 'none'});
    overlay.fadeOut(10);
}