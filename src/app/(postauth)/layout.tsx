import '@app/globals.css'
import Nav from '@components/Nav'

export const metadata = {
  title: 'kafkaPRAAG',
  description: 'A health and performance visualizer'
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
          <Nav >
            {children}
          </Nav>
  )
}

export default RootLayout
