import Link from "next/link";

const Nav = ({ children }: {children: React.ReactNode}) => {

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">Progue for Kafka</a>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* <!-- Navbar menu content here --> */}
                <li><a>Navbar Item 1 Hides on Mobile</a></li>
                <li><a>Navbar Item 2 Hides on Mobile</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- Page content here --> */}
          {children}
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}
            <li><Link href="/">Landing</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/signup">Signup</Link></li>
            <li><Link href="/metrics">Metrics</Link></li>
          </ul>
        </div>
      </div>




      
      



    </>
  )
}

export default Nav;

