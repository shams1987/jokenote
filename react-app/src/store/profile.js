const EDIT_PROFILE = "profiles/edit"

// action creator for edit profile
const editProfile = profile => {
    return {
        type: EDIT_PROFILE,
        profile,
    };
};

//THUNKS
export const editProfileThunk = (profile) => async (dispatch) => {
    const res = await fetch(`/api/users/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
    });
    const updateProfile = await res.json();
    dispatch(editProfile(updateProfile))
    return updateProfile;
}

const initialState = {};

// reducer
const profileReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {


        case EDIT_PROFILE:
            newState[action.profile.id] = action.profile;
            return newState;

        default:
            return state;
    }
};

export default profileReducer;
