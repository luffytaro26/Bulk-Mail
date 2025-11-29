# Bulk-Mail
bulkmail app using MERN Stack

# BulkMail Web Application

## Description

BulkMail is a modern, iOS-inspired web application that allows users to send professional bulk emails quickly and efficiently. The app supports uploading email addresses via Excel files, features a styled message input, and provides real-time notifications, success animations, and a smooth loading experience. Built with React for the frontend and Node.js + Express + MongoDB for the backend, the app ensures a seamless and visually appealing experience for desktop and mobile users.

## Features

* **Upload Excel File**: Users can upload `.xlsx` files containing email addresses.
* **Compose Message**: Input field with modern, Apple-style UI for writing email content.
* **Bulk Email Sending**: Send emails to multiple recipients with a single click.
* **Real-time Feedback**:

  * Loading spinner during sending
  * Animated success checkmark
  * Styled toast notifications for success/error
* **Responsive Design**: Mobile and desktop friendly with fluid layouts.
* **Animated Background**: Dynamic, visually appealing background using Tailwind CSS.

## Tech Stack

* **Frontend**: React, Tailwind CSS, XLSX
* **Backend**: Node.js, Express, Nodemailer
* **Database**: MongoDB (for storing credentials)
* **Deployment**: Localhost or any Node.js supported hosting

## Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd bulkmail-app
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Configure MongoDB**

   * Update the MongoDB connection string in `server.js` with your credentials.
4. **Start Backend**

   ```bash
   node server.js
   ```
5. **Start Frontend**

   ```bash
   npm start
   ```
6. Open(http://localhost:"your local server-port") in your browser.

## Usage

1. Enter your message in the text area.
2. Upload an Excel file with a column of email addresses.
3. Click **Send Email** to dispatch messages.
4. Observe animated feedback for success, error, or loading.


## Notes

* The backend uses Nodemailer with Gmail authentication. Make sure your Gmail account allows sending through the app.
* Emails are sent sequentially to each recipient in the uploaded Excel file.

---

### Resume Description (Concise)

**BulkMail Web App** – Developed a responsive React and Node.js web application for sending bulk emails. Integrated Excel file upload, Gmail SMTP email delivery, iOS-style animations, toast notifications, and a dynamic, visually appealing UI. Implemented MongoDB for secure credential storage and ensured cross-device responsiveness and smooth user experience.

---

This README is **clear, professional, and resume-ready**, highlighting technical skills, functionality, and user experience.

If you want, I can also **write a 2–3 line “Project Highlight”** suitable for LinkedIn or a portfolio page that instantly grabs attention. Do you want me to do that?
