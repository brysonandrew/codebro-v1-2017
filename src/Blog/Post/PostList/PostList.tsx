import * as React from 'react';
import { PostDescriptionFromStore } from "./PostDescription";
import { pageLinks } from "../../../data/pages";
import { PostLinkFromStore } from "./PostLink";

interface IProps {
    width?: number
    activePageIndex?: number
}

interface IState {
    linkWidth?: string
    isMounted?: boolean
}

export class PostList extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            linkWidth: "calc(25% - 22px)",
            isMounted:  false
        }
    }

    componentDidMount() {
        const breakPoints = {
            min: 800,
            mid: 1200,
            max: 1400
        };
        if (this.props.width < breakPoints.min) {
            this.setState({ linkWidth: "calc(100% - 22px)"})
        } else if (this.props.width < breakPoints.mid) {
            this.setState({ linkWidth: "calc(50% - 22px)"})
        } else if (this.props.width < breakPoints.max) {
            this.setState({ linkWidth: "calc(25% - 22px)"})
        }
        setTimeout(() =>  this.setState({ isMounted: true }), 0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width) {
            const breakPoints = {
                min: 800,
                mid: 1200,
                max: 1400
            };
            if (nextProps.width < breakPoints.min) {
                this.setState({ linkWidth: "calc(100% - 22px)"})
            } else if (nextProps.width < breakPoints.mid) {
                this.setState({ linkWidth: "calc(50% - 22px)"})
            } else {
                this.setState({ linkWidth: "calc(25% - 22px)"})
            }
        }
    }


    render(): JSX.Element {
        const styles = {
            postList: {
                display: "inline-block",
                width: "80%",
                opacity: this.state.isMounted ? 1 : 0,
                textAlign: "left",
                transition: "opacity 200ms"
            },
            postList__link: {
                display: "inline-block",
                verticalAlign: "top",
                border: "1px solid #ffffff",
                margin: 10,
                width: this.state.linkWidth
            }
        };
        return (
            <div style={styles.postList}>
                {pageLinks[this.props.activePageIndex].content.map((post, i) =>
                    <div key={i} style={styles.postList__link}>
                        <PostDescriptionFromStore   post={post}
                                                    index={i} />
                        <PostLinkFromStore      post={post}
                                                index={i} />
                    </div>
                )}
            </div>
        );
    }
}
