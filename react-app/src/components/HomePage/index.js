import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJokesThunk } from "../../store/joke"


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
    const avgRating = (sum / allJokesList.length).toFixed(1);


    return (
        <div>
            <div><h1>You have {allJokesList.length} jokes with average rating of {avgRating}/5</h1></div>
            <div>
                <label>
                    Order
                    <select
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    >
                        <option value="desc">highest rated</option>
                        <option value="asc">lowest rated</option>
                    </select>
                </label>
            </div>
            {sortedJokes?.map(joke => (
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
