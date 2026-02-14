import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | UKAGV GmbH',
  description: 'Datenschutzerklärung der UKA GV GmbH – Informationen zum Schutz Ihrer personenbezogenen Daten',
}

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-dark-950 text-dark-300">
      {/* Header */}
      <div className="border-b border-dark-800">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl hover:text-fiber-400 transition-colors">
            ← Zurück
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Datenschutzerklärung</h1>
        <p className="text-dark-500 mb-12">Stand: Februar 2026</p>

        <div className="space-y-10 text-base leading-relaxed">
          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Verantwortlicher</h2>
            <p>
              UKA GV GmbH<br />
              Steigerwaldstraße 29<br />
              90409 Nürnberg<br />
              Deutschland
            </p>
            <p className="mt-2">
              Telefon: 0911 47768323<br />
              E-Mail: info@uka-gv.de
            </p>
            <p className="mt-2">
              Geschäftsführer: Gezim Dvorani
            </p>
          </section>

          {/* 2. Übersicht */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Übersicht der Verarbeitungen</h2>
            <p>
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
              Verarbeitung zusammen und verweist auf die betroffenen Personen.
            </p>
            <h3 className="text-lg font-medium text-white mt-4 mb-2">Arten der verarbeiteten Daten</h3>
            <ul className="list-disc list-inside space-y-1 text-dark-400">
              <li>Bestandsdaten (z.B. Namen, Adressen)</li>
              <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z.B. Eingaben in Formularen)</li>
              <li>Nutzungsdaten (z.B. besuchte Seiten, Zugriffszeit)</li>
              <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
            </ul>
          </section>

          {/* 3. Rechtsgrundlagen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Maßgebliche Rechtsgrundlagen</h2>
            <p>
              Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir
              personenbezogene Daten verarbeiten:
            </p>
            <ul className="list-disc list-inside space-y-2 text-dark-400 mt-3">
              <li><strong className="text-dark-200">Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong> – Die betroffene Person hat ihre Einwilligung in die Verarbeitung gegeben.</li>
              <li><strong className="text-dark-200">Vertragserfüllung (Art. 6 Abs. 1 S. 1 lit. b DSGVO)</strong> – Die Verarbeitung ist für die Erfüllung eines Vertrags erforderlich.</li>
              <li><strong className="text-dark-200">Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</strong> – Die Verarbeitung ist zur Wahrung unserer berechtigten Interessen erforderlich.</li>
            </ul>
          </section>

          {/* 4. Sicherheitsmaßnahmen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Sicherheitsmaßnahmen</h2>
            <p>
              Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik,
              der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
              sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte
              und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem
              Risiko angemessenes Schutzniveau zu gewährleisten.
            </p>
            <p className="mt-2">
              Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
              Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten
              als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der
              Verfügbarkeit und ihrer Trennung. Die Übertragung von Daten auf dieser Website erfolgt
              verschlüsselt über HTTPS/TLS.
            </p>
          </section>

          {/* 5. Bereitstellung des Onlineangebotes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Bereitstellung des Onlineangebotes und Webhosting</h2>
            <p>
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können.
              Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und
              Funktionen unserer Online-Dienste an den Browser bzw. das Endgerät der Nutzer zu übermitteln.
            </p>
            <h3 className="text-lg font-medium text-white mt-4 mb-2">Erhobene Daten</h3>
            <ul className="list-disc list-inside space-y-1 text-dark-400">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Inhalt der Anfrage (konkrete Seite)</li>
              <li>Zugriffsstatus/HTTP-Statuscode</li>
              <li>Übertragene Datenmenge</li>
              <li>Website, von der die Anfrage kommt (Referrer)</li>
              <li>Browser und Betriebssystem</li>
            </ul>
            <p className="mt-3">
              <strong className="text-dark-200">Rechtsgrundlage:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO).
            </p>
          </section>

          {/* 6. Kontaktaufnahme */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Kontaktaufnahme</h2>
            <p>
              Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon) werden die Angaben
              des Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung verarbeitet.
            </p>
            <ul className="list-disc list-inside space-y-1 text-dark-400 mt-3">
              <li><strong className="text-dark-200">Verarbeitete Daten:</strong> Name, E-Mail-Adresse, Telefonnummer, Firma, Nachrichteninhalt, hochgeladene Dateien</li>
              <li><strong className="text-dark-200">Rechtsgrundlage:</strong> Vertragserfüllung / vorvertragliche Maßnahmen (Art. 6 Abs. 1 S. 1 lit. b DSGVO), berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)</li>
              <li><strong className="text-dark-200">Speicherdauer:</strong> Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind, in der Regel nach Abschluss der Anfrage, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</li>
            </ul>
          </section>

          {/* 7. Bewerbungen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Bewerbungsverfahren</h2>
            <p>
              Wenn Sie sich bei uns bewerben (z.B. per E-Mail an bewerbung@uka-gv.de), verarbeiten wir Ihre
              Bewerbungsdaten zur Durchführung des Bewerbungsverfahrens.
            </p>
            <ul className="list-disc list-inside space-y-1 text-dark-400 mt-3">
              <li><strong className="text-dark-200">Verarbeitete Daten:</strong> Bewerbungsunterlagen, Lebenslauf, Zeugnisse, Anschreiben, Kontaktdaten</li>
              <li><strong className="text-dark-200">Rechtsgrundlage:</strong> § 26 BDSG i.V.m. Art. 88 DSGVO (Anbahnung eines Beschäftigungsverhältnisses)</li>
              <li><strong className="text-dark-200">Speicherdauer:</strong> Sofern kein Beschäftigungsverhältnis zustande kommt, werden die Daten spätestens 6 Monate nach Abschluss des Bewerbungsverfahrens gelöscht.</li>
            </ul>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Einsatz von Cookies</h2>
            <p>
              Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der
              Seite erforderlich sind. Es werden keine Tracking- oder Analyse-Cookies eingesetzt.
            </p>
            <p className="mt-2">
              <strong className="text-dark-200">Rechtsgrundlage:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f DSGVO).
              Bei technisch notwendigen Cookies ist keine Einwilligung erforderlich (§ 25 Abs. 2 TDDDG).
            </p>
          </section>

          {/* 9. Rechte der Betroffenen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Rechte der betroffenen Personen</h2>
            <p>Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-400 mt-3">
              <li><strong className="text-dark-200">Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden.</li>
              <li><strong className="text-dark-200">Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die Vervollständigung oder Berichtigung unrichtiger Daten zu verlangen.</li>
              <li><strong className="text-dark-200">Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung Ihrer Daten zu verlangen.</li>
              <li><strong className="text-dark-200">Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.</li>
              <li><strong className="text-dark-200">Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem übertragbaren Format zu erhalten.</li>
              <li><strong className="text-dark-200">Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einzulegen.</li>
              <li><strong className="text-dark-200">Recht auf Widerruf (Art. 7 Abs. 3 DSGVO):</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
              <li><strong className="text-dark-200">Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Die für uns zuständige Aufsichtsbehörde ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA).</li>
            </ul>
          </section>

          {/* 10. Änderungen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Änderung dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
              rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der
              Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
          </section>

          {/* Kontakt für Datenschutz */}
          <section className="border-t border-dark-800 pt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Fragen zum Datenschutz?</h2>
            <p>
              Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an:{' '}
              <a href="mailto:info@uka-gv.de" className="text-fiber-400 hover:underline">
                info@uka-gv.de
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
