import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk } from "../../store/joke"


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
            <div className="splash-message"> The ex-Arsenal forward scored with a close-range header after a cross by ex-Manchester City player Ferran Torres.

                Marc-Andre ter Stegen saved well from Alexander Sorloth while Alexander Isak fired another chance wide.

                Shortly before Aubameyang's goal, Ousmane Dembele's shot came back off the post. </div>
            <div className="splash-page-bacground">

            </div>
            <div className="splash-joke"> {joke}</div>

        </>

    )

}

export default HomePage;
