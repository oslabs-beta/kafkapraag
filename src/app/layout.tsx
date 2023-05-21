import './globals.css'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState } from 'react';

export const metadata = {
  title: 'kafkaPRAAG',
  description: 'A health and performance visualizer',
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  return (
    <html lang="en" data-theme="garden">
      <body>
        <main>
          <Nav>
            {children}
          </Nav>
          <Footer/>
        </main>
      </body>
    </html>
  )
}

export default RootLayout;