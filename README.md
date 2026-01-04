# Lost Item Finder

Lost Item Finder is a full-stack web application that helps users report lost or found items and claim ownership in a secure way.  
The project was built incrementally, focusing on real-world authentication, authorization, and backend logic.

This project demonstrates my understanding of full-stack development using the **MERN stack**.

---

## Problem Statement

In college campuses, items are frequently lost, but there is no structured platform to match people who lose items with those who find them.  
This application provides a simple and secure solution for posting items and verifying ownership claims.

---

## Tech Stack

- **Frontend**: React (Vite), CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT-based authentication  
- **File Uploads**: Multer  
- **Image Hosting**: Cloudinary  
- **Additional Features**: Leaflet integration for item location  

---

## Core Features

### User Functionality

- **Authentication**: Signup and login with JWT-based security  
- **Item Posting**: Create lost or found item posts with images and location  
- **Item Browsing**: View items posted by others with filters and map view  
- **Claim Management**: Submit proof of ownership to claim items, which owners can approve or reject  

### User Dashboard

- Track personal activity: posts created, items claimed, recent actions  
- Edit and manage user profile  
- Monitor contribution statistics for lost and found items  

### Security & Protection

- Protected routes accessible only to authenticated users  
- Role-based access for owners to manage claims  

---


## What I Learned From This Project

- Designing REST APIs with proper authentication  
- Implementing role-based access to protected resources  
- Handling file uploads securely  
- Structuring a growing backend codebase  
- Integrating maps and geolocation to enhance user experience  
- Managing user dashboards and activity tracking  
- Managing feature creep and prioritizing core functionality  

---

## Project Status

The core functionality is complete and stable.  
Additional features like payments and notifications were intentionally left out to maintain clarity and stability.

---

## Note

This project was developed as a learning-focused full-stack application and reflects real-world development challenges such as scaling features and maintaining clean architecture.
