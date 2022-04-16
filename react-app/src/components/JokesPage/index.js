import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJokesThunk } from "../../store/joke";
import { useParams } from "react-router-dom";


const JokesPage = () => {

    const dispatch = useDispatch();
    const jokeList = useSelector(state => Object.values(state.joke).reverse());
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const subject_id = useParams().subjectId;

    useEffect(() => {
        dispatch(getJokesThunk(userId, subject_id));
    }, [dispatch, userId, subject_id]);

    return (
        <div>
            {jokeList?.map(joke => (
                <div>
                    <ul>
                        <li key={joke.id + "A"}>
                            {joke.title}
                        </li>
                        <li key={joke.id + "B"}>
                            {joke.content}
                        </li>
                        <li key={joke.id + "B"}>
                            {joke.rating}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default JokesPage
