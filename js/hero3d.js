/**
 * MultiSphere Agency — Hero 3D
 * Scène Three.js : sphère centrale + sphères orbitales (une par pôle d'expertise)
 * + champ de particules. Remplace la vidéo de fond (18 Mo) par un rendu temps réel.
 */
import * as THREE from '../lib/three/three.module.min.js';

const container = document.getElementById('hero-3d');
if (container && window.WebGLRenderingContext) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b1e, 0.035);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lumières
    scene.add(new THREE.AmbientLight(0x334477, 1.2));
    const keyLight = new THREE.PointLight(0x4d8dff, 60, 50);
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff7b4d, 30, 40);
    rimLight.position.set(-7, -4, -3);
    scene.add(rimLight);

    // Sphère centrale (l'agence)
    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.6, 3),
        new THREE.MeshStandardMaterial({ color: 0x0d6efd, metalness: 0.55, roughness: 0.25, flatShading: true })
    );
    scene.add(core);

    const coreWire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.85, 2),
        new THREE.MeshBasicMaterial({ color: 0x6ea8ff, wireframe: true, transparent: true, opacity: 0.25 })
    );
    scene.add(coreWire);

    // Sphères orbitales : 5 pôles d'expertise
    const POLES = [
        { color: 0xff6b6b, radius: 0.55, dist: 3.6, speed: 0.40, tilt: 0.2 },  // Événementiel
        { color: 0x4dd4ac, radius: 0.45, dist: 4.4, speed: 0.30, tilt: -0.5 }, // Communication
        { color: 0xffc94d, radius: 0.50, dist: 5.2, speed: 0.22, tilt: 0.9 },  // Web & Mobile
        { color: 0x9b6bff, radius: 0.40, dist: 6.0, speed: 0.17, tilt: -1.1 }, // Cybersécurité
        { color: 0x4dc3ff, radius: 0.35, dist: 6.8, speed: 0.13, tilt: 0.5 }   // Gestion
    ];
    const orbiters = POLES.map((p, i) => {
        const pivot = new THREE.Group();
        pivot.rotation.z = p.tilt;
        const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(p.radius, 2),
            new THREE.MeshStandardMaterial({ color: p.color, metalness: 0.4, roughness: 0.35, flatShading: true })
        );
        mesh.position.x = p.dist;
        pivot.add(mesh);
        // Anneau d'orbite discret
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(p.dist, 0.008, 8, 128),
            new THREE.MeshBasicMaterial({ color: 0x6ea8ff, transparent: true, opacity: 0.15 })
        );
        pivot.add(ring);
        pivot.rotation.y = (i / POLES.length) * Math.PI * 2;
        scene.add(pivot);
        return { pivot, mesh, speed: p.speed };
    });

    // Champ de particules
    const starCount = 900;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) positions[i] = (Math.random() - 0.5) * 60;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x8fb8ff, size: 0.05, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    // Parallaxe souris
    let targetX = 0, targetY = 0;
    window.addEventListener('pointermove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    }, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (!prefersReducedMotion) {
            core.rotation.y = t * 0.15;
            coreWire.rotation.y = -t * 0.1;
            coreWire.rotation.x = t * 0.05;
            orbiters.forEach(o => {
                o.pivot.rotation.y += o.speed * 0.01;
                o.mesh.rotation.y += 0.01;
            });
            stars.rotation.y = t * 0.008;
        }
        camera.position.x += (targetX * 2 - camera.position.x) * 0.04;
        camera.position.y += (0.5 - targetY * 2 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }
    // Ne rend que lorsque le hero est visible (économie batterie/CPU)
    animate();
}
