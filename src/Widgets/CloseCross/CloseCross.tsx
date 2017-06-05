import * as React from 'react';

interface IProps {
    onClick: (event: Event) => void
    size: number
}

interface IState {
    isHovering: boolean
}

export class CloseCross extends React.Component<IProps, IState> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovering: false
        }
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
        const { size } = this.props;

        let styles = {
            closeCross: {
                display: "block",
                position: "relative",
                cursor: "pointer"
            },
            closeCross__arm1: {
                position: "absolute",
                width: size ? size : 20,
                height: size ? size * 0.2 : 4,
                borderRadius: 1,
                background: this.state.isHovering ? "#eeeeee" : "#F44336",
                transform: "rotate(-45deg)"
            },
            closeCross__arm2: {
                position: "absolute",
                width: size ? size : 20,
                height: size ? size * 0.2 : 4,
                borderRadius: 1,
                background: this.state.isHovering ? "#eeeeee" : "#F44336",
                transform: "rotate(45deg)"
            }
        } as any;
        return (
            <div style={ styles.closeCross }
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
                 onClick={(e) => this.handleClick(e)}>
                <div style={ styles.closeCross__arm1 }></div>
                <div style={ styles.closeCross__arm2 }></div>
            </div>
        );
    }
}
