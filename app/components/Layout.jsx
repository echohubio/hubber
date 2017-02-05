import React from 'react';

// import Navigation from './Navigation';
// import NotificationsContainer from './Notifications';

const Layout = ({ children }) => (
  <div>
    <div className="container theme-showcase">
      { children }
    </div>
  </div>
);

/*
  <div>
    <Navigation />
    <div className="container theme-showcase">
      <NotificationsContainer />
      { children }
    </div>
    */

export default Layout;
