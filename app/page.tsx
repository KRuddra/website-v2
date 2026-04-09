import Hero from "@/components/Hero";
import PhotoCarousel from "@/components/PhotoCarousel";
import ExperienceList from "@/components/ExperienceList";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function HomePage() {
  return (
    <div className="space-y-20">
      <Hero />
      <ExperienceList />
      <PhotoCarousel />
      <Skills />
      <FeaturedProjects />
    </div>
  );
}
