import React from 'react'
import { Button } from "../Utils/Utils";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons'
import './LandingPage.css'

function LandingPage(props) {
  
  return (
    <div className="LandingPage__app" style={{ marginTop: "-30px" }}>
      <div className="LandingPage__container">

        <div className="LandingPage__banner">
          <h1 className="heading">Precious Little Moments</h1>
          <hr className="LandingPage-hr"></hr>
          <section className="LandingPage__Tagline">
            <p>
            An online diary for parents who want to save and share those precious moments of your little ones.
            </p>
          </section>
          {!props.isLoading ? 
            <Button className="button demo-button" onClick={props.handleDemoLogin} style={{ width: "200px" }}>Demo Login</Button> 
            :
            <Button className="button demo-button" disabled={props.isLoading} style={{ width: "200px" }}>Loading...</Button>
          }
        </div>

        <div className="container-fluid bgimage">
          <div className="container features">
            <div className="col-top">
              <img src={require("../../images/smartmockups_k37xvb9w.png")} alt="screenshot-1" className="img-responsive1" />
            </div>
            
            <div className="col-left">
              <h2>Made Simple</h2>
              <p style={{ fontSize: "1.2em", marginBottom: "1em" }}>Join now and start saving those precious moments. It's that easy.</p>
              <Link to="/register">
                <Button className="button demo-button joinNow-button">Join Now</Button>
              </Link>
            </div>

            <div className="col-right col-right-alt">
              <img src={require("../../images/smartmockups_k37xvb9w.png")} alt="screenshot-1" className="img-responsive1" />
            </div>
          </div>
        </div>

        <div className="container-fluid bgimage">
          <div className="container features">
            <div className="col-right">
              <img src={require("../../images/smartmockups_k37xwkjj.png")} alt="screenshot-1" className="img-responsive2" />
            </div>

            <div className="col-left">
              <h2>Create Those Moments</h2>
              <p style={{ fontSize: "1.2em", marginBottom: "1em" }}>After you've registered and logged in, Get taken to your personnel profile where you will find all of your Moments. Add, Edit and Delete as you will. It's REALLY that easy!</p>
              <Link to="/login">
                <Button className="button demo-button joinNow-button">Login Now</Button>
              </Link>
            </div>

          </div>
        </div>

      </div>
      <footer className='HomePage__Footer'>
        <p className='HomePage__Footer__Text'>
          Created by
          <a href='http://www.iwoodhouse.net/' target='_blank' rel="noopener noreferrer"> Iyron Woodhouse</a> 
        </p>
        <div className='footer__social-media'>
          <a href="https://github.com/W00DH0USE" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='gold HomePage__Footer__Icon Github__Icon' icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/iyron-woodhouse-49973b122/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='gold HomePage__Footer__Icon Linkedin__Icon' icon={faLinkedin} />
          </a>
        </div>
        <p className='HomePage__Footer__Copyright'>Copyright © 2019 - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LandingPage


