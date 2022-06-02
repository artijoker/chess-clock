import React, { Component, HTMLAttributes } from 'react';
//import logo from './logo.svg';
import './ChessClock.css'
import Timer from '../Timer/Timer';

interface Props { }

interface State {
  isFirstTimerActive: boolean,
  isSecondTimerActive: boolean,
  currentPlayer: number
}


export default class ChessClock extends Component<Props & HTMLAttributes<HTMLDivElement>, State>  {

  isGameStarted: boolean;
  minutes: number;
  seconds: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isFirstTimerActive: false,
      isSecondTimerActive: false,
      currentPlayer: 0
    }
    
    this.isGameStarted = false;
    this.minutes = 90;
    this.seconds = 0;
  }

  change = (): void => {
    this.setState({
      currentPlayer: 2 - this.state.currentPlayer + 1
    });
  }

  getCurrentPlayer = (): number => this.state.currentPlayer;

  render() {
    return (
      <div className="ChessClock m-5">
        <button className='btn btn-success mb-3'
          disabled={this.isGameStarted}
          onClick={() => {
            if (!this.isGameStarted) {
              this.isGameStarted = true;
              this.setState({
                currentPlayer: 1
              })
            }
          }}>
          Начать игру
        </button>
        <div className="row timer p-3">
          <div className='col'>
            <h5>Игрок 1</h5>
            <Timer minutes={this.minutes} seconds={this.seconds} playerNumber={1}
              change={this.change} getCurrentPlayer={this.getCurrentPlayer}
              className="p-5" />
          </div>
          <div className='col'>
            <h5>Игрок 2</h5>
            <Timer minutes={this.minutes} seconds={this.seconds} playerNumber={2}
              change={this.change} getCurrentPlayer={this.getCurrentPlayer}
              className="p-5" />
          </div>

        </div>
        <button className='btn btn-danger mt-3'
          disabled={!this.isGameStarted}
          onClick={(): void => {
            if (this.isGameStarted) {
              this.isGameStarted = false;
              this.setState({
                currentPlayer: 0
              });
            }
          }}>
          Стоп
        </button>
      </div>
    );

  }
}