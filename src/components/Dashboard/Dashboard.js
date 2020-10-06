import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service'
import QuizWindow from '../QuizWindow/QuizWindow'
import context from '../../contexts/Context'
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
  
  render(){
    const quizData = {
      language: this.state.language,
      words: this.state.frenchWords,
      handleSubmit: this.handleSubmit
    }
    return(
      <context.Provider value={quizData}>
        <div className='header'>
          <select>
            <option>-- Pick a language --</option>
            <option>{this.state.language.name}</option>
          </select>
          <div>
            <h3>Words Answered Correctly : {this.state.correct_count}</h3>
            <h3>Words Answered Incorrectly : {this.state.incorrect_count}</h3>
          </div>
        </div>
        <div className='main'>
          {this.state.learning 
          ? <QuizWindow/> 
          : <button type='submit' onClick={() => this.setState({learning: true})}>Start Learning!</button>}
        </div>
      </context.Provider>
    )
  }
}