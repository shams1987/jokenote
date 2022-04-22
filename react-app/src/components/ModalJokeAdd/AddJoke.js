import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJokeThunk } from "../../store/joke";

import { useParams } from "react-router-dom";
import "./ModalJokeAdd.css"


function AddJoke() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const subject_id = useParams().subjectId;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const [errors, setErrors] = useState([])

    const handleSubmit = e => {

        e.preventDefault();
        let joke = {
            user_id: sessionUser.id,
            subject_id,
            title,
            content,
            rating
        };

        //error validation
        setErrors([])

        if ((title.length === 0) || title.length > 40) {
            setErrors(["Please provide a title that is 1 to 40 characters long"])
        }
        else if (content.length === 0) {
            setErrors(["Please provide a content for this joke"])
        }
        else {

            dispatch(addJokeThunk(joke));
            window.location.reload(false);
        }
    };

    return (
        <div className="modal-container">

            <div>
                <ul>
                    {errors.map((error) => (
                        <li key={error} id="error">{error}</li>
                    ))}
                </ul>
            </div>
            <div>
                <form className="Joke-form" onSubmit={handleSubmit}>
                    <div className="title-margin-joke">
                        <label className="title-new-joke">
                            title
                        </label>
                    </div>
                    <div>
                        <input className="form-field-joke"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="title-margin-joke">
                        <label className="title-new-joke">
                            joke content
                        </label>
                    </div>
                    <div>
                        <textarea className="form-text-area-joke"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <div className="rating-button">
                        <div>
                            <label className="joke-rating">
                                Rating
                            </label>
                            <select
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                required
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div>
                            <button className="special-size green-button" type="submit">Add a joke</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default AddJoke
