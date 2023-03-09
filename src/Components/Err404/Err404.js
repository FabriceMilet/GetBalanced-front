import './Err404.scss'
import Err404Img from "./Err404.jpg"

export default function Err404() {
  return (
    <div>
      <h1 className='error_title'>Oops, cette page n'existe pas !</h1>
      <img className='error_img' src={Err404Img} alt="Page non trouvée" />
    </div>
  )
}
