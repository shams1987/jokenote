import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJokesThunk, deleteJokeThunk } from "../../store/joke";
import { useParams } from "react-router-dom";

import AddJokeModal from "../ModalJokeAdd";
import EditJokeModal from "../ModalJokeEdit";


const JokesPage = () => {

    const dispatch = useDispatch();
    const jokeList = useSelector(state => Object.values(state.joke).reverse());
    const subjectList = useSelector(state => Object.values(state.subject));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const subject_id = useParams().subjectId;
    const subject = subjectList[subject_id];
    //console.log(subjectList, "****************************")

    useEffect(() => {
        dispatch(getJokesThunk(userId, subject_id));
    }, [dispatch, userId, subject_id]);

    const deleteJoke = id => {
        dispatch(deleteJokeThunk(id));
    };

    return (
        <div>
            <div><h1>You have {jokeList.length} jokes</h1></div>
            <div><AddJokeModal /></div>
            {jokeList?.map(joke => (
                <div key={joke.id}>
                    <ul>
                        <li key={joke.id + "A"}>
                            Title: {joke.title}
                        </li>
                        <li key={joke.id + "B"}>
                            Joke: {joke.content}
                        </li>
                        <li key={joke.id + "C"}>
                            Rating: {joke.rating}/5
                        </li>
                        <EditJokeModal joke={joke} />
                        <div><button onClick={() => deleteJoke(joke.id)}>delete</button></div>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default JokesPage
