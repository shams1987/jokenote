import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editJokeThunk } from "../../store/joke"


function EditJoke({ joke }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const [title, setTitle] = useState(joke.title);
    const [content, setContent] = useState(joke.content);
    const [rating, setRating] = useState(joke.rating);
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault();
        let newJoke = {
            id: joke.id,
            user_id: sessionUser.id,
            subject_id: joke.subject_id,
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
            dispatch(editJokeThunk(newJoke));
            window.location.reload(false);
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
                <label className="">
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
                <button type="submit">edit</button>
            </form>
        </div>
    );
}


export default EditJoke
