import HeroSection from "./HeroSection";
import RichTextSection from "./RichTextSection";
import FAQSection from "./FAQSection";
import GallerySection from "./GallerySection";
import CardsSection from "./CardsSection";
import FeaturesSection from "./FeaturesSection";
import ContactSection from "./ContactSection";

export default function SectionRenderer({ section }) {
  switch (section.type) {
    case "hero":
      return <HeroSection data={section} />;

    case "richtext":
      return <RichTextSection data={section} />;

    case "faq":
      return <FAQSection data={section} />;

    case "gallery":
      return <GallerySection data={section} />;
    case "cards":
      return <CardsSection data={section} />;
    case "features":
  return <FeaturesSection data={section} />;
  case "contact":
  return <ContactSection data={section} />;

    default:
      return null;
  }
}