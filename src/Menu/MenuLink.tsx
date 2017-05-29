import * as React from 'react';
import {IPageLink} from "../data/models";
import {pageLinks} from "../data/pages";

interface IProps {
    index: number
    page: IPageLink
    width: number
    height: number
}

interface IState {
    isHovered: boolean
}

export class MenuLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    render(): JSX.Element {
        const { index, page, width, height } = this.props;
        const radiansFactor = ((Math.PI * 2) / pageLinks.length);
        const startingIndex = 0;
        return (
            <div key={index}
                 style={ Object.assign( {},
                            {
                                transform : `translate( calc(${Math.sin(radiansFactor * (index + startingIndex)) * width * 0.25}px),
                                                        calc(${Math.cos(radiansFactor * (index + startingIndex)) * height * 0.25}px))`
                            }
                        )}>
                {page.linkComponent}
            </div>
        );
    }
}
