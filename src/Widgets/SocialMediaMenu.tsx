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
                width: 40
            },
            socialMediaMenu__item: {
                width: 40,
                marginBottom: 20,
                height: "auto",
                cursor: "hover",
                transition: "opacity 200ms"
            }
        };
        return (
            <div style={ styles.socialMediaMenu }>
                {socialMediaLinks.map((link, i) =>
                <a key={i} href={link.link} target="_blank"
                    onMouseEnter={() => this.handleMouseEnter(i)}
                    onMouseLeave={() => this.handleMouseLeave()}>
                    <img style={ Object.assign({}, styles.socialMediaMenu__item, {
                        opacity: (this.state.isHoveredIndex===i) ? 0.8 : 1
                    }) }
                         src={link.iconPath}/>
                </a>)}
            </div>
        );
    }
}
