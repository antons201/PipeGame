"use strict";
let exits;
let pipes;
let used;
let queue;
let size;
let up = 0, right = 1, down = 2, left = 3;

function init() {
    pipes = [];
    for (let i = 0; i < size; ++i){
        pipes[i] = [];
        for (let j = 0; j < size; ++j){
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
    for (let i = 0; i < pipes.length; ++i){
        used[i] = [];
        for (let j = 0; j < pipes.length; ++j){
            used[i][j] = 0;
        }
    }
    let vertex = [0, 0];
    queue = [vertex];
    let element = [0, 0];

    while (queue.length !== 0) {
        element = queue.shift();
        let y = element[0];
        let x = element[1];
        if (y === size-1 && x === size-1) {
            return true;
        }
        let TypeOfPipe = pipes[y][x];
        switch (TypeOfPipe) {
            case 1: {
                CheckRightWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 2: {
                CheckLeftWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 3: {
                CheckLeftWay(y, x, TypeOfPipe);
                CheckUpWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 4: {
                CheckUpWay(y, x, TypeOfPipe);
                CheckRightWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 5: {
                CheckLeftWay(y, x, TypeOfPipe);
                CheckRightWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 6: {
                CheckUpWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 7: {
                CheckUpWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                CheckLeftWay(y, x, TypeOfPipe);
                CheckRightWay(y, x, TypeOfPipe);
                used[y][x] = 1;
                break;
            }
            case 8:{
                CheckUpWay(y,x,TypeOfPipe);
                CheckRightWay(y, x, TypeOfPipe);
                CheckLeftWay(y, x, TypeOfPipe);
                break;
            }
            case 9:{
                CheckUpWay(y,x,TypeOfPipe);
                CheckRightWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                break;
            }
            case 10:{
                CheckRightWay(y, x, TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                CheckLeftWay(y, x, TypeOfPipe);
                break;
            }
            case 11:{
                CheckUpWay(y,x,TypeOfPipe);
                CheckDownWay(y, x, TypeOfPipe);
                CheckLeftWay(y, x, TypeOfPipe);
                break;
            }
        }
    }
    return false;
}

function CheckLeftWay(y, x, PipeType) {
    let verticle = [0, 0];
    if (x === 0) {
        return;
    }
    if (exits[PipeType][left] === exits[pipes[y][x - 1]][right] && (used[y][x - 1] !== 1)) {
        verticle[0] = y;
        verticle[1] = x - 1;
        queue.push(verticle);
    }
}

function CheckRightWay(y, x, PipeType) {
    if (x === size-1) {
        return;
    }
    let verticle = [0, 0];
    if (exits[PipeType][right] === exits[pipes[y][x + 1]][left] && (used[y][x + 1] !== 1)) {
        verticle[0] = y;
        verticle[1] = x + 1;
        queue.push(verticle);
    }
}

function CheckUpWay(y, x, PipeType) {
    let verticle = [0, 0];
    if (y === 0) {
        return;
    }
    if (exits[PipeType][up] === exits[pipes[y - 1][x]][down] && (used[y - 1][x] !== 1)) {
        verticle[0] = y - 1;
        verticle[1] = x;
        queue.push(verticle);
    }
}

function CheckDownWay(y, x, PipeType) {
    if (y === size-1) {
        return;
    }
    let verticle = [0, 0];
    if (exits[PipeType][down] === exits[pipes[y + 1][x]][up] && (used[y + 1][x] !== 1)) {
        verticle[0] = y + 1;
        verticle[1] = x;
        queue.push(verticle);
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
    size = 10;
    init();
    pipes = initRandomGame(pipes);
    generateRotation();
    draw(pipes);
}

function selectLevel(x){
    size = 10;
    init();
    switch (x){
        case 1:{
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
        case 2:{
            pipes =  [
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
        case 3:{
            pipes =  [
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
    restart();
}

function restart() {
    //generateRotation();
    draw(pipes);
}


