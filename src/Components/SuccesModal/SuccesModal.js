import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./SuccesModal.scss"


export default function SuccesModal() {

    const succes = useSelector((state) => state.user.succes);
    const error = useSelector((state) => state.user.erreur);

    //console.log("succès : ", succes)

    const [modalOpen, setModalOpen] = useState(false)

    // Un useEffect qui suit l'évolution des variables erreur et succes dans le state.
    // Si un des deux est créé, la popUp s'exécute avec une condition pour vérifier si c'est un succès ou une erreur.
    useEffect(() => {
        if (succes) {
            toggleModal();
        } else if (error) {
            toggleModal();
        } else {
            return
        }
    }, [succes, error]);

    // une fonction qui affiche la pop Up 2s
    const toggleModal = (message) => {
        setModalOpen(true)
        setTimeout(() => {
            setModalOpen(false);
        }, 1900);
    }

    return (
        <>
            {modalOpen === true &&
                <div className={`${succes ? 'succesModal_container' : 'errorModal_container'}`}>
                    <h5>{succes ? succes : error}</h5>
                </div>
            }
        </>
    )
}
