"use strict";
let pipes;
let queue;
let used;
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
    [1, 1, 1, 1]
];

function init() {
    pipes = [
        [7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 5, 5, 5, 5, 5, 5, 5, 5, 7]
    ];

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
}

function changedirection(y, x) {
    let newdir = [0, 2, 3, 4, 1, 6, 5, 7];
    pipes[y][x] = newdir[pipes[y][x]];
}

function CheckPathExistence() {
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
