// app/retiree-path/page.js

import Link from 'next/link';
import Image from 'next/image'; // Don't forget to import Image

// Metadata for this specific page.
export const metadata = {
  title: 'Retiree Path - Practical Spanish',
  description: 'Explore practical Spanish stories for retirees, focusing on daily life and travel situations.',
};

export default function RetireePathPage() {
  return (
    <main className="section"> {/* Applied section class to main for consistent padding */}
      <h2>🧓 Practical Spanish for Daily Life</h2>
      <p>Explore everyday Spanish through simple, story-based lessons, designed with retirees in mind!</p>

      <div className="story-cards-container">
        {/* Story Card: At the Airport */}
        <div className="story-card">
          {/*
            Image component. You'll need to place 'airport-travel.png'
            in your `public/images/` directory.
          */}
          <Image
            src="/images/ES_EyM_Ret_Airport_LP.png"
            alt="An airport scene with luggage"
            width={280} // Consistent width as per your CSS
            height={150} // Consistent height as per your CSS
          />
          <h3>🛬 At the Airport</h3>
          <p>Learn how to ask about baggage, customs, and finding a taxi in Spanish.</p>
          <Link href="/stories/retirees/airport-en-to-es" className="path-button">Start Lesson</Link>
        </div>

        {/* Story Card: At the Hotel */}
        <div className="story-card">
          {/* Image component for 'hotel-stay.png' */}
          <Image
            src="/images/ES_EyM_Ret_Hotel_LP.png"
            alt="A hotel lobby or room"
            width={280}
            height={150}
          />
          <h3>🏨 At the Hotel</h3>
          <p>Check in, ask for services, and talk to hotel staff in Spanish.</p>
          <Link href="/stories/retirees/hotel-en-to-es" className="path-button">Start Lesson</Link>
        </div>

        {/* Story Card: At the Restaurant (Coming Soon) */}
        <div className="story-card">
          {/* Image component for 'restaurant-dining.png' */}
          <Image
            src="/images/ES_EyM_Ret_Rest_LP.png"
            alt="People dining at a restaurant"
            width={280}
            height={150}
          />
          <h3>🍽️ At the Restaurant</h3>
          <p>Order food, ask for the bill, and discuss dietary needs in Spanish.</p>
          <Link href="#" className="path-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>

        {/* Story Card: Shopping at the Market (Coming Soon) */}
        <div className="story-card">
          {/* Image component for 'shopping-market.png' */}
          <Image
            src="/images/ES_EyM_Ret_Shopping_LP.png"
            alt="People shopping at a market stall"
            width={280}
            height={150}
          />
          <h3>🛍️ Shopping at the Market</h3>
          <p>Ask for prices, sizes, and describe items while shopping in Spanish.</p>
          <Link href="#" className="path-button coming-soon" aria-disabled="true">Coming Soon</Link>
        </div>
      </div>
    </main>
  );
}
