---
title: "Setting Up a CI/CD Pipeline with Jenkins, Docker, and AWS EC2"
description: "A step-by-step guide to setting up a Jenkins CI/CD pipeline on an EC2 instance, including Docker integration, deployment automation, and best practices."
slug: jenkins-cicd
date: 02/09/2025
author: Rithend Sushanth
image: https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV
---

# Setting Up a CI/CD Pipeline with Jenkins, Docker, and AWS EC2

## Introduction

In this guide, we will set up a CI/CD pipeline using Jenkins to automate the deployment of a Django-based Notes application. The pipeline will handle code cloning, building, testing, pushing Docker images to DockerHub, and deploying on an AWS EC2 instance using Docker Compose.

## Prerequisites

- AWS Account
- EC2 Instance (Ubuntu 22.04 recommended)
- Docker and Docker Compose installed on EC2
- Jenkins installed and configured
- DockerHub account

## Step 1: Launch an EC2 Instance

1. Log in to AWS and navigate to EC2.
2. Click on **Launch Instance** and choose **Ubuntu 22.04 LTS**.
3. Select an instance type (e.g., `t2.micro` for free tier eligibility).
4. Configure security groups to allow **port 22 (SSH)** and **port 8000 (for Django app access)**.
5. Generate and download a key pair for SSH access.
6. Launch the instance and note the **public IP address**.

## Step 2: Connect to EC2 and Install Dependencies

SSH into the EC2 instance:

```sh
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

Install Docker and Docker Compose:

```sh
sudo apt update && sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo apt install docker-compose

```

## Step 3: Install and Configure Jenkins

### Install Java and Jenkins

[https://www.jenkins.io/doc/book/installing/linux/#debianubuntu](https://www.jenkins.io/doc/book/installing/linux/#debianubuntu)

```sh
sudo apt update

sudo apt install fontconfig openjdk-17-jre
java -version
openjdk version "17.0.13" 2024-10-15
OpenJDK Runtime Environment (build 17.0.13+11-Debian-2)
OpenJDK 64-Bit Server VM (build 17.0.13+11-Debian-2, mixed mode, sharing)


sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### Configure Jenkins

1. Access Jenkins at `http://your-ec2-public-ip:8080`.
2. Retrieve the admin password:
   ```sh
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Install recommended plugins and set up an admin user.

## Giving Jenkins Permissions

cd to the directory where Jenkins is installed
```sh
cd /var/lib/jenkins/workspace/todo-cicd-jenkins
```

```sh
sudo usermod -aG docker jenkins
```


## Step 4: Configure Jenkins Pipeline

### Create Credentials for DockerHub

1. Go to **Jenkins Dashboard** > **Manage Jenkins** > **Manage Credentials**.
2. Under `Global` credentials, add:
   - **Username**: DockerHub username
   - **Password**: DockerHub password
   - **ID**: `dockerHub`

### Define the Jenkins Pipeline

Create a **Jenkinsfile** in your repository:

```groovy
pipeline {
    agent any
    
    stages {
        stage("Clone Code") {
            steps {
                git url: "https://github.com/RithendSushanth/todo-cicd-jenkins.git", branch: "master"
            }
        }
        stage("Build & Test") {
            steps {
                sh "docker build -t notes-app:latest ."
            }
        }
        stage("Push to DockerHub") {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: "dockerHub", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")
                ]) {
                    sh "docker image tag notes-app:latest ${env.dockerHubUser}/notes-app:latest"
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker push ${env.dockerHubUser}/notes-app:latest"
                }
            }
        }
        stage("Deploy") {
            steps {
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}
```

## Step 5: Set Up Docker and Docker Compose on EC2

SSH into the EC2 instance and create a **docker-compose.yml** file:

```yaml
version: "3.3"
services:
  web:
    image: devrithend/notes-app:latest
    ports:
      - "8000:8000"
```

Run the following command to start the container:

```sh
docker-compose up -d
```

## Step 6: Test Deployment

Visit `http://your-ec2-public-ip:8000` in your browser to verify that the application is running.