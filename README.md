# 🌦️ AWS Serverless Weather App (HTTPS)

A professional, production-grade weather application built on **AWS Serverless Architecture**. This project demonstrates modern cloud practices, Infrastructure as Code (IaC), and security-first frontend development.

🔗 **[Live Demo (CloudFront)](https://d1wcur5pv05klp.cloudfront.net)**

---

## 🚀 Key Features

- **Full Serverless Stack:** Powered by AWS Lambda and API Gateway.
- **Global Content Delivery:** Accelerated via **CloudFront CDN** for low-latency access worldwide.
- **Security & Encryption:** Forced **SSL/TLS (HTTPS)** and proactive XSS protection.
- **Modern UI:** Responsive "Glassmorphism" design with smooth CSS3 animations.
- **Infrastructure as Code:** Fully managed and deployed using **AWS SAM**.

## 🏗️ Architecture

The application is designed for high availability and security:

1. **Frontend:** Hosted on **Amazon S3** and distributed by **Amazon CloudFront**.
2. **Backend:** **AWS Lambda** (Python 3.13) fetching data from OpenWeather API.
3. **API Layer:** **Amazon API Gateway** acting as a secure bridge.

## 🛡️ Security Hardening

This repository showcases a proactive approach to web security:

- **Input Sanitization:** Custom Regex validation for city names to prevent injection.
- **XSS Prevention:** Safe DOM manipulation using `.textContent` instead of `.innerHTML`.
- **Data Integrity:** Efficient URL encoding with `encodeURIComponent`.
- **Deployment Security:** Minimal IAM permissions and environment secrets management.

## 🛠️ Technology Stack

- **Cloud:** AWS (Lambda, S3, CloudFront, API Gateway, IAM).
- **Languages:** Python (Backend), JavaScript (Frontend).
- **Tools:** AWS SAM CLI, Git, Docker (for local testing).

---

## 👨‍💻 Author

**Mateusz** _Full-Stack & Cloud Engineering Enthusiast_
