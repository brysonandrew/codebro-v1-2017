import * as React from 'react';
import {colors} from "../../data/themeOptions";

interface IProps {
    text: string
    onClick: (event: Event) => void
    isDisabled?: boolean
}

export class Button extends React.Component<IProps, any> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovering: false
        };
    }

    handleClick(e) {
        this.props.onClick(e);
    }

    handleMouseEnter() {
        this.setState({
            isHovering: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovering: false
        })
    }

    render(): JSX.Element {
        let styles = {
            button: {
                background: colors.hi,
                color: "#eeeeee",
                border: "1px solid #eeeeee",
                padding: "10px 20px",
                width: "auto",
                height: "100%",
                opacity: (this.state.isHovering || this.props.isDisabled) ? 0.85 : 1,
                cursor: this.props.isDisabled ? "not-allowed" : "pointer",
                transition: "opacity 200ms"
            }
        };
        return (
            <button style={ styles.button }
                    disabled={this.props.isDisabled}
                    onClick={(e) => this.handleClick(e)}
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}>
                {this.props.text ? this.props.text : null}
            </button>
        );
    }
}
