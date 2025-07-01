// app/kids-path/page.js

import Link from 'next/link';
import Image from 'next/image'; // Don't forget to import Image

// Metadata for this specific page.
export const metadata = {
  title: 'Kid\'s Path - English to Spanish',
  description: 'Explore fun and interactive Spanish stories for children with Echo and Mike.',
};

export default function KidsPathPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <h2>🇺🇸 Learn Spanish with Echo and Mike!</h2>
      <p>Explore the language of Puerto Rico with fun and interactive stories. Start by selecting a story below:</p>

      <div className="story-cards-container">
        {/* Story Card: Going to School (Active) */}
        <div className="story-card">
          <Image
            src="/images/ES_EyM_School_LP.png"
            alt="Cartoon characters going to school"
            width={280} // Consistent width as per your CSS
            height={150} // Consistent height as per your CSS
          />
          <h3>🎒 Going to School</h3>
          <p>Join Echo and Mike as they go to school in San Juan and learn classroom words in Spanish.</p>
          <Link href="/stories/kids/going-to-school" className="path-button">Start Story</Link>
        </div>

        {/* Story Card: At the Market */}
        <div className="story-card">
          <Image
            src="/images/ES_EyM_MKT_LP.png"
            alt="Cartoon characters at a market"
            width={280}
            height={150}
          />
          <h3>🍎 At the Market</h3>
          <p>Help Echo and Mike shop for fruit and snacks while learning Spanish food vocabulary!</p>
          {/* Link is now active, and 'coming-soon' class is removed */}
          <Link href="/stories/kids/at-the-market" className="path-button">Start Story</Link>
        </div>

        {/* Story Card: At the Park (Coming Soon) */}
        <div className="story-card">
          <Image
            src="/images/ES_EyM_Park_LP.png"
            alt="Cartoon characters playing in a park"
            width={280}
            height={150}
          />
          <h3>🌳 At the Park</h3>
          <p>Play with Echo and Mike at the park and discover new words related to nature and games.</p>
          <Link href="#" className="path-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* Story Card: At the Beach (Coming Soon) */}
        <div className="story-card">
          <Image
            src="/images/ES_EyM_Beach.png"
            alt="Cartoon characters at the beach"
            width={280}
            height={150}
          />
          <h3>🏖️ At the Beach</h3>
          <p>Splash around with Echo and Mike and learn about beach activities and sea animals in Spanish.</p>
          <Link href="#" className="path-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>
      </div>
    </main>
  );
}
