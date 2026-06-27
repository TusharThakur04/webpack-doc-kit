import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Hero from '../../components/HomePage/Hero';
import FeaturesSection from '../../components/HomePage/FeaturesSection';
import HomeSponsorSection from '../../components/HomePage/HomeSponsorSection';
import ConfigSection from '../../components/HomePage/ConfigSection';

export default ({ metadata, children }) => {
  return (
    <>
      <NavBar metadata={metadata} />
      <Hero />
      <ConfigSection>{children}</ConfigSection>
      <FeaturesSection />
      <HomeSponsorSection />
      <Footer />
    </>
  );
};
