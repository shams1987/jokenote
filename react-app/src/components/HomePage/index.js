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
            <div className="splash-message"> So, you think you are funny? If you are considering a career as a stand-up comic, start writing jokes categorized in subjects. As any successful comedian will tell you, writing jokes day in and day out requires a serious commitment. Coming up with ideas for a comedy stand-up set might seem easy but shaping this material into funny jokes that will make people laugh takes a lot of hard work. Let us get started !!! </div>
            <div className="splash-page-bacground">

            </div>
            <div className="splash-joke"> {joke}</div>

        </>

    )

}

export default HomePage;
