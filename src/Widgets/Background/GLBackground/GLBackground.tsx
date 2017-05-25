import * as React from 'react';
import THREE = require('three');
import { BinaryCluster } from "./binaryCluster";

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

export class GLBackground extends React.Component<IProps, IState> {
    camera;
    scene;
    renderer;
    animateLoop;
    binaryCluster = new BinaryCluster();

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isAnimating: false
        }
    }

    componentDidMount() {
        this.init();
    }

    init() {
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
        this.renderer =  new THREE.WebGLRenderer();
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
        this.scene.add(this.binaryCluster.render());
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
            this.binaryCluster.burn();
            this.camera.lookAt( this.scene.position );
            this.renderer.render( this.scene, this.camera );
        } else {
            this.renderStill();
            cancelAnimationFrame(this.animateLoop);
        }
    }

    render(): JSX.Element {
        const styles = {
            GLBackground: {
                position: "relative"
            }
        };
        return (
            <div style={ styles.GLBackground }></div>
        );
    }
}
