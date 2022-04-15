import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSubject from "./AddSubject";

//import "../HomePage/homepage.css";

function AddSubjectModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="big-button" onClick={() => setShowModal(true)}>
                Add Subject
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddSubject />
                </Modal>
            )}
        </>
    );
}

export default AddSubjectModal;
