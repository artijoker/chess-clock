import React, { Component, HTMLAttributes } from 'react';
import './Timer.css';

interface Props {
    minutes?: number,
    seconds?: number,
    playerNumber: number
    change: () => void,
    getCurrentPlayer: () => number
}

interface State {
    seconds: number
}

export default class Timer extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    minutes: number;
    seconds: number;
    timerId?: NodeJS.Timer;

    playerNumber: number;
    change: () => void;
    getCurrentPlayer: () => number;

    constructor(props: Props) {
        super(props);

        this.minutes = props.minutes ? props.minutes : 90;
        this.seconds = props.seconds ? props.seconds : 0;
        this.playerNumber = props.playerNumber;
        this.change = props.change;
        this.getCurrentPlayer = props.getCurrentPlayer;

        this.timerId = undefined;

        this.state = {
            seconds: this.minutes * 60 + this.seconds
        }

    }
    
    isActive = (): boolean => this.playerNumber === this.getCurrentPlayer();

    render() {
        return (
            <div className="Timer p-3">
                <div className='clock' >{this.secondsToTime(this.state.seconds)}</div>
                <button className='btn btn-warning mt-3'
                    disabled={!this.isActive()}
                    onClick={() => {
                        this.stop();
                        this.change();
                    }}>Завершить ход
                </button>
            </div >
        );
    }

    start = () => {
        if (this.timerId === undefined) {
            this.timerId = setInterval(this.updateTime, 1000);
        }
    }

    stop = () => {
        if (this.timerId !== undefined) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    updateTime = () => {
        let seconds = this.state.seconds - 1;

        this.setState({
            seconds: seconds
        })
        if (seconds === 0) {
            this.stop();
        }

    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.isActive())
            this.start();
        else
            this.stop();
            
    }

    secondsToTime = (sec: number) => {
        let minutes = Math.floor(sec / 60);
        let seconds = Math.ceil((sec % (60 * 60)) % 60);

        return `${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} 
        : ${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
    }
}

