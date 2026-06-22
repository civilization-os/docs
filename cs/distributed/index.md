# 分布式理论指南

分布式系统（Distributed System）是由多台计算机组成的系统，它们通过网络进行通信和协调，以实现共同的目标。

---

## 知识大纲

1. **核心定理与法则**
   - CAP 定理（Consistency, Availability, Partition tolerance）与 Base 理论
   - FLP 不可能性定理（异步网络中单个失效节点无法达成共识）
2. **共识算法 (Consensus Algorithms)**
   - Paxos 共识协议族（Basic Paxos, Multi-Paxos）
   - Raft 一致性算法（领袖选举、日志复制、安全性保障）
3. **分布式系统设计难题**
   - 分布式事务（2PC, 3PC, TCC, SAGA 模式）
   - 分布式锁设计与评估（Redis Redlock, ZooKeeper 临时顺序节点）
   - 分布式时钟（逻辑时钟 Lamport Vector Clock, TrueTime 硬件时钟）
