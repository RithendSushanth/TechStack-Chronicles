---
title: Hosting Vite Frontend and PHP Backend in Production
description: A step-by-step guide to setting up a Vite frontend and PHP backend on an EC2 instance for production, including NGINX configuration, database integration, and cost considerations.
slug: hosting-vite-frontend-php-backend
date: 09/22/2024 
author: Rithend Sushanth
image: https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<!-- date format mm/dd/yyyy -->
### **1. EC2 Setup for Production**

- **Operating System**: Use **Ubuntu** on your EC2 instance.
- **NGINX**: Web server and reverse proxy for serving static files (Vite) and forwarding API requests to the PHP backend.
- **Security Configuration**: Allow HTTP (port 80), HTTPS (port 443), SSH (port 22). Use SSL certificates for secure traffic (e.g., Let's Encrypt for HTTPS).

### **2. Vite Frontend (E-commerce Website)**

- **Frontend Build**: In development, the Vite app is built using `npm run build`, producing a `dist` folder containing the static HTML, CSS, and JS files.
- **Deployment**: Copy the `dist` folder contents to the `/var/www/html/vite/` directory on your EC2 instance.
- **NGINX Configuration**: Configure NGINX to serve the frontend files from this directory. Users visiting your domain (e.g., `http://your-domain.com`) will see the Vite frontend.
- **Vite Use Case**: Since this is an e-commerce site for one product, the frontend will handle interactions such as viewing the product, adding it to a cart, and initiating checkout.

### **3. PHP Backend (API Server)**

- **API Functionality**: The PHP backend manages dynamic content, such as processing orders, managing checkout, and product inventory. It could have endpoints like `/api/order` for placing an order or `/api/product` for product details.
- **NGINX Proxy Setup**: For requests to `/api/`, NGINX forwards them to the PHP backend via FastCGI. The PHP files are hosted in `/var/www/html/api/`.

### **4. Data Flow**

- **Client Request**: When a user visits the site, NGINX serves the Vite frontend (static files).
- **Frontend Interaction**: User interaction with the product page (e.g., clicking "Buy" or viewing product details) triggers API requests to the PHP backend.
- **API Response**: The PHP backend interacts with a database (e.g., MySQL) to process orders or fetch product data. It returns the response to the Vite frontend, updating the UI based on the data.

### **5. Database (if Required)**

- **MySQL Integration**: If your e-commerce site requires persistent data (e.g., saving orders), you can install MySQL on your EC2 instance. The PHP backend will handle database queries (e.g., storing order information).

---

### **EC2 Free Tier and Cost Considerations**

#### **1. Free Tier Usage Limits**:

AWS offers a **12-month free tier** with the following limitations:

- **EC2 Compute**:
    - 750 hours per month of free usage for **t2.micro** or **t3.micro** instances (enough for one instance running continuously for a month).
    - After the 750 hours are used up, you'll be charged based on the instance type and region.
- **Storage (EBS)**:
    - 30 GB of **Elastic Block Storage (EBS)**, typically SSD, is free under the Free Tier.
    - After you exceed 30 GB, AWS charges for extra storage space.
- **Data Transfer**:
    - 15 GB of **outbound data transfer** to the internet per month is included for free.
    - **Inbound data transfer** (from the internet to your EC2 instance) is always free.
    - After 15 GB of outbound transfer, AWS charges **$0.09 per GB**.

#### **2. Cost After Exceeding Free Tier Limits**:

- **EC2 Instance Hour Usage**:
    - After exceeding 750 hours per month, a **t2.micro** instance costs **$0.0116 per hour** in the US East region. For a full month (730 hours), this totals around **$8.48/month**.
- **Storage (EBS)**:
    - Beyond the free 30 GB, EBS storage costs about **$0.10 per GB per month**.
    - For example, if you use 40 GB, you'll pay for the extra 10 GB, which amounts to **$1/month**.
- **Data Transfer**:
    - After exceeding the 15 GB free outbound data transfer, AWS charges **$0.09 per GB**.
    - For example, if your e-commerce site generates **50 GB of outbound traffic** per month, after the 15 GB free tier, you'll be charged for 35 GB, which costs **$3.15/month**.

---

#### **3. Cost Parameters**:

- **Compute Time**: Charges start after exceeding 750 hours/month.
- **Storage**: Charges apply for EBS storage beyond the 30 GB free tier.
- **Data Transfer**: Charges apply for outbound data exceeding 15 GB/month.

#### **Example Scenario for Costing**:

Assuming your e-commerce site generates **50 GB of outbound data** in a month, here's an estimate of costs:

- **EC2 Instance (t2.micro)**: Free for the first 750 hours. Beyond that, around **$8.48/month**.
- **Storage**: Let’s say you use **40 GB** of storage. The first 30 GB is free; you’ll pay **$1/month** for the additional 10 GB.
- **Data Transfer**: With **50 GB of outbound data**, the first 15 GB is free. You’ll pay **$3.15** for the extra 35 GB.

**Total Monthly Cost**:

- **$8.48** (compute time) + **$1.00** (extra storage) + **$3.15** (data transfer) = **~$12.63/month**.
