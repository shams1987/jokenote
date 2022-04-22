import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addSubjectThunk } from "../../store/subject";
import "./ModalSubjectAdd.css";


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

        if ((heading) && (heading.length <= 30)) {

            dispatch(addSubjectThunk(subject));
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
            <div className="centering-subject-modal">
                <form onSubmit={handleSubmit}>
                    <div className="title-margin">
                        <label className="title-new-subject">
                            Subject heading
                        </label>
                    </div>
                    <div>
                        <input className="form-field-subject"
                            value={heading}
                            onChange={e => setHeading(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="special-size green-button" type="submit">Add Subject</button>
                    </div>
                </form>
            </div>

        </div>
    );
}


export default AddSubject
