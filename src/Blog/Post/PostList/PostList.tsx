import * as React from 'react';
import { pageLinks } from "../../../data/pages";
import { PostLinkFromStore } from "./PostLink";

interface IProps {
    width?: number
    activePageIndex?: number
}

interface IState {
    linkWidth?: string
    isMounted?: boolean
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
        if (nextProps.activePageIndex !== this.props.activePageIndex && nextProps.activePageIndex===-1) { // additional cleanup needed
            clearTimeout(this.timeoutId);
            this.setState({ isDestroyed: true }); //necessary due to compoenent living beyond unmount
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }


    render(): JSX.Element {
        const styles = {
            postList: {
                display: "inline-block",
                textAlign: "left",
                width: "80%",
                MozTransform: `scale(${this.state.isMounted ? 1 : 0})`,
                transform: `scale(${this.state.isMounted ? 1 : 0})`,
                MozTransition: "transform 200ms",
                transition: "transform 200ms"
            },
            postList__link: {
                display: "inline-block",
                verticalAlign: "top",
                margin: 10,
                width: this.state.linkWidth
            }
        };
        return (
            !this.state.isDestroyed && <div style={styles.postList}>
                {pageLinks[this.props.activePageIndex].content.map((post, i) =>
                    <div key={i} style={styles.postList__link}>
                        <PostLinkFromStore post={post}
                                           index={i} />
                    </div>
                )}
            </div>
        );
    }
}
