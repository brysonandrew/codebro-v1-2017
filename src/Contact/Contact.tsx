import * as React from 'react';
import { ContactMessage } from "./ContactMessage";
import { Button } from "../Widgets/Button/Button";

interface IProps {
    isTabletMode: boolean
    isMounted: boolean
}

interface IState {
    isContactOpen?: boolean
}

export class Contact extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isContactOpen: false
        };
        this.handleContactClick = this.handleContactClick.bind(this);
    }

    handleContactClick() {
        this.setState({
            isContactOpen: !this.state.isContactOpen
        })
    }

    render(): JSX.Element {
        const { isContactOpen } = this.state;
        const { isTabletMode, isMounted } = this.props;
        const styles = {
            contact: {
                MozTransform:`scale(${isMounted ? 1 : 0})`,
                transform: `scale(${isMounted ? 1 : 0})`
            },
            contact__button: {
                margin: 10
            }
        } as any;
        return (
            <div style={styles.contact}>
                {(!isTabletMode || isContactOpen)
                    ?   <ContactMessage
                            isContactOpen={isContactOpen}
                            onClick={this.handleContactClick}
                        />
                    :   <div style={styles.contact__button}>
                        <Button text="contact"
                                onClick={this.handleContactClick}/>
                    </div>
                }
            </div>
        );
    }
}
