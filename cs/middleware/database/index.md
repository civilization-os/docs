# 数据库技术指南

本部分将探讨现代软件开发中最核心的数据存储与检索技术，涵盖关系型数据库（RDBMS）、非关系型缓存/键值存储（NoSQL）以及大规模场景下的分布式数据架构。

---

## 核心专题

<div class="card-group">
  <a href="/docs/cs/middleware/database/mysql" class="card">
    <div class="card-icon">🐬</div>
    <div class="card-title">MySQL 核心原理</div>
    <div class="card-desc">InnoDB B+树、事务、MVCC与日志系统</div>
  </a>
  <a href="/docs/cs/middleware/database/redis" class="card">
    <div class="card-icon">⚡</div>
    <div class="card-title">Redis 缓存技术</div>
    <div class="card-desc">数据结构、高性能模型及集群高可用</div>
  </a>
  <a href="/docs/cs/middleware/database/distributed" class="card">
    <div class="card-icon">🌐</div>
    <div class="card-title">分布式存储</div>
    <div class="card-desc">分库分表、分布式ID与数据一致性</div>
  </a>
</div>

---

## 知识大纲

1. **MySQL 核心原理**
   - 存储引擎（InnoDB 底层 B+ 树索引结构与优化）
   - 事务机制（ACID 属性、并发控制与 MVCC 实现）
   - 日志系统（Binlog、Redo Log 与 Undo Log 的协同工作）
2. **Redis 缓存与内存存储**
   - 核心数据结构（String、Hash、List、Set、ZSet 等底层实现）
   - 高并发模型（单线程多路复用设计及演进）
   - 分布式高可用（哨兵监控与 Redis Cluster 槽分片机制）
3. **分布式数据存储**
   - 水平拆分架构（分库分表、分片键设计与跨节点查询）
   - 分布式唯一 ID（Snowflake 雪花算法及其他生成方案）
