import React from 'react'
import "./Modal.scss"

export default function Modal({ handleModal, handleDelete }) {
    return (
        <div className="modal_fond">
            <div className='modal_container'>
                <h1 className='modal_title'>ÊTES VOUS CERTAINS DE VOULOIR SUPPRIMER CE COMPTE ?</h1>
                <div className="modal_button_container">
                    <button onClick={handleModal} className="Button_annuler">ANNULER</button>
                    <button onClick={handleDelete} className="Button_Valider">Valider</button>
                </div>
            </div>
        </div>
    )
}
