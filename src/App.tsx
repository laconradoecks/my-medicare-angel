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
import Compare from '@/pages/compare/Compare';
import CompareAdvantage from '@/pages/compare/CompareAdvantage';
import CompareSupplements from '@/pages/compare/CompareSupplements';
import Partners from '@/pages/Partners';
import Turning65 from '@/pages/situation/Turning65';
import EmployerCoverage from '@/pages/situation/EmployerCoverage';
import Veterans from '@/pages/situation/Veterans';
import Faqs from '@/pages/Faqs';
import Articles from '@/pages/Articles';
import Article from '@/pages/Article';
import Events from '@/pages/Events';
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

        {/* Compare */}
        <Route path={paths.compare} element={<Compare />} />
        <Route path={paths.compareAdvantage} element={<CompareAdvantage />} />
        <Route path={paths.compareSupplements} element={<CompareSupplements />} />
        <Route path={paths.partners} element={<Partners />} />

        {/* Your situation */}
        <Route path={paths.turning65} element={<Turning65 />} />
        <Route path={paths.employer} element={<EmployerCoverage />} />
        <Route path={paths.veterans} element={<Veterans />} />

        {/* Resources */}
        <Route path={paths.blog} element={<Articles />} />
        <Route path={paths.articlePattern} element={<Article />} />
        <Route path={paths.faqs} element={<Faqs />} />
        <Route path={paths.events} element={<Events />} />
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
