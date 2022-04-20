import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJokeThunk } from "../../store/joke";

import { useParams } from "react-router-dom";


function AddJoke() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const subject_id = useParams().subjectId;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    //const [errors, setErrors] = useState([])

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

        dispatch(addJokeThunk(joke));
        window.location.reload(false);
    };

    return (
        <div className="modal-container">
            <form className="Joke-form" onSubmit={handleSubmit}>
                <label>
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    joke content
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </label>
                <label className="joke-rating">
                    Rating
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
                </label>
                <button type="submit">Add a joke</button>
            </form>
        </div>
    );
}


export default AddJoke
