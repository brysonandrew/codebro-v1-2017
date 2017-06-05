import * as React from 'react';
import { findLetter } from "./Letters/letters";
import { addComponentCSS } from '../../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
        @keyframes fade {
          0%   { opacity: 1; }
          50%   { opacity: 0.1; }
          100% { opacity: 1; }
        }
    `
});

interface IProps {
    letter: string
    index: number
    isAnimating: boolean
    isLogoHovered: boolean
}

export class Letter extends React.Component<IProps, any> {

    columns = Array.apply(null, new Array(4));
    rows = Array.apply(null, new Array(4));
    size = 40;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    isEqual(a, b) { return a===b };

    render(): JSX.Element {
        const { isLogoHovered, letter, isAnimating } = this.props;
        let styles = {
            letter: {
                display: "inline-block",
                height: this.size
            },
            letter__column: {
                display: "inline-block",
                height: "100%"
            },
            letter__row: {
                position: "relative",
                width: "100%",
                height: `${100 / this.columns.length}%`,
            },
            letter__strokeForward: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 6,
                borderRadius: 4,
                height: "160%",
                background: "#eeeeee",
                transform: `translate(-50%, -50%) rotate(${isLogoHovered ? "90deg" : "45deg"})`,
                animation: isAnimating ? "fade 2000ms infinite" : null,
                transition: "transform 400ms"
            },
            letter__strokeBackward: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 6,
                borderRadius: 4,
                height: "160%",
                background: "#eeeeee",
                transform: `translate(-50%, -50%) rotate(${isLogoHovered ? "90deg" : "-45deg"})`,
                animation: isAnimating ? "fade 2000ms infinite" : null,
                transition: "all 400ms"
            }
        } as any;
        return (
            <div style={ styles.letter }>
                {this.columns.map((_, columnIndex) => {
                    const isColumnEmpty = findLetter(letter).filter(stroke => stroke.columnIndex===columnIndex).length === 0;
                    if (!isColumnEmpty) {
                        return <div key={columnIndex}
                                    style={ Object.assign({}, styles.letter__column,
                                            {width: isColumnEmpty ? 0 : this.size / this.columns.length}) }>
                                    {this.rows.map((_, rowIndex) =>
                                        <div key={rowIndex} style={ styles.letter__row }>
                                            {findLetter(this.props.letter).map((stroke, strokeIndex) => {
                                                if (this.isEqual(stroke.type, "forward")) {
                                                    return this.isEqual(stroke.columnIndex, columnIndex)
                                                        && this.isEqual(stroke.rowIndex, rowIndex)
                                                        && <div key={strokeIndex}
                                                                style={ Object.assign({}, styles.letter__strokeForward, {
                                                                    animationDelay: `${1000 * rowIndex * columnIndex}ms`,
                                                                }) }/>
                                                } else if (this.isEqual(stroke.type, "backward")) {
                                                    return this.isEqual(stroke.columnIndex, columnIndex)
                                                        && this.isEqual(stroke.rowIndex, rowIndex)
                                                        && <div key={strokeIndex}
                                                                style={ Object.assign({}, styles.letter__strokeBackward, {
                                                                    animationDelay: `${1000 * rowIndex * columnIndex + 500}ms`,
                                                                }) }/>
                                                }
                                            })}
                                        </div>)}
                                </div>
                    }})
                }
            </div>
        );
    }
}
