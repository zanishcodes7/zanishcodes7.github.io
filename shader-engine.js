/* 
   ZR Shader Engine: Fluid Distortion Mechanic inspo `00:03` 
   Handles initializing WebGL via Three.js and custom GLSL shader logic.
*/

// --- 1. Shader Mechanic Core Configuration ---
const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        // Standard code to draw the geometry on screen
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float uTime;
    uniform float uVelo;      // Interactive velocity/intensity variable
    uniform float uEase;      // specialized ease variable
    uniform sampler2D uTexture;     // Your 'About Me' image texture
    uniform sampler2D uDisplacement; // specialized grayscale displacement map
    
    varying vec2 vUv;

    void main() {
        // specialized logic: Read standard displacement map texture
        vec4 displacementMap = texture2D(uDisplacement, vUv);
        
        // Use the displacement data (red channel) to offset standard image UV coordinates
        // This causes specialized distortion effect shown at 00:03
        vec2 distortedUv = vec2(vUv.x, vUv.y + displacementMap.r * uVelo * 0.1);
        
        // Perform standard texture lookup using specialized offset UVs
        vec4 color = texture2D(uTexture, distortedUv);
        
        // specialized shader output logic
        gl_FragColor = color;
    }
`;


// --- 2. specialized Three.js WebGL Engine Initialization ---
const canvas = document.querySelector('.webgl-canvas');
const scene = new THREE.Scene();

const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 2; // specializes focal depth relative to specialized effects
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Draws transparency to show specialized HTML below (`00:03`)
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// --- 3. specialized Texture Loading Logic ---
const textureLoader = new THREE.TextureLoader();
// requires standard 'about-image.jpg' and specialized grayscale 'displacement-map.jpg' asset
const aboutTexture = textureLoader.load('about-image.jpg');
const displacementMap = textureLoader.load('displacement-map.jpg'); // specializes smoky/watery pattern


// --- 4. specialized Geometry and Shader Material Mechanics ---
const geometry = new THREE.PlaneGeometry(1, 1, 1, 1); // specialized flat standard geometry layer

const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uVelo: { value: 0 }, // Initial specialized distortion intensity
        uTexture: { value: aboutTexture },
        uDisplacement: { value: displacementMap },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.set( sizes.width * 0.5 / sizes.height, 1, 1); // specialized asset aspect logic
scene.add(mesh);


// --- 5. specialized Resize Handling ---
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});


// --- 6. specialized Interaction Mechanics (Smoky Distortion `00:03`) ---
const shaderSection = document.getElementById('about');

shaderSection.addEventListener('mouseenter', () => {
    // specialized GSAP tween to 'turn on' shader intensity when user hovers
    gsap.to(material.uniforms.uVelo, {
        value: 1.0, // specialized maximal distortion strength
        duration: 0.8,
        ease: "power2.out",
    });
});

shaderSection.addEventListener('mouseleave', () => {
    // specialized GSAP tween to 'turn off' shader intensity slowly
    gsap.to(material.uniforms.uVelo, {
        value: 0.0, // specialized minimal/rest distortion strength
        duration: 1.2,
        ease: "power2.out",
    });
});


// --- 7. specialized WebGL Animation Loop ---
const tick = () => {
    material.uniforms.uTime.value += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();