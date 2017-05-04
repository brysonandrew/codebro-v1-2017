import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { Flame } from "./flame";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    hsl?: string
    width?: number
    height?: number
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isAnimating?: boolean
}

export class Background extends React.Component<IProps, IState> {
    camera;
    scene;
    renderer;
    animateLoop;
    flame = new Flame();

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isAnimating: true
        }
    }

    componentDidMount() {
        if (this.props.activePageIndex === -1) {
            this.setState({
                isAnimating: true,
                isMounted: true
            })
        } else {
            this.setState({
                isAnimating: false,
                isMounted: true
            })
        }
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initAssets();
        window.addEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            if (nextProps.activePageIndex === -1) {
                setTimeout(() => {
                    this.setState({
                        isAnimating: true
                    });
                    this.animate();
                }, 0);
            } else if (nextProps.activePageIndex === 2) {
                setTimeout(() => {
                    this.setState({
                        isAnimating: true
                    });
                    this.animate();
                }, 0);
                this.camera.position.z = 100;
            } else {
                this.setState({
                    isAnimating: false
                });
            }
        }
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        console.log(this.renderer);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45,
            window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 260;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initAssets() {
        this.scene.add(this.flame.render());
    }

    onWindowResized(renderer) {
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderStill() {
        this.renderer.render( this.scene, this.camera );
    }

    renderMotion() {
        if (this.state.isAnimating) {
            this.flame.burn();
            this.camera.lookAt( this.scene.position );
            this.renderer.render( this.scene, this.camera );
        } else {
            this.renderStill();
            cancelAnimationFrame(this.animateLoop);
        }
    }

    render(): JSX.Element {
        return (
            <div>
                {this.state.isMounted
                    ?   null
                    :   "loading"}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activeViewIndex: state.homeStore.activeViewIndex,
        activePageIndex: state.homeStore.activePageIndex
    };
}

export let BackgroundFromStore = connect(
    mapStateToProps
)(Background);
