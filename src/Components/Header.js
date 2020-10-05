import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Header = () => {
  return (
    <div className="Header">
      <h1>JSON2Nest</h1>
      <div className="Header__Github">
        <div
          className="Git__icon"
          onClick={() => {
            window.open('https://github.com/firaskudsy', '_blank');
          }}
        >
          <GitHubIcon />
        </div>
        <div
          className="Git__icon"
          onClick={() => {
            window.open('https://twitter.com/firaskudsy', '_blank');
          }}
        >
          <TwitterIcon />
        </div>
        <div
          className="Git__icon"
          onClick={() => {
            window.open('https://www.linkedin.com/in/firaskudsy/', '_blank');
          }}
        >
          <LinkedInIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
