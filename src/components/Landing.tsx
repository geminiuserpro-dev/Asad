import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { SocialProof } from './SocialProof';
import { HowItWorks } from './HowItWorks';
import { Templates } from './Templates';
import { Stats } from './Stats';
import { Cta } from './Cta';
import { Footer } from './Footer';

export default function Landing({ setView, setModal }: any) {
  return (
    <div id="main-content">
      <Navigation setView={setView} setModal={setModal} />
      <Hero setView={setView} />
      <SocialProof />
      <HowItWorks />
      <Templates />
      <Stats />
      <Cta setView={setView} />
      <Footer />
    </div>
  );
}
