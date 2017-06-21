import * as React from 'react';
import * as Immutable from 'immutable';
import {colors} from "../../../data/themeOptions";
import {projectList} from "../../../data/content";
import {IParams} from "../../../data/models";
import {Link} from "react-router-dom";

interface IProps {
    thickness: number
    headRadius: number
    bodyLength: number
    savedParams: IParams
    onClick: (nextPath: string) => void
}

interface IState {}

export class NavigationArrowRight extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleClick(nextPath) {
        this.props.onClick(nextPath);
    }

    findActiveIndex() {
        const { savedParams } = this.props;
        const activePagePath = savedParams.activePagePath;
        const activeIndex = Immutable.List(projectList)
                                     .findIndex(item => item.path === activePagePath);

        return (activeIndex > -1) ? activeIndex : 0
    }

    render(): JSX.Element {
        const { thickness, headRadius, bodyLength } = this.props;

        const activeIndex = this.findActiveIndex();

        const isMax = (activeIndex === projectList.length - 1);

        const nextPath = isMax ? projectList[activeIndex].path : projectList[activeIndex +  1].path;

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
                background: isMax ? colors.gry : colors.hi,
                width: bodyLength,
                transform: "translateY(-50%)"
            },
            navigationArrowRight__headTop: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: isMax ? colors.gry : colors.hi,
                width: headRadius,
                transform: "rotate(-45deg) translateY(200%)"
            },
            navigationArrowRight__headBottom: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: isMax ? colors.gry : colors.hi,
                width: headRadius,
                transform: "rotate(45deg) translateY(-200%)"
            },
        } as any;
        return (
            <Link style= {styles.navigationArrowRight}
                  to={`/${nextPath}`}
                  onClick={isMax ? e => e.preventDefault() : () => this.handleClick(nextPath)}>
                <div style= {styles.navigationArrowRight__body}>
                    <div style={ styles.navigationArrowRight__headTop }/>
                    <div style={ styles.navigationArrowRight__headBottom }/>
                </div>
            </Link>
        );
    }
}
