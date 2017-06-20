import * as React from 'react';
import {colors} from "../../../data/themeOptions";

interface IProps {}

interface IState {}

export class HeadingSub extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            headingSub: {
                position: "relative",
                fontSize: 10,
                textAlign: "center",
                width: "100%",
            },
            headingSub__lineLeft: {
                position: "absolute",
                left: 240,
                top: "50%",
                transform: "translateY(-50%)",
                width: "calc(50% - 480px)"
            },
            headingSub__lineRight: {
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "calc(50% - 240px)"
            },
            headingSub__line: {
                display: "inline-block",
                height: 2,
                background: colors.std,
                width: "100%",
                transition: "transform 200ms"
            },
            headingSub__text: {
                position: "absolute",
                left: "50%",
                color: colors.std,
                transform: "translate(-50%, -50%)",
                width: 480,
                zIndex: 2,
            },

        } as any;
        return (
            <div style={ styles.headingSub }>
                <div style={styles.headingSub__lineLeft}>
                    <div style={styles.headingSub__line}/>
                </div>
                <span>
                    <pre style={styles.headingSub__text}>
                       {" F    R    E    E    L    A    N    C    E        W    E    B        D    E    V    E    L    O    P    E    R"}
                    </pre>
                </span>
                <div style={styles.headingSub__lineRight}>
                    <div style={styles.headingSub__line}/>
                </div>
            </div>
        );
    }
}
