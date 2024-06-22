import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import Logo from "@/assets/logo.png";
import { Home, Menu, Package, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";

const StorefrontLayout = () => {
  const location = useLocation();

  return (
    <div className="flex w-full h-full">
      <div className="hidden bg-muted/40 md:block min-w-[80px] h-full">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Separator />
            <Link
              to={"/storefront"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                location.pathname === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
            </Link>
            <Link
              to={"/storefront"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                location.pathname === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
            </Link>
            <Link
              to={"/storefront"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                location.pathname === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-neutral-100 rounded-md mr-4">
        <header>
          <Sheet>
            <SheetTrigger asChild>
              <button className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col" side="left">
              <nav className="grid gap-2 text-lg font-medium">
                <img src={Logo} alt="Logo" />
                <Link
                  to={"/dashboard"}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/dashboard"
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 flex flex-col overflow-hidden p-4">
          <ScrollArea className="flex-1 overflow-y-auto w-full">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default StorefrontLayout;
