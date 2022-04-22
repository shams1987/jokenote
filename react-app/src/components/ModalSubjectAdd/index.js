import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSubject from "./AddSubject";
import "./ModalSubjectAdd.css";


function AddSubjectModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="big-button green-button special-size" onClick={() => setShowModal(true)}>
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
