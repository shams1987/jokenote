import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk } from "../../store/joke"
import "./HomePage.css"


const HomePage = () => {

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

    // select order of jokes by rating
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


    return (
        <div>
            <div className="home-title"><h1>You have {allJokesList.length} jokes with average rating of {avgRating}/5</h1></div>
            <div className="home-rating-selector">
                <select
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                >
                    <option value="desc">highest rated</option>
                    <option value="asc">lowest rated</option>
                </select>
            </div>
            {sortedJokes?.map(joke => (
                <div key={joke.id}>
                    <ul className="home-joke-list">
                        <div className="home-joke-title-container">
                            <div className="home-joke-title">
                                <li key={joke.id + "A"}>
                                    {joke.title}
                                </li>
                            </div>
                            <div className="home-joke-rating">
                                <li key={joke.id + "C"}>
                                    rating: {joke.rating}/5
                                </li>
                            </div>
                        </div>
                        <div className="home-joke-container">
                            <li key={joke.id + "B"}>
                                {joke.content}
                            </li>
                        </div>
                    </ul>
                </div>
            ))}
        </div>
    )

}

export default HomePage;
