'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 首屏 3D 火麒麟（自写 three.js 渲染，零外部依赖）。
 *
 * 为什么不用 model-viewer：
 * 它内部硬依赖 www.gstatic.com（basis 环境图 + Draco 解码器）和 cdn.jsdelivr.net，
 * 国内基本连不上——上一版就是因此白屏。而且无法验证、无从排查。
 * 这里改用 three.js 直接写：只用GLTFLoader（纯 JS 解 glTF，不走 Draco），
 * 灯光、材质、轨道控制全部自控，行为完全可预期。
 *
 * 约束（design-spec.md 七、十）：
 * - 静态站output:'export'，模型在 public/ 走裸绝对路径，要手拼 basePath
 * - aria-hidden：纯装饰，不进无障碍树
 * - 鼠标值不��� React state（自己维护坐标，直接写 transform）
 * - prefers-reduced-motion 下停自转，只保留手动拖
 */
export default function QilinPet() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = host.current
    if (!el) return

    let disposed = false
    let cleanup = () => {}

    // 动态 import：three 是 ESM 且不参与 Next 打包，按需从 public/ 加载
    ;(async () => {
      try {
        const THREE: any = await import(/* webpackIgnore: true */ `${base}/three.module.min.js`)
        if (disposed) return
        const { GLTFLoader } = await import(
          /* webpackIgnore: true */ `${base}/gltf-loader.js` as any
        )
        if (disposed || !GLTFLoader) {
          setFailed(true)
          return
        }

        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // ---------- 场景 ----------
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
        camera.position.set(0, 0.15, 2.6)

        let renderer: any
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        } catch {
          setFailed(true)
          return
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        el.appendChild(renderer.domElement)
        const canvas = renderer.domElement
        canvas.style.display = 'block'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.cursor = 'grab'
        canvas.style.touchAction = 'none'

        // ---------- 灯光：三点布光 + 底部暖光，强化"火焰"质感 ----------
        scene.add(new THREE.AmbientLight(0xfff2e0, 0.9))
        const key = new THREE.DirectionalLight(0xfff4e6, 2.1)
        key.position.set(2, 3, 2)
        scene.add(key)
        const rim = new THREE.DirectionalLight(0xffb066, 1.5)
        rim.position.set(-2, 1.2, -1.6)
        scene.add(rim)
        const fill = new THREE.DirectionalLight(0xffd9a0, 0.8)
        fill.position.set(0, -1.5, 1.5)
        scene.add(fill)

        // ---------- 模型 ----------
        const pivot = new THREE.Group()
        scene.add(pivot)

        new GLTFLoader().load(
          `${base}/fire-qilin.glb`,
          (gltf: any) => {
            if (disposed) return
            const model = gltf.scene

            // 自动缩放到固定视觉尺寸，与模型原始单位无关
            const box = new THREE.Box3().setFromObject(model)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z) || 1
            const s = 1.55 / maxDim
            model.scale.setScalar(s)

            // 居中，并把底部对齐到原点，旋转时不会飘
            const box2 = new THREE.Box3().setFromObject(model)
            const c = box2.getCenter(new THREE.Vector3())
            model.position.sub(new THREE.Vector3(c.x, box2.min.y + (size.y * s) / 2, c.z))

            // 让自转轴竖直：把模型最长轴压成Y 轴朝向
            pivot.add(model)
            setReady(true)
          },
          undefined,
          () => !disposed && setFailed(true)
        )

        // ---------- 交互：拖动旋转 + 滚轮缩放 ----------
        let rotY = 0.4
        let rotX = 0.12
        let dragging = false
        let lastX = 0
        let lastY = 0
        let zoom = 2.6
        let vel = 0

        const down = (e: PointerEvent) => {
          dragging = true
          lastX = e.clientX
          lastY = e.clientY
          canvas.style.cursor = 'grabbing'
          canvas.setPointerCapture(e.pointerId)
          el.classList.add('is-grabbing')
        }
        const move = (e: PointerEvent) => {
          if (!dragging) return
          const dx = e.clientX - lastX
          const dy = e.clientY - lastY
          lastX = e.clientX
          lastY = e.clientY
          rotY += dx * 0.011
          rotX = Math.max(-0.5, Math.min(0.6, rotX + dy * 0.008))
          vel = dx * 0.011
        }
        const up = (e: PointerEvent) => {
          dragging = false
          canvas.style.cursor = 'grab'
          el.classList.remove('is-grabbing')
          if (canvas.hasPointerCapture?.(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId)
          }
        }
        const wheel = (e: WheelEvent) => {
          e.preventDefault()
          zoom = Math.max(1.5, Math.min(4.2, zoom + e.deltaY * 0.0022))
        }

        canvas.addEventListener('pointerdown', down)
        canvas.addEventListener('pointermove', move)
        canvas.addEventListener('pointerup', up)
        canvas.addEventListener('pointercancel', up)
        canvas.addEventListener('wheel', wheel, { passive: false })

        // ---------- 尺寸 ----------
        const resize = () => {
          const w = el.clientWidth || 1
          const h = el.clientHeight || 1
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(el)

        // ---------- 渲染循环 ----------
        let raf = 0
        const loop = () => {
          raf = requestAnimationFrame(loop)
          if (!dragging && !calm) {
            // 松手后带一点惯性，再叠加极慢的自转
            vel *= 0.94
            rotY += vel + 0.0022
          }
          pivot.rotation.y = rotY
          pivot.rotation.x = rotX
          camera.position.z += (zoom - camera.position.z) * 0.12
          camera.position.y = 0.15 * (camera.position.z / 2.6)
          renderer.render(scene, camera)
        }
        loop()

        cleanup = () => {
          cancelAnimationFrame(raf)
          ro.disconnect()
          canvas.removeEventListener('pointerdown', down)
          canvas.removeEventListener('pointermove', move)
          canvas.removeEventListener('pointerup', up)
          canvas.removeEventListener('pointercancel', up)
          canvas.removeEventListener('wheel', wheel)
          renderer.dispose()
          if (canvas.parentNode === el) el.removeChild(canvas)
        }
      } catch {
        if (!disposed) setFailed(true)
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [base])

  return (
    <div
      ref={host}
      className={`pet3d${ready ? ' is-ready' : ''}`}
      aria-hidden="true"
    >
      {!failed && (
        <span className="pet3d-tip">
          {ready ? '拖动转一转' : '正在唤醒…'}
        </span>
      )}
      {failed && <span className="pet3d-tip is-off">3D 模型加载失败</span>}
    </div>
  )
}