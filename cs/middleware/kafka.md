# Kafka 消息队列指南

Apache Kafka 是一种高吞吐量、低延迟、可水平扩展的分布式消息订阅与分发系统。

---

## 知识大纲

1. **高吞吐设计底层原理**
   - 顺序读写与零拷贝（Zero-copy）技术
   - 页缓存（Page Cache）机制与批量发送
2. **架构与共识**
   - Producer, Broker, Consumer Group 架构模型
   - 分区与副本机制（ISR、HW、LEO 与 Controller 选举）
3. **消息传递保障**
   - 消息不丢失方案（幂等性与 Acks 配置）
   - 消息不重复与精确一次消费（Exactly Once）
