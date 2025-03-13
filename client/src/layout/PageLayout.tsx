import { BarChart3, FileText, LogOut, Search, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Link, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <FileText className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === "/admin/dashboard"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === "/admin/users"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              to="/admin/taxes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === "/admin/taxes"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              Taxes
            </Link>
            <Link
              to="/admin/pos"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === "/admin/pos"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              POS Machines
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Link to="/admin/dashboard" className="lg:hidden">
            <FileText className="h-6 w-6" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <User className="h-4 w-4" />
            <span className="sr-only">User</span>
          </Button>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
