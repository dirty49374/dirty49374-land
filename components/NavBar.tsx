import Link from "next/link";
import { FC } from "react";

type NavBarProps = {
}

const NavBar: FC<NavBarProps> = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 bg-slate-700">
      <div className="rounded bg-slate-900 py-1 px-2 m-1">
        <Link href="/">dirty49374-land</Link>
      </div>
      <div className="flex-1">
        <Link href="/blogs">BLOGS</Link>
      </div>
      <div>
      </div>

    </div>
  )
}

export default NavBar;
