"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, PlusCircle, XCircle } from "lucide-react"

export default function EducationForm({ education, handleEducationChange, removeEducation, addEducation, errors }) {
  return (
    <div className="space-y-2 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        Education <span className="text-red-500">*</span>
      </h3>
      {education.length === 0 && <p className="text-gray-500 text-sm">Add at least one education entry.</p>}
      {education.map((edu, index) => (
        <Card key={index} className="p-4 border-l-4 border-blue-500 shadow-sm relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeEducation(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <XCircle className="h-5 w-5" />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`edu-degree-${index}`} className="text-gray-700 font-medium">
                Degree <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`edu-degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                className={`h-10 px-3 py-2 rounded-md border ${errors.education?.[index]?.degree ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.education?.[index]?.degree && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.education[index].degree}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edu-institution-${index}`} className="text-gray-700 font-medium">
                Institution <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`edu-institution-${index}`}
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                className={`h-10 px-3 py-2 rounded-md border ${errors.education?.[index]?.institution ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.education[index].institution}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edu-years-${index}`} className="text-gray-700 font-medium">
              Years <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`edu-years-${index}`}
              value={edu.years}
              onChange={(e) => handleEducationChange(index, "years", e.target.value)}
              className={`h-10 px-3 py-2 rounded-md border ${errors.education?.[index]?.years ? "border-red-500" : "border-gray-300"}`}
              placeholder="e.g., 2016-2020"
            />
            {errors.education?.[index]?.years && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.education[index].years}
              </p>
            )}
          </div>
        </Card>
      ))}
      <Button
        type="button"
        onClick={addEducation}
        variant="outline"
        className="w-full border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-transparent text-sm"
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </div>
  )
}
