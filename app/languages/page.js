// app/languages/page.js

import Link from 'next/link';
import Image from 'next/image'; // Don't forget to import Image

// Metadata for this specific page.
export const metadata = {
  title: 'Languages',
  description: 'Explore the languages supported by EchoSpeak, including those coming soon.',
};

export default function LanguagesPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <h2>🌎 Explore New Languages</h2>
      <p>EchoSpeak is constantly expanding! Here are the languages we currently support and those coming soon to enhance your learning journey.</p>

      <div className="language-cards-container">

         {/* Spanish Language Card */}
        <div className="language-card">
          <Image
            src="/images/ES_EyM_Espanol.png" // Placeholder image path
            alt="Flag of Spain"
            width={280}
            height={150}
          />
          <h3>🇪🇸 Spanish</h3>
          <p>Immerse yourself in Spanish culture with interactive lessons.</p>
          <Link href="/kids-path" className="language-button">Learn Spanish</Link> {/* Linking to Kid's Path as a starting point */}
        </div>

        {/* English Language Card (Assuming English is the base/target language) */}
        <div className="language-card">
          <Image
            src="/images/ES_EyM_GB_English.png" // Placeholder image path
            alt="Flag of the United States"
            width={280}
            height={150}
          />
          <h3>🇬🇧 English</h3>
          <p>Master English through engaging stories and practical dialogues.</p>
          <Link href="/" className="language-button">Learn English</Link> {/* Link to homepage as a starting point */}
        </div>

    

        {/* Mandarin Chinese Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_Mandarin.png" // Placeholder image path
            alt="Flag of China"
            width={280}
            height={150}
          />
          <h3>🇨🇳 Mandarin Chinese</h3>
          <p>Discover the beauty of Mandarin Chinese with our upcoming content.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* German Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_Deutsch.png" // Placeholder image path
            alt="Flag of Germany"
            width={280}
            height={150}
          />
          <h3>🇩🇪 German</h3>
          <p>Start your journey into the German language and culture.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* French Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_French.png" // Placeholder image path
            alt="Flag of France"
            width={280}
            height={150}
          />
          <h3>🇫🇷 French</h3>
          <p>Bonjour! Get ready to learn French with our new lessons.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* Italian Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_Italiano.png" // Placeholder image path
            alt="Flag of Italy"
            width={280}
            height={150}
          />
          <h3>🇮🇹 Italian</h3>
          <p>Explore Italian and its rich heritage through EchoSpeak.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* Arabic Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_Arabic1.png" // Placeholder image path
            alt="Flag of Saudi Arabia"
            width={280}
            height={150}
          />
          <h3>🇸🇦 Arabic</h3>
          <p>Unlock the sounds and script of the Arabic language.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* Russian Language Card (Coming Soon) */}
        <div className="language-card coming-soon-overlay">
          <Image
            src="/images/ES_EyM_Russky.png" // Placeholder image path
            alt="Flag of Russia"
            width={280}
            height={150}
          />
          <h3>🇷🇺 Russian</h3>
          <p>Delve into the complexities and beauty of Russian.</p>
          <Link href="#" className="language-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>
      </div>
    </main>
  );
}
