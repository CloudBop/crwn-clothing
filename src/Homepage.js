import React from 'react';
import './homepage.styles.scss';
function Homepage() {
  return (
    <div className="homepage">
      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Hats</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>

      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Womens</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>

      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Outdoor</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>

      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">JEans</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>

      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Shoes</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
