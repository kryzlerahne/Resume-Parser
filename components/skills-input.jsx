"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, XCircle } from "lucide-react"

export default function SkillsInput({
  skills,
  newSkillInput,
  setNewSkillInput,
  handleAddSkill,
  handleRemoveSkill,
  errors,
}) {
  return (
    <div className="space-y-2 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">Skills (Optional)</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm font-normal px-3 py-1 flex items-center gap-1">
            {skill}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
              onClick={() => handleRemoveSkill(index)}
            >
              <XCircle className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          id="new-skill"
          value={newSkillInput}
          onChange={(e) => setNewSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddSkill()
            }
          }}
          className={`flex-1 h-10 px-3 py-2 rounded-md border ${errors.skills ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
          placeholder="Add a skill (e.g., JavaScript)"
        />
        <Button
          type="button"
          onClick={handleAddSkill}
          variant="outline"
          className="border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-transparent text-sm px-4 py-2 rounded-md shadow-sm"
        >
          Add Skill
        </Button>
      </div>
      {errors.skills && (
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.skills}
        </p>
      )}
    </div>
  )
}
