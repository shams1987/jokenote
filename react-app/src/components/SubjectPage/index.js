import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
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
        <div className="subject-page-display">

            <div className="subject-title-container">
                <div className="sibject-title">
                    <h2>You have {subjectList.length} Subjects</h2>
                </div>
                <div className="subject-add-btn">
                    <AddSubjectModal />
                </div>
            </div>

            {subjectList?.map(subject => (
                <div key={subject.id} className="subject-container">
                    <ul className="subject-list">
                        <li className="each-subject" key={subject.id + "A"}>
                            <NavLink
                                className="each-link"
                                to={`/jokes/${subject.id}`}>
                                {subject.heading}
                            </NavLink>
                        </li>
                    </ul>
                    <div>
                        <EditSubjectModal subject={subject} />
                        <button className="subject-delete-btn black-button" onClick={() => deleteSubject(subject.id)}>delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SubjectPage
