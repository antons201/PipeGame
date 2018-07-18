function draw(pipes) {
    let win = false, animate = false;
    let table = $("#pipes");
    let degree = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
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
                            "transition": "transform 1s",
                            "transform": "rotate(" + degree[i][j] + "deg)",
                        });
                        animate = true;
                        changedirection(i, j);
                        if (CheckPathExistence()) {
                                $('#overlay').fadeIn(400, function(){
                                    $('#modal_form').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
                                });
                            $('#modal_close, #overlay').click( function(){
                                $('#modal_form').animate({opacity: 0, top: '45%'}, 200, function(){
                                    $(this).css('display', 'none');
                                    $('#overlay').fadeOut(400);
                                });
                            });
                            win = true;
                        }
                    }
                }
                addEventListener('transitionend', function() {
                    animate = false;
                });
            })
        }
    }
}