import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"


function LoadingButton() {
  return (
    <Button disabled className="">
        <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
        Loading
    </Button>
  )
}

export default LoadingButton