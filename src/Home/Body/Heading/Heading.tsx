import * as React from 'react';
import {colors} from "../../../data/themeOptions";
import {Logo} from "../../../Widgets/Logo/Logo";
import {HeadingSub} from "./HeadingSub";
import {headingMenuLeft} from "../../../data/content";
import {MenuLeft} from "./MenuLeft/MenuLeft";

interface IProps {}

interface IState {
    isMounted: boolean
}

export class Heading extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted:  false
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() =>  this.setState({ isMounted: true }), 0)
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }
    render(): JSX.Element {
        const { isMounted } = this.state;

        const styles = {
            heading: {
                position: "relative",
                height: 50,
                width: "100%",
            },
            heading__main: {
                textAlign: "right",
                width: "calc(100% - 20px)",
                whiteSpace: "no-wrap",
                color: colors.std,
                fontSize: 24,
                opacity: isMounted ? 1 : 0,
                transition: "opacity 200ms",
                zIndex: 2
            }
        } as any;
        return (
            <div style={styles.heading}>
                <MenuLeft/>
                <h1 style={styles.heading__main}>
                    code bro
                </h1>
                <HeadingSub/>
            </div>
        );
    }
}
