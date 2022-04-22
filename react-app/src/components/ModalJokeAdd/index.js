import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddJoke from "./AddJoke";


function AddJokeModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="green-button" onClick={() => setShowModal(true)}>
                Add Joke
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddJoke />
                </Modal>
            )}
        </>
    );
}

export default AddJokeModal;
