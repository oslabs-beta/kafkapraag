import './globals.css'
import Nav from './components/Nav';
import Footer from './components/Footer';

export const metadata = {
  title: 'Progue for Kafka',
  description: 'A health and performance visualizer',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Nav/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  )
}
