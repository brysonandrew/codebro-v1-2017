import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { IPost } from '../data/models';
import { changePageIndex } from '../Home/HomeActionCreators';

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
    isMini?: boolean
    animateCount?: number
}

export class Post extends React.Component<IProps, IState> {

    containerEl: HTMLDivElement;
    animateId;
    scroll;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false,
            isMini: false,
            animateCount: 0
        }
    }

    componentDidMount() {
        let { activeViewIndex, viewIndex, postsRef } = this.props;
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0);
        const isSelectedView = activeViewIndex===viewIndex;
        if (isSelectedView) {
            this.scroll = {
                y: postsRef.scrollTop
            };
            this.animate();
        }
    }

    componentWillReceiveProps(nextProps) {
        let { width, activeViewIndex, viewIndex, postsRef } = this.props;

        if (nextProps.width !== width) {
            if (nextProps.width < 720) {
                this.setState({ isMini: true })
            } else {
                this.setState({ isMini: false })
            }
        }
        const isSelectedView = nextProps.activeViewIndex===viewIndex;
        if (isSelectedView) {
            this.scroll = {
                y: postsRef.scrollTop
            };
            this.animate();
        }
    }

    animate() {
        const { animateCount } = this.state;
        const { postsRef } = this.props;
        this.animateId = requestAnimationFrame( this.animate.bind(this) );
        if (animateCount <= 20) {
            postsRef.scrollTop = this.scroll.y
                                    //current scroll pos
                                    + (this.containerEl.offsetTop - this.scroll.y) * animateCount
                                    //scroll distance to travel
                                    / 20;
                                    //animation factor
            this.setState({ animateCount: animateCount + 1 });
        } else {
            this.setState({ animateCount: 0 });
            cancelAnimationFrame(this.animateId);
        }
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isMounted, isMini } = this.state;
        let { post } = this.props;

        let styles = {
            post: {
                width: "96%",
                padding: "2%",
                borderBottom: "1px solid #212121",
                marginBottom: 10,
                opacity: isMounted ? 1 : 0,
                color: "#212121",
                background: "#eeeeee"
            },
            post__picContainer: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "50%" :"20%",
            },
            post__pic: {
                height: 60,
                width: "auto"
            },
            post__heading: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "100%" :"60%",
            },
            post__date: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "50%" :"20%",
            },
            post__paragraph: {
                textAlign: "left",
                margin: "10px 0"
            }
        };
        return (
            <div style={styles.post}
                 ref={el => this.containerEl = el}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                <a href={(post.link.length > 0) ? post.link : null}
                   target="_blank">
                    <div style={styles.post__picContainer} >
                        <img style={styles.post__pic} src={post.image}/>
                    </div>
                    <h2 style={styles.post__heading}>{post.name}</h2>
                    <div style={styles.post__date}>{post.date}</div>
                </a>
                <div>{post.content.map((paragraph, i) =>
                    <div key={i}
                         style={styles.post__paragraph}>
                        {paragraph}
                    </div>
                )}
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

export let PostFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Post);
