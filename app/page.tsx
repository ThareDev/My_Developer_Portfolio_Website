import Hero from '@/app/components/Hero'
import Services from '@/app/components/Services'  
import About from './components/About'
import Projects from './components/Projects'
import Founders from './components/Founders'
import Contact from './components/Contactus'


export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Services />
      <About />
      <Projects />
      <Founders />
      <Contact />

    </main>
  )
}