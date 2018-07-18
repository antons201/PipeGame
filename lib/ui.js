function draw(pipes) {
    let table = $("#pipes");
    for (let i = 0; i < pipes.length; i++) {
        let tr = $("<tr>").appendTo(table);
        for (let j = 0; j < pipes[i].length; j++) {
            let img = $('<img class="pipe" src="img/pipe' + pipes[i][j] + '.png">');
            let td = $("<td>").appendTo(tr).html(img);
            td.click(function () {
                //img.css({
                //    "transform":"rotate(90deg)",
                //});
                changedirection(i, j);
                let img1 = $('<img class="pipe" src="img/pipe' + pipes[i][j] + '.png">');
                td.html(img1);
                if (CheckPathExistence()) {
                    alert("Ура");
                }
            })
        }
    }
}