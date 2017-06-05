import * as React from 'react';
import { pages } from "../../../data/pages";
import { PostLink } from "./PostLink";
import { IParams } from "../../../data/models";

interface IProps {
    width?: number
    savedParams?: IParams
}

interface IState {
    linkWidth?: string
    isMounted?: boolean
    isAnimationDelayed?: boolean
    isDestroyed?: boolean
}

export class PostList extends React.Component<IProps, IState> {

    timeoutId;
    breakPoints = {
        min: 800,
        mid: 1200,
        max: 1400
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            linkWidth: "calc(25% - 22px)",
            isMounted:  false,
            isAnimationDelayed: false,
            isDestroyed: false
        }
    }

    componentDidMount() {
        if (this.props.width < this.breakPoints.min) {
            this.setState({ linkWidth: "calc(100% - 22px)"})
        } else if (this.props.width < this.breakPoints.mid) {
            this.setState({ linkWidth: "calc(50% - 22px)"})
        } else {
            this.setState({ linkWidth: "calc(25% - 22px)"})
        }
        this.timeoutId = setTimeout(() => this.setState({ isMounted: true }), 0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width) {
            if (nextProps.width < this.breakPoints.min) {
                this.setState({ linkWidth: "calc(100% - 22px)"})
            } else if (nextProps.width < this.breakPoints.mid) {
                this.setState({ linkWidth: "calc(50% - 22px)"})
            } else {
                this.setState({ linkWidth: "calc(25% - 22px)"})
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render(): JSX.Element {
        const { isMounted, linkWidth } = this.state;
        const { savedParams } = this.props;
        const postContent = pages[savedParams.activePagePath].content;

        const styles = {
            postList: {
                display: "inline-block",
                textAlign: "left",
                width: "80%",
                MozTransform: `scale(${isMounted ? 1 : 0})`,
                transform: `scale(${isMounted ? 1 : 0})`,
                MozTransition: "transform 200ms",
                transition: "transform 200ms"
            },
            postList__link: {
                display: "inline-block",
                verticalAlign: "top",
                margin: 10,
                width: linkWidth
            }
        } as any;

        return (
            <div style={styles.postList}>
                {Object.keys(postContent).map((path, i) =>
                    <div key={i} style={styles.postList__link}>
                        <PostLink  post={postContent[path]}
                                   index={i} />
                    </div>
                )}
            </div>
        );
    }
}
