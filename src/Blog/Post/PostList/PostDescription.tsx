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
    isHovered?: boolean
}

export class PostDescription extends React.Component<IProps, IState> {


    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    componentDidMount() {
    }

    handleMouseEnter() {
        this.setState({isHovered: true})
    }

    handleMouseLeave() {
        this.setState({isHovered: false})
    }

    render(): JSX.Element {
        let { post } = this.props;

        let styles = {
            post: {
                display: "inline-block",
                width: "100%",
                height: 100,
                color: "#fafafa",
                background: "green"
            },
            post__name: {
                display: "inline-block",
                verticalAlign: "top",
                width: "50%",
                textAlign: "left"
            },
            post__date: {
                display: "inline-block",
                verticalAlign: "top",
            }
        };
        return (
            <div style={styles.post}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >

                <div>
                    {post.category}
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
    return {}
}

export let PostDescriptionFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(PostDescription);
