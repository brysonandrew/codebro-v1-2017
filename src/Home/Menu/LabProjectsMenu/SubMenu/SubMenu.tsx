import * as React from 'react';
import { SubMenuItem } from "./SubMenuItem";
import { IParams } from "../../../../data/models";

interface IProps {
    savedParams?: IParams
    isMenuOpen?: boolean
    list?: any[]
}

interface IState {}

export class SubMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { savedParams, list } = this.props;

        const styles = {
            pagesSubMenu: {
                textAlign: "left",
            }
        };

        return (
            <div style={styles.pagesSubMenu}>
                <div>
                    {list.map((content, i) =>
                        <SubMenuItem
                            key={i}
                            index={i}
                            savedParams={savedParams}
                            content={content}
                        />)}
                </div>
            </div>
        );
    }
}