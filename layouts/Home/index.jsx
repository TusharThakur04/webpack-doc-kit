import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

import FeaturesSection from '../../components/HomePage/FeaturesSection/FeaturesSection';
import ConfigSection from '../../components/HomePage/ConfigSection/ConfigSection';
import Hero from '../../components/HomePage/Hero/Hero';
import TrustedBy from '../../components/HomePage/TrustedBy/TrustedBy';

export default function Home({ metadata }) {
  return (
    <>
      <NavBar metadata={metadata} />
      <Hero />
      <ConfigSection />
      <FeaturesSection />
      <TrustedBy />
      <Footer />
    </>
  );
}
