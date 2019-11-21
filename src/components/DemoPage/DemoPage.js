import React from 'react';
import { Button } from "../Utils/Utils";
import '../Profile/Profile.css';

class DemoPage extends React.Component {
  state = {

  }

  render() {
    return (
      <main className="profile-main" role="main">
          <header className="heading" role="banner">
            <h1>Welcome Demo User</h1>
            <hr className="LandingPage-hr"></hr>
          </header>
          <section className='moments'>
            <h3 className="moments-title" id='Moments-title'>Your Moments</h3>

            <section className='cards' >
              <div className="card_image">
                <img src={require("../../images/family.jpg")} alt="cloud-img"/>
              </div>
              <div className="card_content">
                <h4 className="card_title">She Smiled</h4>
                <p className='card_text'>After two months of sleepless nights and round-the-clock soothing, I've seen plenty of tears. Now it's time for the real reward. I saw her irresistible grin today as she smiled for the first time.</p>
                <p className='card_date'>Created on: 12-03-2016</p>
                <Button className='card-button delete-post-button'>Delete</Button>
                <Button className='card-button update-post-button'>Update</Button>
              </div>
            </section>

            <section className='cards' >
              <div className="card_image">
                <img src={require("../../images/family.jpg")} alt="cloud-img"/>
              </div>
              <div className="card_content">
                <h4 className="card_title">Finally A Full Nights Sleep!</h4>
                <p className='card_text'>Like no other baby milestone, a full night of sleep becomes the Holy Grail for new parents. Finally it's happened</p>
                <p className='card_date'>Created on: 12-03-2016</p>
                <Button className='card-button delete-post-button'>Delete</Button>
                <Button className='card-button update-post-button'>Update</Button>
              </div>
            </section>

            <section className='cards' >
              <div className="card_image">
                <img src={require("../../images/family.jpg")} alt="cloud-img"/>
              </div>
              <div className="card_content">
                <h4 className="card_title">That Laugh Though</h4>
                <p className='card_text'>Possibly the sweetest you'll ever hear -- her laughter. The best part is how easily she laughs. Silly faces, tickling, and peek-a-boo are usually more than enough to set off lots of squeals and giggles.</p>
                <p className='card_date'>Created on: 12-03-2016</p>
                <Button className='card-button delete-post-button'>Delete</Button>
                <Button className='card-button update-post-button'>Update</Button>
              </div>
            </section>

            <section className='cards' >
              <div className="card_image">
                <img src={require("../../images/family.jpg")} alt="cloud-img"/>
              </div>
              <div className="card_content">
                <h4 className="card_title">His First Steps</h4>
                <p className='card_text'>He took his first steps today, I actually cried</p>
                <p className='card_date'>Created on: 12-03-2016</p>
                <Button className='card-button delete-post-button'>Delete</Button>
                <Button className='card-button update-post-button'>Update</Button>
              </div>
            </section>

          </section>
          <div className="delete-account-button-div">
            <Button className="button demo-button delete-account-button">Delete Account</Button> 
          </div>  
        </main>
    )
  }
}

export default DemoPage;