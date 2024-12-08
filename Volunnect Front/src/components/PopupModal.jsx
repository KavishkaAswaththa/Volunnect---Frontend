import React from 'react';
import '../styles/PopupModal.css'; // Add the CSS for modal here

const PopupModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay modal-lg">
            <div className="modal">
                <div className="modal-header modal-lg">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
