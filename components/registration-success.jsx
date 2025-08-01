"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RegistrationSuccess({ formData, resetAll }) {
  return (
    <div className="text-center space-y-4 py-6 px-6">
      {/* Add animations to the success screen elements */}
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-green-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        Registration Successful!
      </h3>
      <p className="text-gray-700 text-md max-w-prose mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
        Your information has been successfully submitted. We&apos;re excited to help you find global opportunities!
      </p>

      {/* Display Submitted Data */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left bg-gray-50 p-8 rounded-xl shadow-inner border border-gray-200 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="space-y-1">
          <Label className="font-semibold text-gray-700">First Name</Label>
          <p className="text-gray-900 text-base font-medium">{formData.firstName}</p>
        </div>
        <div className="space-y-1">
          <Label className="font-semibold text-gray-700">Last Name</Label>
          <p className="text-gray-900 text-base font-medium">{formData.lastName}</p>
        </div>
        <div className="space-y-1">
          <Label className="font-semibold text-gray-700">Email</Label>
          <p className="text-gray-900 text-base font-medium">{formData.email}</p>
        </div>
        <div className="space-y-1">
          <Label className="font-semibold text-gray-700">Contact Number</Label>
          <p className="text-gray-900 text-base font-medium">{formData.contactNumber}</p>
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label className="font-semibold text-gray-700">Work Experience</Label>
          {formData.workExperiences.length > 0 ? (
            <div className="space-y-4">
              {formData.workExperiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2 bg-white rounded-md shadow-sm">
                  <p className="text-gray-900 text-base font-semibold">{exp.title}</p>
                  <p className="text-gray-700 text-sm">{exp.company}</p>
                  <p className="text-gray-800 text-sm whitespace-pre-wrap mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-base">No work experience provided.</p>
          )}
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label className="font-semibold text-gray-700">Education</Label>
          {formData.education.length > 0 ? (
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2 bg-white rounded-md shadow-sm">
                  <p className="text-gray-900 text-base font-semibold">{edu.degree}</p>
                  <p className="text-gray-700 text-sm">{edu.institution}</p>
                  <p className="text-gray-800 text-sm mt-1">{edu.years}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-base">No education provided.</p>
          )}
        </div>
        {formData.skills.length > 0 && (
          <div className="space-y-3 md:col-span-2">
            <Label className="font-semibold text-gray-700">Skills</Label>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm font-normal px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={resetAll}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white text-base px-8 py-3 rounded-lg shadow-md transition-all duration-200 font-semibold animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        Register Another Candidate
      </Button>
    </div>
  )
}
