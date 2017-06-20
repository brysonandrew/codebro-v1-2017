import * as React from 'react';
import {colors} from "../../../data/themeOptions";

interface IProps {
    thickness: number
    headRadius: number
    bodyLength: number
    onClick: () => void
}

interface IState {}

export class NavigationArrowLeft extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { thickness, headRadius, bodyLength, onClick } = this.props;

        const styles = {
            navigationArrowLeft: {
                position: "absolute",
                height: headRadius * 2,
                width: bodyLength,
                left: "2vw",
                top: 0,
                cursor: "pointer"
            },
            navigationArrowLeft__body: {
                position: "absolute",
                left: 0,
                top: "50%",
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: bodyLength,
                transform: "translateY(-50%)"
            },
            navigationArrowLeft__headTop: {
                position: "absolute",
                left: 0,
                top: 0,
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: headRadius,
                transform: "rotate(45deg) translateY(200%)"
            },
            navigationArrowLeft__headBottom: {
                position: "absolute",
                left: 0,
                top: 0,
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: headRadius,
                transform: "rotate(-45deg) translateY(-200%)"
            }
        } as any;
        return (
            <div style= {styles.navigationArrowLeft}
                 onClick={onClick}>
                <div style= {styles.navigationArrowLeft__body}>
                    <div style={ styles.navigationArrowLeft__headTop }/>
                    <div style={ styles.navigationArrowLeft__headBottom }/>
                </div>
            </div>
        );
    }
}
