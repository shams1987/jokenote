import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editSubjectThunk } from "../../store/subject"


function EditSubject({ subject }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [heading, setHeading] = useState(subject.heading);
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        let newSubject = {
            id: subject.id,
            user_id: sessionUser.id,
            heading,
        };

        //error validation
        setErrors([])

        if ((heading) && (heading.length <= 30)) {

            dispatch(editSubjectThunk(newSubject));
            window.location.reload(false);
        }
        else {
            setErrors(["Please provide a heading that is 1 to 30 characters long"])
        }


    };

    return (
        <div>
            <div>
                <ul>
                    {errors.map((error) => (
                        <li key={error} id="error">{error}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Subject heading
                    <textarea
                        value={heading}
                        onChange={e => setHeading(e.target.value)}
                    />
                </label>
                <button type="submit">Edit Subject</button>
            </form>
        </div>
    );
}


export default EditSubject
