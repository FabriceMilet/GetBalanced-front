import './ColorsModal.scss'

export default function ColorsModal({ colorFunc, selectedColor }) {

    return (
        <div className='colors_container'>
            <div onClick={() => colorFunc("#ba9a26")} className={`colors1 ${selectedColor === "#ba9a26" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#eac435")} className={`colors2 ${selectedColor === "#eac435" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#345995")} className={`colors3 ${selectedColor === "#345995" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#8c2d7e")} className={`colors4 ${selectedColor === "#8c2d7e" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#e40066")} className={`colors5 ${selectedColor === "#e40066" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#746785")} className={`colors6 ${selectedColor === "#746785" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#03cea4")} className={`colors7 ${selectedColor === "#03cea4" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#7f8e71")} className={`colors8 ${selectedColor === "#7f8e71" ? 'selected' : ''}`}></div>
            <div onClick={() => colorFunc("#fb4d3d")} className={`colors9 ${selectedColor === "#fb4d3d" ? 'selected' : ''}`}></div>
        </div>
    )
}
