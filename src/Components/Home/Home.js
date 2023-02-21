import './Home.scss';
import Header from '../Header/Header';
import Area1 from './Area1/Area1';
import Area2 from './Area2/Area2';
import Area3 from './Area3/Area3';
import Area4 from './Area4/Area4';
import { Waypoint } from 'react-waypoint';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';

function Home() {

    const [toggleElem1, setToggleElem1] = useState(false)
    const [toggleElem2, setToggleElem2] = useState(false)

    console.log(toggleElem1, toggleElem2)

    const animation = useSpring({
        opacity: toggleElem1 ? 1 : 0,
        transform: toggleElem1 ? "translateX(0)" : "translateX(80%)"
    })
    const animation2 = useSpring({
        opacity: toggleElem2 ? 1 : 0,
        transform: toggleElem2 ? "translateX(0)" : "translateX(-80%)"
    })

    return (
        <div className='home_container'>
            <Area1 />
            <Area2 />
            <Waypoint bottomOffset="30%"
                onEnter={() => {
                    if (!toggleElem1) {
                        setToggleElem1(true)
                    }
                }
                }>
                <animated.div style={animation}>
                    <Area3 />
                </animated.div>
            </Waypoint>
            <Waypoint bottomOffset="30%"
                onEnter={() => {
                    if (!toggleElem2) {
                        setToggleElem2(true)
                    }
                }
                }>
                <animated.div style={animation2}>
                    <Area4 />
                </animated.div>

            </Waypoint>
        </div>
    );
}

export default Home;