'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import logo from 'src/assets/kafkaPRAAG-logo-transparent.png'
// import { getProviders, signIn, signOut } from 'next-auth/react'
import { signOut } from 'next-auth/react'

interface NavProps {
  children: React.ReactNode
}

const Nav: React.FC<NavProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState('mytheme')

  const swapTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'mytheme' ? 'dark' : 'mytheme'
      const html = document.querySelector('html')
      html?.setAttribute('data-theme', newTheme)
      return newTheme
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
                <Image
                  src={logo}
                  alt="kafkaPRAAG logo"
                  width={90}
                  // height={70}
                />
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
          <div className="w-80">
            <div className="z-20 sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
              <Link className="flex-0 btn btn-ghost px-2 hover:bg-inherit" href="/">
                <div className="font-title hover:bg-inherit text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                <Image
                  src={logo}
                  alt="kafkaPRAAG logo"
                  width={250}
                  height={250}
                  className="hover:bg-inherit"
                />
                </div>
              </Link>
            </div>
            <ul className="menu p-4 flex flex-col font-light text-lg">
              {/* <!-- Sidebar content here --> */}
              <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit font-medium text-lg" href="/overall"><svg fill="#000000" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M4.64648,10.64648,7,8.293l2,2,1.64648-1.64649.707.707L9,11.707l-2-2L5.35352,11.35352ZM14,2V14H2V2ZM4,7H7V4H4Zm8,1H4v4h8V8Zm0-4H8V7h4Z"></path>
                </g>
              </svg>
              Overall Metrics</Link></li>
                            <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit" href="/brokers"><svg fill="#000000" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M12,10V7H8V5H9V2H6V5H7V7H3v3H2v3H5V10H4V8H7v2H6v3H9V10H8V8h3v2H10v3h3V10ZM4,12H3V11H4Zm4,0H7V11H8Zm4,0H11V11h1Z"></path>
                </g>
              </svg>
              Broker Metrics</Link></li>
                            <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit" href="/producers"><svg fill="#000000" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M5.5,2.5a1,1,0,1,0-1,1A.99993.99993,0,0,0,5.5,2.5Zm7.5.00181L9.6381.819,10.13416,2.112H7v.82759h3.13416L9.6381,4.181ZM12.45453,5H3.58319A.58545.58545,0,0,0,3,5.5978V12.5l1.5,1.49713L12.35791,14a.6022.6022,0,0,0,.6-.60083L13,5.5462A.51287.51287,0,0,0,12.45453,5ZM11,13H8V11H6v2H5V10h6Zm1-4H4V6h8Z"></path>
                </g>
              </svg>
              Producer Metrics</Link></li>
                            <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit" href="/topics"><svg fill="#000000" height="32px" width="32px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M6,10c0-.34729,.05847-.67847,.14203-1h-1.14203v-1h1.55634c.22052-.37823,.49811-.71362,.82593-1h-2.38226v-1h5c.73181,0,1.4093,.21185,2,.55634V2H3V13H7.38226c-.8399-.73376-1.38226-1.79968-1.38226-3Zm-1-6h5v1H5v-1Z"></path>
                  <path className="cls-1" d="M9.98916,7.01086c-.02514,0-.05008,.00031-.07535,.00092-1.65636,.04083-2.96598,1.41669-2.92514,3.07303,.04021,1.6311,1.37528,2.92609,2.99769,2.92609,.02514,0,.05007-.00034,.07535-.00095,.61566-.01517,1.1826-.21597,1.65086-.54587l1.59321,1.52966,.68951-.72437-1.57895-1.51596c.36822-.51218,.58726-1.13727,.57051-1.8165-.04022-1.6311-1.37528-2.92606-2.99769-2.92606h0Zm.01084,4.98914c-1.10278,0-2-.89722-2-2,0-1.10284,.89722-2,2-2,1.10284,0,2,.89716,2,2,0,1.10278-.89716,2-2,2h0Z"></path>
                </g>
              </svg>
              Topic Metrics</Link></li>
                            <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit" href="/topicsnames"><svg fill="#000000" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M13,2h1V5H13Zm0,8h1V6H13Zm0,4h1V11H13ZM4,7h6V6H4ZM4,5h6V4H4ZM2,2H12V14H2Z"></path>
                </g>
              </svg>
              Topic Names</Link></li>
                            <li className="hover:text-primary hover:bg-inherit " ><Link className="hover:bg-inherit" href="/testing"><svg fill="#000000" height="32px" width="32px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className="cls-1" d="M2,2V7.10938C2,10.39063,8,14,8,14s6-3.28125,6-6.89062V2Zm4.78824,8.2L4,7.3875,5.225,6.2,6.77759,7.81064,10.83749,3.8,12,5.0125Z"></path>
                </g>
              </svg>
              Cluster Testing</Link></li>
              <li className="hover:text-primary hover:bg-inherit mt-40 sm:mt-64 text-slate-500 font-light"><button onClick={(e) => {
                signOut({ callbackUrl: 'http://localhost:3000' })
                  .catch((err) => { console.log(err) })
              }}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
