"use client"
import Link from "next/link";
import { useState } from "react";

type NavProps = {
  children: React.ReactNode
}

const Nav: React.FC<NavProps> = ({ children }) => {
  const [theme, setTheme] = useState("garden");

  const swapTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "garden" ? "dark" : "garden";
      const html = document.querySelector('html');
      html?.setAttribute("data-theme", newTheme);
      return newTheme;
    })
  }

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1">
              <Link className="flex-0 btn btn-ghost px-2 lg:hidden" href="/">
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase">kafka<span className="text-base-content uppercase">PRAAG</span></span> 
                </div>
              </Link>
            </div>
            <div className="flex-none block">
              <ul className="menu menu-horizontal">
                {/* <!-- Navbar menu content here --> */}
                {/* <li><a>Navbar Item 1 Hides on Mobile</a></li> */}
                <label className="swap swap-rotate">
                  {/* <!-- this hidden checkbox controls the state --> */}
                  <input type="checkbox" onClick={swapTheme} />
                  {/* <!-- moon icon --> */}
                  <svg className="swap-on fill-current w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                  {/* <!-- sun icon --> */}
                  <svg className="swap-off fill-current w-6 h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                </label>
              </ul>
            </div>
          </div>
          {/* <!-- Page content here --> */}
          {children}
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
          <div className="bg-base-200 w-80">
            <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
              <Link className="flex-0 btn btn-ghost px-2" href="/">
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase">kafka<span className="text-base-content uppercase">PRAAG</span></span> 
                </div>
              </Link>
            </div>
            <ul className="menu p-4 flex flex-col font-semibold text-lg">
              {/* <!-- Sidebar content here --> */}
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Signup</Link></li>
              <li><Link href="/overall">Overall Metrics</Link></li>
              <li><Link href="/brokers">Broker Metrics</Link></li>
              <li><Link href="/producers">Producer Metrics</Link></li>
              <li><Link href="/topics">Topic Metrics</Link></li>
              <li><Link href="/topicsnames">Topic Names</Link></li>
              <li><Link href="/testing">Cluster Testing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav;

