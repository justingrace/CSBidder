import React, {useState, useEffect} from 'react';
import classes from './Results.scss'
import Wreath from '../../assets/img/wreath.svg'

const Results = () => {

    const [bids, setBids] = useState([]);

    useEffect(() => {
        fetch('https://vast-buffet.glitch.me/getBids')
            .then(res => res.json())
            .then(res => setBids(res.sort((a, b) => b.bid - a.bid)));
    }, []);
    return (
        <div className={classes.Results}>
            <h3>Results</h3>
            {bids.length >  &&
            <p className={[classes.winner].join(" ")}>
                <img src={Wreath} alt=""/>
                <span>{bids[0].name} pays {bids[1].bid}</span>
            </p>
            }

            {bids.length > 0 && bids.map(bid =>
                <p className={classes.bid}>
                    <span className={classes.bidVal}>${bid.bid}</span>
                    {bid.name}
                </p>
            )}
            {(bids.length === 0) && <p>Loading...</p>}

        </div>

    );
}

export default Results;
