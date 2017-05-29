import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { IPost } from '../../data/models';
import { changePageIndex } from '../../Home/HomeActionCreators';
import { colors } from "../../data/themeOptions";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    postsRef: HTMLDivElement
    viewIndex?: number
    post?: IPost
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
    postWidth?: string
}

export class PostSingle extends React.Component<IProps, IState> {

    breakPoints = {
        min: 800,
        mid: 1200,
        max: 1400
    };
    timeoutId;

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
        this.timeoutId = setTimeout(() => this.setState({ isMounted: true }), 0)
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
        clearTimeout(this.timeoutId);
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        const { post, activeViewIndex, height } = this.props;
        const { isMounted } = this.state;
        const isFirstView = activeViewIndex===-1;

        let styles = {
            post: {
                display: "inline-block",
                width: this.state.postWidth,
                height: "100vh",
            },
            post__inner: {
                display: "block",
                borderLeft: "1px solid #fafafa",
                borderRight: "1px solid #fafafa",
                padding: 20,
                MozTransform: `translate3d(0, ${isMounted ? 0 : height}px, 0)`,
                transform: `translate3d(0, ${isMounted ? 0 : height}px, 0)`,
                MozTransition: "transform 400ms",
                transition: "transform 400ms"
            },
            post__name: {
                color: "#fafafa",
                fontSize: 28,
                display: "inline-block",
                verticalAlign: "top",
                width: "100%",
                textAlign: "center"
            },
            post__date: {
                color: "#fafafa",
                fontSize: 16,
                display: "inline-block",
                verticalAlign: "top",
                width: "100%",
                textAlign: "right"
            },
            post__category: {
                display: "inline-block",
                verticalAlign: "top",
                color: "#fafafa",
                background: "transparent",
                fontSize: 12,
                borderTop: `1px solid ${colors.std}`,
                marginTop: 10,
                marginBottom: 10,
                paddingTop: 10,
                paddingBottom: 10,
                width: "100%",
            },
            post__paragraphs: {
            },
            post__paragraph: {
                marginTop: 10,
                paddingTop: 10,
                width: "100%",
                textAlign: "left",
                margin: "10px 0",
                color: colors.hi,
                fontSize: 24
            }
        };
        return (
            <div style={styles.post}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                <div style={styles.post__inner}>
                    <div style={styles.post__date}>
                        {post.date}
                    </div>
                    <h2 style={styles.post__name}>
                        {post.name}
                    </h2>
                    <div style={styles.post__category}>
                        {post.category.toUpperCase()}
                    </div>
                    <div style={styles.post__paragraphs}>
                        {!isFirstView && post.content.map((paragraph, i) =>
                            <div key={i}
                                 style={styles.post__paragraph}>
                                {paragraph}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activePageIndex: state.homeStore.activePageIndex,
        activeViewIndex: state.homeStore.activeViewIndex,
        width: state.homeStore.width,
        height: state.homeStore.height
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changePageIndex(menuIndex));
        }
    }
}

export let PostSingleFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(PostSingle);
