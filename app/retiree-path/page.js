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

        {/* Story Card: At the Restaurant*/}
        <div className="story-card">
          <Image
            src="/images/ES_EyM_Ret_Rest_LP.png"
            alt="Echo and Mike dining at a restaurant"
            width={280}
            height={150}
          />
          <h3>🍽️ At the Restaurant</h3>
          <p>Order food, ask for the bill, and discuss dietary needs in Spanish.</p>
             <Link href="/stories/retirees/at-the-restaurant" className="path-button">Start Story</Link>       
         </div>

        {/* Story Card: Shopping at the Market*/}
        <div className="story-card">
          {/* Image component for 'shopping-market.png' */}
          <Image
            src="/images/ES_EyM_Ret_Shopping_LP.png"
            alt="Echo and Mike shopping at a market stall"
            width={280}
            height={150}
          />
          <h3>🛍️ Shopping at the Market</h3>
          <p>Ask for prices, sizes, and describe items while shopping in Spanish.</p>
          <Link href="/stories/retirees/shopping-at-the-market" className="path-button">Start Story</Link>
      </div>
      {/* Story Card: At the Medical Clinic*/}
        <div className="story-card">
        <Image
         src="/stories/retirees/at-the-medical-clinic_LP.png"
         alt="Echo and Mike at a medical clinic"
         width={300}
        height={200}
        />
        <h3>🏥 At the Medical Clinic</h3>
         <p>Learn to describe symptoms and interact with medical staff.</p>
         <Link href="/stories/retirees/at-the-medical-clinic" className="path-button">Start Story</Link>
      </div>
            
      {/* Story Card: Taking a Taxi*/}
        <div className="story-card">
        <Image
        src="/stories/retirees/taking-an-uber-or-taxi" // Consistent with your current setup for 'Coming Soon' card images
        alt="Echo and Mike taking an Uber or taxi"
        width={300}
        height={200}
       />
      <h3>🚕 Taking an Uber or Taxi</h3>
     <p>Practice ordering a ride, giving directions, and asking about the fare.</p>
    <Link href="/stories/retirees/taking-a-taxi" className="path-button">Start Story</Link>
    </div>
    {/* Story Card: At the Bank*/}
        <div className="story-card">
        <Image
        src="/stories/retirees/at-the-bank.png" 
        alt="Echo and Mike at the bank"
        width={300}
        height={200}
        />
    <h3>🏦 At the Bank</h3>
    <p>Learn essential phrases for banking transactions and interacting with tellers.</p>
    <Link href="/stories/retirees/at-the-bank" className="path-button">Start Story</Link>
    </div>

    {/* Story Card: Talking to the Handyman*/}
    <div className="story-card">
    <Image
    src="/stories/retirees/talking-to-the-handyman.png"
    alt="Echo and Mike talking to the handyman"
    width={300}
    height={200}
    />
    <h3>🛠️ Talking to the Handyman</h3>
    <p>Learn to describe household problems and arrange for repairs.</p>
    <Link href="/stories/retirees/talking-to-the-handyman" className="path-button">Start Story</Link>
    </div>
</div>
</main>
  );
}
