import React from 'react'
import './ColorsModal.scss'

export default function ColorsModal({ colorFunc }) {


    return (
        <div className='colors_container'>
            <div onClick={() => colorFunc("#ba9a26")} className="colors1"></div>
            <div onClick={() => colorFunc("#eac435")} className="colors2"></div>
            <div onClick={() => colorFunc("#345995")} className="colors3"></div>
            <div onClick={() => colorFunc("#8c2d7e")} className="colors4"></div>
            <div onClick={() => colorFunc("#e40066")} className="colors5"></div>
            <div onClick={() => colorFunc("#746785")} className="colors6"></div>
            <div onClick={() => colorFunc("#03cea4")} className="colors7"></div>
            <div onClick={() => colorFunc("#7f8e71")} className="colors8"></div>
            <div onClick={() => colorFunc("#fb4d3d")} className="colors9"></div>
        </div>
    )
}
