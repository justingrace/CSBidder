import React, {useState, useEffect} from 'react';
import classes from './Results.scss'

const Results = () => {

    const [bids, setBids] = useState([]);

    useEffect(() => {
        fetch('https://vast-buffet.glitch.me/getBids')
            .then(res => res.json())
            .then(res => setBids(res));
    }, []);
    return(
        <div className={classes.Results}>
            <h3>Results</h3>

                {bids.length>0 && bids.map(bid => <p className={classes.bid}>{bid.name}:{bid.bid}</p>)}
                {(bids.length===0)&& <p>Loading...</p>}

        </div>

    );
}

export default Results;
