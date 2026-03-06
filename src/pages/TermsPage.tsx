import { usePalette } from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function TermsPage() {
  const { palette } = usePalette();

  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using the OpenCHS platform, you agree to be bound by these Terms of Service. If you are using OpenCHS on behalf of an organization, you represent that you have the authority to bind that organization to these terms." },
    { title: "2. License", content: "OpenCHS is licensed under the GNU General Public License v3.0 (GPL-3.0). You are free to use, modify, and distribute the software in accordance with the terms of this license. Any modifications or derivative works must also be released under GPL-3.0." },
    { title: "3. Acceptable Use", content: "OpenCHS is designed exclusively for child protection and related social welfare purposes. You agree to: use the platform only for its intended purpose, comply with all applicable laws and regulations, maintain the confidentiality of sensitive case data, not attempt to circumvent security measures, report any security vulnerabilities responsibly." },
    { title: "4. Data Responsibility", content: "Deploying organizations are the data controllers for all case data processed through OpenCHS. You are responsible for: ensuring compliance with local data protection regulations, implementing appropriate data retention policies, obtaining necessary consents for data processing, maintaining backups and disaster recovery procedures." },
    { title: "5. AI Service Terms", content: "The AI Service provides recommendations and analysis to assist human decision-making. AI outputs are never to be used as the sole basis for decisions affecting children. Organizations must ensure human oversight of all AI-generated recommendations. The AI Service is provided 'as is' — accuracy is not guaranteed." },
    { title: "6. Disclaimers", content: "OpenCHS is provided 'as is' without warranties of any kind, express or implied. The OpenCHS team and contributors are not liable for damages arising from the use of the platform, including but not limited to data loss, service interruptions, or inaccurate AI outputs." },
    { title: "7. Support", content: "Community support is available through the public forum and GitHub issues. Commercial support, training, and consulting services are available through BITZ-IT. Service level agreements (SLAs) are available for organizations requiring guaranteed response times." },
    { title: "8. Changes to Terms", content: "These terms may be updated from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms. Material changes will be communicated through the platform and community channels. Last updated: February 2025." },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-12">
      <SEO title="Terms of Service" description="Terms governing the use of the OpenCHS platform." />
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Terms of Service</h1>
      <p className={`mb-12 text-lg ${palette.subtle}`}>
        Terms governing the use of the OpenCHS platform.
      </p>
      <div className="space-y-8">
        {sections.map((s, idx) => (
          <div key={idx} className={`rounded-xl border p-6 ${palette.border} ${palette.card}`}>
            <h2 className="mb-3 text-xl font-semibold">{s.title}</h2>
            <p className={`leading-relaxed ${palette.subtle}`}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
