import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <div className="border-b-2 border-seeGreen py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl font-bold tracking-tight text-seeGreen"
        >
          GuriEats
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}

export default Header;
