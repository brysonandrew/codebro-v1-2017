import * as React from 'react';
import { fontSize } from "../../../../../data/helpers/breakPoints";
import { colors } from '../../../../../data/themeOptions';

interface IProps {
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
}

interface IState {}

export class IntroHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            helloHeading: {
                color: colors.wht,
                fontSize: fontSize.XXL(isMobile, isTablet, isLaptop)
            }
        } as any;
        return (
            <div style={ styles.helloHeading }>
                <pre>{`code bro 3D.`}</pre>
            </div>
        );
    }
}
