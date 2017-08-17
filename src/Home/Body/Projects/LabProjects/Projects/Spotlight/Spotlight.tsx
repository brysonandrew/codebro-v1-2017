import * as React from 'react';
import * as history from 'history';
import THREE = require('three');
import { isGL } from "../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../redux/main_reducer';
import { IParams } from "../../../../../../data/models";
import { animateKey, playerPositionX, playerPositionZ, playerRotationY
} from "../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";

interface IProperties {
    width?: number
    height?: number
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    savedParams?: IParams
    parentEl?: HTMLDivElement
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    keysPressed?: string
    mx?: number
    my?: number
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isFallback: boolean
}

export class Spotlight extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    light;
    playerFocus = new THREE.Group;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
        };
    }

    componentDidMount() {
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement )
        }
    }

    componentWillReceiveProps(nextProps) {
        const isHeightChanged = nextProps.height !== this.props.height;
        const isWidthChanged = nextProps.width !== this.props.width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }
    }

    initGL() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLighting();
        this.initAssets();
        this.initPlayerFocus();
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true })
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.props.width, this.props.height );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45,
            this.props.width / this.props.height, 1, 4000 );

        this.camera.position.set(0, 200, 0);
        this.camera.lookAt(this.playerFocus.position);

        this.playerFocus.add(this.camera);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.light = new THREE.PointLight( 0xffffff, 1, 100 );
        this.light.position.set( 0, 50, 0 );
        this.playerFocus.add(this.light);
    }

    initAssets() {
        Promise.all([
            loadGround()
        ]).then((meshes) => {
            meshes.map(mesh => this.scene.add(mesh));
        });
    }

    initPlayerFocus() {
        this.scene.add(this.playerFocus);
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed } = this.props;

        this.playerFocus.rotation.y+=playerRotationY(keysPressed);

        this.playerFocus.position.z+=playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        this.playerFocus.position.x+=playerPositionX(keysPressed, this.playerFocus.rotation.y);

        this.light.intensity = this.light.intensity + animateKey("c", keysPressed, 0.05);

        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        const styles = {
            world: {
                position: "absolute",
                left: 0,
                top: 0,
                display: "table",
                height: "100%",
                width: "100%"
            },
            world__noGLMessage: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100%",
                width: "100%"
            }
        } as any;

        return (
            this.state.isFallback
            &&  <div style={ styles.world }>
                    <div style={ styles.world__noGLMessage }>
                        {"Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."}
                    </div>
                </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export const SpotlightFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Spotlight);
