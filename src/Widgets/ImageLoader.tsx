import * as React from 'react';

interface IProps {
    imagePath: string
    onLoad: () => void
    onFail?: () => void
}

interface IState {
    isLoading: boolean
}

export class ImageLoader extends React.Component<IProps, IState> {

    loadId;
    errorId;
    backgroundImage;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        const that = this;
        this.handleLoadBackgroundImage(that.props.imagePath).then(

            function fulfilled() {
                that.props.onLoad();
                that.setState({
                    isLoading: false
                });
            },

            function rejected() {
                that.props.onFail() ? that.props.onFail() : null;
                that.setState({
                    isLoading: false
                });
            }
        );
    }

    componentWillUnmount() {
        this.backgroundImage.removeEventListener('load', this.loadId);
        this.backgroundImage.removeEventListener('error', this.errorId);
    }

    handleLoadBackgroundImage = (imageURL) => {
        // Define the promise
        return new Promise((resolve, reject) => {

            this.setState({
                isLoading: true
            });

            this.backgroundImage = new Image();

            // Create the image
            this.loadId = () => resolve(this);

            // When image is loaded, resolve the promise
            this.backgroundImage.addEventListener('load', this.loadId);

            this.errorId = () => reject();

            // When there's an error during load, reject the promise
            this.backgroundImage.addEventListener('error', this.errorId);

            // Assign URL
            this.backgroundImage.src = imageURL;
        });
    };

    render(): JSX.Element {
        return (
            <div>
                {this.state.isLoading && "L O A D I N G"}
            </div>
        );
    }
}
