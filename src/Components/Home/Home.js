import './Home.scss';
import Area1 from './Area1/Area1';
import Area2 from './Area2/Area2';
import Area3 from './Area3/Area3';
import Area4 from './Area4/Area4';
import { Waypoint } from 'react-waypoint';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';

function Home() {
    // State qui permet l'affichage du composant s'il est true
    const [toggleElem1, setToggleElem1] = useState(false)
    const [toggleElem2, setToggleElem2] = useState(false)
    const [toggleElem3, setToggleElem3] = useState(false)

    // Les animations qui sont déclenchées lors du passage du state de false a true. 
    const animation = useSpring({
        opacity: toggleElem1 ? 1 : 0,
        transform: toggleElem1 ? "translateX(0)" : "translateX(-80%)"
    })
    const animation2 = useSpring({
        opacity: toggleElem2 ? 1 : 0,
        transform: toggleElem2 ? "translateX(0)" : "translateX(80%)"
    })
    const animation3 = useSpring({
        opacity: toggleElem3 ? 1 : 0,
        transform: toggleElem3 ? "translateX(0)" : "translateX(80%)"
    })

    return (
        <div className='home_container'>
            <Area1 />
            {/* Waypoint déclanche un évènement lors du scroll. 
            si le state est sur false il le passe a true */}
            <Waypoint bottomOffset="30%"
                onEnter={() => {
                    if (!toggleElem3) {
                        setToggleElem3(true)
                    }
                }
                }>
                <animated.div style={animation3}>
                    <Area2 />
                </animated.div>
            </Waypoint>

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