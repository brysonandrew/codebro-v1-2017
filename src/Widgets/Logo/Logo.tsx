import * as React from 'react';
import THREE = require('three');
import { Word } from './Word';

interface ILogoProps {
    isDarkTheme?: boolean
    activePageIndex?: number
}

interface ILogoState {
    isHovered?: boolean
    isLogoShort?: boolean
}

export class Logo extends React.Component<ILogoProps, ILogoState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isLogoShort: true
        };
    }

    handleClick() {
        this.setState({
            isLogoShort: !this.state.isLogoShort,
            isHovered: false
        });
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
        let style = {
            display: "inline-block",
            cursor: "pointer",
            transition: "opacity 200ms"
        };
        let words = this.state.isLogoShort
                    || (this.props.activePageIndex>-1) ? ["c", "b"] : ["code", "bro"];

        return (
            <div style={style}
                 onClick={(this.props.activePageIndex===-1)
                            ? () => this.handleClick() : null}
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
            </div>
        );
    }
}
