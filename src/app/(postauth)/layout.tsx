import '@app/globals.css'
import Nav from '@components/Nav';
import Footer from '@components/Footer';

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
        <main className="drop-shadow-lg">
          <Nav >
            {children}
          </Nav>
          <Footer/>
        </main>
      </body>
    </html>
  )
}

export default RootLayout;