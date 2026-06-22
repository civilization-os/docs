# Flink 流处理指南

Apache Flink 是一种开源的分布式流处理框架，专为在有界和无界数据流上进行状态计算设计。

---

## 知识大纲

1. **核心计算模型**
   - 流处理（Stream） vs 批处理（Batch）的模型统一
   - 时间窗口类型（Event Time, Processing Time, Ingestion Time）与 Watermark（水印）机制
2. **状态管理与容错**
   - 有状态计算（Stateful Computation）与其存储后端（RocksDB, Memory）
   - Checkpoint 与 Savepoint 容错方案（两阶段提交与 Chandy-Lamport 算法）
3. **反压机制**
   - 动态反压监测与基于 Credit 的流量控制
