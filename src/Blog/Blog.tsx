import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { PostFromStore } from './Post';
import { pageLinks } from "../data/pages";
import { changeViewIndex } from '../Home/HomeActionCreators';

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onViewIndexSelect?: (activeViewIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class Blog extends React.Component<IProps, IState> {

    timerId;
    postsRef: HTMLDivElement;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        };
    }

    componentDidMount() {
        if (this.props.activeViewIndex===-1) {
            this.props.onViewIndexSelect(0);
        }
        this.timerId = setTimeout(() => {
            this.setState({isMounted: true});
            window.scrollTo(0,0);
        }, 0);
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    handleSelectorClick(i) {
        this.props.onViewIndexSelect(i);
    }

    render(): JSX.Element {
        const { isHovering, isMounted } = this.state;

        const styles = {
            blog: {
                position: "absolute",
                top: "calc(8% + 40px)",
                left: "6vw",
                width: "94vw",
                height: "80vh",
                textAlign: "center"

            },
            blog__content: {
                display: "inline-block",
                width: "88vw",
                height: "100%",
                overflowY: "scroll",
                borderRadius: 8,
                zIndex: 1
            },
            blog__verticalMenu: {
                display: "inline-block",
                verticalAlign: "top",
                width: "6vw",
                height: "100%",
                zIndex: 2
            }
        };
console.log(this.props.activePageIndex);
        return (
            <div style={styles.blog}>
                <div style={styles.blog__content}
                     ref={(el) => this.postsRef = el}
                     onMouseEnter={() => this.handleMouseEnter()}
                     onMouseLeave={() => this.handleMouseLeave()}
                >
                    {this.state.isMounted && pageLinks[this.props.activePageIndex].content.map((post, i) =>
                        <PostFromStore
                            key={i}
                            viewIndex={i}
                            post={post}
                            postsRef={this.postsRef}
                        />
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
        onViewIndexSelect: (activeViewIndex) => {
            dispatch(changeViewIndex(activeViewIndex));
        }
    }
}

export let BlogFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Blog);
