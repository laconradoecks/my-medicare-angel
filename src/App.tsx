import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import { paths } from '@/routes';

import Home from '@/pages/Home';
import MedicareExplained from '@/pages/learn/MedicareExplained';
import OriginalMedicare from '@/pages/learn/OriginalMedicare';
import MedicareAdvantage from '@/pages/learn/MedicareAdvantage';
import Supplements from '@/pages/learn/Supplements';
import PartD from '@/pages/learn/PartD';
import MedicareVsMedicaid from '@/pages/learn/MedicareVsMedicaid';
import Enrollment from '@/pages/learn/Enrollment';
import HmoPlans from '@/pages/learn/advantage/HmoPlans';
import PpoPlans from '@/pages/learn/advantage/PpoPlans';
import PffsPlans from '@/pages/learn/advantage/PffsPlans';
import MsaPlans from '@/pages/learn/advantage/MsaPlans';
import SpecialNeedsPlans from '@/pages/learn/advantage/SpecialNeedsPlans';
import Compare from '@/pages/compare/Compare';
import CompareAdvantage from '@/pages/compare/CompareAdvantage';
import CompareSupplements from '@/pages/compare/CompareSupplements';
import Partners from '@/pages/Partners';
import Turning65 from '@/pages/situation/Turning65';
import EmployerCoverage from '@/pages/situation/EmployerCoverage';
import Veterans from '@/pages/situation/Veterans';
import AreasWeServe from '@/pages/situation/AreasWeServe';
import Faqs from '@/pages/Faqs';
import Articles from '@/pages/Articles';
import Article from '@/pages/Article';
import Quote from '@/pages/forms/Quote';
import Contact from '@/pages/forms/Contact';
import Book from '@/pages/forms/Book';
import Refer from '@/pages/forms/Refer';
import { Disclaimers, Privacy, Terms } from '@/pages/legal/LegalPages';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.home} element={<Home />} />

        {/* Learn Medicare */}
        <Route path={paths.learn} element={<MedicareExplained />} />
        <Route path={paths.learnOriginal} element={<OriginalMedicare />} />
        <Route path={paths.learnAdvantage} element={<MedicareAdvantage />} />
        <Route path={paths.learnSupplements} element={<Supplements />} />
        <Route path={paths.learnPartD} element={<PartD />} />
        <Route path={paths.learnMedicaid} element={<MedicareVsMedicaid />} />
        <Route path={paths.enrollment} element={<Enrollment />} />
        <Route path={paths.maHmo} element={<HmoPlans />} />
        <Route path={paths.maPpo} element={<PpoPlans />} />
        <Route path={paths.maPffs} element={<PffsPlans />} />
        <Route path={paths.maMsa} element={<MsaPlans />} />
        <Route path={paths.maSnp} element={<SpecialNeedsPlans />} />

        {/* Compare */}
        <Route path={paths.compare} element={<Compare />} />
        <Route path={paths.compareAdvantage} element={<CompareAdvantage />} />
        <Route path={paths.compareSupplements} element={<CompareSupplements />} />
        <Route path={paths.partners} element={<Partners />} />

        {/* Your situation */}
        <Route path={paths.turning65} element={<Turning65 />} />
        <Route path={paths.employer} element={<EmployerCoverage />} />
        <Route path={paths.veterans} element={<Veterans />} />
        <Route path={paths.areas} element={<AreasWeServe />} />

        {/* Resources */}
        <Route path={paths.blog} element={<Articles />} />
        <Route path={paths.articlePattern} element={<Article />} />
        <Route path={paths.faqs} element={<Faqs />} />
        {/* Events & Seminars stays unrouted until the client supplies real dates
            and venues: src/pages/Events.tsx and its nav links are ready to restore. */}
        <Route path={paths.refer} element={<Refer />} />

        {/* Convert */}
        <Route path={paths.quote} element={<Quote />} />
        <Route path={paths.contact} element={<Contact />} />
        <Route path={paths.book} element={<Book />} />

        {/* Legal */}
        <Route path={paths.privacy} element={<Privacy />} />
        <Route path={paths.terms} element={<Terms />} />
        <Route path={paths.disclaimers} element={<Disclaimers />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
