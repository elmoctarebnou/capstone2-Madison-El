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
      successful: false
    }
  }
  componentDidMount = () => {
    console.log(TokenService.getAuthToken());
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => res.json())
    .then(res => this.setState({language: res.language, frenchWords: res.words, successful: true}));
  }
  render = () => {
    const word = this.state.frenchWords ? this.state.frenchWords[0].original : '';
    return (
      <>
        <h2>{this.state.language.name}</h2>
        <h2>Total correct answers: {this.state.language.total_score}</h2>
        <main>
            <h2>Translate the word: {word}</h2>
        </main>
      </>
    );
  }
};
