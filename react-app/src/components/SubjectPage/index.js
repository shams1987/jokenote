import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectsThunk, deleteSubjectThunk } from "../../store/subject";

import AddSubjectModal from "../ModalSubjectAdd";
import EditSubjectModal from "../ModalSubjectEdit";

import "./SubjectPage.css";

const SubjectPage = () => {

    const dispatch = useDispatch();
    const subjectList = useSelector(state => Object.values(state.subject).reverse());
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;


    useEffect(() => {
        dispatch(getSubjectsThunk(userId));
    }, [dispatch, userId]);

    const deleteSubject = id => {
        dispatch(deleteSubjectThunk(id));
    };



    return (
        <div>
            <div className="subject-title-container">
                <div className="sibject-title">
                    <h1>You have {subjectList.length} Subjects</h1>
                </div>
                <div>
                    <AddSubjectModal />
                </div>
            </div>
            <div>
                {subjectList?.map(subject => (
                    <div key={subject.id} className="subject-container">
                        <ul className="subject-list">
                            <li key={subject.id + "A"}>
                                {subject.heading}
                            </li>
                        </ul>
                        <div>
                            <EditSubjectModal subject={subject} />
                            <button onClick={() => deleteSubject(subject.id)}>delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectPage
