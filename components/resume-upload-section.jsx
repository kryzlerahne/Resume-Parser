"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Loader2, UploadCloud, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResumeUploadSection({ file, isProcessing, handleFileUpload, handleRemoveFile, processResume }) {
  return (
    <Card className="p-5 bg-blue-50 border border-blue-200 shadow-inner rounded-lg">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg font-bold text-blue-800 flex items-center gap-3">
          <UploadCloud className="h-5 w-5 text-blue-600" /> Upload Resume
        </CardTitle>
        <CardDescription className="text-sm text-blue-700">
          Upload your PDF or Word resume to automatically fill the form fields below.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Label
            htmlFor="resume-upload"
            className="flex-1 cursor-pointer border-2 border-dashed border-blue-300 rounded-md p-3 text-center text-blue-800 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Choose File</span>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Label>
          <Button
            onClick={processResume}
            disabled={!file || isProcessing}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-md shadow-sm transition-all duration-200"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
              </>
            ) : (
              "Extract & Fill"
            )}
          </Button>
        </div>
        {file && (
          <Alert className="mt-2 bg-white border-gray-300 text-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </AlertDescription>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
