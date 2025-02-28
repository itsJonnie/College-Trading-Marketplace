import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Campus Marketplace
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex justify-end">
            <Link href="/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                List Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
