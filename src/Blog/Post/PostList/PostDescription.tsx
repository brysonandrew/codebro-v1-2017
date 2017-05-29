import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { IPost } from '../../../data/models';
import { changePageIndex } from '../../../Home/HomeActionCreators';

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
    isHovered?: boolean
    isMini?: boolean
    animateCount?: number
}

export class PostDescription extends React.Component<IProps, IState> {

    animateId;
    scroll;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovered: false,
            isMini: false,
            animateCount: 0
        }
    }

    componentDidMount() {
        let { activeViewIndex, } = this.props;
    }

    handleMouseEnter() {
        this.setState({isHovered: true})
    }

    handleMouseLeave() {
        this.setState({isHovered: false})
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
            },
            post__picContainer: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "50%" :"20%",
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
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                <div style={styles.post__date}>
                    {post.date}
                </div>
                <div>{!isFirstView && post.content.map((paragraph, i) =>
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

export let PostDescriptionFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(PostDescription);
