import * as React from 'react';
import {socialMediaLinks} from "../data/socialMediaLinks";

interface IProps {}

interface IState {
    isHoveredIndex: number
}

export class SocialMediaMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHoveredIndex: -1
        }
    }

    handleMouseEnter(i) {
        this.setState({
            isHoveredIndex: i
        })    }

    handleMouseLeave() {
        this.setState({
            isHoveredIndex: -1
        })
    }

    render(): JSX.Element {
        const styles = {
            socialMediaMenu: {
                position: "relative",
                width: 28,
                height: "100%"
            },
            socialMediaMenu__item: {
                position: "absolute",
                width: 28,
                height: 28,
                cursor: "hover",
                transition: "opacity 200ms"
            }
        };
        return (
            <div style={ styles.socialMediaMenu }>
                {socialMediaLinks.map((link, i) =>
                <a  key={i}
                    style={ Object.assign({}, styles.socialMediaMenu__item, {
                        opacity: (this.state.isHoveredIndex===i) ? 0.8 : 1,
                        top:`${i * 100}%`,
                        background: `url(${link.iconPath})`,
                        backgroundSize: "28px 28px",
                        backgroundRepeat: "no-repeat",
                    }) }
                    href={link.link} target="_blank"
                    onMouseEnter={() => this.handleMouseEnter(i)}
                    onMouseLeave={() => this.handleMouseLeave()}>
                </a>)}
            </div>
        );
    }
}
