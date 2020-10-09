import React from "react";
import config from '../../config';
import TokenService from '../../services/token-service'
import './LearningPage.css';


export default class LearningPage extends React.Component{
  constructor(){
    super();
    this.state = {
      language: {},
      frenchWords: [],
      total_score: 0,
      fetchOK: false,
      guess: ''
    }
  }
  componentDidMount = () => {
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => res.json())
    .then(res => this.setState({language: res.language, frenchWords: res.words, fetchOK: true}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({guess: this.state.guess}) 
    });

  }


  render = () => {
    const word = this.state.fetchOK ? this.state.frenchWords[0].original : '';
    let learningPageHTML;
    if(this.state.fetchOK === true){
      learningPageHTML = <>
      <h2>{this.state.language.name}</h2>
      <h2>Total correct answers: {this.state.language.total_score}</h2>
      <main>
          <div>
            <h2>Translate the word:</h2>
            <span>{word}</span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input onChange = {(event) => this.setState({guess: event.currentTarget.value})}type='text' placeholder='Enter your answer' required/>
            <button>Submit</button>
          </form>
      </main>
    </>
    } else {
      learningPageHTML = <h1>Loading...</h1>
    }
    return (learningPageHTML)
  }
}
