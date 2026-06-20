import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

import FeaturesSection from '../../components/HomePage/FeaturesSection/index';
import ConfigSection from '../../components/HomePage/ConfigSection/index';
import Hero from '../../components/HomePage/Hero/index';
import HomeSponsorSection from '../../components/HomePage/HomeSponsorSection/index';

export default function Home({ metadata }) {
  return (
    <>
      <NavBar metadata={metadata} />
      <Hero />
      <ConfigSection />
      <FeaturesSection />
      <HomeSponsorSection />
      <Footer />
    </>
  );
}
