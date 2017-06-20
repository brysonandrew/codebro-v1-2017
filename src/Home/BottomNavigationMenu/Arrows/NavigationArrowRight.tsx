import * as React from 'react';
import {colors} from "../../../data/themeOptions";

interface IProps {
    thickness: number
    headRadius: number
    bodyLength: number
    onClick: () => void
}

interface IState {}

export class NavigationArrowRight extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { thickness, headRadius, bodyLength, onClick } = this.props;

        const styles = {
            navigationArrowRight: {
                position: "absolute",
                height: headRadius * 2,
                right: "2vw",
                top: 0,
                width: bodyLength,
                cursor: "pointer"
            },
            navigationArrowRight__body: {
                position: "absolute",
                right: 0,
                top: "50%",
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: bodyLength,
                transform: "translateY(-50%)"
            },
            navigationArrowRight__headTop: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: headRadius,
                transform: "rotate(-45deg) translateY(200%)"
            },
            navigationArrowRight__headBottom: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: colors.hi,
                width: headRadius,
                transform: "rotate(45deg) translateY(-200%)"
            },
        } as any;
        return (
            <div style= {styles.navigationArrowRight}
                 onClick={onClick}>
                <div style= {styles.navigationArrowRight__body}>
                    <div style={ styles.navigationArrowRight__headTop }/>
                    <div style={ styles.navigationArrowRight__headBottom }/>
                </div>
            </div>
        );
    }
}
