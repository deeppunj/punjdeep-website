import { createFileRoute } from '@tanstack/react-router';
import { AboutSection, ContactSection } from '@/components/portfolio-sections';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/about')({head:()=>pageHead('About Deep Punj, PhD — Optics, Measurement & Data','Deep Punj’s background in optical engineering and biomedical research connects experimental measurement with scientific software and data analysis.','/about'),component:AboutPage});
function AboutPage(){return <><main id="main"><AboutSection standalone/></main><ContactSection/></>;}
