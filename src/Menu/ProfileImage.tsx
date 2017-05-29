import * as React from 'react';
import { skills } from "../data/skills";
import { Bar } from "./Bar";

interface IProps {}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
}

export class ProfileImage extends React.Component<IProps, IState> {

    setTimeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isMounted: false
        }
    }

    componentDidMount() {
        this.setTimeoutId = setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
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

    radToDeg(n) { return n * 180 / Math.PI}

    render(): JSX.Element {
        const { isHovered, isMounted } = this.state;
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
                transform: isHovered
                            ? "scale(1.025)"
                            : isMounted
                                ? "scale(1)"
                                : "scale(0)",
                cursor: "pointer",
                transition: isMounted
                                ? "transform 200ms"
                                : "transform 400ms",
                background: "url(/images/personal/profSquare200.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
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
