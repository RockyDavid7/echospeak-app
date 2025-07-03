// app/stories/retirees/at-the-restaurant/page.js
// This is the interactive story page for "At the Restaurant" for the Retiree Path
"use client"; // This directive marks this as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Re-import the speak function and voice loading logic (copied for self-containment)
let spanishVoice = null;
let voicesLoadedPromise = null;

function loadAndSelectVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  if (!voicesLoadedPromise) {
    voicesLoadedPromise = new Promise(resolve => {
      const setSpanishVoice = () => {
        const voices = speechSynthesis.getVoices();
        spanishVoice = voices.find(voice =>
          voice.lang.startsWith('es') && (
            voice.name.includes('Google español') ||
            voice.name.includes('Microsoft David Mobile - Spanish (Mexico)') ||
            voice.name.includes('Microsoft Laura Mobile - Spanish (Spain)') ||
            voice.name.includes('español') ||
            voice.name.toLowerCase().includes('spanish')
          )
        );
        if (!spanishVoice) {
          spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        }
        if (spanishVoice) {
          console.log("Selected Spanish voice for restaurant story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for restaurant story, using default for 'es-ES'.");
        }
        resolve();
      };
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setSpanishVoice;
      }
      if (speechSynthesis.getVoices().length > 0) {
        setSpanishVoice();
      }
    });
  }
}
if (typeof window !== 'undefined') {
  loadAndSelectVoice();
}

// Speak function with optional rate control
async function speak(text, lang = 'es-ES', rate = 0.8) {
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API is not supported in this browser.');
    return;
  }
  if (voicesLoadedPromise) {
    await voicesLoadedPromise; // Ensure voices are loaded before attempting to speak
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.rate = rate;
  utterance.onend = function(event) {
    console.log('Speech finished for:', text);
  };
  utterance.onerror = function(event) {
    console.error('Speech synthesis error:', event.error, '(Utterance event error)');
  };
  try {
    speechSynthesis.speak(utterance);
    console.log(`Attempting to speak: "${text}" with voice "${utterance.voice ? utterance.voice.name : 'default'}" in ${utterance.lang} at rate ${utterance.rate}`);
  } catch (e) {
    console.error('Error calling speechSynthesis.speak():', e);
  }
}

// Main component for the story page
export default function AtTheRestaurantStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🍽️ Eko y Mike en el restaurante <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Eko y Mike en el restaurante" onClick={() => speak('Eko y Mike en el restaurante', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Join Eko and Mike for a meal at a vibrant Mexican restaurant and learn how to order food!
      </p>

      {/* Story Block 1: Arrival and greetings */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Eko y Mike entran en un restaurante mexicano. La camarera los saluda.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike entran en un restaurante mexicano. La camarera los saluda.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Eko and Mike enter a Mexican restaurant. The waitress greets them.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Dónde están Eko y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Dónde están Eko y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">Where are Eko and Mike?</p>
            <p><span className="response-icon">🦜</span> Están en un restaurante mexicano.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Están en un restaurante mexicano.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They are in a Mexican restaurant.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-restaurant-arrival.png"
            alt="Eko and Mike arriving at a Mexican restaurant"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Ordering food */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-restaurant-ordering.png"
            alt="Eko and Mike ordering from a menu"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Eko pide unos tacos al pastor y Mike pide enchiladas.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko pide unos tacos al pastor y Mike pide enchiladas.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Eko orders some tacos al pastor and Mike orders enchiladas.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué pide Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué pide Eko?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Eko order?</p>
            <p><span className="response-icon">🦜</span> Eko pide tacos al pastor.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Eko pide tacos al pastor.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">Eko orders tacos al pastor.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Enjoying the meal */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>La comida es deliciosa. A Eko le encantan los sabores de México.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('La comida es deliciosa. A Eko le encantan los sabores de México.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">The food is delicious. Eko loves the flavors of Mexico.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué le gusta a Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué le gusta a Eko?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Eko like?</p>
            <p><span className="response-icon">🦜</span> Le encantan los sabores de México.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Le encantan los sabores de México.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They love the flavors of Mexico.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-restaurant-eating.png"
            alt="Eko and Mike enjoying their meal"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
