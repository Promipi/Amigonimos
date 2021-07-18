import React from 'react';
import '../styles/modal.scss';

const Modal = ({show,onClose,children,title}) =>{
    return(
        <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;