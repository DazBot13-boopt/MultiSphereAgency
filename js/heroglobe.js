/**
 * MultiSphere Agency — Globe bleu du hero (Three.js, auto-hébergé)
 * Noyau + coque filaire + 5 sphères orbitales + particules. Fond de section hero.
 */
import * as THREE from "../lib/three/three.module.min.js";

const el = document.getElementById("hero-globe");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let hasWebGL = false;
try { hasWebGL = !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("webgl"); } catch (e) {}

if (el && hasWebGL) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b1e, 0.03);

    const camera = new THREE.PerspectiveCamera(52, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x2a3c66, 1.4));
    const key = new THREE.PointLight(0x4d8dff, 90, 60); key.position.set(8, 6, 8); scene.add(key);
    const cyan = new THREE.PointLight(0x38e1ff, 45, 50); cyan.position.set(-4, 7, 6); scene.add(cyan);
    const rim = new THREE.PointLight(0x1150c8, 40, 50); rim.position.set(-9, -5, -4); scene.add(rim);

    const world = new THREE.Group();
    world.position.x = 2.6;
    scene.add(world);

    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.8, 4),
        new THREE.MeshStandardMaterial({ color: 0x1150c8, metalness: 0.6, roughness: 0.22, flatShading: true, emissive: 0x0a1e52, emissiveIntensity: 0.5 })
    );
    world.add(core);

    const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.1, 2),
        new THREE.MeshBasicMaterial({ color: 0x6ea8ff, wireframe: true, transparent: true, opacity: 0.3 })
    );
    world.add(shell);

    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(2.6, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x38e1ff, transparent: true, opacity: 0.05, side: THREE.BackSide })
    );
    world.add(glow);

    const colors = [0x4dc3ff, 0x38e1ff, 0x6ea8ff, 0x4d8dff, 0x9bc4ff];
    const orbiters = colors.map(function (col, i) {
        const pivot = new THREE.Group();
        pivot.rotation.z = (i - 2) * 0.42;
        pivot.rotation.y = (i / colors.length) * Math.PI * 2;
        const dist = 3.4 + i * 0.72;
        const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.3 + (i % 2) * 0.16, 2),
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

    const starCount = 1000, pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) pos[i] = (Math.random() - 0.5) * 70;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x9fc0ff, size: 0.06, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    let tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) {
        tx = (e.clientX / window.innerWidth - 0.5);
        ty = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });

    function resize() {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize);

    let visible = true;
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.01 }).observe(el);

    const clock = new THREE.Clock();
    (function loop() {
        requestAnimationFrame(loop);
        if (!visible) return;
        const t = reduced ? 0 : clock.getElapsedTime();
        core.rotation.y = t * 0.14; core.rotation.x = t * 0.05;
        shell.rotation.y = -t * 0.1; shell.rotation.x = t * 0.06;
        orbiters.forEach(function (o) { o.pivot.rotation.y += o.speed * 0.008; o.mesh.rotation.y += 0.02; });
        stars.rotation.y = t * 0.006;
        world.rotation.y = tx * 0.4 + Math.sin(t * 0.1) * 0.05;
        world.rotation.x = ty * 0.3;
        camera.position.x += (tx * 1.2 - camera.position.x) * 0.04;
        camera.position.y += (-ty * 0.9 - camera.position.y) * 0.04;
        camera.lookAt(world.position.x * 0.4, 0, 0);
        renderer.render(scene, camera);
    })();
}
