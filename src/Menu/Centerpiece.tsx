import * as React from 'react';
import {ProfileImage} from "./ProfileImage";

interface IProps {}

interface IState {}

export class Centerpiece extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            centerpiece: {}
        };
        return (
            <div style={ styles.centerpiece }>
                <ProfileImage/>
            </div>
        );
    }
}
