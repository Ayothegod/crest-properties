import { A } from "@solidjs/router";
import Logo from "./Logo";

export default function Header() {
  return (
    <div>
      <Logo />

      <div>
        <A href="/">Index</A>
        <A href="/about">About</A>
      </div>
    </div>
  );
}
