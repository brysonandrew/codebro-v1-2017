import * as React from 'react';
import {socialMediaLinks} from "../../data/socialMediaLinks";
import {SocialMediaLink} from "./SocialMediaLink";

interface IProps {}

interface IState {
}

export class SocialMediaMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
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
                <SocialMediaLink
                    key={i}
                    index={i}
                    link={link}
                />)}
            </div>
        );
    }
}
