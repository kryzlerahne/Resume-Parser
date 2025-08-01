# Resume Parser 

## Project Description

This project is a web-based tool that allows users to upload their resume in PDF or Word format. The application extracts essential personal and professional details from the uploaded resume and auto-fills a registration form. Users can review and edit the form fields before submitting the final data. This tool enhances user experience by reducing manual input and ensuring accurate data extraction from resumes.

## Features

Here’s a refined and more descriptive version of the **Features** section with improved clarity and documentation style:

---

## Features

### 📄 Resume Upload Support

The app supports uploading resumes in both **PDF** and **Microsoft Word (.docx)** formats. This ensures compatibility with the most commonly used resume file types.

### 🔍 Intelligent Resume Parsing

Upon file upload, the app automatically extracts key information using text parsing logic (or external libraries, if applicable). The fields extracted include:

* **First Name** *(required)*: Identifies the candidate’s given name.
* **Last Name** *(required)*: Extracts the candidate’s family name.
* **Email Address** *(required)*: Detects and captures the primary email from the resume text.
* **Contact Number** *(required)*: Parses for valid mobile or telephone numbers.
* **Work Experience** *(required)*: Extracts job titles, companies, and durations of past employment.
* **Education** *(required)*: Retrieves details such as degrees, institutions, and graduation years.
* **Skills** *(optional)*: Attempts to identify and extract technical and soft skills if mentioned.

### 📝 Pre-filled Editable Registration Form

Once data is extracted, it automatically populates a user-friendly registration form. Every field remains **editable**, so users can verify or correct the data before submission.

### ✅ Real-time Form Validation

The form enforces validation rules:

* All required fields must be filled before submission.
* Inline feedback alerts users to missing or invalid inputs.
* The **Submit** button is disabled until all validation criteria are met.

### 📤 Form Submission and Confirmation

Upon successful submission:

* The app displays a summary of the submitted information.
* Useful for confirmation, record-keeping, or further processing.

### 📱 Responsive Design

Designed to be **mobile-friendly and responsive**, the UI adapts gracefully to different screen sizes (desktop, tablet, and mobile).

### 🎨 Branded UI Consistency

The look and feel of the interface is styled to be consistent with platforms like **WorkAbroad.ph**, providing a familiar and professional user experience. Tailwind CSS is used for styling to ensure fast, clean, and scalable design.

## Tech Stack

* React
* Tailwind CSS

## How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/kryzlerahne/Resume-Parser.git
   cd Resume-Parser
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` (or whatever port Vite/React is using)

## How to Test

1. Prepare sample resumes in `.pdf` or `.docx` format.
2. Upload a resume using the file input on the homepage.
3. Review the extracted data populated in the registration form.
4. Edit any fields if necessary.
5. Submit the form.
6. Confirm that the submitted data is displayed correctly.

## Optional Live Demo

[Live Demo URL](https://your-demo-link.com)

## Screenshots

*(Add screenshots in this section to showcase UI and features)*

---

Let me know if you want a separate section for backend/API setup, or if you’ll integrate any parsing libraries like `pdf-parse`, `mammoth`, or a third-party service.
