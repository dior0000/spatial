import Nav from './components/Nav';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Demo from './components/Demo';
import HowItWorks from './components/HowItWorks';
import Moat from './components/Moat';
import WhyNow from './components/WhyNow';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Demo />
        <HowItWorks />
        <Moat />
        <WhyNow />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
