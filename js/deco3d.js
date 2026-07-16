/**
 * MultiSphere Agency — Décors 3D réutilisables
 * - #why-3d : amas de sphères (façon logo) en rotation douce
 * - .bg-header : champ de particules + sphère filaire en fond d'en-tête
 * Léger : un seul renderer par élément, pixel ratio plafonné, reduced-motion respecté.
 */
import * as THREE from '../lib/three/three.module.min.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function makeScene(el, build) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    const update = build(scene, camera);
    window.addEventListener('resize', () => {
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
    });
    const clock = new THREE.Clock();
    (function loop() {
        requestAnimationFrame(loop);
        update(reduced ? 0 : clock.getElapsedTime());
        renderer.render(scene, camera);
    })();
}

/* Amas de sphères façon logo (section "Pourquoi nous choisir") */
const why = document.getElementById('why-3d');
if (why && window.WebGLRenderingContext) {
    makeScene(why, (scene, camera) => {
        camera.position.z = 7;
        scene.add(new THREE.AmbientLight(0x99aaff, 1.4));
        const light = new THREE.PointLight(0x4d8dff, 50, 40);
        light.position.set(5, 5, 5);
        scene.add(light);

        const group = new THREE.Group();
        const palette = [0x0d6efd, 0x4dc3ff, 0x9b6bff, 0x4dd4ac, 0xffc94d, 0xff6b6b, 0x6ea8ff];
        for (let i = 0; i < 14; i++) {
            const r = 0.35 + Math.random() * 0.55;
            const m = new THREE.Mesh(
                new THREE.IcosahedronGeometry(r, 2),
                new THREE.MeshStandardMaterial({ color: palette[i % palette.length], metalness: 0.5, roughness: 0.3, flatShading: true })
            );
            const a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI;
            const d = 1.2 + Math.random() * 1.6;
            m.position.set(Math.sin(b) * Math.cos(a) * d, Math.cos(b) * d, Math.sin(b) * Math.sin(a) * d);
            group.add(m);
        }
        scene.add(group);
        return (t) => {
            group.rotation.y = t * 0.25;
            group.rotation.x = Math.sin(t * 0.3) * 0.15;
        };
    });
}

/* Fond des en-têtes de pages internes */
const header = document.querySelector('.bg-header');
if (header && window.WebGLRenderingContext) {
    const holder = document.createElement('div');
    holder.className = 'header-3d';
    holder.setAttribute('aria-hidden', 'true');
    header.prepend(holder);
    makeScene(holder, (scene, camera) => {
        camera.position.z = 9;
        const wire = new THREE.Mesh(
            new THREE.IcosahedronGeometry(4.2, 2),
            new THREE.MeshBasicMaterial({ color: 0x8fb8ff, wireframe: true, transparent: true, opacity: 0.18 })
        );
        wire.position.x = 5;
        scene.add(wire);
        const n = 400, pos = new Float32Array(n * 3);
        for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 30;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xcfe2ff, size: 0.06, transparent: true, opacity: 0.6 }));
        scene.add(pts);
        return (t) => {
            wire.rotation.y = t * 0.1;
            wire.rotation.x = t * 0.05;
            pts.rotation.y = t * 0.02;
        };
    });
}
