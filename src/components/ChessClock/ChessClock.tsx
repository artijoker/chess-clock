import React, { Component, HTMLAttributes } from 'react';
//import logo from './logo.svg';
import './ChessClock.css'
import Timer from '../Timer/Timer';
import SvgButton from '../SvgButton/SvgButton'

interface Props { }

interface State {
  isGameStarted: boolean,
  currentPlayer: number
}

export default class ChessClock extends Component<Props & HTMLAttributes<HTMLDivElement>, State>  {

  minutes: number;
  seconds: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isGameStarted: false,
      currentPlayer: 0
    }

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
      <div className="ChessClock">
        <SvgButton isActiveButton={() => !this.state.isGameStarted}
          buttonId="Start"
          background="#4a00fb"
          foreground="white"
          text="Начать игру"
          action={() => {
            if (!this.state.isGameStarted) {
              this.setState({
                isGameStarted: !this.state.isGameStarted,
                currentPlayer: 1
              })
            }
          }} />
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
        <SvgButton isActiveButton={() => this.state.isGameStarted}
          buttonId="Stop"
          background="#d30900"
          foreground="white"
          text="Стоп"
          action={() => {
            if (this.state.isGameStarted) {
              this.setState({
                isGameStarted: false,
                currentPlayer: 0
              });
            }
          }} />
      </div>
    );

  }
}