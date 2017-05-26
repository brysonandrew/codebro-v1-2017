import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { BinaryCluster } from "./binaryCluster";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class GLBackground extends React.Component<IProps, IState> {
    camera;
    scene;
    renderer;
    animateLoop;
    ref;
    binaryCluster = new BinaryCluster();

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
            this.onWindowResized(nextProps.width, nextProps.height);
        }
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            this.isAnimating(nextProps.activePageIndex === -1);
        }
    }

    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initAssets();
        this.onWindowResized(window.innerWidth, window.innerHeight);
        this.isAnimating(this.props.activePageIndex === -1);
    }

    initRenderer() {
        this.renderer =  new THREE.WebGLRenderer();
        this.ref.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, 0, 1, 1000 );
        this.camera.position.z = 260;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initAssets() {
        this.scene.add(this.binaryCluster.render());
    }

    onWindowResized(w, h) {
        this.renderer.setSize( w, h );
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    isAnimating(isAnimating) {
        if (isAnimating) {
            this.animate();
        } else {
            this.renderStill();
        }
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderStill() {
        this.renderer.render( this.scene, this.camera );
        cancelAnimationFrame(this.animateLoop);
    }

    renderMotion() {
        this.binaryCluster.burn();
        this.camera.lookAt( this.scene.position );
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        const styles = {
            GLBackground: {}
        };
        return (
            <div style={ styles.GLBackground } ref={el => this.ref = el}/>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        activePageIndex: state.homeStore.activePageIndex,
        activeViewIndex: state.homeStore.activeViewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
    }
}

export let GLBackgroundFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(GLBackground);
