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

interface IState {
    isHovered: boolean
}

export class NavigationArrowLeft extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleClick(nextPath) {
        this.props.onClick(nextPath);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        })
    }

    findActiveIndex() {
        const { savedParams } = this.props;
        const activePagePath = savedParams.activePagePath;
        const activeIndex = Immutable.List(projectList)
                                     .findIndex(item => item.path === activePagePath);

        return (activeIndex > -1) ? activeIndex : 0
    }

    render(): JSX.Element {
        const { thickness, headRadius, bodyLength, onClick } = this.props;
        const { isHovered } = this.state;

        const activeIndex = this.findActiveIndex();

        const isMin = (activeIndex === 0);

        const background = isMin ? colors.gry : colors.hi;
        const cursor = isMin ? "default" : "pointer";

        const nextPath = isMin ? projectList[activeIndex].path : projectList[activeIndex - 1].path;

        const styles = {
            navigationArrowLeft: {
                position: "absolute",
                height: headRadius * 2,
                width: bodyLength,
                left: 0,
                top: 0,
                cursor: cursor,
                transform: `translate3d(${isHovered ? 1 : 2}vw, 0px, 0px)`,
                transition: "transform 200ms"
            },
            navigationArrowLeft__body: {
                position: "absolute",
                left: 0,
                top: "50%",
                height: thickness,
                borderRadius: 2,
                background: background,
                width: bodyLength,
                transform: "translateY(-50%)"
            },
            navigationArrowLeft__headTop: {
                position: "absolute",
                left: 0,
                top: 0,
                height: thickness,
                borderRadius: 2,
                background: background,
                width: headRadius,
                transform: "rotate(45deg) translateY(200%)"
            },
            navigationArrowLeft__headBottom: {
                position: "absolute",
                left: 0,
                top: 0,
                height: thickness,
                borderRadius: 2,
                background: background,
                width: headRadius,
                transform: "rotate(-45deg) translateY(-200%)"
            }
        } as any;
        return (
            <Link style= {styles.navigationArrowLeft}
                  to={`/${nextPath}`}
                  onClick={isMin ? e => e.preventDefault() : () => this.handleClick(nextPath)}
                  onMouseEnter={isMin ? null : () => this.handleMouseEnter()}
                  onMouseLeave={isMin ? null : () => this.handleMouseLeave()}>
                <div style= {styles.navigationArrowLeft__body}>
                    <div style={ styles.navigationArrowLeft__headTop }/>
                    <div style={ styles.navigationArrowLeft__headBottom }/>
                </div>
            </Link>
        );
    }
}
