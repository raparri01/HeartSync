import React, { Component } from 'react';
import './styles/css/App.css';
import UserInfo from './UserInfo';
import credentials from './config';
import ChartistGraph from 'react-chartist';

const AWS = require('aws-sdk');
AWS.config.credentials = credentials;
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB();

var params = {
  TableName: "RobertAparri3",
  Limit: 1,
  HashKey: 'unixts'
}
var params2 = {
  TableName: "3lkqtfou9xllnul3qsy07ks2cbqiho1w",
  Limit: 20,
}

var options = {
      high: 200,
      low: 0,
      height: '400px',
      color: 'white'

    };

function getUserData(){
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
       if(err){
        console.log(err);
        reject(err);
      } // an error occurred
       else{
         resolve(data);
       }
      });
  })
}

function getUserHeartrates(){
  return new Promise((resolve, reject) => {
    docClient.scan(params2, (err, data) => {
       if(err){
        console.log(err);
        reject(err);
      } // an error occurred
       else{
         resolve(data);
       }
      });
  })
}



class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      CurrentUserHeartRate:{
        Items:[
          {
            heartRate:0,
            temperature:0,
            timestamp:0,
          }
        ]
      },
      HeartRate: [],
      ts: []
      }

    this.returnUserData = this.returnUserData.bind(this);
    this.returnUserHeartRates = this.returnUserHeartRates.bind(this);
    this.renderHeartRate = this.renderHeartRate.bind(this);
    this.renderTs = this.renderTs.bind(this);
  }

  componentWillMount(){
    this.returnUserData();
    this.returnUserHeartRates();

  }

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
            <h1></h1>
          </div>
          <div className="userData">
            <h className = 'title'>Activity Graph</h>
            <div className = "chart">
              <ChartistGraph options= {options} data={
                {
                series: [this.renderHeartRate()],
                labels: this.renderTs()
                }
              }
              type={'Line'} />
            </div>
            </div>
            <div className = "bandStats">
              <h className='title'>Band Statistics</h>
              <div className ="heartRate">
                <h3>Current Heartbeat</h3>
                <p>{this.state.CurrentUserHeartRate.Items[0].heartRate.toFixed(0)} BPM</p>
              </div>
              <br></br>
              <div className ="heartRateLast5">
                  <h3>Average Heart Rate</h3>

              </div>
              <br></br>
              <div className ="monitoring">
                  <h3>Monitoring</h3>
                  <p>true</p>
              </div>
              <br></br>
              <div className ="status">
                <h3>Status</h3>
                <div></div>
              </div>
              <br></br>
              <div className ="lastChecked">
                <h3>Last Checked</h3>
                <p>{this.state.CurrentUserHeartRate.Items[0].ts}</p>
              </div>
              <div className = "buttons">
                <br></br>
                <img className="btn" src={require("./styles/img/View Recent Activity.png")}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }

  returnUserData = () => {
    getUserData()
      .then(data => {
        let UserData = data;
        this.setState({
          CurrentUserHeartRate: UserData
        });
        //console.log(this.state)

      })
  }

  returnUserHeartRates = () => {
    getUserHeartrates()
      .then(data => {
        var heartRateArray = [];
        var tsArray = [];
        let UserHeartRate = data;
        var index = 0;
        UserHeartRate.Items.forEach(item => {
          index++;
          heartRateArray.push(item.heartRate);
          tsArray.push(index);
        })
        this.setState({
          HeartRate: heartRateArray,
          ts: tsArray
        });
        //console.log(this.state.HeartRate)
        //console.log(this.state);
      })
  }

renderHeartRate = () => {
  return(this.state.HeartRate);
}
renderTs = () => {
  return(this.state.ts);
}

}

export default App;
