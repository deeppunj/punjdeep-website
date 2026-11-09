import { createFileRoute } from '@tanstack/react-router';
import { ContactSection } from '@/components/portfolio-sections';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/contact')({staticData:{sitemap:true},head:()=>pageHead('Contact Deep Punj, PhD — Ghent, Belgium','Email Deep Punj or connect on LinkedIn to discuss data analyst, data scientist and optical engineering roles.','/contact'),component:ContactPage});
function ContactPage(){return <main id="main"><ContactSection standalone/></main>;}
