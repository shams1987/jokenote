import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";

import { addSubjectThunk } from "../../store/subject"


function AddSubject() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [heading, setHeading] = useState("");
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        let subject = {
            user_id: sessionUser.id,
            heading,
        };

        //error validation
        setErrors([])
        const newErrors = [];

        if (subject.heading.length < 4) {
            newErrors.push("Content must be 4 characters or more.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(addSubjectThunk(subject));
        window.location.reload(false);
    };

    return (
        <div>
            <div>
                <ul>
                    {errors.map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Subject heading
                    <textarea
                        value={heading}
                        onChange={e => setHeading(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Subject</button>
            </form>
        </div>
    );
}


export default AddSubject
