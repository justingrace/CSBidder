import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.scss';
class Navbar extends React.Component{
    render() {
        return (
            <header className={classes.Header}>
              {/*<Link to='/'>Home</Link>*/}
              {/*<Link to='/about'>About</Link>*/}
              <p>CS Monitor bid</p>
            </header>
        );
      }
 }


export default Navbar;
