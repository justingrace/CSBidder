import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import classes from './Home.scss';
import MonitorImg from '../../assets/img/monitor2.jpg';
import CoffeeImg from '../../assets/img/coffee.png';

const Home = () => {

    useEffect(() => {
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
    }, []);


    const [timer, setTimer] = useState(null);
    const [bid, setBid] = useState(0);
    const [name, setName] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const touchStartMonitor = () => {
        console.log("showResults1");
        setTimer(setTimeout(() => {
            setShowResults(true);
        }, 5000));
    }

    const touchEndMonitor = () => {
        if (timer) clearTimeout(timer);
    }

    const successResponse = () => {
        setDone(true);
        setError(false)
    }

    const submitBid = () => {

        if (bid > 0) {
            console.log("here")
            setLoading(true);
            fetch('https://vast-buffet.glitch.me/placeBid',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({bid, name})
                })
                .then(res => res.json())
                .then(res => res.success ? successResponse() : setError(true));
            setBid(0);
            setName("");
            setLoading(false);
        } else setError(true)


    }

    const onBidChange = (e) => {
        if (done) setDone(false);
        if (error) setError(false);
        setBid(e.target.value)
    }

    return (
        <div className={classes.Home}>
            {showResults && <Redirect to="/results" />}
            <div className={classes.monitorImgHolder} onTouchStart={touchStartMonitor}
                 onTouchEnd={touchEndMonitor}>
                <img src={MonitorImg} className={classes.monitor} alt=""/>
                <img src={CoffeeImg} className={classes.coffee} alt=""/>
            </div>
            <div className={classes.details}>
                <p>27" Full HD Monitor + Free Nespresso Caramel (x50)</p>
                <p className={classes.suggested}>Suggested price: 300$</p>
            </div>

            <div className={classes.top}>
                <div className={classes.nameContainer}>
                    <span>Name:</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className={classes.bidContainer}>
                    <span>Amount:</span>
                    <input type="number" name="price" value={bid} onChange={onBidChange}/>
                </div>
            </div>

            <div className={classes.bidButton} onClick={submitBid}>
                BID
            </div>

            {error && <p className={classes.errorText}>Error: Please enter valid bid amount</p>}
            {done && <p className={classes.status}>Thank you for your bid!</p>}
        </div>
    );
}

export default Home;
