# 30-Day AWS Architecture Drawing Plan

One architecture per day, in sequence. Each day builds on the previous one.

**Daily routine (45–60 min)**

1. Read about the day's components (15 min)
2. Draw the architecture in [draw.io](https://app.diagrams.net) or [Excalidraw](https://excalidraw.com) using the reference (20 min)
3. Close the reference and redraw from memory (10 min)
4. Answer the "check yourself" question out loud (5 min)

Save each drawing as `day-XX/diagram.drawio` (or `.png`) in this repo.

**Drawing rules to follow every day**

- Draw outside-in: Region → VPC → AZ → Subnet → resources
- Always label CIDR ranges, ports, and arrow direction
- Public subnets on top, private in the middle, data at the bottom
- Solid arrow = request traffic, dashed arrow = replication / async

---

## Week 1 — Networking Foundations

| Day | Architecture | Components to draw | Check yourself |
|-----|--------------|--------------------|----------------|
| 1 | **[Global infrastructure](day-01/index.html)** | Region, 3 Availability Zones, Edge locations | Why is an AZ not the same as a data center? |
| 2 | **[Basic VPC](day-02/index.html)** | VPC `10.0.0.0/16`, 1 public subnet `10.0.1.0/24`, 1 private subnet `10.0.2.0/24` | How many usable IPs are in a /24 on AWS? (251) |
| 3 | **[Public subnet with internet access](day-03/index.html)** | Internet Gateway, route table (`0.0.0.0/0 → IGW`), EC2 with public IP | What makes a subnet "public"? |
| 4 | **[Private subnet with outbound access](day-04/index.html)** | NAT Gateway in public subnet, Elastic IP, private route table (`0.0.0.0/0 → NAT`) | Why does the NAT Gateway sit in the public subnet? |
| 5 | **Security layers** | Security Group (stateful) on EC2, NACL (stateless) on subnet, bastion host | SG vs NACL — which one needs explicit return rules? |
| 6 | **Multi-AZ VPC** | 2 AZs, public + private subnet in each, IGW, one NAT Gateway per AZ | What breaks if you use only one NAT Gateway? |
| 7 | **Review** | Redraw Day 6 from memory with CIDRs and route tables | Can you draw it in under 10 minutes? |

## Week 2 — Compute, Load Balancing, High Availability

| Day | Architecture | Components to draw | Check yourself |
|-----|--------------|--------------------|----------------|
| 8 | **Load-balanced web tier** | Application Load Balancer across 2 public subnets, EC2 in private subnets, target group | Why does the ALB need subnets in at least 2 AZs? |
| 9 | **Auto Scaling** | Auto Scaling Group spanning 2 AZs, launch template, CloudWatch alarm → scaling policy | What triggers scale-out vs scale-in? |
| 10 | **Classic 3-tier app** | Web tier (ALB), app tier (EC2 ASG), data tier (RDS Multi-AZ primary + standby) | Which security group references which? |
| 11 | **Read scaling and caching** | RDS read replicas, ElastiCache (Redis) between app and DB | Multi-AZ standby vs read replica — what is each for? |
| 12 | **Static website** | S3 bucket (private), CloudFront with Origin Access Control, ACM certificate | Why keep the bucket private behind CloudFront? |
| 13 | **DNS and routing** | Route 53 hosted zone, alias record → ALB/CloudFront, failover + latency routing, health checks | Alias record vs CNAME? |
| 14 | **Review: HA web application** | Route 53 → CloudFront → ALB → ASG → RDS Multi-AZ + ElastiCache + S3 | Point to every single point of failure — are there any? |

## Week 3 — Serverless, Decoupling, Containers

| Day | Architecture | Components to draw | Check yourself |
|-----|--------------|--------------------|----------------|
| 15 | **Serverless API** | API Gateway → Lambda → DynamoDB | Which parts live inside a VPC? (none by default) |
| 16 | **Decoupling with queues** | Producer → SQS → consumer ASG, dead-letter queue, SNS → multiple SQS (fan-out) | SQS vs SNS — pull vs push? |
| 17 | **Event-driven processing** | S3 upload event → Lambda → DynamoDB, EventBridge rules → targets | When to use EventBridge over SNS? |
| 18 | **Containers on ECS Fargate** | ECR, ECS cluster, service + tasks in private subnets, ALB | Task role vs execution role? |
| 19 | **Kubernetes on EKS** | EKS control plane (AWS-managed), managed node groups in private subnets, ALB ingress | What does AWS manage vs what do you manage? |
| 20 | **Microservices** | API Gateway → multiple services (Lambda / ECS), each with its own database, SQS between services | Why one database per service? |
| 21 | **Review: serverless web app** | CloudFront + S3 (frontend), Cognito (auth), API Gateway, Lambda, DynamoDB | Trace a login request end to end. |

## Week 4 — Enterprise Architecture

| Day | Architecture | Components to draw | Check yourself |
|-----|--------------|--------------------|----------------|
| 22 | **Connecting VPCs** | VPC Peering (2 VPCs), then Transit Gateway hub with 3+ VPCs | Why doesn't peering scale? (not transitive) |
| 23 | **Hybrid cloud** | On-premises data center, Site-to-Site VPN (Customer Gateway ↔ Virtual Private Gateway), Direct Connect | VPN vs Direct Connect trade-offs? |
| 24 | **Private access to AWS services** | Gateway endpoint (S3, DynamoDB), interface endpoint / PrivateLink | Which endpoint type uses a route table entry? |
| 25 | **Security architecture** | WAF + Shield on CloudFront/ALB, IAM roles, KMS encryption, Secrets Manager, GuardDuty | Where is data encrypted in transit and at rest? |
| 26 | **Monitoring and logging** | CloudWatch metrics/logs/alarms, CloudTrail, VPC Flow Logs, AWS Config → central S3 bucket | CloudWatch vs CloudTrail? |
| 27 | **Data pipeline** | Kinesis Data Streams → Firehose → S3 data lake → Glue → Athena → QuickSight | Where is the data at each stage — streaming or at rest? |
| 28 | **Disaster recovery** | 2 regions; draw all four: backup & restore, pilot light, warm standby, multi-site active-active | Rank the four by RTO/RPO and cost. |
| 29 | **Multi-account setup** | AWS Organizations, OUs, SCPs, Control Tower, separate security / logging / workload accounts | Why separate accounts instead of separate VPCs? |
| 30 | **Capstone: production e-commerce platform** | Combine everything: Route 53, CloudFront, WAF, multi-AZ VPC, ALB, ECS/ASG, RDS Multi-AZ, ElastiCache, SQS, Lambda, S3, monitoring, DR region | Draw it from a blank page in 30 minutes and explain every arrow. |

---

## Progress

- [ ] Day 1 &nbsp; - [ ] Day 2 &nbsp; - [ ] Day 3 &nbsp; - [ ] Day 4 &nbsp; - [ ] Day 5 &nbsp; - [ ] Day 6 &nbsp; - [ ] Day 7
- [ ] Day 8 &nbsp; - [ ] Day 9 &nbsp; - [ ] Day 10 &nbsp; - [ ] Day 11 &nbsp; - [ ] Day 12 &nbsp; - [ ] Day 13 &nbsp; - [ ] Day 14
- [ ] Day 15 &nbsp; - [ ] Day 16 &nbsp; - [ ] Day 17 &nbsp; - [ ] Day 18 &nbsp; - [ ] Day 19 &nbsp; - [ ] Day 20 &nbsp; - [ ] Day 21
- [ ] Day 22 &nbsp; - [ ] Day 23 &nbsp; - [ ] Day 24 &nbsp; - [ ] Day 25 &nbsp; - [ ] Day 26 &nbsp; - [ ] Day 27 &nbsp; - [ ] Day 28
- [ ] Day 29 &nbsp; - [ ] Day 30

## Tools

- [draw.io](https://app.diagrams.net) — has the official AWS icon set built in (More Shapes → AWS)
- [Excalidraw](https://excalidraw.com) — fast freehand-style sketching
- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) — official icon download
- [AWS Architecture Center](https://aws.amazon.com/architecture/) — reference architectures to compare against
