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
      guess: '',
      next: null
    }
  }
  componentDidMount = () => {
    this.fetch()
  }
  fetch = () => {
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
    })
    .then(res => res.json())
    .then(res => this.setState({next: res}))

  }
  handleNextWord = async (event) => {
    event.preventDefault()
    await this.fetch();
    this.setState({next: null});
  }


  render = () => {
    const word = this.state.fetchOK ? this.state.frenchWords[0].original : '';
    let learningPageHTML;
      learningPageHTML = <>
      <h2>{this.state.language.name}</h2>
      <h2>Total correct answers: {this.state.language.total_score}</h2>
      <main>
          <div>
          <h2>Translate the {this.state.language.name} word to English:</h2>
            <span>{word}</span>
          </div>
          {this.state.next
          ? <>
          <h1>{this.state.next.isCorrect ? <span className='correct'>Correct Answer</span> : <span className='incorrect'>Incorrect Answer</span>}</h1>
          <h2>Translation: {this.state.next.answer}</h2>
          <button onClick={this.handleNextWord} type='submit'>Try another word</button>
          </>
          : <form className='guess-form' onSubmit={this.handleSubmit}>
          <input onChange = {(event) => this.setState({guess: event.currentTarget.value})}type='text' placeholder='Enter your guess' required/>
          <button>Submit</button>
        </form>}
      </main>
    </>
    
    return (learningPageHTML)
  }
}
