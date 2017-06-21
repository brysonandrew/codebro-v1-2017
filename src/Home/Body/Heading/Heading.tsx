import * as React from 'react';
import { colors } from "../../../data/themeOptions";
import { Logo } from "../../../Widgets/Logo/Logo";
import { HeadingSub } from "./HeadingSub";
import { MenuLeft } from "./MenuLeft/MenuLeft";

interface IProps {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

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
        const { isMobile, isTablet, isLaptop} = this.props;

        const styles = {
            heading: {
                position: "relative",
                textAlign: "right",
                height: 50,
                width: "100%",
            },
            heading__sub: {
                position: "relative",
                top: 50,
            },
            heading__logo: {
                position: "absolute",
                right: "2vw",
                height: 40,
                width: 40,
                padding: 5,
                transform: "scale(0.8)"
            },
            heading__main: {
                position: "absolute",
                right: "calc(2vw + 50px)",
                color: colors.std,
                fontSize: 24,
                opacity: isMounted ? 1 : 0,
                transition: "opacity 200ms",
                zIndex: 2
            }
        } as any;
        return (
            <div style={styles.heading}>
                <MenuLeft
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isLaptop={isLaptop}
                />
                <h1 style={styles.heading__main}>
                    <span>code bro</span>
                </h1>
                <div style={styles.heading__logo}>
                    <Logo/>
                </div>
                <div style={styles.heading__sub}>
                    <HeadingSub
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                </div>
            </div>
        );
    }
}
