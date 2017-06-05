import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { PostSingleFromStore } from './Post/PostSingle';
import { pages } from "../data/pages";
import { changeViewIndex } from '../Home/HomeActionCreators';
import { PostList } from "./Post/PostList/PostList";
import { IParams } from "../data/models";

interface IProperties {
    width?: number
    height?: number
    savedParams?: IParams
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
        const { savedParams, width } = this.props;
        const postContent = pages[savedParams.activePagePath].content;

        const styles = {
            blog: {
                position: "relative",
                width: "100%",
                textAlign: "center"
            }
        } as any;
        return (
            <div style={styles.blog}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {!savedParams.activeViewPath
                    ?   <PostList
                            width={width}
                            savedParams={savedParams}
                        />
                    :   <PostSingleFromStore
                            post={postContent[savedParams.activeViewPath]}
                            postsRef={this.postsRef}
                        />}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        savedParams: state.homeStore.savedParams
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
