import '@app/globals.css'
import Footer from '@components/Footer';
import Provider from '@components/Provider';
import { SessionProvider } from "next-auth/react"


export const metadata = {
  title: 'kafkaPRAAG',
  description: 'A health and performance visualizer',
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  return (
    <Provider>
    <html lang="en" data-theme="garden">
      <body>
        <main>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
    </Provider>
  )
}

export default RootLayout;