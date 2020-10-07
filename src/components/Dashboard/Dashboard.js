import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service'
import './Dashboard.css'

export default class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      language: {},
      frenchWords: [],
      correct_count: 0,
      incorrect_count: 0,
      total_score: 0,
      wordNumber: 0,
      answer: '',
      learning: false
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
    .then(res => this.setState({language: res.language, frenchWords: res.words}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
  }
  createList = () => {
    const wordsList = this.state.frenchWords.map((word) => {
      return <li key={word.id}>
        <h4>{word.original}</h4>
        <h5>correct answer count: {word.correct_count}</h5>
        <h5>incorrect answer count: {word.incorrect_count}</h5>
      </li>
    });
    return wordsList
  }
  
  render(){
    return(
      <section>
        <div className='header'>
          <h2>{this.state.language.name}</h2>
          <h2>Total correct answers: {this.state.language.total_score}</h2>
        </div>
        <div className='main'>
          <a href='/learn' type='submit' onClick={() => this.setState({learning: true})}>Start practicing</a>
          <h3>Words to practice</h3>
          <ul>
          {this.createList()}
          </ul>
        </div>
      </section>
    )
  }
}