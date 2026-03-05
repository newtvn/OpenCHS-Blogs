import { usePalette } from "@/hooks/useTheme";

export default function LicensePage() {
  const { palette } = usePalette();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-12">
      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">License</h1>
      <p className={`mb-12 text-lg ${palette.subtle}`}>
        openCHS is free and open source software.
      </p>

      <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
        <h2 className="mb-4 text-2xl font-semibold">GNU General Public License v3.0</h2>
        <div className={`space-y-4 leading-relaxed ${palette.subtle}`}>
          <p>
            openCHS is licensed under the GNU General Public License v3.0 (GPL-3.0). This means you are free to:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li><strong className="text-inherit">Use</strong> — Run the software for any purpose, including commercial use</li>
            <li><strong className="text-inherit">Study</strong> — Access the source code and understand how the software works</li>
            <li><strong className="text-inherit">Modify</strong> — Make changes to the software to suit your needs</li>
            <li><strong className="text-inherit">Distribute</strong> — Share copies of the original or modified software</li>
          </ul>

          <h3 className="pt-4 text-lg font-semibold text-inherit">Conditions</h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Any distributed copies or modifications must also be licensed under GPL-3.0</li>
            <li>You must include the original copyright notice and license text</li>
            <li>You must disclose the source code of any distributed modifications</li>
            <li>You must state any changes made to the original software</li>
          </ul>

          <h3 className="pt-4 text-lg font-semibold text-inherit">Why GPL-3.0?</h3>
          <p>
            We chose GPL-3.0 because we believe child protection technology should be free and open.
            The GPL ensures that any improvements made to openCHS benefit the entire community.
            Organizations that modify and deploy openCHS must share their improvements back,
            creating a virtuous cycle of innovation for child protection.
          </p>

          <h3 className="pt-4 text-lg font-semibold text-inherit">Full License Text</h3>
          <p>
            The complete GPL-3.0 license text is available in the LICENSE file in the
            openCHS GitHub repository.
          </p>
        </div>
      </div>

      <div className={`mt-8 rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
        <h2 className="mb-4 text-xl font-semibold">Third-Party Licenses</h2>
        <p className={`mb-4 ${palette.subtle}`}>
          openCHS uses various open source libraries and tools, each with their own licenses.
          A complete list of dependencies and their licenses is maintained in the repository.
        </p>
        <div className={`space-y-2 text-sm ${palette.subtle}`}>
          <div className="flex justify-between"><span>React</span><span>MIT</span></div>
          <div className="flex justify-between"><span>Node.js</span><span>MIT</span></div>
          <div className="flex justify-between"><span>PostgreSQL</span><span>PostgreSQL License</span></div>
          <div className="flex justify-between"><span>TailwindCSS</span><span>MIT</span></div>
          <div className="flex justify-between"><span>Docker</span><span>Apache 2.0</span></div>
        </div>
      </div>
    </div>
  );
}
