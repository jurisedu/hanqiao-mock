"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { kps, edges, statusColor } from "@/lib/data";

/* 3D knowledge constellation: nodes coloured by calibrated mastery, sized by evidence, edges = curriculum relations. Drag to rotate, wheel to zoom. */
export default function Constellation3D({ height = 420, onPick }: { height?: number; onPick?: (id: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100); camera.position.set(0, 0.6, 6.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(w, h); el.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);
    // layout: group by cluster around ring, jitter in 3D
    const groups = Array.from(new Set(kps.map((k) => k.group)));
    const posOf: Record<string, THREE.Vector3> = {};
    kps.forEach((k, i) => {
      const gi = groups.indexOf(k.group), a = (gi / groups.length) * Math.PI * 2, r = 1.9;
      const j = i * 0.7;
      posOf[k.id] = new THREE.Vector3(Math.cos(a) * r + Math.sin(j) * 0.55, Math.sin(j * 1.3) * 0.9, Math.sin(a) * r + Math.cos(j) * 0.55);
    });
    const meshes: THREE.Mesh[] = [];
    for (const k of kps) {
      const color = new THREE.Color(statusColor[k.status]);
      const size = 0.08 + Math.min(k.n, 14) * 0.012;
      const m = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 20), new THREE.MeshBasicMaterial({ color }));
      m.position.copy(posOf[k.id]); m.userData = { id: k.id }; group.add(m); meshes.push(m);
      const halo = new THREE.Mesh(new THREE.SphereGeometry(size * 1.9, 16, 16), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: k.status === "weak" ? 0.22 : 0.08 }));
      halo.position.copy(posOf[k.id]); halo.userData = { pulse: k.status === "weak" }; group.add(halo);
      // label sprite
      const c = document.createElement("canvas"); c.width = 256; c.height = 64; const ctx = c.getContext("2d")!;
      ctx.font = "bold 30px 'Noto Sans SC', 'PingFang SC', sans-serif"; ctx.fillStyle = "#e9edf8"; ctx.textAlign = "center"; ctx.fillText(k.han, 128, 42);
      const tex = new THREE.CanvasTexture(c); const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.95 }));
      sp.scale.set(0.9, 0.22, 1); sp.position.copy(posOf[k.id]).add(new THREE.Vector3(0, size + 0.18, 0)); group.add(sp);
    }
    for (const [a, b] of edges) {
      const geo = new THREE.BufferGeometry().setFromPoints([posOf[a], posOf[b]]);
      group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x6c8cff, transparent: true, opacity: 0.35 })));
    }
    // hub
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), new THREE.MeshBasicMaterial({ color: 0xd4af5a })); group.add(hub);
    for (const k of kps) group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), posOf[k.id]]), new THREE.LineBasicMaterial({ color: 0xd4af5a, transparent: true, opacity: 0.08 })));
    const stars = new THREE.BufferGeometry(); const sp = new Float32Array(600 * 3); for (let i = 0; i < 600 * 3; i++) sp[i] = (Math.random() - .5) * 16; stars.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    scene.add(new THREE.Points(stars, new THREE.PointsMaterial({ color: 0x5a6386, size: 0.02, transparent: true, opacity: .6 })));

    let drag = false, lx = 0, ly = 0, vy = 0.003, rx = 0.15, ry = 0, raf = 0;
    const ray = new THREE.Raycaster(); const mouse = new THREE.Vector2();
    const down = (e: PointerEvent) => { drag = true; lx = e.clientX; ly = e.clientY; };
    const up = (e: PointerEvent) => { drag = false; if (onPick) { const r = el.getBoundingClientRect(); mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(mouse, camera); const hit = ray.intersectObjects(meshes)[0]; onPick(hit ? (hit.object.userData.id as string) : null); } };
    const move = (e: PointerEvent) => { if (!drag) return; ry += (e.clientX - lx) * 0.006; rx += (e.clientY - ly) * 0.004; lx = e.clientX; ly = e.clientY; vy = 0; };
    const wheel = (e: WheelEvent) => { e.preventDefault(); camera.position.z = Math.max(3.5, Math.min(10, camera.position.z + e.deltaY * 0.004)); };
    el.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); window.addEventListener("pointermove", move); el.addEventListener("wheel", wheel, { passive: false });
    const clock = new THREE.Clock();
    const loop = () => { const tm = clock.getElapsedTime(); if (!drag) ry += vy; group.rotation.set(rx, ry, 0); group.children.forEach((c) => { if ((c as THREE.Mesh).userData?.pulse) { const s = 1 + Math.sin(tm * 3) * 0.2; c.scale.set(s, s, s); } }); renderer.render(scene, camera); raf = requestAnimationFrame(loop); };
    loop();
    const ro = new ResizeObserver(() => { const w2 = el.clientWidth, h2 = el.clientHeight; camera.aspect = w2 / h2; camera.updateProjectionMatrix(); renderer.setSize(w2, h2); }); ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); el.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointermove", move); el.removeEventListener("wheel", wheel); renderer.dispose(); el.innerHTML = ""; };
  }, [onPick]);
  return <div ref={ref} style={{ width: "100%", height, cursor: "grab", borderRadius: 14, overflow: "hidden" }} />;
}
