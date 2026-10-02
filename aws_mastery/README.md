# 30-Day AWS Mastery Plan

For an engineer with 4–5 years of experience. The [architecture track](../aws_architecture/README.md) taught you to draw the boxes. This track goes inside each box: how the service works, its limits, how it fails, what it costs and how to debug it.

One topic per day, in sequence. Every AWS service you are expected to know at this level appears on at least one day.

**Daily routine (60–90 min)**

1. Read the day's page and work through its diagram and simulators (30 min)
2. Do the hands-on lab in a sandbox account, with the CLI or Terraform (30 min)
3. Answer the "check yourself" question out loud, as you would in an interview (10 min)
4. Write three lines in `day-XX/notes.md`: one thing that surprised you, one limit to remember, one mistake to avoid (5 min)

**What every day covers**

- How it works inside, not only what it does
- The numbers to remember: limits, quotas, timeouts
- How it fails in production, and how you find out
- What drives the bill
- When to choose it, and when to choose something else
- Questions a senior interviewer asks about it

---

## Week 1 — Identity, Networking, Compute, Storage

| Day | Topic | Services and concepts | Check yourself |
|-----|-------|-----------------------|----------------|
| 1 | **IAM in depth** | Policy evaluation logic, identity vs resource policies, permission boundaries, session policies, STS and role assumption, cross-account access, ABAC with tags, IAM Access Analyzer, IAM Identity Center | A request is denied. In what order do you check SCP, boundary, identity policy and resource policy? |
| 2 | **VPC internals** | IP planning, secondary CIDRs, IPv6 and dual-stack, ENIs, route priority, prefix lists, security group references, NAT vs egress-only gateway, Network Firewall, Gateway Load Balancer, Reachability Analyzer, Flow Logs analysis | An instance cannot reach the internet. List the six things you check, in order. |
| 3 | **Networking at scale** | Transit Gateway route tables and segmentation, Direct Connect (VIFs, LAG, DX gateway), VPN with BGP, Route 53 Resolver endpoints, shared VPC with RAM, PrivateLink, VPC Lattice, Cloud WAN | How do you stop the dev VPC from reaching prod when both attach to the same Transit Gateway? |
| 4 | **EC2 in depth** | Instance families, Nitro, Graviton, placement groups, AMIs and Image Builder, IMDSv2, user data, EBS types (gp3, io2, st1), snapshots, instance store, Systems Manager (Session Manager, Patch Manager, Run Command) | gp3 or io2 for a busy database, and how do you know when you have outgrown it? |
| 5 | **Load balancing and Auto Scaling** | ALB vs NLB vs GWLB, listener rules, target types, health checks, cross-zone, deregistration delay, TLS and SNI, target tracking / step / predictive scaling, warm pools, lifecycle hooks, mixed instances, instance refresh, Global Accelerator | A deploy causes 502 errors for 30 seconds. Which settings are involved? |
| 6 | **S3 and storage** | Storage classes, lifecycle, versioning, replication, Object Lock, bucket policy vs ACL vs Access Points, Block Public Access, encryption options, multipart upload, presigned URLs, event notifications, EFS, FSx, Storage Gateway, DataSync, AWS Backup | A bucket policy allows access but the request is still denied. Name four possible reasons. |
| 7 | **Review: troubleshooting lab** | Ten broken setups from Days 1–6: find the fault from the symptoms | Can you find each fault in under five minutes? |

## Week 2 — Databases, Messaging, Serverless, Containers

