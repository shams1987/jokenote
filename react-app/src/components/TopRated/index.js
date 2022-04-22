import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk, deleteJokeThunk } from "../../store/joke"

import EditJokeModal from "../ModalJokeEdit";
import "./TopRated.css"


const TopRated = () => {

    const dispatch = useDispatch();

    const allJokesList = useSelector(state => Object.values(state.joke));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const [rating, setRating] = useState("desc");


    function bblSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j].rating < arr[j + 1].rating) {
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        return arr;
    }

    // select which order of jokes by rating
    let sortedJokes;

    if (rating === "desc") {
        sortedJokes = bblSort(allJokesList);
    }
    else {
        sortedJokes = bblSort(allJokesList).reverse();
    }


    useEffect(() => {
        dispatch(getAllJokesThunk(userId));
    }, [dispatch, userId]);

    // average rating
    let sum = 0;
    allJokesList.forEach(joke => {
        sum += joke.rating;
    });
    const avgRating = (allJokesList.length > 0) ? (sum / allJokesList.length).toFixed(1) : 0;

    const deleteJoke = id => {
        dispatch(deleteJokeThunk(id));
    };

    return (
        <div className="toprated-container">
            <div id="background"></div>

            <div className="title-selector">
                <div className="toprated-title"><h1>Rated</h1></div>
                <div className="toprated-rating-selector green-button">
                    <select
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    >
                        <option value="desc">highest rated</option>
                        <option value="asc">lowest rated</option>
                    </select>
                </div>
            </div>

            <div >Jokes: {allJokesList.length},  Avg Rating: {avgRating}/5</div>

            {sortedJokes?.map(joke => (
                <div key={joke.id}>
                    <ul className="toprated-joke-list">

                        <div className="toprated-joke-title-container">
                            <div className="toprated-joke-title">
                                <li key={joke.id + "A"}>
                                    {joke.title}
                                </li>
                            </div>
                            <div className="toprated-joke-rating">
                                <li key={joke.id + "C"}>
                                    rating: {joke.rating}/5
                                </li>
                            </div>
                        </div>

                        <div className="toprated-bottom-container">
                            <div className="toprated-joke-container">
                                <li className="align-left" key={joke.id + "B"}>
                                    {joke.content}
                                </li>
                            </div>
                            <div>
                                <div>
                                    <EditJokeModal joke={joke} />
                                </div>
                                <div className="toprated-delete-btn"><button className="black-button" onClick={() => deleteJoke(joke.id)}>delete</button></div>
                            </div>
                        </div>

                    </ul>

                </div>
            ))}
        </div>
    )

}

export default TopRated;
