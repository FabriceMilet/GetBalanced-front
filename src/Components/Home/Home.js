import './Home.scss';
import Header from '../Header/Header';
import Area1 from './Area1/Area1';
import Area2 from './Area2/Area2';
import Area3 from './Area3/Area3';

function Home() {

    return (
        <div className='home_container'>
            <Area1 />
            <Area2 />
            <Area3 />
        </div>
    );
}

export default Home;