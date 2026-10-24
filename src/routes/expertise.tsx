import { createFileRoute } from '@tanstack/react-router';
import { ExpertiseSection, ContactSection } from '@/components/portfolio-sections';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/expertise')({staticData:{sitemap:true},head:()=>pageHead('Evidence-linked Expertise — Deep Punj, PhD','Optical engineering, scientific Python, applied machine learning and analytics demonstrated through public project studies.','/expertise'),component:ExpertisePage});
function ExpertisePage(){return <><main id="main"><ExpertiseSection standalone/></main><div className="border-t border-border"><ContactSection/></div></>;}
