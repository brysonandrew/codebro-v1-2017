import * as React from 'react';
import { headingMenuLeft } from "../../../../data/content";
import { colors } from "../../../../data/themeOptions";
import { MenuLeftItem } from "./MenuLeftItem";

interface IProps {}

interface IState {}

export class MenuLeft extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            menuLeft: {
                position: "absolute",
                textAlign: "left",
                top: 2,
                left: 10,
            }
        } as any;
        return (
            <div style={ styles.menuLeft }>
                {headingMenuLeft.map((item, i) =>
                    <MenuLeftItem
                        key={i}
                        item={item}
                    />)}
            </div>
        );
    }
}
