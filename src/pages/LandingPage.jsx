import FeaturesSection from "../components/Landing/FeatureSection";
import FinalCard from "../components/Landing/FinalCard";
import Footer from "../components/Landing/Footer";
import HeaderSection from "../components/Landing/HeaderSection";
import Navbar from "../components/Landing/Navbar";
import PricingSection from "../components/Landing/PricingSection";
import TrustedBySection from "../components/Landing/TrustedBy";
import WorkflowSection from "../components/Landing/WorkFlow";




const LandingPage = () => {
    return (
        <>
            <Navbar />
            <HeaderSection />
            <TrustedBySection />
            <WorkflowSection />
            <FeaturesSection />
            <PricingSection />
            <FinalCard />
            <Footer />


        </>
    );
};

export default LandingPage;
