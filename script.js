const store = createStore(positionReducer);
let start = +localStorage.getItem('start') || 0;
let ticTac = document.getElementById('tic-tac');
const copyTicTac = ticTac.cloneNode(true);

ticTac.addEventListener('click', doStep);
main();

function main() {
    renderUI(store.getState());
}

store.subscribe(main);

function doStep({ target }) {
    const classNames = Array.from(target.classList);
    if (!classNames.includes('item')) return;

    const item = target.firstElementChild;
    const itemClassNames = Array.from(item.classList);

    if (itemClassNames.includes('o') ||
        itemClassNames.includes('x')
    ) return;

    const index = Array.from(document.querySelectorAll('#tic-tac .write')).indexOf(item);
    const newItems = store.getState();
    const newItemsState = newItems.map((curr_item, i) => {
        if (i === index) {
            return start % 2 ? 'o' : 'x';
        } else {
            return curr_item;
        }
    });

    store.dispatch({
        type: 'STEP',
        payload: newItemsState,
    });

    start ++;
    checkWin();
    localStorage.setItem('store', JSON.stringify(newItemsState));
    localStorage.setItem('start', start);
}

function renderUI(itemTypes) {
    console.log(itemTypes)
    const copy = copyTicTac.cloneNode(true);
    copy.addEventListener('click', doStep);
    ticTac.replaceWith(copy);
    ticTac = copy;
    const items = copy.querySelectorAll('.write');

    itemTypes.forEach(function(type, i) {
        if (type === 'x') {
            const a = document.getElementById('clone');
            const b = a.cloneNode(true);
            b.style.display = 'block';
            items[i].replaceWith(b);
        } else if (type === 'o') {
            const a = document.getElementById('clone2');
            const b = a.cloneNode(true);
            b.style.display = 'block';
            items[i].replaceWith(b);
        }
    })
}

function checkWin() {
    const state = store.getState();
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

function newGame() {
    store.dispatch({ type: 'NEW_GAME' });
    start = 0;
    localStorage.setItem('start', start);
    console.log(store.getState())
    localStorage.setItem('store', JSON.stringify(store.getState()));
}

function positionReducer(
    state = JSON.parse(localStorage.getItem('store')) ||
    (new Array(9)).fill(''),
    action
) {
    if (action.type === 'STEP') {
        return action.payload;
    } else if (action.type === 'NEW_GAME') {
        const initial = new Array(9);
        return initial.fill('');
    } else {
        return state;
    }
}