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
    isMini?: boolean
    animateCount?: number
}

export class PostLink extends React.Component<IProps, IState> {

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
        let { activeViewIndex } = this.props;
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
        let { isMounted, isMini } = this.state;
        let { post, activeViewIndex } = this.props;
        const isFirstView = activeViewIndex===-1;


        let styles = {
            post: {
                display: "inline-block",
                borderBottom: "1px solid #212121",
                width: "80%",
                color: "#fafafa",
                opacity: isMounted ? 1 : 0,
                background: isFirstView ? `linear-gradient(to bottom, rgba(0,0,0, 0.22), rgba(0,0,0, 0.88)), url(${post.image})` : "#455A64",
                backgroundSize: "cover"
            }
        };
        return (
            <Link style={styles.post}
                  to={`/blog/${post.path}`}
                  ref={el => this.containerEl = el}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                {post.name}
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
