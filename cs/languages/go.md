# Go 语言指南

Go（又称 Golang）是由 Google 开发的一种静态强类型、编译型语言，专为并发和高性能网络服务设计。

---

## 知识大纲

1. **并发调度模型 (GMP)**
   - Goroutine (协程)、Machine (线程)、Processor (逻辑处理器) 调度模型
   - Channel (通道) 底层数据结构与同步原理
2. **内存管理**
   - 内存分配机制（基于 tcmalloc 的三级分配）
   - 垃圾回收机制（三色标记法与写屏障）
3. **语言核心特性**
   - Defer、Panic 与 Recover 的执行时机
   - Slice 与 Map 的底层实现及扩容逻辑
