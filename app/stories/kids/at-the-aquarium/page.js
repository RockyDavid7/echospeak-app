// app/stories/kids/at-the-aquarium/page.js
// This is the interactive story page for "At the Aquarium" for the Kid's Path
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
          console.log("Selected Spanish voice for aquarium story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for aquarium story, using default for 'es-ES'.");
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
export default function AtTheAquariumStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🐠 Echo y Mike en el acuario <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en el acuario" onClick={() => speak('Echo y Mike en el acuario', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Dive into the ocean world with Echo and Mike and learn about sea creatures in Spanish!
      </p>

      {/* Story Block 1: Arrival at the aquarium */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike visitan el acuario. El acuario es grande.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Echo y Mike visitan el acuario. El acuario es grande.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike visit the aquarium. The aquarium is big.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué visitan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué visitan Echo y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike visit?</p>
            <p><span className="response-icon">🦜</span> Ellos visitan el acuario.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ellos visitan el acuario.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They visit the aquarium.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-aquarium-entrance.png"
            alt="Echo and Mike at the entrance of an aquarium"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Seeing colorful fish */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/kid-aquarium-fish.png"
            alt="Echo and Mike looking at colorful fish in a large tank"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Ven muchos peces de colores. Los peces nadan rápido.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Ven muchos peces de colores. Los peces nadan rápido.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">They see many colorful fish. The fish swim fast.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué ven en el acuario?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué ven en el acuario?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do they see in the aquarium?</p>
            <p><span className="response-icon">🦜</span> Ven muchos peces.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Ven muchos peces.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They see many fish.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Seeing a big shark */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>También ven un tiburón grande. El tiburón es gris.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('También ven un tiburón grande. El tiburón es gris.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">They also see a big shark. The shark is gray.</p>
          <div className="qa">
            <p>👨‍🏫 ¿De qué color es el tiburón?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿De qué color es el tiburón?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What color is the shark?</p>
            <p><span className="response-icon">🦜</span> El tiburón es gris.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('El tiburón es gris.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">The shark is gray.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/kid-aquarium-shark.png"
            alt="Echo and Mike looking at a large gray shark in a tank"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
