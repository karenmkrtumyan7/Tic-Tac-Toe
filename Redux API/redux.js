class Redux {
    constructor(reducer) {
        this._state = reducer(undefined, {});
        this._reducers = [ reducer ];
    }

    rendererFunc() {
        console.log('I need APP root to render when state change');
    }

    _callRenderer = () => {
        this.rendererFunc();
    }

    getState() {
        return this._state;
    }

    subscribe(observer) {
        this.rendererFunc = observer;
    }

    dispatch(action) {
        let newState = this._reducers.reduce((acc, fn) => {
            if (fn(this.state, action) !== this.state) {
                return fn(this.state, action);
            }
        }, this._state);

        this._state = newState !== this._state ? newState : this._state;
        this._callRenderer();
    }

    combineReducers(reducers) {
        this._reducers = [...reducers];
    }
}

function createStore(reducer) {
    return (new Redux(reducer));
}