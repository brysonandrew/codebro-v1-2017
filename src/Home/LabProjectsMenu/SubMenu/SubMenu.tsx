import * as React from 'react';
import { SubMenuItem } from "./SubMenuItem";
import { IParams } from "../../../data/models";
import { MenuButton } from "../MenuButton";
import { colors } from '../../../data/themeOptions';

interface IProps {
    savedParams?: IParams
    isMenuOpen?: boolean
    list?: any[]
}

interface IState {
    isSubMenuOpen: boolean
}

export class SubMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isSubMenuOpen: false
        };
        this.handleSubMenuClose = this.handleSubMenuClose.bind(this);
        this.handleSubMenuOpen = this.handleSubMenuOpen.bind(this);
    }

    handleSubMenuOpen() {
        this.setState({
            isSubMenuOpen: true
        })
    }


    handleSubMenuClose() {
        this.setState({
            isSubMenuOpen: false
        })
    }

    render(): JSX.Element {
        const { isSubMenuOpen } = this.state;
        const { savedParams, list } = this.props;

        const styles = {
            pagesSubMenu: {
                textAlign: "left",
                background: colors.hi
            }
        };

        const widthStyle = isSubMenuOpen ? 220 : 40;
        const opacityStyle = isSubMenuOpen ? 1 : 0;

        return (
            <div style={styles.pagesSubMenu}>
                <MenuButton
                    isACross={isSubMenuOpen}
                    onClick={isSubMenuOpen ? this.handleSubMenuClose : this.handleSubMenuOpen}
                />
                <div>
                    {list.map((content, i) =>
                        <div key={i}
                             style={{width: widthStyle}}>
                            <SubMenuItem
                                index={i}
                                textOpacity={opacityStyle}
                                isSubMenuOpen={isSubMenuOpen}
                                savedParams={savedParams}
                                content={content}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}