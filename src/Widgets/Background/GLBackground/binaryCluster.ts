import THREE = require('three');

export class BinaryCluster {

    clusters = new THREE.Group;
    count = 0;

    constructor() {

    }

    addCluster() {
        let amount = 1;
        let radius = 40;

        let colors = new Float32Array( amount * 3 );
        let sizes = new Float32Array( amount );

        let vertex = new THREE.Vector3();
        let color = new THREE.Color( 0xffffff );

        let positions0 = new Float32Array( amount * 3 );

        positions0.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            vertex.toArray((positions0 as any), i);

            sizes[i] = 14;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
            // color.setHSL(360 * Math.random(), 0.8, 0.6);
            color.toArray((colors as any), i * 3);
        });

        let geometry0 = new THREE.BufferGeometry();
        geometry0.addAttribute( 'position', new THREE.BufferAttribute( positions0, 3 ) );
        geometry0.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry0.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        let material0 = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( "/images/assets/0bitWhite.png" ) }
            },
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
            blending:       THREE.AdditiveBlending,
            depthTest:      true,
            transparent:    true
        } );

        let cluster0 = new THREE.Points( geometry0, material0 );

        cluster0.rotation.z = Math.PI;

        cluster0["life"] = 0;

        this.clusters.add(cluster0);

        let positions1 = new Float32Array( amount * 3 );

        positions1.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            vertex.toArray((positions1 as any), i);

            sizes[i] = 14;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
            color.toArray((colors as any), i * 3);
        });

        let geometry1 = new THREE.BufferGeometry();
        geometry1.addAttribute( 'position', new THREE.BufferAttribute( positions1, 3 ) );
        geometry1.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry1.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        let material1 = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( "/images/assets/1bitWhite.png" ) }
            },
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        let cluster1 = new THREE.Points( geometry1, material1 );

        cluster1.rotation.z = Math.PI * 0.5;

        cluster1["life"] = 0;

        this.clusters.add(cluster1);
    }

    burn() {
        if ((this.count % 5)===0) {
            this.addCluster();
        }
        this.count++;

        this.clusters.children.forEach((cluster, i) => {
            cluster.rotation.y += 0.01;
            cluster.position.x = Math.sin(cluster.rotation.y) * 50;
            cluster.position.z = Math.cos(cluster.rotation.y) * 50;
            if (cluster["life"]===500) {
                this.clusters.children.splice(i, 1);
            }
            cluster["life"]++;
        });
    }

    render() {
        return this.clusters;
    }
}
