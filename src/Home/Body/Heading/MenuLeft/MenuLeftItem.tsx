import * as React from 'react';
import { colors } from "../../../../data/themeOptions";
import { ISocialMediaSelector } from "../../../../data/models";
import {UnderlineToArrow} from "./UnderlineToArrow";

interface IProps {
    item: ISocialMediaSelector
}

interface IState {
    isHovered: boolean
}

export class MenuLeftItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        const { item } = this.props;
        const { isHovered } = this.state;

        const styles = {
            menuLeftItem: {
                position: "relative",
                display: "inline-block",
                padding: "0px 10px",
                margin: "5px 0",
                width: 100,
                height: 40,
                cursor: "pointer",
                transition: "margin 200ms, padding 200ms"
            },

            menuLeftItem__inner: {
                display: "table-cell",
                verticalAlign: "middle",
                height: 45
            },
            menuLeftItem__icon: {
                display: "inline-block",
                height: 20,
                width: "auto"
            },
            menuLeftItem__label: {
                display: "inline-block",
                verticalAlign: "middle",
                paddingLeft: 10,
                height: 45,
                color: colors.gry
            }
        } as any;
        return (
            <a  href={item.link}
                target={"_blank"}
                style={styles.menuLeftItem}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseEnter={() => this.handleMouseEnter()}>
                <div style={styles.menuLeftItem__inner}>
                    <img style={styles.menuLeftItem__icon}
                         src={item.icon}/>
                    <div style={styles.menuLeftItem__label}>
                        {item.label}
                    </div>
                </div>
                <UnderlineToArrow
                    isHovered={isHovered}
                />
            </a>
        );
    }
}
