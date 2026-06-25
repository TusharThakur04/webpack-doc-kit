import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

export default function Home({ metadata, children }) {
  return (
    <>
      <NavBar metadata={metadata} />
      {/* MDX content described inside root index.md */}
      {children}
      <Footer />
    </>
  );
}
