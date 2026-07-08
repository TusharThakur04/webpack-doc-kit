import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import FeaturesSection from '../../components/HomePage/FeaturesSection';
import HomeSponsorSection from '../../components/HomePage/HomeSponsorSection';

export default ({ metadata, children }) => {
  return (
    <>
      <NavBar metadata={metadata} />
      {/* rendering hero + configSection described at root index.md*/}
      {children}
      <FeaturesSection />
      <HomeSponsorSection />
      <Footer />
    </>
  );
};
