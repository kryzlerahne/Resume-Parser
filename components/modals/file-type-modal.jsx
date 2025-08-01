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

export default function FileTypeModal({ showFileTypeModal, setShowFileTypeModal, fileTypeError }) {
  return (
    <Dialog open={showFileTypeModal} onOpenChange={setShowFileTypeModal}>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2 text-xl font-semibold animate-fade-in">
            <AlertCircle className="h-6 w-6" /> Invalid File Type
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2 text-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {fileTypeError}
          </DialogDescription>
        </DialogHeader>
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
