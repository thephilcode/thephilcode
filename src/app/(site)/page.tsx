import { getPayload } from 'payload';
import config from '@payload-config';
import type { HeroSetting, AboutSetting, ContactSetting, Project } from '@/payload-types';
import ScrollProgress from '@/components/animations/ScrollProgress';
import ScrollColorShift from '@/components/animations/ScrollColorShift';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

async function getPageData() {
  const payload = await getPayload({ config });

  const [{ docs: projects }, hero, about, contact] = await Promise.all([
    payload.find({
      collection: 'projects',
      limit: 100,
      sort: 'createdAt',
      depth: 1,
      where: { _status: { equals: 'published' } },
    }),
    payload.findGlobal({ slug: 'hero-settings', depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'about-settings', depth: 0 }).catch(() => null),
    payload.findGlobal({ slug: 'contact-settings', depth: 0 }).catch(() => null),
  ]);

  return {
    projects: projects as Project[],
    hero: hero as HeroSetting | null,
    about: about as AboutSetting | null,
    contact: contact as ContactSetting | null,
  };
}

export default async function Home() {
  const { projects, hero, about, contact } = await getPageData();

  return (
    <>
      <ScrollProgress />
      <ScrollColorShift />
      <Nav />
      <main>
        <Hero hero={hero} />
        <Projects projects={projects} />
        <About about={about} />
        <Contact contact={contact} />
      </main>
      <Footer />
    </>
  );
}
