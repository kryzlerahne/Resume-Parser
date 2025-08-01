import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

export default function ValidationModal({ showValidationModal, setShowValidationModal, validationErrorsList }) {
  return (
    <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2 text-xl font-semibold animate-fade-in">
            <AlertCircle className="h-6 w-6" /> Please Complete Required Fields
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2 text-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The following fields need to be filled out or corrected before you can submit:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 text-sm">
            {validationErrorsList.map((error, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-red-500">•</span> {error}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-md shadow-sm transition-all duration-200"
            >
              Got it
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
