import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import classes from './Home.scss';
import MonitorImg from '../../assets/img/monitor2.jpg';
import Loader from '../../assets/img/loader.svg';

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
    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const touchStartMonitor = () => {
        setTimer(setTimeout(() => {
            setShowResults(true);
        }, 5000));
    }

    const touchEndMonitor = () => {
        if (timer) clearTimeout(timer);
    }

    const successResponse = () => {
        localStorage.setItem("bid","true");
        setDone(true);
        setError(false);
        setLoading(false);
    }
    const failureResponse = () => {
        setError(true);
        setLoading(false);
    }

    const submitBid = () => {
        setLoading(true);
        if(localStorage.getItem("bid") !== "true") {
            if (bid > 0) {
                fetch('https://vast-buffet.glitch.me/placeBid',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({bid, name})
                    })
                    .then(res => res.json())
                    .then(res => res.success ? successResponse() : failureResponse());
                setBid(0);
                setName("");
            } else failureResponse()
        } else failureResponse()

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
            </div>
            <div className={classes.details}>
                <p>27" Full HD Monitor for highly productive Developers with built in GPS tracker</p>
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

            {loading &&
                <div className={classes.loader}><img src={Loader} alt=""/></div>
            }
            {error && <p className={classes.errorText}>Error: Something went wrong. (P.S. Only 1 bid per person)</p>}
            {done && <p className={classes.status}>Thank you for your bid!</p>}
        </div>
    );
}

export default Home;
