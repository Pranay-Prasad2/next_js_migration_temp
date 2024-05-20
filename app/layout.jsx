import 'build.css'
import '@/styles/global.css'
import NavBar from '@/Components/NavBar'
import Footer from '@/Components/Footer'
import TopLoader from './progress'
export const metadata = {
  title: "ERIP",
  descritption: "Electronics Repairs in Peace"
}
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <TopLoader/>
        <main >
          <NavBar />
          <div className="app">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}

export default Rootlayout