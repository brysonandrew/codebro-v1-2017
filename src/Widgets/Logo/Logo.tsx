import * as React from 'react';
import { Word } from './Word';
import { Link } from 'react-router';
import {IParams} from "../../data/models";

interface ILogoProps {
    activePageIndex?: number
    activeViewIndex?: number
    params: IParams
}

interface ILogoState {
    isHovered?: boolean
}

export class Logo extends React.Component<ILogoProps, ILogoState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        const { activePageIndex, activeViewIndex, params } = this.props;

        const isFrontPage = activePageIndex===-1;
        const isFrontView = activeViewIndex===-1;

        const style = {
            display: "inline-block",
            cursor: "pointer",
            transition: "opacity 200ms"
        };
        const words = (isFrontPage && isFrontView) ? ["c", "b"] : ["x"];
        const nextPath = isFrontPage
                            ?   null
                            :   isFrontView
                                    ?   ``
                                    :   `/${params.activePagePath}`;

        return (
            <Link style={style}
                  to={nextPath}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                {words.map((word, i ) =>
                    <Word
                        key={i}
                        word={word}
                        isLogoHovered={this.state.isHovered}
                    />)}
            </Link>
        );
    }
}
