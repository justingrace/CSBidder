import React from 'react';
import classes from './About.scss';

class About extends React.Component {
  render() {
    return (
        <div className={classes.About}>
          <header className={classes.AboutHeader}>
            <h1>About Header</h1>
          </header>
          <div>
              About Page
          </div>
        </div>
    );
  }
}

export default About;
