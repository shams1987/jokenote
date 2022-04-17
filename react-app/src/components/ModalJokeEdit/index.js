import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditJoke from "./EditJoke";


function EditJokeModal({ joke }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="" onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditJoke joke={joke} />
                </Modal>
            )}
        </>
    );
}

export default EditJokeModal;
