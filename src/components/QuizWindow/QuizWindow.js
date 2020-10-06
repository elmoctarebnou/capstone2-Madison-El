import React from "react";
import context from '../../contexts/Context'

export default class QuizWindow extends React.Component{
  static contextType = context



  render = () => {
    const wordsList = this.context.words.map((word) => <li key={word.id}>{word.original}</li>)
    return (
      <>
        <div className="learning">
          <h1>{this.context.words[0].original}</h1>
          <form onSubmit={this.context.handleSubmit}>
            <input
              onChange={(event) =>
                this.setState({ answer: event.currentTarget.value })
              }
              type="text"
              placeholder="Enter translated word"
            />
            <button>Submit</button>
          </form>
        </div>
        <div className="words-list">
          <ol>
            {wordsList}
          </ol>
        </div>
      </>
    );
  }
};
