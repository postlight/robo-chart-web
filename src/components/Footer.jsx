import React from 'react';
import postlightgif from '../static/images/postlight-labs.gif';

export default () => (
  <footer className="footer sheets-container">
    <span role="img" aria-label="microscope">
      🔬 A Labs project from your friends at
    </span>
    <a className="footer-gif" href="https://postlight.com/labs">
      <img src={postlightgif} alt="Postlight Labs" width="204" height="45" />
    </a>
  </footer>
);
