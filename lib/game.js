"use strict";
let exits;
let pipes;
let used;
let queue;
let size;
let up = 0, right = 1, down = 2, left = 3;
let startPoint = [0, 0];
let endPoint = [9, 9];
let marafon;

function init() {
    pipes = [];
    for (let i = 0; i < size; ++i) {
        pipes[i] = [];
        for (let j = 0; j < size; ++j) {
            pipes[i][j] = 0;
        }
    }
    exits = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 1, 1]
    ];
    return pipes;
}

function changedirection(y, x) {
    let newdir = [0, 2, 3, 4, 1, 6, 5, 7, 9, 10, 11, 8];
    pipes[y][x] = newdir[pipes[y][x]];
}

function CheckPathExistence() {
    used = [];
    for (let i = 0; i < pipes.length; ++i) {
        used[i] = [];
        for (let j = 0; j < pipes.length; ++j) {
            used[i][j] = 0;
        }
    }

    queue = [startPoint];
    let element;
    while (queue.length !== 0) {
        element = queue.shift();
        let y = element[0];
        let x = element[1];
        if (y === endPoint[0] && x === endPoint[1]) {
            return true;
        }
        used[y][x] = 1;
        CheckWay(y, x, y, x - 1, left, right);
        CheckWay(y, x, y - 1, x, up, down);
        CheckWay(y, x, y, x + 1, right, left);
        CheckWay(y, x, y + 1, x, down, up);
    }
    return false;
}

function CheckWay(y, x, y1, x1, from, to) {
    if (x1 < 0 || y1 < 0 || x1 >= size || y1 >= size) {
        return;
    }
    if (exits[pipes[y][x]][from] === 0) {
        return;
    }

    if (exits[pipes[y][x]][from] === exits[pipes[y1][x1]][to] && !used[y1][x1]) {
        queue.push([y1, x1]);
    }
}

/*
function test() {

    generateRotation();
    if (CheckPathExistence()) {
        console.log("Path exists");
    }
    else {
        console.log("Path doesnt exist");
    }
}
*/
function startGame() {
    size = 5;
    endPoint[1] = size - 1;
    init();
    pipes = initRandomGame(pipes);
    //CheckPathExistence();
    generateRotation();
    draw(pipes);
    marafon = true;
}

function selectLevel(x) {
    marafon = false;
    startPoint = [0, 0];
    endPoint = [9, 9];
    size = 10;
    init();
    switch (x) {
        case 1: {
            pipes = [
                [7, 5, 5, 2, 0, 0, 0, 0, 0, 0],
                [4, 2, 0, 6, 0, 0, 0, 0, 0, 0],
                [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 5, 5, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 6, 0, 0, 0, 0, 0],
                [0, 1, 5, 5, 3, 0, 0, 0, 0, 0],
                [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 5, 5, 5, 5, 5, 5, 5, 7]
            ];
            break;
        }
        case 2: {
            pipes = [
                [7, 5, 5, 5, 5, 5, 5, 5, 5, 2],
                [6, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                [4, 5, 5, 2, 0, 0, 0, 0, 0, 6],
                [0, 1, 5, 3, 0, 0, 0, 0, 0, 6],
                [0, 4, 5, 5, 5, 5, 5, 2, 0, 6],
                [0, 0, 0, 0, 0, 0, 0, 6, 0, 6],
                [0, 0, 0, 1, 5, 5, 5, 3, 0, 0],
                [0, 0, 0, 4, 5, 5, 5, 5, 5, 2],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 7]
            ];
            break;
        }
        case 3: {
            pipes = [
                [7, 5, 2, 0, 1, 5, 5, 10, 5, 2],
                [4, 5, 7, 5, 3, 0, 1, 3, 0, 6],
                [0, 0, 6, 0, 0, 0, 6, 0, 0, 6],
                [0, 0, 6, 0, 0, 0, 6, 0, 0, 6],
                [0, 0, 6, 5, 5, 10, 3, 0, 0, 6],
                [0, 0, 0, 0, 0, 6, 0, 0, 0, 6],
                [0, 0, 0, 0, 0, 6, 0, 0, 0, 6],
                [0, 0, 0, 0, 0, 6, 0, 0, 0, 6],
                [0, 0, 0, 0, 0, 4, 2, 1, 5, 3],
                [0, 0, 0, 0, 0, 0, 9, 8, 5, 7]
            ];
            break;
        }
    }
    fillEmptyField();
    generateRotation();
    restart();
}

function restart() {
    generateRotation();
    draw(pipes);
    score = 0;
    $('#score').html(score);
}


