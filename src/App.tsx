import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import LeistungenHub from "@/pages/LeistungenHub";
import LeistungDetail from "@/pages/LeistungDetail";
import LoesungenHub from "@/pages/LoesungenHub";
import LoesungDetail from "@/pages/LoesungDetail";
import ReferenzenHub from "@/pages/ReferenzenHub";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import InsightsHub from "@/pages/InsightsHub";
import InsightDetail from "@/pages/InsightDetail";
import UeberOnset from "@/pages/UeberOnset";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import CookieEinstellungen from "@/pages/CookieEinstellungen";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leistungen/" element={<LeistungenHub />} />
        <Route path="/leistungen/:slug/" element={<LeistungDetail />} />
        <Route path="/loesungen/" element={<LoesungenHub />} />
        <Route path="/loesungen/:slug/" element={<LoesungDetail />} />
        <Route path="/referenzen/" element={<ReferenzenHub />} />
        <Route path="/referenzen/:slug/" element={<CaseStudyDetail />} />
        <Route path="/insights/" element={<InsightsHub />} />
        <Route path="/insights/:slug/" element={<InsightDetail />} />
        <Route path="/ueber-onset/" element={<UeberOnset />} />
        <Route path="/kontakt/" element={<Kontakt />} />
        <Route path="/impressum/" element={<Impressum />} />
        <Route path="/datenschutz/" element={<Datenschutz />} />
        <Route path="/cookie-einstellungen/" element={<CookieEinstellungen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
