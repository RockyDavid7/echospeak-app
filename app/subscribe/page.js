 // app/subscribe/page.js

import Link from 'next/link'; // Import Link for navigation if needed for buttons within the page

// Metadata for this specific page.
export const metadata = {
  title: 'Subscribe',
  description: 'Choose your EchoSpeak subscription plan to unlock full language learning potential.',
};

export default function SubscribePage() {
  return (
    <main>
      <section id="subscribe" className="section">
        <div className="subscribe-container">
          <h2>Unlock Your Full Learning Potential!</h2>
          <p className="intro-text">Choose the EchoSpeak subscription plan that&apos;s perfect for you. Dive into unlimited interactive stories, access all lessons, quizzes, and community features, and accelerate your language journey!</p>

          <div className="pricing-plans">
            {/* Monthly Plan Card */}
            <div className="plan-card">
              <h3>Monthly Plan</h3>
              <div className="price">$0.00<span>/month</span></div>
              <ul>
                <li> Unlimited access to all stories</li>
                <li> Access to all lessons</li>
                <li> Voice recognition practice</li>
                <li> Basic community features</li>
                <li> Cancel anytime</li>
              </ul>
              {/* Link to a placeholder checkout page or feature */}
              <Link href="#" className="plan-button">Choose Monthly</Link>
            </div>

            {/* Annual Plan Card (Most Popular) */}
            <div className="plan-card">
              <h3>Annual Plan</h3>
              <div className="price">$0.00<span>/year</span></div>
              <ul>
                <li> All Monthly Plan features</li>
                <li> <strong>Save 25% annually!</strong></li>
                <li> Priority customer support</li>
                <li> Exclusive bonus stories</li>
                <li> Progress tracking & reports</li>
              </ul>
              {/* Style for this button is inline, but could be a specific class in globals.css */}
              <Link href="#" className="plan-button" style={{ backgroundColor: '#facc15', color: '#1e3a8a' }}>Choose Annual</Link>
            </div>

            {/* Family Plan Card */}
            <div className="plan-card">
              <h3>Family Plan</h3>
              <div className="price">$0.00<span>/year</span></div>
              <ul>
                <li> All Annual Plan features</li>
                <li> <strong>Up to 4 user profiles</strong></li>
                <li> Personalized learning paths</li>
                <li> Advanced community features</li>
                <li> Dedicated family support</li>
              </ul>
              <Link href="#" className="plan-button">Choose Family</Link>
            </div>
          </div>

          <p className="intro-text" style={{ marginTop: '3em' }}>*All plans come with a 7-day free trial. No credit card required to start your trial!</p>
        </div>
      </section>
    </main>
  );
}
