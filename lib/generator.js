function generateRotation() {
    const amount = 20;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (size));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (size));
            changedirection(y, x);
        }
    }
}

function fillEmptyField() {
    const amount = 5;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (size));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (size));
            if (pipes[y][x] === 0) {
                pipes[y][x] = Math.floor(Math.random() * (11));
            }
        }
    }
}

function deleteFields() {
    const amount = 10;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (size));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (size));
            if (y === startPoint[0] && x === startPoint[1])
                continue;
            if (y === endPoint[0] && x === endPoint[1])
                continue;
            if (!prev[([y, x])]) {
                pipes[y][x] = 0;
            }
        }
    }
}

function initRandomGame(pipes) {
    let half = size / 2;
    endPoint[0] = Math.floor(Math.random() * (size - half) + half);
    startPoint[1] = Math.floor(Math.random() * (size - half));
    let used = [];
    for (let i = 0; i < size; ++i) {
        used[i] = [];

        for (let j = 0; j < size; ++j) {
            used[i][j] = 0;
        }
    }

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            if (i === size - 1 && j === size - 1) {
                continue;
            }
            let array = [];

            if (j !== size - 1) {
                if (!used[i][j + 1]) {
                    array.push("R");
                }
            }
            if (i !== size - 1) {
                if (!used[i + 1][j]) {
                    let vertex = [i + 1, j, 'D'];
                    array.push("D");
                }
            }
            if (j !== 0) {
                if (!used[i][j - 1]) {
                    array.push("L");
                }
            }
            if (i !== 0) {
                if (!used[i - 1][j]) {
                    array.push("U");
                }
            }
            if (array.length) {
                let a = Math.floor(Math.random() * (array.length));
                used[i][j] = array[a];
            }
        }
    }

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {

            if ((i === startPoint[0] && j === startPoint[1]) || (i === endPoint[0] && j === endPoint[1])) {
                pipes[i][j] = 7;
                continue;
            }
            let s = "";
            if (i === 0) {
                s += "0";
            }
            else {
                if (used[i - 1][j] === "D") {
                    s += "1";
                }
                else {
                    s += "0";
                }
            }
            if (used[i][j] === "R") {
                s += "10";
            }
            else {
                s += "01";
            }
            if (j === 0) {
                s += "0";
            }
            else {
                if (used[i][j - 1] === "R") {
                    s += "1";
                }
                else {
                    s += "0";
                }
            }

            switch (s) {
                case "0011": {
                    pipes[i][j] = 2;
                    break;
                }
                case "1001": {
                    pipes[i][j] = 3;
                    break;
                }
                case "1100": {
                    pipes[i][j] = 4;
                    break;
                }
                case "0100":
                case "0101": {
                    pipes[i][j] = 5;
                    break;
                }
                case "0010":
                case "1010": {
                    pipes[i][j] = 6;
                    break;
                }
                case "1101": {
                    pipes[i][j] = 8;
                    break;
                }
                case "1011": {
                    pipes[i][j] = 11;
                    break;
                }
            }
        }
    }
    return pipes;
}

