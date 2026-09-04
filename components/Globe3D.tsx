"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Points-on-sphere globe with arcs between hubs (Singapore core, China teachers, African learners). */
export default function Globe3D({ height = 420 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = el.clientWidth, h = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 0.4, 3.4);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group(); scene.add(group);
    // sphere point cloud
    const N = 2600, pos = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i; pos[i * 3] = Math.cos(th) * r; pos[i * 3 + 1] = y; pos[i * 3 + 2] = Math.sin(th) * r; }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9db1ff, size: 0.012, transparent: true, opacity: 0.75 }));
    group.add(pts);
    // faint sphere
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 48, 48), new THREE.MeshBasicMaterial({ color: 0x0c1330, transparent: true, opacity: 0.85 })));
    // grid lines
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.0, 18, 12)), new THREE.LineBasicMaterial({ color: 0x6c8cff, transparent: true, opacity: 0.08 }));
    group.add(wire);
    // hubs (lat, lon)
    const ll = (lat: number, lon: number, r = 1.01) => { const phi = (90 - lat) * Math.PI / 180, theta = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)); };
    const hubs: Array<[number, number, number]> = [[1.35, 103.8, 0xd4af5a], [34.7, 113.6, 0x9db1ff], [30.6, 114.3, 0x9db1ff], [6.5, 3.4, 0x3ed598], [9.06, 7.5, 0x3ed598], [-4.05, 39.67, 0x3ed598], [5.6, -0.2, 0x3ed598], [31.2, 121.5, 0x9db1ff]];
    for (const [la, lo, c] of hubs) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 12), new THREE.MeshBasicMaterial({ color: c })); m.position.copy(ll(la, lo)); group.add(m); const ring = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.045, 24), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .5, side: THREE.DoubleSide })); ring.position.copy(ll(la, lo, 1.012)); ring.lookAt(new THREE.Vector3(0, 0, 0)); group.add(ring); }
    const sg = ll(1.35, 103.8);
    const arcMats: THREE.LineBasicMaterial[] = [];
    for (const [la, lo, c] of hubs.slice(1)) {
      const a = ll(la, lo), pts2: THREE.Vector3[] = [];
      for (let i = 0; i <= 48; i++) { const tt = i / 48; const p = new THREE.Vector3().lerpVectors(sg, a, tt); const lift = 1 + Math.sin(Math.PI * tt) * 0.28 * sg.distanceTo(a); p.normalize().multiplyScalar(lift); pts2.push(p); }
      const mat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.55 }); arcMats.push(mat);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), mat));
    }
    group.rotation.x = 0.25; group.rotation.y = -1.2;
    let raf = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { const r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 0.4; ty = ((e.clientY - r.top) / r.height - .5) * 0.25; };
    el.addEventListener("mousemove", onMove);
    const clock = new THREE.Clock();
    const loop = () => {
      const dt = clock.getDelta(); const tm = clock.elapsedTime;
      if (!reduce) group.rotation.y += dt * 0.08;
      group.rotation.y += (tx - 0) * 0.002; group.rotation.x += (0.25 + ty - group.rotation.x) * 0.05;
      arcMats.forEach((m, i) => { m.opacity = 0.35 + 0.3 * Math.sin(tm * 1.3 + i); });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    const ro = new ResizeObserver(() => { const w2 = el.clientWidth, h2 = el.clientHeight; camera.aspect = w2 / h2; camera.updateProjectionMatrix(); renderer.setSize(w2, h2); });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); el.removeEventListener("mousemove", onMove); renderer.dispose(); el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ width: "100%", height }} aria-hidden="true" />;
}
