<template>
  <div class="sorting-diagram-container">
    <!-- 冒泡排序 -->
    <svg v-if="name === 'bubble'" class="sorting-diagram" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-default" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="var(--vp-c-brand-soft)" />
          <stop offset="100%" stop-color="var(--vp-c-brand-1)" />
        </linearGradient>
        <linearGradient id="grad-highlight" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.3)" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
        <linearGradient id="grad-swap" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(239, 44, 44, 0.3)" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
        <linearGradient id="grad-sorted" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      
      <!-- 步骤 1 -->
      <g transform="translate(10, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 1: 比较 5 与 3 (5 > 3, 交换)</text>
        <rect x="0" y="35" width="30" height="60" rx="4" fill="url(#grad-swap)" />
        <text x="15" y="70" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="38" y="35" width="30" height="40" rx="4" fill="url(#grad-swap)" />
        <text x="53" y="60" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="76" y="35" width="30" height="80" rx="4" fill="url(#grad-default)" />
        <text x="91" y="80" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-default)" />
        <text x="129" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">4</text>
        
        <path d="M 15 30 Q 34 15 53 30" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
      </g>

      <!-- 步骤 2 -->
      <g transform="translate(210, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 2: 比较 5 与 8 (5 &lt; 8, 不换)</text>
        <rect x="0" y="35" width="30" height="40" rx="4" fill="url(#grad-default)" />
        <text x="15" y="60" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-highlight)" />
        <text x="53" y="70" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="80" rx="4" fill="url(#grad-highlight)" />
        <text x="91" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-default)" />
        <text x="129" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">4</text>
      </g>

      <!-- 步骤 3 -->
      <g transform="translate(410, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 3: 比较 8 与 4 (8 > 4, 交换)</text>
        <rect x="0" y="35" width="30" height="40" rx="4" fill="url(#grad-default)" />
        <text x="15" y="60" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-default)" />
        <text x="53" y="70" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="80" rx="4" fill="url(#grad-swap)" />
        <text x="91" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-swap)" />
        <text x="129" y="65" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
        
        <path d="M 91 30 Q 110 15 129 30" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
      </g>
    </svg>

    <!-- 选择排序 -->
    <svg v-else-if="name === 'selection'" class="sorting-diagram" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-default-sel" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="var(--vp-c-brand-soft)" />
          <stop offset="100%" stop-color="var(--vp-c-brand-1)" />
        </linearGradient>
        <linearGradient id="grad-highlight-sel" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.3)" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
        <linearGradient id="grad-swap-sel" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(239, 44, 44, 0.3)" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
        <linearGradient id="grad-sorted-sel" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>

      <!-- 步骤 1 -->
      <g transform="translate(10, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 1: 扫描未排序区寻找最小值</text>
        <rect x="0" y="35" width="30" height="80" rx="4" fill="url(#grad-highlight-sel)" />
        <text x="15" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-default-sel)" />
        <text x="53" y="70" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="35" rx="4" fill="url(#grad-swap-sel)" />
        <text x="91" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-default-sel)" />
        <text x="129" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">4</text>
        <text x="91" y="130" fill="#f59e0b" font-size="10" text-anchor="middle">最小值 3</text>
      </g>

      <!-- 步骤 2 -->
      <g transform="translate(210, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 2: 交换首个元素与最小值</text>
        <rect x="0" y="35" width="30" height="80" rx="4" fill="url(#grad-swap-sel)" />
        <text x="15" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-default-sel)" />
        <text x="53" y="70" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="35" rx="4" fill="url(#grad-swap-sel)" />
        <text x="91" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-default-sel)" />
        <text x="129" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">4</text>
        
        <path d="M 15 30 Q 53 10 91 30" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
      </g>

      <!-- 步骤 3 -->
      <g transform="translate(410, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 3: 确定一个元素，进入下轮</text>
        <rect x="0" y="35" width="30" height="35" rx="4" fill="url(#grad-sorted-sel)" />
        <text x="15" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-default-sel)" />
        <text x="53" y="70" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="80" rx="4" fill="url(#grad-default-sel)" />
        <text x="91" y="80" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-default-sel)" />
        <text x="129" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">4</text>
        <text x="15" y="130" fill="#10b981" font-size="10" text-anchor="middle">已排序</text>
      </g>
    </svg>

    <!-- 插入排序 -->
    <svg v-else-if="name === 'insertion'" class="sorting-diagram" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-default-ins" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="var(--vp-c-brand-soft)" />
          <stop offset="100%" stop-color="var(--vp-c-brand-1)" />
        </linearGradient>
        <linearGradient id="grad-highlight-ins" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.3)" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
        <linearGradient id="grad-sorted-ins" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>

      <!-- 步骤 1 -->
      <g transform="translate(10, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 1: 提取未排序项 4，已排序为 [3,5,8]</text>
        <rect x="0" y="35" width="30" height="35" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="15" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="53" y="70" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="76" y="35" width="30" height="80" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="91" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="50" rx="4" fill="url(#grad-highlight-ins)" />
        <text x="129" y="65" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
        <text x="129" y="105" fill="#f59e0b" font-size="10" text-anchor="middle">key=4</text>
      </g>

      <!-- 步骤 2 -->
      <g transform="translate(210, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 2: 将大于 4 的元素 (8, 5) 后移</text>
        <rect x="0" y="35" width="30" height="35" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="15" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="var(--vp-c-brand-1)" stroke-dasharray="2,2" />
        <text x="53" y="70" fill="var(--vp-c-text-3)" text-anchor="middle">空</text>
        
        <rect x="76" y="35" width="30" height="60" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="91" y="70" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="114" y="35" width="30" height="80" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="129" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        
        <path d="M 91 30 Q 110 20 129 30" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="1.5" />
        <path d="M 53 30 Q 72 20 91 30" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="1.5" />
      </g>

      <!-- 步骤 3 -->
      <g transform="translate(410, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">步骤 3: 将 key=4 插入到空出的位置</text>
        <rect x="0" y="35" width="30" height="35" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="15" y="55" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="50" rx="4" fill="url(#grad-highlight-ins)" />
        <text x="53" y="65" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
        
        <rect x="76" y="35" width="30" height="60" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="91" y="70" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="114" y="35" width="30" height="80" rx="4" fill="url(#grad-sorted-ins)" />
        <text x="129" y="80" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
      </g>
    </svg>

    <!-- 归并排序 -->
    <svg v-else-if="name === 'merge'" class="sorting-diagram" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-sorted-mrg" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>

      <!-- 1. 分割阶段 -->
      <g transform="translate(10, 10)">
        <text x="80" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace" text-anchor="middle">1. 分割阶段 (Divide)</text>
        <rect x="30" y="35" width="100" height="30" rx="4" fill="rgba(99, 102, 241, 0.1)" stroke="var(--vp-c-brand-1)" />
        <text x="80" y="54" fill="var(--vp-c-text-1)" font-size="12" font-weight="bold" text-anchor="middle">[5, 3, 8, 4]</text>
        
        <path d="M 60 70 L 40 90" fill="none" stroke="var(--vp-c-divider)" stroke-width="1.5" />
        <path d="M 100 70 L 120 90" fill="none" stroke="var(--vp-c-divider)" stroke-width="1.5" />
        
        <rect x="5" y="95" width="60" height="25" rx="4" fill="rgba(99, 102, 241, 0.05)" stroke="var(--vp-c-divider)" />
        <text x="35" y="112" fill="var(--vp-c-text-2)" font-size="11" text-anchor="middle">[5, 3]</text>
        
        <rect x="95" y="95" width="60" height="25" rx="4" fill="rgba(99, 102, 241, 0.05)" stroke="var(--vp-c-divider)" />
        <text x="125" y="112" fill="var(--vp-c-text-2)" font-size="11" text-anchor="middle">[8, 4]</text>
      </g>

      <!-- 2. 局部排序 -->
      <g transform="translate(210, 10)">
        <text x="80" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace" text-anchor="middle">2. 局部排序 (Conquer)</text>
        <rect x="5" y="45" width="60" height="25" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" />
        <text x="35" y="62" fill="var(--vp-c-text-1)" font-size="11" text-anchor="middle">[3, 5]</text>
        
        <rect x="95" y="45" width="60" height="25" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" />
        <text x="125" y="62" fill="var(--vp-c-text-1)" font-size="11" text-anchor="middle">[4, 8]</text>
      </g>

      <!-- 3. 合并阶段 -->
      <g transform="translate(410, 10)">
        <text x="80" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace" text-anchor="middle">3. 合并阶段 (Merge)</text>
        <rect x="5" y="35" width="60" height="25" rx="4" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" />
        <text x="35" y="52" fill="var(--vp-c-text-3)" font-size="11" text-anchor="middle">[3, 5]</text>
        
        <rect x="95" y="35" width="60" height="25" rx="4" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" />
        <text x="125" y="52" fill="var(--vp-c-text-3)" font-size="11" text-anchor="middle">[4, 8]</text>
        
        <path d="M 40 65 L 60 85" fill="none" stroke="var(--vp-c-divider)" stroke-width="1.5" />
        <path d="M 120 65 L 100 85" fill="none" stroke="var(--vp-c-divider)" stroke-width="1.5" />
        
        <rect x="30" y="90" width="100" height="30" rx="4" fill="url(#grad-sorted-mrg)" />
        <text x="80" y="109" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">[3, 4, 5, 8]</text>
      </g>
    </svg>

    <!-- 快速排序 -->
    <svg v-else-if="name === 'quick'" class="sorting-diagram" viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-default-qck" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="var(--vp-c-brand-soft)" />
          <stop offset="100%" stop-color="var(--vp-c-brand-1)" />
        </linearGradient>
        <linearGradient id="grad-highlight-qck" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.3)" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
        <linearGradient id="grad-swap-qck" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(239, 44, 44, 0.3)" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
        <linearGradient id="grad-sorted-qck" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>

      <!-- 步骤 1 -->
      <g transform="translate(10, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">1. 选最右侧元素 4 为基准 (Pivot)</text>
        <rect x="0" y="35" width="30" height="70" rx="4" fill="url(#grad-default-qck)" />
        <text x="15" y="75" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="38" y="35" width="30" height="50" rx="4" fill="url(#grad-default-qck)" />
        <text x="53" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="76" y="35" width="30" height="90" rx="4" fill="url(#grad-default-qck)" />
        <text x="91" y="85" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="60" rx="4" fill="url(#grad-highlight-qck)" />
        <text x="129" y="70" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
        <text x="129" y="110" fill="#f59e0b" font-size="9" text-anchor="middle">Pivot</text>
      </g>

      <!-- 步骤 2 -->
      <g transform="translate(210, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">2. 比 4 小的放左边，比 4 大的放右边</text>
        <rect x="0" y="35" width="30" height="50" rx="4" fill="url(#grad-sorted-qck)" />
        <text x="15" y="65" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
        <text x="15" y="110" fill="#10b981" font-size="9" text-anchor="middle">&lt; Pivot</text>
        
        <rect x="45" y="35" width="30" height="70" rx="4" fill="url(#grad-swap-qck)" />
        <text x="60" y="75" fill="#fff" font-weight="bold" text-anchor="middle">5</text>
        
        <rect x="78" y="35" width="30" height="90" rx="4" fill="url(#grad-swap-qck)" />
        <text x="93" y="85" fill="#fff" font-weight="bold" text-anchor="middle">8</text>
        <text x="76" y="110" fill="#ef4444" font-size="9" text-anchor="middle">&gt; Pivot</text>
        
        <rect x="114" y="35" width="30" height="60" rx="4" fill="url(#grad-highlight-qck)" />
        <text x="129" y="70" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
      </g>

      <!-- 步骤 3 -->
      <g transform="translate(410, 10)">
        <text x="0" y="20" fill="var(--vp-c-text-2)" font-size="12" font-family="monospace">3. 插入基准值 4 到中间，完成分区</text>
        <rect x="0" y="35" width="30" height="50" rx="4" fill="url(#grad-default-qck)" />
        <text x="15" y="65" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">3</text>
        
        <rect x="38" y="35" width="30" height="60" rx="4" fill="url(#grad-sorted-qck)" />
        <text x="53" y="70" fill="#fff" font-weight="bold" text-anchor="middle">4</text>
        <text x="53" y="110" fill="#10b981" font-size="9" text-anchor="middle">已就位</text>
        
        <rect x="76" y="35" width="30" height="90" rx="4" fill="url(#grad-default-qck)" />
        <text x="91" y="85" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">8</text>
        
        <rect x="114" y="35" width="30" height="70" rx="4" fill="url(#grad-default-qck)" />
        <text x="129" y="75" fill="var(--vp-c-text-1)" font-weight="bold" text-anchor="middle">5</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.sorting-diagram-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.dark .sorting-diagram-container {
  background: rgba(255, 255, 255, 0.01);
}
.sorting-diagram {
  width: 100%;
  max-width: 600px;
}
</style>
