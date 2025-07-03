// app/page.js
// This file will render the content for your homepage ("/")

import Link from 'next/link';   // Import Next.js Link component for navigation
import Image from 'next/image'; // Import Next.js Image component for optimized images

// Metadata for this specific page. This will override/merge with the root layout's metadata.
export const metadata = {
  title: 'Language Learning for Kids & Retirees', // Only the unique part of the title
  description: 'Learn languages with EchoSpeak using fun and interactive stories for all ages.',
};

export default function Home() {
  return (
    <main>
      {/* Home/Hero Section */}
      <section id="home" className="section home">
        <h2>Welcome to EchoSpeak</h2>
        <p>Echo the colorful parrot is always exploring to learn new things. She learns a lot from Mike the friendly and multilingual parakeet and her best friend. Echo learns new languages by repeating everything Mike says across the many wordly adventures. Echo is on a quest to learn as much as Mike so together they can embark on exciting new travles and language-learning adventures with out the need to rely on anything but their own abilities!</p>
        {/*
          Using Next.js Image component for the hero image.
          - src: Path relative to the `public` directory. You'll put this image there.
          - alt: Important for accessibility.
          - width, height: Essential for optimization and preventing layout shift.
          - className: For your custom CSS.
          - priority: Tells Next.js to preload this image as it's likely above the fold.
        */}
        <Image
          src="/images/EyM_Animated_LP.jpg"
          alt="Echo the Parakeet and Mike the Parrot in a learning scene set in Puerto Rico or the U.S."
          width={450}
          height={300}
          className="hero-image"
          priority
        />
      </section>

      {/* Choose Your Language Discovery Path Section */}
      <section id="choose-path" className="section choose-path-section">
        <h2>Choose Your Language Discovery Path</h2>
        <p>EchoSpeak is currently designed for two amazing groups of learners:</p>
        <div className="path-cards-container">
          {/* Kids Path Card */}
          <div className="path-card">
            <h3>🧒 For Children (Ages 3–8)</h3>
            <p>Learn English or Spanish through fun stories with Echo and Mike as they explore the Spanish-speaking world!</p>
            {/* Link to the kids-path page. Next.js handles routing. */}
            <Link href="/kids-path" className="path-button">Start Kids Path</Link>
          </div>
          {/* Retiree Path Card */}
          <div className="path-card">
            <h3>🧓 For Retirees</h3>
            <p>Learn English or Spanish through practical travel stories and real-life situations!</p>
            {/* Link to the retiree-path page. */}
            <Link href="/retiree-path" className="path-button">Start Retiree Path</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
