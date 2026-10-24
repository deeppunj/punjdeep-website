import { createFileRoute } from '@tanstack/react-router';
import { ContactSection } from '@/components/portfolio-sections';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/contact')({head:()=>pageHead('Contact Deep Punj, PhD — Gent, Belgium','Connect with Deep Punj on LinkedIn to discuss optical engineering, scientific software, imaging and applied data science.','/contact'),component:ContactPage});
function ContactPage(){return <main id="main"><ContactSection/></main>;}
