import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk } from "../../store/joke"


const HomePage = () => {

    const dispatch = useDispatch();

    const allJokesList = useSelector(state => Object.values(state.joke));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;

    useEffect(() => {
        dispatch(getAllJokesThunk(userId));
    }, [dispatch, userId]);

    let sum = 0;

    allJokesList.forEach(joke => {
        sum += joke.rating;
    });

    const avgRating = (sum / allJokesList.length).toFixed(1);


    return (
        <div>
            <div><h1>You have {allJokesList.length} jokes with average rating of {avgRating}/5</h1></div>
            {allJokesList?.map(joke => (
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
                    </ul>
                </div>
            ))}
        </div>
    )

}

export default HomePage;
