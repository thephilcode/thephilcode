import { getPayload } from 'payload';
import config from '@payload-config';
import type { Project } from '@/types/project';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'createdAt',
  });
  return docs as Project[];
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects projects={projects} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
