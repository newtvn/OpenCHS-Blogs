import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import DocsPage from "./pages/DocsPage";
import ApiReferencePage from "./pages/ApiReferencePage";
import ContributorsPage from "./pages/ContributorsPage";
import ContactPage from "./pages/ContactPage";
import ForumPage from "./pages/ForumPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import LicensePage from "./pages/LicensePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/api-reference" element={<ApiReferencePage />} />
          <Route path="/contributors" element={<ContributorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
