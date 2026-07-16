/**
 * MultiSphere Agency — Scènes 3D (Three.js, auto-hébergé)
 *  #scene    : hero — noyau + 5 sphères orbitales (les 5 pôles) + particules
 *  #about-3d : amas de sphères façon logo
 *  #page-3d  : sphère filaire + particules (en-têtes de pages)
 */
import * as THREE from "../lib/three/three.module.min.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasWebGL = (function () {
    try { return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("webgl"); }
    catch (e) { return false; }
})();

const POLE_COLORS = [0xff7a52, 0x4dd4ac, 0xffc94d, 0x9b7bff, 0x38e1ff];

function mount(el, build, camZ) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, camZ);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const update = build(scene, camera);

    const ro = new ResizeObserver(function () {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    });
    ro.observe(el);

    // Ne tourne que si visible (économie CPU/batterie)
    let visible = true;
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.01 }).observe(el);

    const clock = new THREE.Clock();
    (function loop() {
        requestAnimationFrame(loop);
        if (!visible) return;
        update(reduced ? 0 : clock.getElapsedTime(), clock.getDelta());
        renderer.render(scene, camera);
    })();
}

function starfield(count, spread, size, color, opacity) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity }));
}

/* ---------- HERO ---------- */
const heroEl = document.getElementById("scene");
if (heroEl && hasWebGL) {
    mount(heroEl, function (scene, camera) {
        scene.fog = new THREE.FogExp2(0x070a14, 0.028);
        scene.add(new THREE.AmbientLight(0x2a3c66, 1.4));
        const key = new THREE.PointLight(0x4d8dff, 90, 60); key.position.set(8, 6, 8); scene.add(key);
        const rim = new THREE.PointLight(0xff7a52, 40, 50); rim.position.set(-9, -5, -4); scene.add(rim);
        const cyan = new THREE.PointLight(0x38e1ff, 45, 50); cyan.position.set(-4, 7, 6); scene.add(cyan);

        const world = new THREE.Group();
        world.position.x = 2.4;
        scene.add(world);

        const core = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.75, 4),
            new THREE.MeshStandardMaterial({ color: 0x1150c8, metalness: 0.6, roughness: 0.22, flatShading: true, emissive: 0x0a1e52, emissiveIntensity: 0.5 })
        );
        world.add(core);
        const shell = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2.05, 2),
            new THREE.MeshBasicMaterial({ color: 0x6ea8ff, wireframe: true, transparent: true, opacity: 0.28 })
        );
        world.add(shell);
        const glow = new THREE.Mesh(
            new THREE.SphereGeometry(2.5, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x38e1ff, transparent: true, opacity: 0.05, side: THREE.BackSide })
        );
        world.add(glow);

        const orbiters = POLE_COLORS.map(function (col, i) {
            const pivot = new THREE.Group();
            pivot.rotation.z = (i - 2) * 0.42;
            pivot.rotation.y = (i / POLE_COLORS.length) * Math.PI * 2;
            const dist = 3.3 + i * 0.72;
            const mesh = new THREE.Mesh(
                new THREE.IcosahedronGeometry(0.32 + (i % 2) * 0.16, 2),
                new THREE.MeshStandardMaterial({ color: col, metalness: 0.5, roughness: 0.3, flatShading: true, emissive: col, emissiveIntensity: 0.15 })
            );
            mesh.position.x = dist;
            pivot.add(mesh);
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(dist, 0.006, 8, 160),
                new THREE.MeshBasicMaterial({ color: 0x6ea8ff, transparent: true, opacity: 0.14 })
            );
            pivot.add(ring);
            world.add(pivot);
            return { pivot, mesh, speed: 0.5 - i * 0.06 };
        });

        const stars = starfield(1100, 70, 0.06, 0x9fc0ff, 0.7);
        scene.add(stars);

        let tx = 0, ty = 0;
        window.addEventListener("pointermove", function (e) {
            tx = (e.clientX / window.innerWidth - 0.5);
            ty = (e.clientY / window.innerHeight - 0.5);
        }, { passive: true });

        return function (t) {
            core.rotation.y = t * 0.14; core.rotation.x = t * 0.05;
            shell.rotation.y = -t * 0.1; shell.rotation.x = t * 0.06;
            orbiters.forEach(function (o) { o.pivot.rotation.y += o.speed * 0.008; o.mesh.rotation.y += 0.02; });
            stars.rotation.y = t * 0.006;
            world.rotation.y = tx * 0.4 + Math.sin(t * 0.1) * 0.05;
            world.rotation.x = ty * 0.3;
            camera.position.x += (tx * 1.2 - camera.position.x) * 0.04;
            camera.position.y += (-ty * 0.9 - camera.position.y) * 0.04;
            camera.lookAt(world.position.x * 0.4, 0, 0);
        };
    }, 12);
}

/* ---------- ABOUT : amas de sphères ---------- */
const aboutEl = document.getElementById("about-3d");
if (aboutEl && hasWebGL) {
    mount(aboutEl, function (scene) {
        scene.add(new THREE.AmbientLight(0x8fa8ff, 1.5));
        const l = new THREE.PointLight(0x4d8dff, 60, 40); l.position.set(5, 5, 6); scene.add(l);
        const l2 = new THREE.PointLight(0x38e1ff, 30, 40); l2.position.set(-5, -3, 4); scene.add(l2);
        const group = new THREE.Group();
        const palette = [0x1150c8, 0x4d8dff, 0x38e1ff, 0x9b7bff, 0x4dd4ac, 0xffc94d, 0xff7a52];
        for (let i = 0; i < 16; i++) {
            const r = 0.32 + Math.random() * 0.5;
            const m = new THREE.Mesh(
                new THREE.IcosahedronGeometry(r, 2),
                new THREE.MeshStandardMaterial({ color: palette[i % palette.length], metalness: 0.5, roughness: 0.28, flatShading: true })
            );
            const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), d = 1 + Math.random() * 1.7;
            m.position.set(Math.sin(b) * Math.cos(a) * d, Math.cos(b) * d, Math.sin(b) * Math.sin(a) * d);
            group.add(m);
        }
        scene.add(group);
        return function (t) { group.rotation.y = t * 0.28; group.rotation.x = Math.sin(t * 0.3) * 0.16; };
    }, 7);
}

/* ---------- PAGE HEADER ---------- */
const pageEl = document.getElementById("page-3d");
if (pageEl && hasWebGL) {
    mount(pageEl, function (scene, camera) {
        const wire = new THREE.Mesh(
            new THREE.IcosahedronGeometry(4.4, 3),
            new THREE.MeshBasicMaterial({ color: 0x6ea8ff, wireframe: true, transparent: true, opacity: 0.2 })
        );
        wire.position.set(5.5, 0, 0);
        scene.add(wire);
        const core = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.5, 2),
            new THREE.MeshBasicMaterial({ color: 0x38e1ff, wireframe: true, transparent: true, opacity: 0.15 })
        );
        core.position.copy(wire.position);
        scene.add(core);
        const stars = starfield(500, 34, 0.06, 0xcfe2ff, 0.55);
        scene.add(stars);
        return function (t) {
            wire.rotation.y = t * 0.1; wire.rotation.x = t * 0.05;
            core.rotation.y = -t * 0.16;
            stars.rotation.y = t * 0.02;
        };
    }, 9);
}
