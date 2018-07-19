"use strict";
let pipes;
let used;
let queue;
let selectedLevel = 1;
let border = 10;
let up = 0, right = 1, down = 2, left = 3;
let exits = [
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

function init(level) {
    switch (level){
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
}

function changedirection(y, x) {
    let newdir = [0, 2, 3, 4, 1, 6, 5, 7, 9, 10, 11, 8];
    pipes[y][x] = newdir[pipes[y][x]];
}

function CheckPathExistence() {
    used = [
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
    let verticle = [0, 0];
    queue = [verticle];
    let element = [0, 0];

    while (queue.length !== 0) {
        element = queue.shift();
        let y = element[0];
        let x = element[1];
        if (y === 9 && x === 9) {
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
    if (x === 9) {
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
    if (y === 9) {
        return;
    }
    let verticle = [0, 0];
    if (exits[PipeType][down] === exits[pipes[y + 1][x]][up] && (used[y + 1][x] !== 1)) {
        verticle[0] = y + 1;
        verticle[1] = x;
        queue.push(verticle);
    }
}

function test() {
    init(1);
    generateRotation();
    if (CheckPathExistence()) {
        console.log("Path exists");
    }
    else {
        console.log("Path doesnt exist");
    }
}

function generateRotation() {
    const amount = 50;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (10));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (10));
            changedirection(y, x);
        }
    }
}

function fillEmptyField() {
    const amount = 3;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (10));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (10));
            if (pipes[y][x] === 0){
                let pipeType = Math.floor(Math.random() * (7));
                pipes[y][x] = pipeType;
            }
        }
    }
}

function startGame() {
    init(selectedLevel);
    fillEmptyField();
    generateRotation();
    draw(pipes);
}

function selectLevel(x){
    selectedLevel = x;
}
