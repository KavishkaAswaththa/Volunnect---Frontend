import React from 'react';
import styles from'../styles/PopupModal.module.css'; 

const PopupModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal-overlay}>
            <div className="styles.modal">
                <div className="styles.modal-header modal-lg">
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
