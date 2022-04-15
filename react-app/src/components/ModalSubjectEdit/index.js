import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSubject from "./EditSubject";


function EditSubjectModal({ subject }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="big-button" onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSubject subject={subject} />
                </Modal>
            )}
        </>
    );
}

export default EditSubjectModal;
