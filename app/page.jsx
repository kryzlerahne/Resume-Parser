"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HeaderSection from "@/components/header-section"
import ResumeUploadSection from "@/components/resume-upload-section"
import PersonalInfoForm from "@/components/personal-info-form"
import WorkExperienceForm from "@/components/work-experience-form"
import EducationForm from "@/components/education-form"
import SkillsInput from "@/components/skills-input"
import RegistrationSuccess from "@/components/registration-success"
import ValidationModal from "@/components/modals/validation-modal"
import FileTypeModal from "@/components/modals/file-type-modal"
import LoadingModal from "@/components/modals/loading-modal"
import axios from "axios"

export default function ResumeParser() {
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    workExperiences: [],
    education: [],
    skills: [],
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationErrorsList, setValidationErrorsList] = useState([])
  const [newSkillInput, setNewSkillInput] = useState("")

  const [showFileTypeModal, setShowFileTypeModal] = useState(false)
  const [fileTypeError, setFileTypeError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const fileType = selectedFile.type
      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
        setIsSubmitted(false)
        setFileTypeError("")
        setShowFileTypeModal(false)
      } else {
        setFile(null)
        setFileTypeError("Please upload a PDF or Word document (.doc, .docx).")
        setShowFileTypeModal(true)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const processResume = async () => {
  if (!file) return

  setIsProcessing(true)
  setErrors({})

  try {
    const formDataToSend = new FormData()
    formDataToSend.append("file", file)

    const response = await axios.post(
      "https://api.affinda.com/v2/resumes",
      formDataToSend,
      {
        headers: {
          Authorization: "Bearer aff_7d0ad7b2944aeec041cddb09cc79fea1d731c598", 
          "Content-Type": "multipart/form-data",
        },
      }
    )

    const data = response.data.data

    setFormData({
      firstName: data.name?.first || "",
      lastName: data.name?.last || "",
      email: data.emails?.[0] || "",
      contactNumber: data.phoneNumbers?.[0] || "",
      workExperiences: (data.workExperience || []).map((exp) => ({
        title: exp.jobTitle || "",
        company: exp.organization || "",
        description: exp.jobDescription || "",
      })),
education: (data.education || []).map((edu) => {
  const degree = edu.accreditation?.education || "";
  const institution = edu.organization || "";
  const years =
    edu.dates?.rawText ||
    (edu.dates?.startDate && edu.dates?.completionDate
      ? `${new Date(edu.dates.startDate).getFullYear()} - ${new Date(
          edu.dates.completionDate
        ).getFullYear()}`
      : "");

  return {
    degree,
    institution,
    years,
  };
}),

      skills: data.skills?.map((skill) => skill.name) || [],
    })
  } catch (error) {
    console.error("Affinda resume parse error:", error)
    setFileTypeError("Failed to parse resume. Please try again.")
    setShowFileTypeModal(true)
  } finally {
    setIsProcessing(false)
  }
}

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [...prev.workExperiences, { title: "", company: "", description: "" }],
    }))
  }

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (newErrors.workExperiences) {
        delete newErrors.workExperiences[index]
      }
      return newErrors
    })
  }

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const newExperiences = [...prev.workExperiences]
      newExperiences[index] = { ...newExperiences[index], [field]: value }
      return { ...prev, workExperiences: newExperiences }
    })
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (newErrors.workExperiences?.[index]?.[field]) {
        const fieldErrors = { ...newErrors.workExperiences[index] }
        delete fieldErrors[field]
        if (Object.keys(fieldErrors).length === 0) {
          delete newErrors.workExperiences[index]
        } else {
          newErrors.workExperiences[index] = fieldErrors
        }
      }
      return newErrors
    })
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", years: "" }],
    }))
  }

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (newErrors.education) {
        delete newErrors.education[index]
      }
      return newErrors
    })
  }

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const newEducation = [...prev.education]
      newEducation[index] = { ...newEducation[index], [field]: value }
      return { ...prev, education: newEducation }
    })
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (newErrors.education?.[index]?.[field]) {
        const fieldErrors = { ...newErrors.education[index] }
        delete fieldErrors[field]
        if (Object.keys(fieldErrors).length === 0) {
          delete newErrors.education[index]
        } else {
          newErrors.education[index] = fieldErrors
        }
      }
      return newErrors
    })
  }

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()],
      }))
      setNewSkillInput("")
      setErrors((prev) => ({ ...prev, skills: undefined }))
    } else if (newSkillInput.trim() && formData.skills.includes(newSkillInput.trim())) {
      setErrors((prev) => ({ ...prev, skills: "Skill already added" }))
    } else {
      setErrors((prev) => ({ ...prev, skills: "Skill cannot be empty" }))
    }
  }

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    const missingFields = []

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      missingFields.push("First Name")
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      missingFields.push("Last Name")
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      missingFields.push("Email")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      missingFields.push("Valid Email")
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required"
      missingFields.push("Contact Number")
    } else if (!/^\+\d{1,3}\d{7,14}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please include country code (e.g., +1234567890)"
      missingFields.push("Contact Number (with country code)")
    }

    if (formData.workExperiences.length === 0) {
      missingFields.push("At least one Work Experience entry")
    } else {
      newErrors.workExperiences = {}
      formData.workExperiences.forEach((exp, index) => {
        const expErrors = {}
        if (!exp.title.trim()) {
          expErrors.title = "Job Title is required"
          missingFields.push(`Work Experience #${index + 1} (Job Title)`)
        }
        if (!exp.company.trim()) {
          expErrors.company = "Company is required"
          missingFields.push(`Work Experience #${index + 1} (Company)`)
        }
        if (!exp.description.trim()) {
          expErrors.description = "Description is required"
          missingFields.push(`Work Experience #${index + 1} (Description)`)
        }
        if (Object.keys(expErrors).length > 0) {
          newErrors.workExperiences[index] = expErrors
        }
      })
    }

    if (formData.education.length === 0) {
      missingFields.push("At least one Education entry")
    } else {
      newErrors.education = {}
      formData.education.forEach((edu, index) => {
        const eduErrors = {}
        if (!edu.degree.trim()) {
          eduErrors.degree = "Degree is required"
          missingFields.push(`Education #${index + 1} (Degree)`)
        }
        if (!edu.institution.trim()) {
          eduErrors.institution = "Institution is required"
          missingFields.push(`Education #${index + 1} (Institution)`)
        }
        if (!edu.years.trim()) {
          eduErrors.years = "Years are required"
          missingFields.push(`Education #${index + 1} (Years)`)
        }
        if (Object.keys(eduErrors).length > 0) {
          newErrors.education[index] = eduErrors
        }
      })
    }

    setErrors(newErrors)
    setValidationErrorsList(missingFields)
    return missingFields.length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      setShowValidationModal(false)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubmitted(true)
        console.log("Form Submitted:", formData)
      } catch (error) {
        console.error("Submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setShowValidationModal(true)
    }
  }

  const resetAll = () => {
    setFile(null)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      workExperiences: [],
      education: [],
      skills: [],
    })
    setErrors({})
    setIsProcessing(false)
    setIsSubmitted(false)
    setShowValidationModal(false)
    setValidationErrorsList([])
    setNewSkillInput("")
    setFileTypeError("")
    setShowFileTypeModal(false)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Subtle background elements for modernization */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-700 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-bl from-orange-500 to-transparent rounded-full filter blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <HeaderSection />

        <Card className="w-full rounded-xl shadow-2xl overflow-hidden bg-white">
          {!isSubmitted && (
            <CardHeader className="bg-white">
              <CardTitle className="text-xl font-bold text-gray-800">Candidate Registration</CardTitle>
              <CardDescription className="text-gray-600 mt-1 text-sm">
                Fill out your details below. You can optionally upload your resume to auto-fill the form.
              </CardDescription>
            </CardHeader>
          )}
          <CardContent className="">
            {isSubmitted ? (
              <RegistrationSuccess formData={formData} resetAll={resetAll} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <ResumeUploadSection
                  file={file}
                  isProcessing={isProcessing}
                  handleFileUpload={handleFileUpload}
                  handleRemoveFile={handleRemoveFile}
                  processResume={processResume}
                />
                <PersonalInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <WorkExperienceForm
                  workExperiences={formData.workExperiences}
                  handleWorkExperienceChange={handleWorkExperienceChange}
                  removeWorkExperience={removeWorkExperience}
                  addWorkExperience={addWorkExperience}
                  errors={errors}
                />
                <EducationForm
                  education={formData.education}
                  handleEducationChange={handleEducationChange}
                  removeEducation={removeEducation}
                  addEducation={addEducation}
                  errors={errors}
                />
                <SkillsInput
                  skills={formData.skills}
                  newSkillInput={newSkillInput}
                  setNewSkillInput={setNewSkillInput}
                  handleAddSkill={handleAddSkill}
                  handleRemoveSkill={handleRemoveSkill}
                  errors={errors}
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base px-6 py-3 rounded-lg shadow-md transition-all duration-200"
                >
                  Submit Registration
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <ValidationModal
          showValidationModal={showValidationModal}
          setShowValidationModal={setShowValidationModal}
          validationErrorsList={validationErrorsList}
        />
        <FileTypeModal
          showFileTypeModal={showFileTypeModal}
          setShowFileTypeModal={setShowFileTypeModal}
          fileTypeError={fileTypeError}
        />
        <LoadingModal isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