| Day | Topic | Services and concepts | Check yourself |
|-----|-------|-----------------------|----------------|
| 8 | **RDS and Aurora in depth** | Multi-AZ instance vs Multi-AZ cluster, read replicas, Aurora storage layer, Aurora Serverless v2, Global Database, RDS Proxy, backups and point-in-time restore, parameter groups, Performance Insights, blue/green deployments, DMS | What actually happens, second by second, during a Multi-AZ failover? |
| 9 | **DynamoDB in depth** | Partition and sort keys, single-table design, GSI vs LSI, on-demand vs provisioned, hot partitions, transactions, conditional writes, Streams, TTL, DAX, global tables, consistency | Design the keys for “orders by customer” and “orders by status” in one table. |
| 10 | **Caching and purpose-built databases** | ElastiCache (Redis/Valkey vs Memcached, cluster mode, eviction, lazy loading vs write-through), MemoryDB, OpenSearch, DocumentDB, Neptune, Keyspaces, Timestream, Redshift | The cache node restarts and the database falls over. Why, and how do you prevent it? |
| 11 | **Messaging and orchestration** | SQS (standard vs FIFO, visibility timeout, long polling, DLQ and redrive), SNS filter policies, EventBridge (buses, rules, Pipes, Scheduler), Step Functions (standard vs express, retries, saga), Amazon MQ, Kinesis vs MSK, AppSync | A message is processed twice. Is that a bug? How do you make the consumer safe? |
| 12 | **Lambda and API Gateway in depth** | Execution model, cold starts, reserved and provisioned concurrency, event source mappings, VPC access, layers, SnapStart, destinations, limits; REST vs HTTP vs WebSocket APIs, authorizers, throttling, usage plans; Cognito | Lambda is throttled at peak. What do you check, and what are the three fixes? |
| 13 | **ECS and EKS in depth** | Task definitions, awsvpc networking, capacity providers, Fargate vs EC2, Service Connect, deployment circuit breaker, ECR scanning and lifecycle; EKS control plane, node groups, Karpenter, Pod Identity / IRSA, VPC CNI, Load Balancer Controller; App Runner | Pods are stuck in Pending and the subnet has free capacity. What is likely wrong? |
| 14 | **Review: data-tier design** | Choose the database, cache and queue for five workloads and defend each choice | For each choice: what would make you change your mind? |

## Week 3 — Delivery, Observability, Security, Edge

| Day | Topic | Services and concepts | Check yourself |
|-----|-------|-----------------------|----------------|
| 15 | **Infrastructure as code** | CloudFormation (change sets, drift, StackSets, nested stacks, custom resources), CDK, Terraform on AWS (remote state, locking, modules), Service Catalog | A stack update fails half-way. What state is it in and how do you recover? |
| 16 | **CI/CD and deployment strategies** | CodePipeline, CodeBuild, CodeDeploy, GitHub Actions with OIDC, rolling vs blue/green vs canary, automatic rollback, AppConfig feature flags, multi-account pipelines | Blue/green or canary for a schema-changing release? Why? |
| 17 | **Observability in depth** | CloudWatch (metric math, embedded metric format, composite alarms, anomaly detection, Logs Insights, Synthetics, RUM), X-Ray and OpenTelemetry, Managed Prometheus and Grafana, SLOs and error budgets | p99 latency doubled and CPU is flat. How do you find the cause? |
| 18 | **Data protection** | KMS (key types, key policies, grants, envelope encryption, multi-Region keys, rotation), Secrets Manager vs Parameter Store, ACM and Private CA, CloudHSM, Macie, encryption in each service | A role has `kms:Decrypt` in IAM but decryption fails. Why? |
| 19 | **Detection and response** | GuardDuty, Security Hub, Inspector, Detective, Config rules and conformance packs, CloudTrail Lake, WAF rules, Shield Advanced, Firewall Manager, incident runbooks | An access key is leaked on GitHub. What are your first five actions? |
| 20 | **DNS and edge in depth** | Route 53 routing policies, health checks, private hosted zones, Resolver, DNSSEC; CloudFront behaviours, cache and origin request policies, OAC, signed URLs and cookies, origin failover, CloudFront Functions vs Lambda@Edge | The cache hit ratio is 20%. What do you look at? |
| 21 | **Review: incident game day** | Five production incidents, replayed minute by minute: detect, diagnose, fix, write the follow-up | What signal would have caught each one earlier? |

