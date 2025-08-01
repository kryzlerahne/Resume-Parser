"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export default function PersonalInfoForm({ formData, handleInputChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-gray-700 font-medium">
          First Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className={`h-10 px-3 py-2 rounded-md border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-gray-700 font-medium">
          Last Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className={`h-10 px-3 py-2 rounded-md border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.lastName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`h-10 px-3 py-2 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactNumber" className="text-gray-700 font-medium">
          Contact Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
          className={`h-10 px-3 py-2 rounded-md border ${errors.contactNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
        />
        {errors.contactNumber && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.contactNumber}
          </p>
        )}
      </div>
    </div>
  )
}
