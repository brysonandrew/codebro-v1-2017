import * as React from 'react';
import { Word } from './Word';
import { Link } from 'react-router';

interface ILogoProps {
    isDarkTheme?: boolean
    activePageIndex?: number
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

        const isFrontPage = this.props.activePageIndex===-1;
        const style = {
            display: "inline-block",
            cursor: "pointer",
            transition: "opacity 200ms"
        };
        const words = isFrontPage ? ["c", "b"] : ["x"];

        return (
            <Link style={style}
                  to={isFrontPage ? null : ''}
                  onMouseEnter={() => this.handleMouseEnter()}
                  onMouseLeave={() => this.handleMouseLeave()}
            >
                {words.map((word, i ) =>
                    <Word
                        key={i}
                        word={word}
                        isDarkTheme={this.props.isDarkTheme}
                        isLogoHovered={this.state.isHovered}
                    />)}
            </Link>
        );
    }
}
