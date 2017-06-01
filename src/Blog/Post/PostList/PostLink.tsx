import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { IPost } from '../../../data/models';
import { changePageIndex } from '../../../Home/HomeActionCreators';
import { Link } from 'react-router';

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
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
    isHovered?: boolean
}

export class PostLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovered: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0);
    }

    handleMouseEnter() {
        this.setState({isHovered: true})
    }

    handleMouseLeave() {
        this.setState({isHovered: false})
    }

    render(): JSX.Element {
        const { isMounted, isHovered } = this.state;
        const { post, index } = this.props;

        const styles = {
            post: {
                display: "inline-block",
                width: "calc(100% - 20px)",
                padding: 10,
                color: "#fafafa",
                opacity: isHovered ? 0.77 : 1,
                border: "1px solid #fafafa",
                WebkitBoxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                MozBoxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                boxShadow: "0 15px 18px rgba(0,0,0,0.34)",
                background: `linear-gradient(to top, rgba(0,0,0, 0.44), rgba(0,0,0, 0.66)), url(${post.image})`,
                backgroundSize: "cover",
                MozTransform: `scale(${isMounted ? 1 : 0})`,
                MozTransition: "transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                MozTransitionDelay: `${100 * index}ms`,
                transform: `scale(${isMounted ? 1 : 0})`,
                transition: "transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transitionDelay: `${100 * index}ms`

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
        activeViewIndex: state.homeStore.activeViewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changePageIndex(menuIndex));
        }
    }
}

export const PostLinkFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(PostLink);