## Week 4 — Data, Resilience, Cost, Governance, Design

| Day | Topic | Services and concepts | Check yourself |
|-----|-------|-----------------------|----------------|
| 22 | **Analytics and data platforms** | Kinesis, MSK, Firehose, Glue, Lake Formation, Athena, EMR, Redshift (RA3, Serverless, Spectrum), QuickSight, table formats (Iceberg) | Lake, warehouse or both? Decide for a 50-person analytics team. |
| 23 | **AI and ML on AWS** | Bedrock (models, Knowledge Bases, Agents, Guardrails), SageMaker (training, endpoints), Rekognition, Textract, Comprehend, Transcribe, vector search options | Where does your data go when you call a Bedrock model, and who can see it? |
| 24 | **Resilience engineering** | Static stability, cell-based design, shuffle sharding, multi-Region patterns, Route 53 Application Recovery Controller, Fault Injection Service, Resilience Hub, Elastic Disaster Recovery, service quotas | Your failover depends on creating new resources during the outage. What is wrong with that? |
| 25 | **Performance and scale** | Read and write scaling, sharding, connection pooling, timeouts, retries with backoff and jitter, idempotency, backpressure, load shedding, load testing | Traffic grows 10× next month. Walk through the stack and name what breaks first. |
| 26 | **Cost optimisation** | Cost Explorer, Cost and Usage Report, Budgets, Savings Plans vs Reserved Instances, Spot, Compute Optimizer, Trusted Advisor, data-transfer costs (NAT, cross-AZ, egress), cost allocation tags | The bill rose 30% and nobody deployed anything. Where do you look first? |
| 27 | **Governance at scale** | Organizations, SCPs and resource control policies, Control Tower, Identity Center permission sets, tag policies, Config aggregators, central networking and logging, account vending | Give a new team an account in one hour, safely. What has to exist already? |
| 28 | **Migration and modernisation** | The 7 Rs, Application Migration Service, DMS and schema conversion, Migration Hub, Snow family, DataSync, Transfer Family, strangler-fig pattern | Move a 2 TB database with under five minutes of downtime. How? |
| 29 | **Well-Architected and system design** | The six pillars, trade-offs between them, design reviews, capacity estimates, three worked system-design questions on AWS | Design a flash-sale system. State your assumptions before your services. |
| 30 | **Capstone: design, cost and defend** | One platform, end to end: architecture, failure modes, security, monthly cost, migration plan, and a mock senior interview on it | Can you defend every choice against “why not the alternative?” |

---

## Progress

- [ ] Day 1 &nbsp; - [ ] Day 2 &nbsp; - [ ] Day 3 &nbsp; - [ ] Day 4 &nbsp; - [ ] Day 5 &nbsp; - [ ] Day 6 &nbsp; - [ ] Day 7
- [ ] Day 8 &nbsp; - [ ] Day 9 &nbsp; - [ ] Day 10 &nbsp; - [ ] Day 11 &nbsp; - [ ] Day 12 &nbsp; - [ ] Day 13 &nbsp; - [ ] Day 14
- [ ] Day 15 &nbsp; - [ ] Day 16 &nbsp; - [ ] Day 17 &nbsp; - [ ] Day 18 &nbsp; - [ ] Day 19 &nbsp; - [ ] Day 20 &nbsp; - [ ] Day 21
- [ ] Day 22 &nbsp; - [ ] Day 23 &nbsp; - [ ] Day 24 &nbsp; - [ ] Day 25 &nbsp; - [ ] Day 26 &nbsp; - [ ] Day 27 &nbsp; - [ ] Day 28
- [ ] Day 29 &nbsp; - [ ] Day 30

## References

- [AWS documentation](https://docs.aws.amazon.com) — the user guide for each service; read the “quotas” and “troubleshooting” pages
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Amazon Builders' Library](https://aws.amazon.com/builders-library/) — how Amazon runs its own systems
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
