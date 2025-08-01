import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Globe } from "lucide-react"

export default function LoadingModal({ isSubmitting }) {
  return (
    <Dialog open={isSubmitting} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md rounded-lg shadow-xl flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm">
        <div className="relative w-40 h-40 flex items-center justify-center mb-2">
          {/* Globe */}
          <Globe className="h-24 w-24 text-blue-800 animate-globe-pulse" strokeWidth={1} />

          {/* Expanding circles for a "scanning" or "connecting" effect */}
          <div
            className="absolute inset-0 rounded-full border border-blue-400 opacity-0 animate-expand-fade"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border border-blue-400 opacity-0 animate-expand-fade"
            style={{ animationDelay: "0.6s" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border border-blue-400 opacity-0 animate-expand-fade"
            style={{ animationDelay: "1.2s" }}
          ></div>
        </div>
        <DialogTitle
          className="mt-4 text-xl font-semibold text-gray-800 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Connecting you to global opportunities...
        </DialogTitle>
        <DialogDescription
          className="text-gray-600 mt-2 text-sm text-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Please wait while we process your registration.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}