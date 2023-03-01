import React from 'react'
import "./validModal.scss"

export default function validModal({ handleModal, handleDelete }) {
    return (
        <div className="modal_fond">
            <div className='modal_container'>
                <h1 className='modal_title'>Êtes-vous certain de vouloir supprimer votre compte ?</h1>
                <div className="modal_button_container">
                    <button onClick={handleModal} className="Button_annuler">ANNULER</button>
                    <button onClick={handleDelete} className="Button_Valider">Valider</button>
                </div>
            </div>
        </div>
    )
}
