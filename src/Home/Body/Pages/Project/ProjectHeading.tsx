import * as React from 'react';
import {fontSize, padding} from "../../../../data/helpers/breakPoints";
import {IProject} from "../../../../data/models";
import {colors} from "../../../../data/themeOptions";
import {ProjectHeadingUnderline} from "./ProjectHeadingUnderline";

interface IProps {
    project?: IProject
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
    isActive?: boolean
    onClick: () => void
}

interface IState {
    isHovered?: boolean
}

export class ProjectHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
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


    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, isActive } = this.props;
        const { isHovered } = this.state;

        const styles = {
            projectHeading: {
                cursor: "pointer",
                textAlign: "center"
            },
            projectHeading__text: {
                transform: `translate3d(0px, ${isHovered ? 0 : 0}px, 0px)`,
                transition: "transform 200ms"
            },
            projectHeading__name: {
                display: "inline-block",
                fontSize: fontSize.L(isMobile, isTablet, isLaptop),
                padding: `0px ${padding.M(isMobile, isTablet, isLaptop)}px`
            },
            projectHeading__date: {
                display: "inline-block",
                fontSize: fontSize.S(isMobile, isTablet, isLaptop),
                padding: `0px ${padding.M(isMobile, isTablet, isLaptop)}px`
            }
        } as any;
        return (
            <div style={ styles.projectHeading }
                 onClick={this.props.onClick}
                 onMouseEnter={isActive ? () => this.handleMouseEnter() : null}
                 onMouseLeave={isActive ? () => this.handleMouseLeave() : null}>
                <div style={ styles.projectHeading__text }>
                    <div style={ styles.projectHeading__name }>
                        {project.name}
                    </div>
                    <div style={ styles.projectHeading__date }>
                        {project.date}
                    </div>
                </div>
                <ProjectHeadingUnderline
                    isHovered={isHovered}
                />
            </div>
        );
    }
}
