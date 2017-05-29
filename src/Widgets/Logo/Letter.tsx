import * as React from 'react';
import {findLetter} from "./Letters/letters";

interface IProps {
    letter: string
    isLogoHovered: boolean
}

interface IState {
}

export class Letter extends React.Component<IProps, IState> {

    columns = Array.apply(null, new Array(4));
    rows = Array.apply(null, new Array(4));
    size = 40;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    isEqual(a, b) { return a===b };

    render(): JSX.Element {
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
                transform: `translate(-50%, -50%) rotate(${this.props.isLogoHovered ? "90deg" : "45deg"})`,
                transition: "all 400ms"
            },
            letter__strokeBackward: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 6,
                borderRadius: 4,
                height: "160%",
                background: "#eeeeee",
                transform: `translate(-50%, -50%) rotate(${this.props.isLogoHovered ? "90deg" : "-45deg"})`,
                transition: "all 400ms"
            }
        };
        return (
            <div style={ styles.letter }>
                {this.columns.map((_, columnIndex) => {
                    const isColumnEmpty = findLetter(this.props.letter).filter(stroke => stroke.columnIndex===columnIndex).length === 0;
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
                                                                style={ styles.letter__strokeForward }/>
                                                } else if (this.isEqual(stroke.type, "backward")) {
                                                    return this.isEqual(stroke.columnIndex, columnIndex)
                                                        && this.isEqual(stroke.rowIndex, rowIndex)
                                                        && <div key={strokeIndex}
                                                                style={ styles.letter__strokeBackward }/>
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
