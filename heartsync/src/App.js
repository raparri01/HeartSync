import React, { Component } from 'react';
import './styles/css/App.css';
import UserInfo from './UserInfo';
import UserData from './readFromS3.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="headerBar">
            <header className="headerText">HeartSync Monitoring</header>
          </div>
        <div className="app-main-body">
          <div className ="userCardOuter">
          <div className = "userCard">
          <div className = "userStats">
          <div className = "profileHead">
            <h1>{UserData}</h1>
          </div>
          <div className="userData">
            <div className="picture">
              <img className="profilePic" src={require("./styles/img/Tom.png")}/>
            </div>
            </div>
            <div className = "bandStats">
              <div className ="heartRate">
                <h3>Current Heartbeat</h3>
                <p>{UserData} BPM</p>
              </div>
              <br></br>
              <div className ="heartRateLast5">
                  <h3>Average Heart Rate</h3>
                  <p>{UserData}</p>
              </div>
              <br></br>
              <div className ="monitoring">
                  <h3>Monitoring</h3>
                  <p>{UserData}</p>
              </div>
              <br></br>
              <div className ="status">
                <h3>Status</h3>
                <p>{UserData}</p>
              </div>
              <br></br>
              <div className ="lastChecked">
                <h3>Last Checked</h3>
                <p>5 minutes ago</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className = "buttons">
        <br></br>
        <img className="btn" src={require("./styles/img/View Recent Activity.png")}/>
        <br></br>
        <img className="btn" src={require("./styles/img/Request Current Status.png")}/>
      </div>
      </div>
      </div>
    );
  }
}

export default App;
