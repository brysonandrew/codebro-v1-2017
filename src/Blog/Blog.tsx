import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { PostSingleFromStore } from './Post/PostSingle';
import { pageLinks } from "../data/pages";
import { changeViewIndex } from '../Home/HomeActionCreators';
import {PostList} from "./Post/PostList/PostList";

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
    isHovered?: boolean
}

export class Blog extends React.Component<IProps, IState> {

    timerId;
    postsRef: HTMLDivElement;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovered: false
        };
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({isMounted: true});
            window.scrollTo(0,0);
        }, 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    handleMouseEnter() {
        this.setState({isHovered: true})
    }

    handleMouseLeave() {
        this.setState({isHovered: false})
    }

    handleSelectorClick(i) {
        this.props.onViewIndexSelect(i);
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { activePageIndex, activeViewIndex, width } = this.props;
        const isFirstView = activeViewIndex===-1;


        const styles = {
            blog: {
                position: "relative",
                width: "100%",
                textAlign: "center"
            }
        };
        return (
            <div style={styles.blog}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {isFirstView
                    ?   <PostList
                            width={width}
                            activePageIndex={activePageIndex}
                        />
                    :   <PostSingleFromStore
                            viewIndex={activeViewIndex}
                            post={pageLinks[activePageIndex].content[activeViewIndex]}
                            postsRef={this.postsRef}
                        />}
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
