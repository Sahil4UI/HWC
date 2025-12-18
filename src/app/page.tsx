import { Hero } from "@/components/home/Hero";
import { SkillsGrid } from "@/components/home/SkillsGrid";
import { ToolsPreview } from "@/components/home/ToolsPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { CommunityCTA } from "@/components/home/CommunityCTA";
import { RecentBlogs } from "@/components/home/RecentBlogs";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsGrid />
      <ToolsPreview />
      <WhyUs />
      <RecentBlogs />
      <CommunityCTA />
    </>
  );
}
