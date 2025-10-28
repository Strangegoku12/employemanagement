# Employee Management System

The Employment Management System (EMS) is a full-stack web application designed to streamline employee management,
leave tracking, and salary management for organizations. It provides role-based access for Admins, HRs, Managers, and Employees with an intuitive dashboard and secure APIs.

## Features
- CRUD operations for employee data
- Secure authentication workflow (if implemented)
- Dockerized environment for easy setup and consistent development
- Ready to deploy and scale with minimal configuration

🚀 Tech Stack

Frontend: Angular

Backend: Node.js + Express.js

Database: MongoDB (Atlas)

Containerization: Docker

Version Control & CI/CD: Git, GitHub, GitHub Actions

⚙️ Core Features

Authentication & Authorization: Secure JWT-based login system with role-based access control.

Employee Management: CRUD operations for employee profiles, departments, and roles.

Leave Management: Apply, approve, or reject leaves with automated balance tracking and approval workflow.

Salary Management: Generate monthly payroll, manage salary components, and view downloadable payslips.

Dashboard: Visual HR and employee dashboards for attendance, leaves, and salary insights.

Notifications: Email or in-app notifications for leave approvals and payroll updates.

🧩 System Architecture

Angular SPA communicates with Express REST APIs over HTTPS.

Node.js Backend handles business logic, validation, and database operations via MongoDB.

Docker containers ensure consistent development and deployment environments.

GitHub Actions automate testing, building, and deployment pipelines.

🛠️ Deployment

Each service (frontend & backend) is containerized using Docker.

CI/CD pipelines build and push images to Docker Hub using GitHub Actions.

Deployed using Docker Compose or Kubernetes for scalability.

🔒 Security

Encrypted passwords & sensitive data.

JWT-based authentication and CORS protection.

Role-based route protection for Admin/HR/Employee.

📊 Future Enhancements

Realtime notifications using WebSockets.

Attendance module integration.

Advanced payroll reports and analytics.
## Prerequisites
- Docker installed on your machine
- Docker Compose installed (usually comes with Docker)

## Getting Started

### Clone the Repository
First, clone the repository to your local machine using the following command:

git clone https://github.com/Strangegoku12/employemanagement.git
cd employemanagement

### Run Docker Compose
To build and start all the necessary containers, run:
docker-compose up -d

This will pull the required images, build containers if needed, and start all services in detached mode.

### Running the Project
After running the containers, the application will be accessible at: http://localhost:3000
You can now interact with the Employee Management System through your browser.

## Why Use Docker?
Using Docker simplifies environment setup by containerizing the entire application along with its dependencies. This approach ensures:
- Consistent environments across different machines
- No need to manually install runtime dependencies like Node.js, MongoDB, etc.
- Easy cleanup and reset by stopping and removing containers
- Accelerated onboarding process for new developers

## Stopping the Containers
To stop and remove the running containers, you can use: docker-compose down


## Contribution
Contributions are welcome! Please fork the repo, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.



