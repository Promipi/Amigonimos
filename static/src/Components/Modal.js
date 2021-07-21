import React from 'react';
import '../styles/modal.scss';

const Modal = ({show,onClose,children,title,close}) =>{
    return(
        <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h3><i className="fas fa-angle-right"></i> {title}</h3>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {close && (
                        <button type="button" className="btn" onClick={onClose}>
                            {"Close"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;