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
      fetchOK: false,
      guess: '',
      head: null,
      next: null
    }
  }
  componentDidMount = () => {
      fetch(`${config.API_ENDPOINT}/language`, {
        method: "GET",
        headers:{
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(res => res.json())
      .then(res => this.setState({language: res.language, frenchWords: res.words}));
      fetch(`${config.API_ENDPOINT}/language/head`, {
        method: "GET",
        headers:{
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(res => res.json())
      .then(res => this.setState({head: res, fetchOK: true}));
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
    })
    .then(res => res.json())
    .then(res => this.setState({next: res}))

  }
  handleNextWord = () => {
    this.setState({head: this.state.next, next: null, fetchOK: true})
  }
  renderLearn= () =>{
    return(
      <main>
        <div>
          <h2>Translate the word:</h2>
          <span>{this.state.head.nextWord}</span>
        </div>
        <div className='DisplayScore'>
          <p>Your total score is: {this.state.head.totalScore}</p>
        </div>
        <p>You have answered this word correctly {this.state.head.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.head.wordIncorrectCount} times.</p>
        <form className='guess-form' onSubmit={this.handleSubmit}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input 
            id='learn-guess-input'
            onChange = {(event) => this.setState({guess: event.currentTarget.value})}
            type='text' 
            placeholder='Enter your guess' 
            required/>
          <button type='submit'>Submit your answer</button>
        </form>
      </main>
    )
  }
  renderAnswer = () => {
    const next = this.state.next;
    const head = this.state.head;
    return (
      <main>
        <div className='DisplayScore'>
          <p>Your total score is: {next.totalScore}</p>
        </div>
        <h2>{next.isCorrect === true? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
        <div className='DisplayFeedback'>
          <p>{`The correct translation for ${head.nextWord} was ${next.answer} and you chose ${this.state.guess}!`}</p>
        </div>
        <button onClick={this.handleNextWord}>Try another word!</button>
      </main>
    )
  }

  render = () => {
    return (
      <>
        {this.state.fetchOK && this.state.next === null ? this.renderLearn() : null}
        {this.state.next ? this.renderAnswer() : null}
      </>
    )
  }
}
