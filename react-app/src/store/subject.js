const GET_SUBJECTS = "subjects/all";


// action creator for get subjects
const getSubjects = subjects => {
    return {
        type: GET_SUBJECTS,
        subjects,
    };
};

// thunk for Subjects
export const getSubjectsThunk = userId => async dispatch => {
    const res = await fetch(`/api/subjects/${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getSubjects(data));
        return data;
    }
};


const initialState = {};

// reducer
const subjectReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SUBJECTS:
            newState = {};
            action.subjects.subjects.forEach(subject => (newState[subject.id] = subject));
            return newState;


        default:
            return state;
    }
};

export default subjectReducer;
