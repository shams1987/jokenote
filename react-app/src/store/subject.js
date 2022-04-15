const GET_SUBJECTS = "subjects/all";
const ADD_SUBJECT = "subjects/add";
const DELETE_SUBJECT = "subject/delete";


// action creator for get subjects
const getSubjects = subjects => {
    return {
        type: GET_SUBJECTS,
        subjects,
    };
};

// action creator for add subject
const addSubject = subject => {
    return {
        type: ADD_SUBJECT,
        subject,
    };
};

//action creator for delete subjects
const deleteSubject = id => {
    return {
        type: DELETE_SUBJECT,
        id,
    };
};

// thunk for get Subjects
export const getSubjectsThunk = user_id => async dispatch => {
    const res = await fetch(`/api/subjects/${user_id}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getSubjects(data));
        return data;
    }
};

// think for add a subject
export const addSubjectThunk = subject => async dispatch => {
    const { user_id } = subject;
    const res = await fetch(`/api/subjects/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subject),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addSubject(data));
        return data;
    }
};


// delete subject thunk
export const deleteSubjectThunk = id => async dispatch => {
    const res = await fetch(`/api/subjects/delete/${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteSubject(id));
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

        case ADD_SUBJECT:
            newState[action.subject.id] = action.subject;
            return newState;

        case DELETE_SUBJECT:
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default subjectReducer;
