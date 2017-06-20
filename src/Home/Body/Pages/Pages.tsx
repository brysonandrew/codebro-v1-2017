import * as React from 'react';
import * as Immutable from 'immutable';
import * as history from 'history';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { projectList } from "../../../data/content";
import { IParams, IDictionary } from "../../../data/models";
import { toggleScrollAnimation, toggleWheel, saveParams } from "../../HomeActionCreators";
import { toParams} from "../../../data/helpers/toParams";
import { MotionScroll } from "../../../Widgets/MotionScroll/MotionScroll";
import { ProjectFromStore } from "./Project/Project";

interface IProperties {
    height?: number
    width?: number
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    isAnimating?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationEnd?: () => void
    onWheel?: () => void
    onWheelStop?: () => void
    onURLChange?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    docScroll?: number
    isMounted?: boolean
}

export class Pages extends React.Component<IProps, IState> {

    pageOffsetList: number[] = [];
    pageOffsets: IDictionary<number>;
    timeoutId;
    timeoutStopDelay=50;
    isWheelRecorded=false;
    pageRef;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            docScroll: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
    }

    handleScroll() {
        if (!this.props.isAnimating) {
            this.changePagePathOnScroll();
        }
        this.setState({docScroll: document.scrollingElement.scrollTop});
    }

    handleWheel() {
        if (!this.isWheelRecorded) {
            this.props.onWheel();
            this.isWheelRecorded=true;
        }
        //detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.props.onWheelStop();
                this.isWheelRecorded=false;
            },
        this.timeoutStopDelay);
        if (this.props.isAnimating) {
            this.setState({docScroll: document.body.scrollTop});
        }
    }

    changePagePathOnScroll() {
        const { savedParams } = this.props;

        const approachingPageBuffer = 200;
        const pagesScrolledPastOffsets = this.pageOffsetList.filter(offset => (offset - approachingPageBuffer) < window.scrollY);

        const currentIndex = pagesScrolledPastOffsets.length > 0
                                ?   pagesScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && projectList[currentIndex].path !== savedParams.activePagePath) {
            const nextPath = `/${projectList[currentIndex].path}`;
            this.props.history.push(nextPath);
            this.props.onURLChange(toParams(nextPath));
        }
    }

    calcWidthMarginFactor(isMobile, isTablet, isLaptop) {
        return (isMobile ? 0 : isTablet ? 0.1 : isLaptop ? 0.2 : 0.3);
    }

    render(): JSX.Element {
        const { docScroll, isMounted } = this.state;
        const { onAnimationEnd, savedParams, isAnimating, width, height, isMobile, isTablet, isLaptop } = this.props;
        const isSelected = "activePagePath" in savedParams;
        const isOffsetsReady = (this.pageOffsets != null);
        const isScrollReady = (isSelected && isOffsetsReady);

        this.pageOffsetList = projectList.map((project, i) => i * width);
        this.pageOffsets = this.pageOffsetList.reduce((acc, curr, i) => {
            acc[projectList[i].path] = curr;
            return acc;
        }, {});

        const scrollHeight = width * (projectList.length - 1);
        const widthMarginFactor = this.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const widthMargin = widthMarginFactor * width;
        const adjustedWidth = width - widthMargin * 2;
        const adjustedScroll = docScroll - (widthMarginFactor * docScroll * 2);

        const styles = {
            pages: {
                position: "relative",
                height: height + scrollHeight
            },
            pages__projects: {
                position: "fixed",
                left: widthMargin,
                top: 0,
                width: projectList.length * adjustedWidth,
            },
            pages__project: {
                display: "inline-block",
                position: "relative",
                width: adjustedWidth,
                height: height,
                transform: `translate3d(${-adjustedScroll}px, 0px, 0px)`
            }
        } as any;

        return (
            <div style={ styles.pages }>
                <div style={ styles.pages__projects }>
                    {isScrollReady &&   <MotionScroll
                                            docScroll={docScroll}
                                            isAnimating={isAnimating}
                                            scrollTarget={this.pageOffsets[savedParams.activePagePath]}
                                            onRest={onAnimationEnd}
                                        />}
                    {projectList.map((project, i) =>
                        <div key={i}
                             style={ styles.pages__project }>
                            <ProjectFromStore
                                index={i}
                                project={project}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isAnimating: state.homeStore.isAnimating,
        savedParams: state.homeStore.savedParams,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationEnd: () => {
            dispatch(toggleScrollAnimation(false));
        },
        onWheel: () => {
            dispatch(toggleWheel(true));
            dispatch(toggleScrollAnimation(false));
        },
        onWheelStop: () => {
            dispatch(toggleWheel(false));
        },
        onURLChange: (nextParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export let PagesFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Pages);
