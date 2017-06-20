import * as React from 'react';
import * as Immutable from 'immutable';
import { colors } from "../../data/themeOptions";
import { NavigationArrowRight } from "./Arrows/NavigationArrowRight";
import { IParams } from "../../data/models";
import {projectList} from "../../data/content";
import {NavigationArrowLeft} from "./Arrows/NavigationArrowLeft";

interface IProps {
    onArrowNavigation: (nextParams: IParams) => void
    savedParams: IParams
}

interface IState {}

export class BottomNavigationMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleArrowRightClick() {
        const { onArrowNavigation } = this.props;

        const activeIndex = this.findActiveIndex();

        if (activeIndex < projectList.length - 1) {
            const nextParams = {
                activePagePath: projectList[activeIndex + 1].path
            };
            onArrowNavigation(nextParams);
        }
    }

    handleArrowLeftClick() {
        const { onArrowNavigation } = this.props;

        const activeIndex = this.findActiveIndex();

        if (activeIndex > 0) {
            const nextParams = {
                activePagePath: projectList[activeIndex - 1].path
            };
            onArrowNavigation(nextParams);
        }
    }

    findActiveIndex() {
        const { savedParams } = this.props;
        const activePagePath = savedParams.activePagePath;
        const activeIndex = Immutable.List(projectList)
                                .findIndex(item => item.path === activePagePath);

        return (activeIndex > -1) ? activeIndex : 0
    }

    render(): JSX.Element {
        const thickness = 4;
        const headRadius = 20;
        const bodyLength = 60;

        const styles = {
            bottomNavigationMenu: {
                width: "100%"
            }
        } as any;
        return (
            <div style={ styles.bottomNavigationMenu }>
                <NavigationArrowLeft
                    thickness={thickness}
                    headRadius={headRadius}
                    bodyLength={bodyLength}
                    onClick={this.handleArrowLeftClick.bind(this)}
                />
                <NavigationArrowRight
                    thickness={thickness}
                    headRadius={headRadius}
                    bodyLength={bodyLength}
                    onClick={this.handleArrowRightClick.bind(this)}
                />
            </div>
        );
    }
}
