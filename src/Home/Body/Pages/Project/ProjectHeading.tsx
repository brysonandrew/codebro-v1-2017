import * as React from 'react';
import { fontSize } from "../../../../data/helpers/breakPoints";
import {IProject} from "../../../../data/models";

interface IProps {
    project?: IProject
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
}

interface IState {}

export class ProjectHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project } = this.props;

        const styles = {
            helloHeading: {
                fontSize: fontSize.XXL(isMobile, isTablet, isLaptop)
            }
        } as any;
        return (
            <div style={ styles.helloHeading }>
                <pre>{project.name}</pre>
            </div>
        );
    }
}
