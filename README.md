# 🌦️ AWS Serverless Weather App (HTTPS)

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![AWS Lambda](https://img.shields.io/badge/Lambda-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white) ![CloudFront](https://img.shields.io/badge/CloudFront-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-blue.svg) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)![Infrastructure](https://img.shields.io/badge/IaC-AWS_SAM-orange.svg) ![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)

**AWS Serverless Weather App** is a professional, production-ready weather application built on an **Event-Driven Serverless Architecture**. This project demonstrates modern cloud infrastructure practices, Infrastructure as Code (IaC), and a _Security-First_ approach to frontend development.

## 🚀 Live Demo

👉👉 **[Launch Interactive Weather Dashboard](https://d1wcur5pv05klp.cloudfront.net)**

> **Infrastructure Note:** This application is fully automated and hosted on **AWS**.
> The entire environment is deployed using **AWS SAM (Serverless Application Model)**, including:
>
> - **Amazon S3** for static asset hosting.
> - **Amazon CloudFront** as a global CDN with SSL/TLS encryption.
> - **AWS Lambda & API Gateway** providing a scalable, serverless backend.

---

## ✨ Key Features

- 🌍 **Global Content Delivery:** Instant access worldwide via CloudFront's edge locations.
- 🔐 **Security Hardening:** Proactive input sanitization (Regex) and robust XSS prevention.
- 🏗️ **Infrastructure as Code (IaC):** Repeatable and secure stack deployment with a single command.
- 📱 **Modern UI:** Responsive "Glassmorphism" design with smooth CSS3 animations and iOS-inspired styling.
- ⚡ **High Performance:** A "No Ops" approach – scaling automatically based on traffic demand.

---

## 🛠️ Tech Stack & Tools

- **Cloud (AWS):** Lambda, S3, CloudFront, API Gateway, IAM.
- **Backend:** Python 3.13 (Optimized for low cold-starts and high performance).
- **Frontend:** Vanilla JS (ES6+), HTML5, CSS3 (BEM methodology).
- **Security:** HTTPS Enforcement, Input Sanitization, `encodeURIComponent` logic.
- **DevOps:** AWS SAM CLI, Git Flow (Feature Branching).

---

## 🏗️ Architecture & Optimization

### 🚀 Performance & Security Tuning

- **CloudFront Invalidation:** Automated CDN cache clearing during frontend updates.
- **XSS Prevention:** Zero reliance on `.innerHTML`; utilizing `.textContent` for all dynamic user-facing data.
- **API Hygiene:** Implementation of `encodeURIComponent` to safely pass city names to the backend.
- **Optimization:** Leveraging a lightweight Python 3.13 runtime in Lambda to reduce latency and execution costs.

---

## 📸 Screenshots

|       Main Dashboard       |          Search & Validation           |
| :------------------------: | :------------------------------------: |
| ![Home](./assets/home.png) | ![Validation](./assets/validation.png) |
|  **Main UI (iOS Style)**   |       **Security & Validation**        |

---

## 🚀 Development & Deployment

### 1. Environment Setup (Secret Management)

To run this project securely, we separate local development secrets from cloud production parameters:

- **Local Testing:** Create a `.env` file in the root directory (this file is ignored by Git):
  ```env
  WEATHER_API_KEY=your_openweather_api_key
  ```
- **AWS Production:** Secrets are managed via `template.yaml` parameters and stored in `samconfig.toml` after the first guided deployment.

---

### 2. Rapid Logic Testing (The "Fast" Way)

Test the backend Python logic instantly without the overhead of AWS or Docker. This is ideal for debugging data processing and API responses:

```bash
python test_logic.py
```

### 3. Cloud-Native Development (Pro Workflow)

Use the following commands for building and syncing your stack:

```bash
# Sync local changes to AWS in real-time (Development)
sam sync --stack-name weather-app --watch

# Build and deploy the infrastructure
sam build
sam deploy --guided

# Sync frontend assets to your S3 bucket
aws s3 sync ./static s3://weather-app-pro-<YOUR_ACCOUNT_ID> --delete
```

---

## 🔮 Future Roadmap

- [ ] **5-Day Forecast:** Extending the backend to provide long-term weather data.
- [ ] **Geolocation:** Implementing automatic browser-based location detection.
- [ ] **Lambda@Edge:** Moving validation logic directly to the CDN edge for even lower latency.

---

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Author:** Mateusz (pucio8)
**Project Status:** Functional Prototype / Production Ready

```

```
