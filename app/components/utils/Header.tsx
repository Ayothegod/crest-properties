import { AlignRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { navLists } from "~/lib/data";
import Logo from "./Logo";
import { useLocation, Link } from "@remix-run/react";
import { Button } from "../ui/button";

export default function Header() {
  const location = useLocation();

  return (
    <div className={`bg-transparent`}>
      <div className="bodySize flex items-center justify-between py-2">
        <Logo />

        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 text-sm">
            {navLists.map((item, idx) => (
              <div key={item.id}>
                {item.isButton && item.withIcon && (
                  <Link to={item.url}>
                    <Button className="bg-black text-white px-4 py-2 rounded-full flex gap-2 items-center">
                      {item.title}
                      <ArrowUpRight />
                    </Button>
                  </Link>
                )}

                {!item.isButton && item.withIcon && (
                  <Link
                    to={item.url}
                    className={`${
                      location.pathname == item.url && "border-b border-b-black"
                    }`}
                  >
                    <li className="flex items-center">
                      {item.title} <ChevronDown />
                    </li>
                  </Link>
                )}

                {!item.isButton && !item.iconName && (
                  <Link
                    to={item.url}
                    className={`${
                      location.pathname == item.url && "border-b border-b-black"
                    }`}
                  >
                    <li>{item.title}</li>
                  </Link>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="md:hidden">
          <AlignRight />
        </div>
      </div>
    </div>
  );
}
