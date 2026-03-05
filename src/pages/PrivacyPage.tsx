import { usePalette } from "@/hooks/useTheme";

export default function PrivacyPage() {
  const { palette } = usePalette();

  const sections = [
    { title: "1. Information We Collect", content: "OpenCHS collects information necessary for child protection case management, including: contact information of helpline users and counselors, case details and notes, call recordings and transcriptions (when enabled), system usage analytics. All personal data of children is handled with the highest level of sensitivity and in accordance with applicable child protection regulations." },
    { title: "2. How We Use Information", content: "Information collected through OpenCHS is used exclusively for: managing child protection cases and follow-ups, providing AI-powered analysis and recommendations to counselors, generating anonymized aggregate reports for stakeholders, improving the platform's effectiveness and accuracy. We never sell, share, or use personal data for commercial purposes." },
    { title: "3. Data Storage and Security", content: "All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. Data is stored in the deploying organization's infrastructure — OpenCHS does not centrally store case data. Access is controlled through role-based access control (RBAC) with comprehensive audit logging." },
    { title: "4. Data Retention", content: "Data retention policies are configurable per deployment and must comply with local regulations. Default retention periods can be set for different data types. When data is deleted, it is permanently removed from all systems including backups within 30 days." },
    { title: "5. Children's Privacy", content: "OpenCHS is specifically designed to protect children's privacy. All child-related data is subject to enhanced protections including: restricted access based on need-to-know principles, automatic anonymization in reports and analytics, age-appropriate consent mechanisms, special handling for sensitive case categories." },
    { title: "6. Third-Party Services", content: "The AI Service processes data locally within the deployment infrastructure. No case data is sent to external AI providers. Integration adapters (telephony, messaging) are configured by the deploying organization and subject to their own privacy policies." },
    { title: "7. Your Rights", content: "Depending on your jurisdiction, you may have rights including: access to your personal data, correction of inaccurate data, deletion of your data, data portability, objection to processing. Contact your organization's data protection officer or reach out to us at privacy@openchs.org." },
    { title: "8. Updates to This Policy", content: "This privacy policy may be updated periodically. Significant changes will be communicated through the platform and documented in our changelog. Last updated: February 2024." },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-12">
      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
      <p className={`mb-12 text-lg ${palette.subtle}`}>
        How OpenCHS handles, protects, and respects your data.
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
