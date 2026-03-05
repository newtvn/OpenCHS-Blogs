import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePalette } from "@/hooks/useTheme";

export default function NotFoundPage() {
  const { palette } = usePalette();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold">404</h1>
        <p className={`mb-8 text-xl ${palette.subtle}`}>Page not found</p>
        <Link to="/">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
