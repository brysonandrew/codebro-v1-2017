import * as React from 'react';
import { CloseCross } from "../Widgets/CloseCross/CloseCross";
import { colors } from "../data/themeOptions";

interface IProps {
    isContactOpen?: boolean
    onClick?: (isOpen: boolean) => void
}

interface IState {
    isMounted?: boolean
}

export class ContactMessage extends React.Component<IProps, IState> {

    setTimeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
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

    handleClick(isOpen: boolean) {
        this.props.onClick(isOpen);
    }

    render(): JSX.Element {
        const { isContactOpen } = this.props;
        const message = `Hi, nice to meet you, make yourself and home and if you have any questions write to me at `;
        const styles = {
            contactMessage: {
                position: "relative",
                display: "inline-block",
                width: isContactOpen ? "64%" : "20%",
                margin: 20,
                padding: 20,
                borderRadius: 4,
                color: colors.wht,
                fontSize: 16,
                background: colors.hi,
                border: `${colors.hi} 1px solid`,
                WebkitBoxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                MozBoxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                boxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                transform: `translateY(${this.state.isMounted ? 0 : -220}px)`,
                transition: "transform 200ms",
                zIndex: 10
            },
            contactMessage__cross: {
                position: "absolute",
                top: 0,
                right: -24,
                height: 22,
                width: 22,
                cursor: "pointer"
            }
        } as any;
        return (
            <h1 style={styles.contactMessage}
                onClick={() => this.handleClick(false)}>
                {isContactOpen
                    &&   <div style={styles.contactMessage__cross}>
                            <CloseCross
                                size={20}
                                onClick={() => this.handleClick(false)}
                            />
                        </div>}
                {message}
                <span>{"andrew@codebro.io"}</span>
            </h1>
        );
    }
}