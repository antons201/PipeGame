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
    const amount = 5;
    for (let i = 0; i < amount; ++i) {
        let y = Math.floor(Math.random() * (10));
        for (let j = 0; j < amount; ++j) {
            let x = Math.floor(Math.random() * (10));
            if (pipes[y][x] === 0) {
                let pipeType = Math.floor(Math.random() * (7));
                pipes[y][x] = pipeType;
            }
        }
    }
}

function initRandomGame(pipes) {
    let used = [];
    let size = pipes.length;
    for (let i = 0; i < size; ++i) {
        used[i] = [];

        for (let j = 0; j < size; ++j) {
            used[i][j] = 0;
        }
    }

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            if (i === 9 && j === 9) {
                continue;
            }
            let array = [];

            if (j !== 9) {
                if (!used[i][j + 1]) {
                    let vertex = [i, j + 1, 'R'];
                    array.push(vertex);
                }
            }
            if (i !== 9) {
                if (!used[i + 1][j]) {
                    let vertex = [i + 1, j, 'D'];
                    array.push(vertex);
                }
            }
            if (j !== 0) {
                if (!used[i][j - 1]) {
                    let vertex = [i, j - 1, 'L'];
                    array.push(vertex);
                }
            }
            if (i !== 0) {
                if (!used[i - 1][j]) {
                    let vertex = [i - 1, j, 'U'];
                    array.push(vertex);
                }
            }
            if (array.length) {
                let a = Math.floor(Math.random() * (array.length));
                let b = array[a];
                used[i][j] = b[2];
            }

        }
    }


    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {

            if ((i === 0 && j === 0) || (i === size - 1 && j === size - 1)) {
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

