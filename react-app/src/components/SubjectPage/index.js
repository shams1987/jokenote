import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectsThunk } from "../../store/subject";

const SubjectPage = () => {

    const dispatch = useDispatch();
    const subjectList = useSelector(state => Object.values(state.subject));
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;


    useEffect(() => {
        dispatch(getSubjectsThunk(userId));
    }, [dispatch, userId]);





    return (
        <div>
            <h1>Subjects</h1>
            <div>
                {subjectList?.map(subject => (
                    <div>
                        <ul>
                            <li key={subject.id + "A"}>
                                {subject.heading}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectPage
