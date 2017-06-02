import * as React from 'react';
import {ISocialMediaLink} from "../../data/models";
import {colors} from "../../data/themeOptions";

interface IProps {
    link: ISocialMediaLink
    index: number
}

interface IState {
    isHovered?: boolean
    isMounted?: boolean
    isBackgroundLoaded?: boolean
}

export class SocialMediaLink extends React.Component<IProps, IState> {

    setTimeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state ={
            isHovered: false,
            isMounted: false,
            isBackgroundLoaded: false
        }
    }

    componentDidMount() {
        this.setTimeoutId = setTimeout(() => {
            this.setState({isMounted: true})
        }, 0);
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
        const { link } = this.props;
        const backgroundImage = new Image();
        backgroundImage.onload = () => {
            this.setState({
                isBackgroundLoaded: true
            });
        };
        backgroundImage.src = link.iconPath;
    }

    render(): JSX.Element {
        const { link, index } = this.props;
        const { isHovered, isMounted, isBackgroundLoaded } = this.state;

        const transformScale = isMounted ? (isHovered ? 1.125 : 1) : 0;
        const transformDelay = isMounted ? 0 : (400 * index + 400);

        const styles = {
            socialMediaLink: {
                position: "absolute",
                width: 28,
                height: 28,
                top:`${index * 100}%`,
                borderRadius: isBackgroundLoaded ? 0 : 14,
                background: isBackgroundLoaded ? `url(${link.iconPath}) center / 28px 28px no-repeat` : colors.wht,
                transform: `scale(${transformScale})`,
                MozTransform: `scale(${transformScale})`,
                transition: `transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 1000ms`,
                MozTransition: "transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 1000ms",
                transitionDelay: `${transformDelay}ms`,
                MozTransitionDelay: `${transformDelay}ms`,
                filter: isBackgroundLoaded ? "none" : "blur(5px)",
                cursor: "hover"
            }
        };
        return (
            <a  style={ styles.socialMediaLink }
                href={link.link} target="_blank"
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}>
            </a>
        );
    }
}
