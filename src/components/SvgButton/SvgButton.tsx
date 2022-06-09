import React, { Component, HTMLAttributes } from 'react';
import './SvgButton.css';

interface Props {
    isActiveButton: () => boolean,
    buttonId: string,
    background: string,
    foreground: string;
    text: string,
    action: () => void,
}

interface State {
    shadow: number

}

export default class SvgButton extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {
    isActiveButton: () => boolean;
    buttonId: string;
    background: string;
    foreground: string;
    text: string;
    action: () => void;

    constructor(props: Props) {
        super(props);

        this.isActiveButton = props.isActiveButton;
        this.buttonId = props.buttonId;
        this.background = props.background;
        this.foreground = props.foreground;
        this.text = props.text;
        this.action = props.action;

        this.state = {
            shadow: this.isActiveButton() ? 8 : 0
        }

    }

    render() {
        return (
            <div className="SvgButton mt-2">
                <svg className={this.isActiveButton() ? "enable" : "disable"}
                    width="200"
                    height="90"
                    viewBox="0 0 200 85"
                    onClick={() => {
                        if (this.isActiveButton()){
                            this.action();
                        }
                    }}
                    xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>

                        <filter id={this.buttonId} filterUnits="userSpaceOnUse"
                            x="0" y="0"
                            width="200" height="85">

                            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                            <feOffset in="blur" dx="0" dy={this.state.shadow} result="offsetBlur" />

                            <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".40"
                                specularExponent="25" lighting-background="#bbbbbb"
                                result="specOut">
                                <fePointLight x="-5000" y="-10000" z="10000" />
                            </feSpecularLighting>
                            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                                k1="0" k2="1" k3="1" k4="0" result="litPaint" />

                            <feMerge>
                                <feMergeNode in="offsetBlur" />
                                <feMergeNode in="litPaint" />
                            </feMerge>
                        </filter>
                    </defs>

                    <g filter={"url(#" + this.buttonId + ")"}>
                        <path fill="none" stroke={this.background} stroke-width="10"
                            d="M50,66 c-50,0 -50,-60 0,-60 h100 c50,0 50,60 0,60z" />
                        <path fill={this.background}
                            d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z" />
                        <g fill={this.foreground} font-size="15" text-anchor="middle" fontWeight={700}>
                            <text x="100" y="43">{this.text}</text>
                        </g>
                    </g>
                </svg>
            </div >
        );
    }

    componentDidMount() { }

    componentDidUpdate() {
        if (this.isActiveButton()) {
            if (this.state.shadow !== 8)
                this.setState({ shadow: 8 });
        }
        else {
            if (this.state.shadow !== 0)
                this.setState({ shadow: 0 });
        }

    }
}
