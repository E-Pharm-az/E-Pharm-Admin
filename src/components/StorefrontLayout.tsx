import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import Logo from "@/assets/logo.png";
import { Home, Menu } from "lucide-react";

const StorefrontLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden border-r bg-muted/40 w-[200px] md:block lg:min-w-[240px]">
        <div className="flex flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to={"/storefront"}
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                  location.pathname === "/dashboard"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex h-screen w-full flex-col border">
        <header className="flex h-14 items-center gap-4 border-b px-4 bg-muted/40 lg:h-[60px] lg:px-6">
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
        <main className="flex flex-1 flex-col overflow-y-scroll h-screen">
          <ScrollArea className="flex-1 h-full w-full">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default StorefrontLayout;
