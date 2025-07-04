// app/kids-path/page.js
"use client"; // This is a Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function KidsPathPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark as client-side after mount
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        Kid&apos;s Path: Fun Stories for Young Learners
      </h2>
      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Embark on exciting adventures with Echo and Mike! Each story is designed to introduce new Spanish words and phrases through engaging narratives and interactive questions.
      </p>

      <div className="story-cards-container">
        {/* Story Card: Going to School */}
        <div className="story-card">
          <Image
            src="/images/Kid_School/Kid_EyM_2_School.png"
            alt="Echo and Mike going to school"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>📚 Going to School</h3>
          <p>Learn classroom words as Echo and Mike go to school.</p>
          {isClient && (
            <Link href="/stories/kids/going-to-school" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Market */}
        <div className="story-card">
          <Image
            src="/images/Kid_Market/Kid_Echo_Buys_Fruit.png"
            alt="Echo and Mike at the market"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🛒 At the Market</h3>
          <p>Help Echo and Mike shop for fruit and snacks.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-market" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Park*/}
        <div className="story-card">
          <Image
            src="/images/Children_Park/ES_EyM_Park.png"
            alt="Echo and Mike playing at the park"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🌳 At the Park</h3>
          <p>Play with Echo and Mike and discover nature words.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-park" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Farm*/}
        <div className="story-card">
          <Image
            src="/images/Kid_Farm/EyM_Arrive_Farm.jpeg"
            alt="Echo and Mike visiting a farm"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🚜 At the Farm</h3>
          <p>Join Echo and Mike on an exciting trip to the farm.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-farm" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Beach*/}
        <div className="story-card">
          <Image
            src="/images/Kid_Beach/EyM_At_Beach.png"
            alt="Echo and Mike at the beach"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🏖️ At the Beach</h3>
          <p>Splash around with Echo and Mike and learn beach words.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-beach" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Zoo*/}
        <div className="story-card">
          <Image
            src="/images/Kid_Zoo/EyM_Zoo_LP.png"
            alt="Echo and Mike at the Zoo"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🦁 At the Zoo</h3>
          <p>Explore the animal kingdom and learn animal names.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-zoo" className="path-button">Start Story</Link>
          )}
        </div>

        {/* Story Card: At the Aquarium*/}
        <div className="story-card">
          <Image
            src="/images/Kid_Aquarium/EyM_At_Aquarium_LP.png"
            alt="Echo and Mike at the Aquarium"
            width={300}
            height={200}
            className="story-card-image"
          />
          <h3>🐠 At the Aquarium</h3>
          <p>Dive into the ocean world and learn about sea creatures.</p>
          {isClient && (
            <Link href="/stories/kids/at-the-aquarium" className="path-button">Start Story</Link>
          )}
        </div>
      </div>
    </main>
  );
}
