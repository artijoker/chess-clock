import React, { Component, HTMLAttributes } from 'react';
import './Timer.css';
import SvgButton from '../SvgButton/SvgButton'

interface Props {
    minutes?: number,
    seconds?: number,
    playerNumber: number
    change: () => void,
    getCurrentPlayer: () => number
}

interface State {
    seconds: number,
    angleSecondsArrow: number,
    angleMinutesArrow: number,
    isActiveButton: boolean

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
            seconds: this.minutes * 60 + this.seconds,
            angleSecondsArrow: 0,
            angleMinutesArrow: 0,
            isActiveButton: false
        }

    }

    isActive = (): boolean => this.playerNumber === this.getCurrentPlayer();

    render() {
        return (
            <div className="Timer p-3">
                {/* <div className='clock col  align-self-center' >{this.secondsToTime(this.state.seconds)}</div> */}
                <div>
                    <svg width="250" height="250"
                        viewBox="0 0 250 250"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="125" cy="125" r="100" stroke='black' fill='whitesmoke' stroke-width={5} />

                        <path d="M 125,25 L 125,40"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6} />

                        <path d="M 125,25 L 125,40"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(30 125 125)"} />

                        <path d="M 125,25 L 125,40"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(60 125 125)"} />



                        <path d="M 125,225 L 125,210"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6} />

                        <path d="M 125,225 L 125,210"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(30 125 125)"} />

                        <path d="M 125,225 L 125,210"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(60 125 125)"} />



                        <path d="M 25,125 L 40,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6} />

                        <path d="M 25,125 L 40,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(30 125 125)"} />

                        <path d="M 25,125 L 40,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(60 125 125)"} />



                        <path d="M 225,125 L 210,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6} />

                        <path d="M 225,125 L 210,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(30 125 125)"} />

                        <path d="M 225,125 L 210,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(60 125 125)"} />


                        <path d="M 125,65 L 125,125"
                            fill='transparent'
                            stroke="red"
                            stroke-width={9}
                            transform={"rotate(" + this.state.angleMinutesArrow + " 125 125)"} />
                        <path d="M 125,45 L 125,125"
                            fill='transparent'
                            stroke="black"
                            stroke-width={6}
                            transform={"rotate(" + this.state.angleSecondsArrow + " 125 125)"} />

                        <circle cx="125" cy="125" r="7" fill='black' stroke-width={5} />

                        <text x="125" y="185" font-size="25" text-anchor="middle" fontWeight="bold" fill="black">
                            {this.secondsToTime(this.state.seconds)}
                        </text>
                    </svg>
                </div>

                <SvgButton isActiveButton={() => this.state.isActiveButton}
                    background="#ff7500"
                    foreground="black"
                    text='Завершить ход'
                    action={() => {
                        this.stop();
                        this.change();
                    }}
                />

            </div >
        );
    }

    start = () => {
        if (this.timerId === undefined) {
            this.timerId = setInterval(this.updateTime, 1000);
            this.setState({
                isActiveButton: true
            });
        }
    }

    stop = () => {
        if (this.timerId !== undefined) {
            clearInterval(this.timerId);
            this.timerId = undefined;
            this.setState({
                isActiveButton: false
            });
        }
    }

    updateTime = () => {
        if (this.state.angleSecondsArrow === 360) {
            this.setState({
                angleSecondsArrow: 6,
                angleMinutesArrow: this.state.angleMinutesArrow === 360 ? 6 : this.state.angleMinutesArrow + 6
            });
        }
        else {
            this.setState({
                angleSecondsArrow: this.state.angleSecondsArrow + 6
            });
        }
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

