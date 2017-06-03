import * as React from 'react';
import { skills } from "../data/skills";
import { Bar } from "./Bar";
import {colors} from "../data/themeOptions";

interface IProps {}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
    isBackgroundLoaded?: boolean
}

export class ProfileImage extends React.Component<IProps, IState> {

    setTimeoutId;
    profileImageURL = "/images/general/profSquare200.jpg";


    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isMounted: false,
            isBackgroundLoaded: false
        }
    }

    componentDidMount() {
        this.setTimeoutId = setTimeout(() => {
            this.setState({isMounted: true})
        }, 400); //reliable transition delay
        this.handleLoadBackgroundImage();
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutId);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        })
    }

    handleLoadBackgroundImage() {
        const backgroundImage = new Image();
        backgroundImage.onload = () => {
            this.setState({
                isBackgroundLoaded: true
            });
        };

        backgroundImage.src = this.profileImageURL;
    }

    radToDeg(n) { return n * 180 / Math.PI}

    render(): JSX.Element {
        const { isHovered, isMounted, isBackgroundLoaded } = this.state;
        const photoSize = 140;
        const barLength = 100;
        const radiusFactor = 1.1;
        const barRadius = (photoSize * 0.5 + barLength * 0.5) * radiusFactor;

        const styles = {
            profileImage: {
                position: "relative",
                border: "1px solid #fafafa",
                height: photoSize,
                width: photoSize,
                borderRadius: "50%",
                background: isBackgroundLoaded ? `url(${this.profileImageURL}) center / cover no-repeat` : colors.wht,
                filter: isBackgroundLoaded ? "none" : "blur(5px)",
                MozTransform: `scale(${isHovered ? 1.025 : isMounted ? 1 : 0})`,
                transform: `scale(${isHovered ? 1.025 : isMounted ? 1 : 0})`,
                MozTransition: `transform ${isMounted ? 200 : 400}ms cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 1000ms`,
                transition: `transform ${isMounted ? 200 : 400}ms cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 1000ms`,
                cursor: "pointer",
            },

        };

        const radiansFactor = ((Math.PI * 0.4)/ skills.length);
        const startingIndex = 7;

        return (
            <div style={ styles.profileImage }
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {skills.map((bar, i) =>
                        <Bar
                            key={i}
                            index={i}
                            bar={bar}
                            isBarChartMounted={this.state.isMounted}
                            barLength={barLength}
                            rotateStyle={`rotate(${-this.radToDeg(radiansFactor * (i + startingIndex)) + 90}deg)`}
                            translateStyle={`translate( calc(${Math.sin(radiansFactor * (i + startingIndex)) * barRadius}px - 50%),
                                                    calc(${Math.cos(radiansFactor * (i + startingIndex)) * barRadius}px - 50%))`}
                        />)}
            </div>
        );
    }
}
