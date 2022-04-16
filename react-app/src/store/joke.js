const GET_JOKES = "jokes/get";
const ADD_JOKE = "jokes/add"

// action creator for get jokes
const getJokes = jokes => {
    return {
        type: GET_JOKES,
        jokes,
    };
};


// action creator for add joke
const addJoke = joke => {
    return {
        type: ADD_JOKE,
        joke,
    };
};

// thunk for get jokes
export const getJokesThunk = (user_id, subject_id) => async dispatch => {
    const res = await fetch(`/api/jokes/${user_id}/subjects/${subject_id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getJokes(data));
        return data;
    }
};

// thunk for add a joke
export const addJokeThunk = joke => async dispatch => {
    const { user_id, subject_id } = joke;
    const res = await fetch(`/api/jokes/${user_id}/subjects/${subject_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(joke),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addJoke(data));
        return data;
    }
};


const initialState = {};

// reducer
const jokeReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_JOKES:
            newState = {};
            action.jokes.jokes.forEach(joke => (newState[joke.id] = joke));
            return newState;

        case ADD_JOKE:
            newState[action.joke.id] = action.joke;
            return newState;

        default:
            return state;
    }
};

export default jokeReducer;
