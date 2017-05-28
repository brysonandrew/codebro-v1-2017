import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { addComponentCSS } from '../../../utils/css_styler';
import { IParticle } from "../../../data/models";
import { Particle } from "./particle";
import {changeViewportDimensions} from "../../../Home/HomeActionCreators";

addComponentCSS({
    //language=CSS
    default: `
    .empty {
    }
    `
});


interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    showerCount?: number
}

export class DOMBackground extends React.Component<IProps, IState> {

    particles: IParticle[] = [];
    animationId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            showerCount: 0
        }
    }

    componentDidMount() {
        this.showerParticles();
    }

    showerParticles() {
        this.setState({
            showerCount: this.state.showerCount + 1
        });
        const throttleValue = 5;
        const maxParticleLimit = 100;

        if (this.state.showerCount%(throttleValue * 5)===0 && this.particles.length < maxParticleLimit) {
            this.particles.push(new Particle(this.props.width, this.state.showerCount, (this.particles.length > 0) ? this.particles[this.particles.length - 1].x : 0));
        }
        this.particles.forEach((particle, i) => {
            particle.y+=(this.props.height / (maxParticleLimit * throttleValue));
            particle.life++;
            particle.opacity+=particle.life * 0.0000075;
            particle.size+=particle.life * 0.0001;

            if (particle.y > this.props.height) {
                this.particles.splice(i, 1);
            }
        });
        this.animationId = requestAnimationFrame(this.showerParticles.bind(this));
        // } else {
        //     this.setState({
        //         isShowering: false
        //     });
        //     cancelAnimationFrame(this.animationId);
        // }
    }

    render(): JSX.Element {
        const styles = {
            DOMBackground: {
            }
        };

        return (
            <div style={ styles.DOMBackground }>
                {this.particles.map((particle, i) =>
                    <code key={i}
                         style={{
                            position: "absolute",
                            fontSize: particle.size,
                            background: "transparent",
                            color: `hsla(${5}, 80%, 60%, ${particle.opacity})`,
                            borderStyle: "none",
                            transform: `translate(${particle.x}px, ${particle.y}px)`
                    }}>
                        {particle.src}
                    </code>)}

            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        }
    }
}

export let DOMBackgroundFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(DOMBackground);
