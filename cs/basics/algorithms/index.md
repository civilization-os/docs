# 算法与数据结构

欢迎来到**算法与数据结构**学习模块。

在这里，我们将由浅入深地探讨计算机科学中的经典算法设计思想以及底层的数据存储结构，帮助你构建扎实的计算理论基础。

---

## 知识体系脑图

以下是本模块所涵盖的完整知识体系大纲，鼠标悬停于节点上可触发动态发光效果：

<div class="mindmap-wrapper" style="overflow-x: auto; margin: 24px 0;">
<svg viewBox="0 0 800 420" width="100%" xmlns="http://www.w3.org/2000/svg" style="background: var(--vp-c-bg-soft); border-radius: 16px; padding: 16px; border: 1px solid var(--vp-c-divider); min-width: 720px; transition: all 0.3s ease;">
<defs>
<linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#6366f1" />
<stop offset="100%" stop-color="#a855f7" />
</linearGradient>
<linearGradient id="branch1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#a855f7" />
<stop offset="100%" stop-color="#ec4899" />
</linearGradient>
<linearGradient id="branch2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#6366f1" />
<stop offset="100%" stop-color="#06b6d4" />
</linearGradient>
<linearGradient id="branch3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#10b981" />
<stop offset="100%" stop-color="#3b82f6" />
</linearGradient>
</defs>
<path d="M 400,200 C 490,200 490,120 580,120" class="mindmap-link" />
<path d="M 580,120 C 645,120 645,80 710,80" class="mindmap-link link-secondary" />
<path d="M 580,120 C 645,120 645,160 710,160" class="mindmap-link link-secondary" />
<path d="M 400,200 C 310,200 310,140 220,140" class="mindmap-link" />
<path d="M 220,140 C 155,140 155,90 90,90" class="mindmap-link link-secondary" />
<path d="M 220,140 C 155,140 155,180 90,180" class="mindmap-link link-secondary" />
<path d="M 400,200 C 400,270 400,270 400,310" class="mindmap-link" />
<path d="M 400,310 C 330,310 330,360 270,360" class="mindmap-link link-secondary" />
<path d="M 400,310 C 470,310 470,360 530,360" class="mindmap-link link-secondary" />
<g class="mindmap-node" style="transform-origin: 400px 200px;">
<rect x="310" y="177" width="180" height="46" rx="23" ry="23" fill="url(#rootGrad)" />
<text x="400" y="200" class="text-title" font-size="16">算法与数据结构</text>
</g>
<g class="mindmap-node" style="transform-origin: 580px 120px;">
<rect x="525" y="102" width="110" height="36" rx="18" ry="18" fill="url(#branch1Grad)" />
<text x="580" y="120" class="text-branch" font-size="13">排序算法</text>
</g>
<g class="mindmap-node" style="transform-origin: 710px 80px;">
<rect x="655" y="65" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="710" y="80" class="text-sub">冒泡 / 选择 / 插入</text>
</g>
<g class="mindmap-node" style="transform-origin: 710px 160px;">
<rect x="655" y="145" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="710" y="160" class="text-sub">快速 / 归并 / 堆</text>
</g>
<g class="mindmap-node" style="transform-origin: 220px 140px;">
<rect x="165" y="122" width="110" height="36" rx="18" ry="18" fill="url(#branch2Grad)" />
<text x="220" y="140" class="text-branch" font-size="13">数据结构</text>
</g>
<g class="mindmap-node" style="transform-origin: 90px 90px;">
<rect x="35" y="75" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="90" y="90" class="text-sub">链表 / 栈 / 队列</text>
</g>
<g class="mindmap-node" style="transform-origin: 90px 180px;">
<rect x="35" y="165" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="90" y="180" class="text-sub">二叉树 / 红黑树 / 图</text>
</g>
<g class="mindmap-node" style="transform-origin: 400px 310px;">
<rect x="345" y="292" width="110" height="36" rx="18" ry="18" fill="url(#branch3Grad)" />
<text x="400" y="310" class="text-branch" font-size="13">算法思想</text>
</g>
<g class="mindmap-node" style="transform-origin: 270px 360px;">
<rect x="215" y="345" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="270" y="360" class="text-sub">动态规划 (DP)</text>
</g>
<g class="mindmap-node" style="transform-origin: 530px 360px;">
<rect x="475" y="345" width="110" height="30" rx="8" ry="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5" />
<text x="530" y="360" class="text-sub">分治 / 递归 / 贪心</text>
</g>
</svg>
</div>

---

## 学习大纲

本模块将按照以下章节逐步展开：

1. **[第一章：排序算法](./sorting.md)**
   - 学习冒泡、选择、插入、快速、归并等经典排序的实现与复杂度分析。
2. **第二章：基础数据结构**（即将推出）
   - 数组、链表、栈与队列的底层原理 and 应用场景。
3. **第三章：树与图论**（即将推出）
   - 二叉树、红黑树、DFS/BFS 遍历以及最短路径算法。
4. **第四章：算法设计范式**（即将推出）
   - 深入理解递归、贪心、分治、动态规划（DP）等核心算法思想。

---

::: tip 学习建议
在学习算法时，不仅要理解其逻辑步骤，更建议动手在控制台亲自编写并调试代码，结合时间与空间复杂度公式，理解其背后的权衡（Trade-offs）。
:::
