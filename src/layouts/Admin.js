import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

let ps;
const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setlanguage] = useState(false);
  const handleDrawerToggle = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  const handleAuthStateChange = (state) => {
    console.log(state);
    if (state === "signedin" || state === "signedout") {
      window.location.reload(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img align="left" height="60" src={"https://w3-mediapool.hm.edu/mediapool/media/baukasten/img_2/dtlab_1/bilder_138/logos_30/HM_MUni_Logo_DT_Lab_RGB_Logo.png"} alt="logo" />
        <img align="right" height="60" src={"https://w3-mediapool.hm.edu/mediapool/media/baukasten/img_2/hm_images/hm_logo_neu/HM_logo_SVG_no_margins.svg"} alt="logo" />
      </div>
      <div className={classes.navbar}>
        <Sidebar
          language={language}
          routes={routes}
          image={bgImage}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={"blue"}
          {...rest}
        />
        <Navbar
          language={language}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          setlanguage={setlanguage}
          {...rest}
        />

      </div>
      <div className={classes.mainPanel} ref={mainPanel}>
        <div className={classes.content}>
          <AmplifyAuthenticator >
            <AmplifySignIn
              slot="sign-in"
              handleAuthStateChange={handleAuthStateChange}
              hideSignUp
              formFields={[
                {
                  type: "username",
                  label: "Username",
                  value: "guest",
                  inputProps: { required: true },
                },
                {
                  type: "password",
                  label: "Password",
                  value: "1234567890",
                  inputProps: { required: true },
                },
              ]}
            >
            </AmplifySignIn>
            <div className={classes.container}>
              <Switch>
                {routes.map((prop, key) => {
                  if (prop.layout === "/admin") {
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        key={key}
                        render={(props) => (
                          <prop.component {...props} language={language} />
                        )}
                      />
                    );
                  }
                  return null;
                })}
                <Redirect from="/" to="/admin/challengeView" />
              </Switch>
            </div>
          </AmplifyAuthenticator>
        </div>
        <Footer
          language={language}
        />
      </div>
    </div>
  );
}
