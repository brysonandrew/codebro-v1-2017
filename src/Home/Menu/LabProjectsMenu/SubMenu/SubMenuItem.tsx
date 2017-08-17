import * as React from 'react';
import { IParams, ILabProject } from "../../../../data/models";
import { Link } from "react-router-dom";
import { colors } from '../../../../data/themeOptions';

interface IProps {
    index: number
    savedParams: IParams
    content: ILabProject
}

interface IState {
    isHovered: boolean
}

export class SubMenuItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
    }

    render(): JSX.Element {
        const { content, savedParams } = this.props;
        const { isHovered } = this.state;

        const isSelected = savedParams.activeViewPath === content.path;

        const itemPath = `/lab/${savedParams.activeProjectPath}/${content.path}`;

        const styles = {
            subMenuItem: {
                display: "block",
                position: "relative",
                width: 220,
                height: 40,
                opacity: (isHovered || isSelected) ? 0.8 : 1,
                borderRight: "1px solid #fff",
                cursor: "pointer"
            },
            subMenuItem__text: {
                position: "absolute",
                left: "50%",
                top: "50%",
                color: colors.std,
                transform: "translate(-50%, -50%)"
            }
        } as any;

        return (
        <div style={styles.subMenuItem}
             onMouseEnter={() => this.handleMouseEnter()}
             onMouseLeave={() => this.handleMouseLeave()}>
            <Link to={itemPath}
                  onClick={(e) => e.stopPropagation()}>
               <div style={styles.subMenuItem__text}>
                   {content.name}
               </div>
            </Link>
        </div>
        );
    }
}
