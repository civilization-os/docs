<template>
  <div class="terminal-container">
    <!-- 后方发光渐变背景 -->
    <div class="terminal-glow"></div>
    
    <!-- 全屏烟花与鼠标拖尾 Canvas 画布 -->
    <teleport to="body">
      <canvas ref="canvasRef" class="fireworks-canvas"></canvas>
    </teleport>
    
    <div 
      class="terminal-window" 
      ref="terminalRef"
      @click="triggerClickFirework"
    >
      <!-- 终端头部控制栏 -->
      <div class="terminal-header">
        <div class="terminal-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">bash - civilization-os</div>
      </div>
      
      <!-- 终端内容区 -->
      <div class="terminal-body">
        <!-- 第一行：指令输入 -->
        <div class="terminal-line line-1">
          <span class="prompt">$</span>
          <span class="typed-text">{{ line1Text }}</span>
          <span v-if="activeLine === 1" class="cursor">|</span>
        </div>
        
        <!-- 第二行：注释/副标题 -->
        <div class="terminal-line line-2" v-if="activeLine >= 2">
          <span class="comment">// </span>
          <span class="typed-text">{{ line2Text }}</span>
          <span v-if="activeLine === 2" class="cursor">|</span>
        </div>
        
        <!-- 第三行：标志/提示 -->
        <div class="terminal-line line-3" v-if="activeLine >= 3">
          <span class="icon float">⚡</span>
          <span class="typed-text">{{ line3Text }}</span>
          <span v-if="activeLine === 3" class="cursor">|</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const line1Full = 'civilization-os'
const line2Full = 'Writes code. Occasionally manages servers.'
const line3Full = ' Keep it simple.'

const line1Text = ref('')
const line2Text = ref('')
const line3Text = ref('')
const activeLine = ref(1)

const canvasRef = ref(null)
const terminalRef = ref(null)
let ctx = null
let animationFrameId = null
const particles = []

// 烟花颜色板
const fireworkColors = [
  '#6366f1', // Indigo
  '#a855f7', // Purple
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#ec4899'  // Pink
]

// 粒子类
class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = Math.random() * 3.5 + 1.5
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 5 + 3
    this.vx = Math.cos(angle) * velocity
    this.vy = Math.sin(angle) * velocity
    this.alpha = 1
    this.decay = Math.random() * 0.012 + 0.008
    this.isStar = false // 是否渲染为星形拖尾粒子
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    
    if (this.isStar) {
      this.vy += 0.02 // 星尘受微弱重力影响
      this.vx *= 0.95 // 星尘减速更快
      this.vy *= 0.95
    } else {
      this.vy += 0.07 // 烟花受正常重力影响
      this.vx *= 0.985
      this.vy *= 0.985
    }
    
    this.alpha -= this.decay
  }

  draw(context) {
    context.save()
    context.globalAlpha = this.alpha
    context.fillStyle = this.color
    context.shadowBlur = this.isStar ? 6 : 8
    context.shadowColor = this.color
    
    if (this.isStar) {
      // 绘制四角星（星尘效果）
      context.beginPath()
      const r = this.radius * 1.5
      context.moveTo(this.x, this.y - r)
      context.lineTo(this.x + r * 0.25, this.y - r * 0.25)
      context.lineTo(this.x + r, this.y)
      context.lineTo(this.x + r * 0.25, this.y + r * 0.25)
      context.lineTo(this.x, this.y + r)
      context.lineTo(this.x - r * 0.25, this.y + r * 0.25)
      context.lineTo(this.x - r, this.y)
      context.lineTo(this.x - r * 0.25, this.y - r * 0.25)
      context.closePath()
      context.fill()
    } else {
      // 绘制圆（烟花效果）
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.fill()
    }
    context.restore()
  }
}

// 触发特定位置的烟花 (使用视口坐标)
const spawnFirework = (x, y) => {
  const count = 40 + Math.floor(Math.random() * 25)
  const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, color))
  }
}

// 点击终端触发烟花（直接使用 clientX/clientY 视口坐标）
const triggerClickFirework = (event) => {
  spawnFirework(event.clientX, event.clientY)
}

// 鼠标拖尾逻辑
let lastMouseX = 0
let lastMouseY = 0

