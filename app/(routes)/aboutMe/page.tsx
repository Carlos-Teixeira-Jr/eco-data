import AboutMeSection from "../../components/aboutMe/AboutMeSection";
import BannerSection from "../../components/aboutMe/BannerSection";
import TechStack from "../../components/aboutMe/TechStack";

const AboutMe = () => {
  return (
    <main className="flex flex-col">
      <AboutMeSection />
      <BannerSection />
      <TechStack/>
    </main>
  );
};

export default AboutMe;
