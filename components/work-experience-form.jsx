"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, PlusCircle, XCircle } from "lucide-react"

export default function WorkExperienceForm({
  workExperiences,
  handleWorkExperienceChange,
  removeWorkExperience,
  addWorkExperience,
  errors,
}) {
  return (
    <div className="space-y-2 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        Work Experience <span className="text-red-500">*</span>
      </h3>
      {workExperiences.length === 0 && <p className="text-gray-500 text-sm">Add at least one work experience entry.</p>}
      {workExperiences.map((exp, index) => (
        <Card key={index} className="p-4 border-l-4 border-blue-500 shadow-sm relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeWorkExperience(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <XCircle className="h-5 w-5" />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`work-title-${index}`} className="text-gray-700 font-medium">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`work-title-${index}`}
                value={exp.title}
                onChange={(e) => handleWorkExperienceChange(index, "title", e.target.value)}
                className={`h-10 px-3 py-2 rounded-md border ${errors.workExperiences?.[index]?.title ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.workExperiences?.[index]?.title && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.workExperiences[index].title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`work-company-${index}`} className="text-gray-700 font-medium">
                Company <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`work-company-${index}`}
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                className={`h-10 px-3 py-2 rounded-md border ${errors.workExperiences?.[index]?.company ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.workExperiences?.[index]?.company && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.workExperiences[index].company}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`work-description-${index}`} className="text-gray-700 font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={`work-description-${index}`}
              value={exp.description}
              onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}
              className={`min-h-[80px] px-3 py-2 rounded-md border ${errors.workExperiences?.[index]?.description ? "border-red-500" : "border-gray-300"}`}
              placeholder="Responsibilities and achievements..."
            />
            {errors.workExperiences?.[index]?.description && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.workExperiences[index].description}
              </p>
            )}
          </div>
        </Card>
      ))}
      <Button
        type="button"
        onClick={addWorkExperience}
        variant="outline"
        className="w-full border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-transparent text-sm"
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Work Experience
      </Button>
    </div>
  )
}
