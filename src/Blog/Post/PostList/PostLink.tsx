import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { IPost } from '../../../data/models';
import { changePageIndex } from '../../../Home/HomeActionCreators';
import { Link } from 'react-router';

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
    index?: number
    post?: IPost
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class PostLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0);
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isMounted } = this.state;
        let { post } = this.props;

        let styles = {
            post: {
                display: "inline-block",
                width: "calc(100% - 20px)",
                padding: 10,
                color: "#fafafa",
                opacity: isMounted ? 1 : 0,
                background: `linear-gradient(to top, rgba(0,0,0, 0.44), rgba(0,0,0, 0.66)), url(${post.image})`,
                backgroundSize: "cover"
            },
            post__name: {
                display: "inline-block",
                verticalAlign: "top",
                width: "72%",
                textAlign: "left"
            },
            post__date: {
                display: "inline-block",
                verticalAlign: "top",
                fontSize: 12,
                width: "28%",
                textAlign: "right"
            },
            post__category: {
                display: "inline-block",
                verticalAlign: "top",
                fontSize: 12,
                borderTop: "1px solid #fafafa",
                marginTop: 10,
                paddingTop: 10,
                width: "100%",
            }
        };
        return (
            <Link style={styles.post}
                  to={`/blog/${post.path}`}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                <div style={styles.post__name}>
                    {post.name}
                </div>
                <div style={styles.post__date}>
                    {post.date}
                </div>
                <div style={styles.post__category}>
                    {post.category}
                </div>
            </Link>
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

export let PostLinkFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(PostLink);
