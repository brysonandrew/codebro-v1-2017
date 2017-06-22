import * as React from 'react';
import {fontSize, padding} from "../../../../data/helpers/breakPoints";
import {IProject} from "../../../../data/models";
import {colors} from "../../../../data/themeOptions";
import {ProjectHeadingUnderline} from "./ProjectHeadingUnderline";

interface IProps {
    project?: IProject
    previewWidth?: number
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
    isActive?: boolean
    isHovered?: boolean
    onClick: (event: Event) => void
}

interface IState {
}

export class ProjectHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);

    }

    handleClick(e) {
        this.props.onClick(e);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, isActive, previewWidth, isHovered } = this.props;

        const styles = {
            projectHeading: {
                width: "100%",
                cursor: "pointer",
                textAlign: "center"
            },
            projectHeading__text: {
                display: "inline-block",
                transform: `translate3d(0px, ${isHovered ? 0 : -20}px, 0px)`,
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
            },
            projectHeading__underline: {
                width: "100%",
                textAlign: "center"
            }
        } as any;
        return (
            <div style={ styles.projectHeading }
                 onClick={(e) => this.handleClick(e)}>
               {!isMobile
               &&   <div style={ styles.projectHeading__underline }>
                        <ProjectHeadingUnderline
                            previewWidth={previewWidth}
                            isHovered={isHovered}
                        />
                    </div>}
                <div style={ styles.projectHeading__text }>
                    <h4 style={ styles.projectHeading__name }>
                        {project.name}
                    </h4>
                    <h4 style={ styles.projectHeading__date }>
                        {project.date}
                    </h4>
                </div>
            </div>
        );
    }
}
