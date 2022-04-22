import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJokesThunk, deleteJokeThunk } from "../../store/joke";
//import { getSubjectsThunk } from '../../store/subject';
import { useParams } from "react-router-dom";

import AddJokeModal from "../ModalJokeAdd";
import EditJokeModal from "../ModalJokeEdit";
import "./JokesPage.css";


const JokesPage = () => {

    const dispatch = useDispatch();
    const jokeList = useSelector(state => Object.values(state.joke).reverse());
    // const subjectList = useSelector(state => Object.values(state.subject));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const subject_id = useParams().subjectId;
    // const subject = subjectList[subject_id - 1]?.heading;

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSubjectsThunk(userId));
    //     })();
    // }, [dispatch, userId]);

    useEffect(() => {
        dispatch(getJokesThunk(userId, subject_id));
    }, [dispatch, userId, subject_id]);

    const deleteJoke = id => {
        dispatch(deleteJokeThunk(id));
    };

    return (
        <div className="joke-body">

            <div className="joke-top yellow-background">
                {/* <div className="joke-how-many"><h2>{subject} ({jokeList.length})</h2></div> */}
                <div className="joke-how-many"><h2>You have {jokeList.length} jokes</h2></div>
                <div className="joke-add-btn"><AddJokeModal /></div>
            </div>

            {jokeList?.map(joke => (
                <ul className="joke-list" key={joke.id}>
                    <div className="joke-title-container">
                        <div className="joke-title">
                            <li key={joke.id + "A"}>
                                {joke.title}
                            </li>
                        </div>
                        <div className="joke-rating">
                            <li key={joke.id + "C"}>
                                rating: {joke.rating}/5
                            </li>
                        </div>
                    </div>
                    <div className="joke-bottom-container">
                        <div className="joke-container">
                            <li key={joke.id + "B"}>
                                {joke.content}
                            </li>
                        </div>

                        <div>
                            <div>
                                <EditJokeModal joke={joke} />
                            </div>
                            <div className="joke-delete-btn"><button className="black-button" onClick={() => deleteJoke(joke.id)}>Delete</button></div>
                        </div>

                    </div>
                </ul>
            ))}
        </div>
    )
}

export default JokesPage
