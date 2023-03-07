import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import "./SuccesModal.scss"


export default function SuccesModal() {

    const Succes = useSelector((state) => state.user.succes);
    const Error = useSelector((state) => state.user.error);


    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(true)
        setTimeout(() => {
            setModalOpen(false);
        }, 2000);
    }

    return (
        <>
            {modalOpen === true &&
                <div className={`errorModal_container ${modalOpen ? 'fade-in' : ''}`}>
                    <h5>l'erreur !</h5>
                </div>
            }

            <div className='succesModal_container'>
                <h5>le succès !</h5>
            </div>
            <button className='boutton' onClick={toggleModal} type='button'>Boutton</button>
        </>
    )
}
