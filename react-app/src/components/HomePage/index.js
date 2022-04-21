import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk } from "../../store/joke"

import bigmic from "../../img/big-mic.jpg";
import "./HomePage.css"


const HomePage = () => {

    const dispatch = useDispatch();
    const allJokesList = useSelector(state => Object.values(state.joke));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const randomJokeObj = allJokesList[Math.floor(Math.random() * allJokesList.length)];

    let joke;

    if (allJokesList.length > 0) {
        joke = randomJokeObj?.content;
    }
    else {

        joke = "Why does Humpty Dumpty love autumn? Because he always has a great fall.";
    }

    useEffect(() => {
        dispatch(getAllJokesThunk(userId));
    }, [dispatch, userId]);


    return (
        <>
            <div>
                <img className="bigmic" src={bigmic} alt="bigmic"></img>
            </div>
            <p> {joke}</p>
        </>

    )

}

export default HomePage;
