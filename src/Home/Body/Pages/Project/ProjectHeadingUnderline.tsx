import * as React from 'react';
import {colors} from "../../../../data/themeOptions";

interface IProps {
    isHovered: boolean
}

interface IState {}

export class ProjectHeadingUnderline extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isHovered } = this.props;

        const width = 180;

        const styles = {
            projectHeadingUnderline: {
                left: "50%",
                position: "relative",
                transform: `translate3d(-50%, ${isHovered ? 40 : 0}px, 0px)`,
                transition: "transform 200ms"
            },
            projectHeadingUnderline__left: {
                position: "absolute",
                top: 0,
                left: 0,
                background: colors.std,
                width: width,
                height: 1,
                transform: `rotate(${isHovered ? -22 : 0}deg) 
                            translate3d(${isHovered ? width * 0.25 : width * 0.5}px, 0px, 0px) 
                            scaleX(${isHovered ? 0.5 : 1})`,
                transition: "transform 200ms"
            },
            projectHeadingUnderline__right: {
                position: "absolute",
                top: 0,
                left: 0,
                background: colors.std,
                width: width,
                height: 1,
                transform: `rotate(${isHovered ? 22 : 0}deg) 
                            translate3d(${isHovered ? -width * 0.25 : -width * 0.5}px, 0px, 0px) 
                            scaleX(${isHovered ? 0.5 : 1})`,
                transition: "transform 200ms"
            },
        } as any;
        return (
            <div style={ styles.projectHeadingUnderline }>
                <div style={styles.projectHeadingUnderline__left}/>
                <div style={styles.projectHeadingUnderline__right}/>
            </div>
        );
    }
}
