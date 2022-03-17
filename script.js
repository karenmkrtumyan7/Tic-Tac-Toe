let start = 0;
let ticTac = document.getElementById('tic-tac');
const copyTicTac = ticTac.cloneNode(true);

ticTac.addEventListener('click', setItem);

function checkWin() {
    const state = getGameState();
    const horizontal = checkHorizontal(state);
    const vertical = checkVertical(state);
    const diagonals = checkDiagonals(state);
    let winner = '';

    if (horizontal != '') {
        winner = horizontal;
    } else if (vertical != '') {
        winner = vertical;
    } else if (diagonals != '') {
        winner = diagonals;
    }
    
    if (winner != '') {
        announceWinner(winner);
    } else if (start == 9) {
        announceDraw();
    }
}

function announceDraw() {
    setTimeout(() => { 
        alert(`Nobody Wins`);
        newGame();
    } , 0);
}

function announceWinner(winner) {
    setTimeout(() => { 
        alert(`The winner is ${winner.toUpperCase()} player`);
        newGame();
    }, 0);
}

function setItem({ target }) {
    const classNames = Array.from(target.classList);
    if (!classNames.includes('item')) return;

    const item = target.firstElementChild;
    const itemClassNames = Array.from(item.classList);

    if (itemClassNames.includes('o') ||
        itemClassNames.includes('x')
    ) return;

    if (start % 2) {
        const a = document.getElementById('clone2');
        const b = a.cloneNode(true);
        b.style.display = 'block';
        target.innerHTML = "";
        target.append(b);
    } else {
        const a = document.getElementById('clone');
        const b = a.cloneNode(true);
        b.style.display = 'block';
        target.innerHTML = "";
        target.append(b);
    }

    start++;
    checkWin();
}


function checkHorizontal(state) {
    let winner = '';
    for (let i = 0; i < state.length - 2; i += 3) {
        if (state[i] == state[i + 1] &&
            state[i + 1] == state[i + 2] &&
            state[i] != ''
        ) {
            winner = state[i];
        }
    }
    return winner;
}

function checkVertical(state) {
    let winner = '';
    for (let i = 0; i < 3; i++) {
        if (state[i] == state[i + 3] &&
            state[i + 3] == state[i + 6] &&
            state[i] != ''
        ) {
            winner = state[i];
        }
    }
    return winner;
}

function checkDiagonals(state) {
    if (state[0] == state[4] &&
        state[4] == state[8] &&
        state[0] != ''
    ) {
        return state[0];
    }

    if (state[2] == state[4] &&
        state[4] == state[6] &&
        state[2] != ''
    ) {
        return state[2];
    }

    return '';
}


function getGameState() {
    const writens = Array.from(document.getElementsByClassName('write'));
    return classNames = writens.map(el => {
       const classes = Array.from(el.classList);
       if (classes.includes('x')) {
           return 'x';
       } else if (classes.includes('o')) {
            return 'o';
       } else {
           return '';
       }
    });
}

function newGame() {
    const copy = copyTicTac.cloneNode(true);
    copy.addEventListener('click', setItem);
    ticTac.replaceWith(copy);
    ticTac = copy;
    start = 0;
}