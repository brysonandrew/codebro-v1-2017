import * as React from 'react';
import {colors} from "../../data/themeOptions";

interface IProps {}

interface IState {}

export class BottomNavigationMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            bottomNavigationMenu: {
                width: "100%"
            },
            bottomNavigationMenu__arrowLeft: {
                position: "absolute",
                left: 42,
                top: "50%",
                height: 2,
                background: colors.hi,
                width: 40,
                transform: "translateY(-50%)"
            },
            bottomNavigationMenu__arrowLeftHeadTop: {
                position: "absolute",
                left: -4,
                height: 2,
                background: colors.hi,
                width: 6,
                transform: "rotate(45deg) translateY(50%)"
            },
            bottomNavigationMenu__arrowLeftHeadBottom: {
                position: "absolute",
                left: -4,
                height: 2,
                background: colors.hi,
                width: 6,
                transform: "rotate(-45deg) translateY(-50%)"
            },
            bottomNavigationMenu__arrowRight: {
                position: "absolute",
                right: 42,
                height: 2,
                background: colors.hi,
                width: 40,
                top: "50%",
                transform: "translateY(-50%)"
            },
            bottomNavigationMenu__arrowRightHeadTop: {
                position: "absolute",
                right: 4,
                height: 2,
                background: colors.hi,
                width: 6,
                transform: "rotate(225deg) translateY(50%)"
            },
            bottomNavigationMenu__arrowRightHeadBottom: {
                position: "absolute",
                right: 4,
                height: 2,
                background: colors.hi,
                width: 6,
                transform: "rotate(-225deg) translateY(-50%)"
            },
        } as any;
        return (
            <div style={ styles.bottomNavigationMenu }>
                <div style={ styles.bottomNavigationMenu__arrowLeft }>
                    <div style={ styles.bottomNavigationMenu__arrowLeftHeadTop }/>
                    <div style={ styles.bottomNavigationMenu__arrowLeftHeadBottom }/>
                </div>
                <div style={ styles.bottomNavigationMenu__arrowRight }>
                    <div style={ styles.bottomNavigationMenu__arrowRightHeadTop }/>
                    <div style={ styles.bottomNavigationMenu__arrowRightHeadBottom }/>
                </div>
            </div>
        );
    }
}
