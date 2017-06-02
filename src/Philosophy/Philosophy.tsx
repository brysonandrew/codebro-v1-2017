import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { IPost } from '../data/models';
import { colors } from "../data/themeOptions";

interface IProperties {
    width?: number
    height?: number
}

interface ICallbacks {
}

interface IProps extends IProperties, ICallbacks {

}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
    postWidth?: string
}

export class Philosophy extends React.Component<IProps, IState> {

    breakPoints = {
        min: 800,
        mid: 1200,
        max: 1400
    };
    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false,
            postWidth: "calc(50% - 44px)"
        }
    }

    componentDidMount() {
        if (this.props.width < this.breakPoints.min) {
            this.setState({ postWidth: "calc(100% - 44px)"})
        } else if (this.props.width < this.breakPoints.mid) {
            this.setState({ postWidth: "calc(75% - 44px)"})
        } else {
            this.setState({ postWidth: "calc(50% - 44px)"})
        }
        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width) {
            if (nextProps.width < this.breakPoints.min) {
                this.setState({ postWidth: "calc(100% - 44px)"})
            } else if (nextProps.width < this.breakPoints.mid) {
                this.setState({ postWidth: "calc(75% - 44px)"})
            } else {
                this.setState({ postWidth: "calc(50% - 44px)"})
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        const { isMounted, postWidth } = this.state;
        const { height } = this.props;

        const styles = {
            philosophy: {
                display: "inline-block",
                width: postWidth,
                height: "100%",
                background: colors.std
            },
            philosophy__inner: {
                display: "block",
                borderLeft: `1px solid ${colors.wht}`,
                borderRight: `1px solid ${colors.wht}`,
                padding: 20,
                MozTransform: `translate3d(0, ${isMounted ? 0 : height}px, 0)`,
                MozTransition: "transform 400ms",
                MozTransitionDelay: "1000ms",
                transform: `translate3d(0, ${isMounted ? 0 : height}px, 0)`,
                transition: "transform 400ms"
            },
            philosophy__section: {
                marginTop: 60
            },
            philosophy__mainHeading: {
                color: "#fafafa",
                fontSize: 28
            },
            philosophy__description: {
                color: colors.hi,
                fontSize: 24
            },
            philosophy__spacedText: {
                color: colors.wht,
                background: "transparent", //default override
                fontSize: 12
            }
        };
        return (
            <div style={styles.philosophy}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                <div style={styles.philosophy__inner}>
                    <h1 style={styles.philosophy__mainHeading}>
                        A holistic approach to design and code.
                    </h1>
                    <div style={styles.philosophy__section}>
                    <pre style={styles.philosophy__spacedText}>
                      O P E R A T E   H O L I S T I C A L L Y
                    </pre>
                        <p style={styles.philosophy__description}>
                            A website is both its function and its design. React.js combines Javascript, HTML and CSS allowing the power of inline styles and better balance between function and design.
                        </p>
                    </div>
                    <div style={styles.philosophy__section}>
                    <pre style={styles.philosophy__spacedText}>
                      S T R A T E G I Z E   H O L I S T I C A L L Y
                    </pre>
                        <p style={styles.philosophy__description}>
                            You have about 15 seconds with your user when they visit your page (if you are lucky). Their experience must efficiently provide them with a consistent and simple message.
                        </p>
                    </div>
                    <div style={styles.philosophy__section}>
                    <pre style={styles.philosophy__spacedText}>
                      G R O W   H O L I S T I C A L L Y
                    </pre>
                        <p style={styles.philosophy__description}>
                            Staying dedicated to regular blog entries and video uploads to my Youtube channel isn't only for a community that has helped me so much, but also for me. These activities provide me with a live record of progress and growth.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {

    }
}

export let PhilosophyFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Philosophy);
