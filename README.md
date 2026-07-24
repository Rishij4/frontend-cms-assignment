# Dynamic CMS - Frontend Engineering Assignment

## Overview

This project is a production-ready Content Management System (CMS) built using Next.js, Express.js, MongoDB, Redux Toolkit, and Tailwind CSS.

The CMS enables administrators to dynamically manage website content through an admin dashboard. The public website consumes all content from backend APIs.

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast

### Backend

- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

---

## Features

### Authentication

- Admin Login
- Logout
- Protected Dashboard

### Page Management

- Create Page
- Edit Page
- Delete Page

### Section Management

Supports:

- Hero
- Rich Text
- FAQ
- Gallery
- Cards
- Features
- Contact

### Media Library

- Upload Images
- Preview Images
- Delete Images

### Public Website

- Dynamic Pages
- Dynamic Sections
- 404 Page
- Responsive Layout

---

## Folder Structure

client/
server/

---

## Installation

### Backend

cd server

npm install

npm run dev

### Frontend

cd client

npm install

npm run dev

---

## Environment Variables

Backend

PORT=5000

MONGO_URI=


Frontend

NEXT_PUBLIC_API_URL=http://localhost:5000/api

---

## Architecture

Frontend

Next.js
↓

Redux Toolkit
↓

Axios
↓

Backend API

↓

MongoDB

---

## Assumptions

- Admin authentication uses JWT.
- Images are stored locally.
- Public pages are generated dynamically using slugs.
- Content is completely managed from the CMS.

---

## Future Improvements

- Rich Text Editor
- Role Based Access
- Cloud Image Storage
- SEO Management
- Version History
