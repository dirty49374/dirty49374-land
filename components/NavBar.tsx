import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

type NavBarProps = {
}

const NavBar: FC<NavBarProps> = () => {
  const { asPath } = useRouter();
  const {
    home,
    blogs
  } = {
    home:  asPath === '/',
    blogs: asPath.startsWith('/blogs'),
  };

  return (
    <div className="bg-slate-700">
      <div className="flex flex-row items-center justify-between max-w-4xl w-full mx-auto gap-2">
        <div className="rounded bg-slate-900 py-1 px-2 m-1">
          dirty49374
        </div>
        <div className="flex-1">
          <div className={"flex-1 py-1 px-2 inline-block" + (home ? ' bg-slate-500' : '')}>
            <Link href="/">HOME</Link>
          </div>
          <div className={"flex-1 py-1 px-2 inline-block" + (blogs ? ' bg-slate-500' : '')}>
            <Link href="/blogs">BLOGS</Link>
          </div>
        </div>
        <div>
        </div>

      </div>
    </div>
  )
}

export default NavBar;