const handleMouseMove = (event) => {
  const dist = Math.hypot(event.clientX - lastMouseX, event.clientY - lastMouseY)
  if (dist > 8) { // 鼠标移动一定距离才产生一个星尘
    lastMouseX = event.clientX
    lastMouseY = event.clientY
    
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
    const p = new Particle(event.clientX, event.clientY, color)
    p.isStar = true
    p.radius = Math.random() * 3 + 1.5
    p.vx = (Math.random() - 0.5) * 1.5
    p.vy = (Math.random() - 0.5) * 1.2 - 0.2
    p.decay = Math.random() * 0.02 + 0.022 // 衰减稍快，避免拖尾太长堆积
    particles.push(p)
  }
}

// 打字机逻辑
const typeText = async (textRef, fullText, speed = 50) => {
  for (let i = 0; i < fullText.length; i++) {
    textRef.value += fullText[i]
    await new Promise((resolve) => setTimeout(resolve, speed))
  }
}

// 画布尺寸调整为全屏窗口大小
const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

// Canvas 渲染循环
const renderLoop = () => {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.update()
    if (p.alpha <= 0) {
      particles.splice(i, 1)
    } else {
      p.draw(ctx)
    }
  }

  animationFrameId = requestAnimationFrame(renderLoop)
}

onMounted(async () => {
  // 设置 Canvas
  const canvas = canvasRef.value
  if (canvas) {
    ctx = canvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    renderLoop()
  }

  // 初始停顿
  await new Promise((resolve) => setTimeout(resolve, 400))
  
  // 第一行打字
  await typeText(line1Text, line1Full, 80)
  await new Promise((resolve) => setTimeout(resolve, 600))
  
  // 换到第二行
  activeLine.value = 2
  await typeText(line2Text, line2Full, 40)
  await new Promise((resolve) => setTimeout(resolve, 600))
  
  // 换到第三行
  activeLine.value = 3
  await typeText(line3Text, line3Full, 50)

  // 自动在终端区域中心燃放庆祝礼花
  if (canvas && terminalRef.value) {
    const rect = terminalRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    setTimeout(() => spawnFirework(centerX - 100, centerY), 100)
    setTimeout(() => spawnFirework(centerX + 100, centerY - 30), 450)
    setTimeout(() => spawnFirework(centerX, centerY + 20), 800)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.terminal-container {
  position: relative;
  max-width: 620px;
  margin: 40px auto;
  padding: 10px;
  z-index: 1;
}

/* 全屏烟花与拖尾画布样式 */
.fireworks-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none !important;
  z-index: 9999;
}

/* 后方霓虹发光特效 */
.terminal-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(168, 85, 247, 0.08) 50%,
    transparent 100%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.dark .terminal-glow {
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.25) 0%,
    rgba(168, 85, 247, 0.12) 50%,
    transparent 100%
  );
}

/* 终端主窗口毛玻璃效果 */
.terminal-window {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.03),
    0 1px 3px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dark .terminal-window {
  background: rgba(20, 20, 25, 0.75);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.terminal-window:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(99, 102, 241, 0.1),
    0 1px 10px rgba(0, 0, 0, 0.05);
}

.dark .terminal-window:hover {
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.4),
    0 1px 12px rgba(99, 102, 241, 0.15);
}

/* 终端头部栏 */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid var(--vp-c-divider);
  position: relative;
}

.dark .terminal-header {
  background: rgba(255, 255, 255, 0.02);
}

.terminal-dots {
  position: absolute;
  left: 16px;
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.terminal-title {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
  color: var(--vp-c-text-3);
  user-select: none;
}

/* 终端内容区 */
.terminal-body {
  padding: 24px;
  min-height: 150px;
  font-family: var(--vp-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

.terminal-line {
  line-height: 1.6;
  font-size: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
}

.line-1 {
  font-size: 24px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.line-2 {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.line-3 {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

/* 各类型字符颜色 */
.prompt {
  color: var(--vp-c-brand-1);
  margin-right: 12px;
  user-select: none;
}

.comment {
  color: #8e9aab;
  margin-right: 4px;
  user-select: none;
}

.dark .comment {
  color: #6b7280;
}

.icon {
  margin-right: 8px;
  user-select: none;
}

/* 光标闪烁动画 */
.cursor {
  display: inline-block;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  margin-left: 2px;
  animation: blink 0.9s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ⚡ 微动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.float {
  animation: float 2.5s ease-in-out infinite;
}

@media (max-width: 640px) {
  .line-1 {
    font-size: 20px;
  }
  .line-2 {
    font-size: 14px;
  }
  .terminal-body {
    padding: 16px;
    min-height: 130px;
  }
}
</style>
