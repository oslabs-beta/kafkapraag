import '@app/globals.css'
import Footer from '@components/Footer'
import Provider from '@components/Provider'

export const metadata = {
  title: 'kafkaPRAAG',
  description: 'A health and performance visualizer'
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    // Provider component to allow NextAuth authentication
    <Provider>
    <html lang="en" data-theme="mytheme">
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

export default RootLayout
