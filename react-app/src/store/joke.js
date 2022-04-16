const GET_JOKES = "jokes/get";

// action creator for get jokes
const getJokes = jokes => {
    return {
        type: GET_JOKES,
        jokes,
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


const initialState = {};

// reducer
const jokeReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_JOKES:
            newState = {};
            action.jokes.jokes.forEach(joke => (newState[joke.id] = joke));
            return newState;

        default:
            return state;
    }
};

export default jokeReducer;
