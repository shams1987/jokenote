import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfileThunk } from "../../store/profile";
import { authenticate } from "../../store/session";

import "./EditProfile.css";

function EditProfile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const curUserName = sessionUser.username;
    const userEmail = sessionUser.email;
    const [username, setUsername] = useState(curUserName);
    const [email, setEmail] = useState(userEmail);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const updateUserName = e => setUsername(e.target.value);
    const updateUserEmail = e => setEmail(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();

        const updatedProfile = {
            id: userId,
            username,
            email,
        };

        //error validators
        setErrors([]);

        const newErrors = [];

        if (updatedProfile.username.length < 4) {
            newErrors.push("Username must be 4 characters or more!");
        }

        if (userId === 1 && userEmail !== updatedProfile.email) {
            newErrors.push("Sorry, Demo user's email cannot be changed.");
        }

        if (updatedProfile.email.length < 4) {
            newErrors.push("Email must be 4 characters or more!");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        await dispatch(editProfileThunk(updatedProfile));
        await dispatch(authenticate());
        await history.push(`/users/${userId}`);
    };

    const handleCancel = async e => {
        e.preventDefault();
        history.push(`/users/${userId}`);
    };

    return (
        <section className="main_bg ">
            <div className="edit-profile-form">
                <form onSubmit={handleSubmit} className="container_col profile_edit_form">
                    <div>
                        <div className="container_row profile_edit_inputs">
                            <input type="hidden" value={userId} />
                            <div className="container_col">

                                <label>Username</label>
                            </div>

                            <div>
                                <input className="form-field-edit"
                                    type="text"
                                    value={username}
                                    onChange={updateUserName}
                                />
                            </div>

                            <div className="container_col">
                                <label>Email</label>
                            </div>
                            <div>
                                <input className="form-field-edit"
                                    type="email"
                                    value={email}
                                    onChange={updateUserEmail}
                                />
                            </div>
                        </div>

                        <div className="error-container">
                            <ul>
                                {errors.map(error => (
                                    <li key={error} className="error">
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='edit-profile-buttons'>
                        <div>
                            <button type="Submit" className="button-login green-button">
                                Accept
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="demo-login-btn button-login white-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EditProfile;
