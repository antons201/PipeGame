function draw(pipes) {
    let win = false, animate = false;
    let table = $("#pipes");
    let degree = [];
    table.empty();
    for (let i = 0; i < pipes.length; i++) {
        degree[i] = [];
        for (let j = 0; j < pipes[i].length; j++) {
            degree[i][j] = 0;
        }
    }
    for (let i = 0; i < pipes.length; i++) {
        let tr = $("<tr>").appendTo(table);
        for (let j = 0; j < pipes[i].length; j++) {
            let img = $('<img class="pipe" src="img/pipe' + pipes[i][j] + '.png">');
            let td = $("<td>").appendTo(tr).html(img);
            td.click(function rotate() {
                if (win === false && animate === false) {
                    if (pipes[i][j]) {
                        degree[i][j] += 90;
                        img.css({
                            "transition": "transform 0.5s",
                            "transform": "rotate(" + degree[i][j] + "deg)",
                        });
                        animate = true;
                        changedirection(i, j);
                        if (CheckPathExistence()) {
                            display_window(modal1);
                            win = true;
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
    let close = $('.modal_close, #overlay,.close_window');
    let modal = $('.modal_div');
    let div = i;
    overlay.fadeIn(400,
        function () {
            $(div).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
        });
    close.click(function close_window() {
        modal.animate({opacity: 0, top: '45%'}, 200,
                function () {
                    $(this).css('display', 'none');overlay.fadeOut(400);
                });
    });
}