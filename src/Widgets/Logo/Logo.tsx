import * as React from 'react';
import { Word } from './Word';
import { Link } from 'react-router';
import {IParams} from "../../data/models";

interface IProps {
    activePageIndex?: number
    activeViewIndex?: number
    params: IParams
    isAnimating?: boolean
}

interface IState {
    isHovered?: boolean
}

export class Logo extends React.Component<IProps, IState> {

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
        const { activePageIndex, activeViewIndex, params, isAnimating } = this.props;

        const isFrontPage = activePageIndex===-1;
        const isFrontView = activeViewIndex===-1;

        const styles = {
            logo: {
                textAlign: "center",
            },
            logo__button: {
                display: "inline-block",
                width: isAnimating ? "100%" : "auto",
                cursor: "pointer",
                transition: "opacity 200ms"
            },
            logo__loading: {
                display: "inline-block",
                color: "#fafafa",
                background: "transparent",
                fontSize: 12
            }
        };
        const words = (isFrontPage && isFrontView) ? ["c", "b"] : ["x"];
        const nextPath = isFrontPage
                            ?   null
                            :   isFrontView
                                    ?   ``
                                    :   `/${params.activePagePath}`;

        return (
            <div style={styles.logo}>
                <Link style={styles.logo__button}
                      to={nextPath}
                      onMouseEnter={() => this.handleMouseEnter()}
                      onMouseLeave={() => this.handleMouseLeave()}
                >
                    {words.map((word, i ) =>
                        <Word
                            key={i}
                            word={word}
                            isHovered={this.state.isHovered}
                            isAnimating={isAnimating}
                        />)}
                </Link>
               {isAnimating
               &&   <pre style={styles.logo__loading}>
                        L O A D I N G . . .
                    </pre>}
            </div>

        );
    }
}
