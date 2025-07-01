// app/stories/retirees/airport-en-to-es/page.js
"use client"; // This directive marks this as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';

let spanishVoice = null;
let voicesLoadedPromise = null; // A promise to track voice loading status

function loadAndSelectVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Create a new promise if not already created
  if (!voicesLoadedPromise) {
    voicesLoadedPromise = new Promise(resolve => {
      const setSpanishVoice = () => {
        const voices = speechSynthesis.getVoices();
        // Prioritize a Spanish voice. Adjust based on desired accent/quality.
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
          // Fallback to any Spanish voice if specific ones not found
          spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        }

        if (spanishVoice) {
          console.log("Selected Spanish voice:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found, using default for 'es-ES'.");
        }
        resolve(); // Resolve the promise once voices are loaded/selected
      };

      // Ensure voices are loaded. `voiceschanged` event is critical.
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setSpanishVoice;
      }

      // Try to load voices immediately in case they are already available
      if (speechSynthesis.getVoices().length > 0) {
        setSpanishVoice();
      }
    });
  }
}

// Ensure voice loading is initiated as early as possible
if (typeof window !== 'undefined') {
  loadAndSelectVoice();
}

// Speak function with optional rate control, now asynchronous
async function speak(text, lang = 'es-ES', rate = 0.8) {
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API is not supported in this browser.');
    return;
  }

  // Wait for voices to be loaded before attempting to speak
  if (voicesLoadedPromise) {
    await voicesLoadedPromise;
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
export default function AirportStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // You might call loadAndSelectVoice() here as well to ensure it's triggered
    // once the component is mounted on the client.
    // However, the global call 'if (typeof window !== 'undefined') { loadAndSelectVoice(); }'
    // should typically handle it before the component even renders.
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🛬 Echo y Mike en el aeropuerto <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título" onClick={() => speak('Eko y Mike en el aeropuerto', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Learn how to ask about baggage, customs, and finding a taxi in Spanish at the airport.
      </p>

      {/* Story Block 1: Echo and Mike at the airport */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike están en el aeropuerto.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase: Echo y Mike están en el aeropuerto." onClick={() => speak('Eko y Mike están en el aeropuerto.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike are at the airport.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Dónde están Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta: ¿Dónde están Echo y Mike?" onClick={() => speak('¿Dónde están Eko y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">Where are Echo and Mike?</p>
            <p><span className="response-icon">🧓</span> Ellos están en el aeropuerto.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta: Ellos están en el aeropuerto." onClick={() => speak('Ellos están en el aeropuerto.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They are at the airport.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_Ret_AP_Arrival.png"
            alt="Echo and Mike in an airport lobby"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: They have their passports and tickets */}
      <div className="story-block">
        <div className="story-image"> {/* Image first for alternate layout */}
          <Image
            src="/images/EyM_TPRS_Ret.AP_Tix.png"
            alt="Echo and Mike holding passports and tickets"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Ellos tienen sus pasaportes y boletos.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase: Ellos tienen sus pasaportes y boletos." onClick={() => speak('Ellos tienen sus pasaportes y boletos.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">They have their passports and tickets.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué tienen Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta: ¿Qué tienen Echo y Mike?" onClick={() => speak('¿Qué tienen Eko y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike have?</p>
            <p><span className="response-icon">🧓</span> Tienen sus pasaportes y boletos.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta: Tienen sus pasaportes y boletos." onClick={() => speak('Tienen sus pasaportes y boletos.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They have their passports and tickets.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: They go through airport security */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Pasan por la seguridad del aeropuerto.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase: Pasan por la seguridad del aeropuerto." onClick={() => speak('Pasan por la seguridad del aeropuerto.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">They go through airport security.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Por dónde pasan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta: ¿Por dónde pasan Echo y Mike?" onClick={() => speak('¿Por dónde pasan Eko y Mike?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">Where do Echo and Mike go through?</p>
            <p><span className="response-icon">🧓</span> Pasan por la seguridad.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta: Pasan por la seguridad." onClick={() => speak('Pasan por la seguridad.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They go through security.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_TPRS_RET_AP_Sec.png"
            alt="Echo and Mike at airport security check"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 4: They look for their boarding gate, Gate A four */}
      <div className="story-block">
        <div className="story-image"> {/* Image first for alternate layout */}
          <Image
            src="/images/EyM_TPRS_Ret_AP_Gate.png"
            alt="Echo and Mike looking for Gate A4"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Buscan su puerta de embarque, la Puerta A cuatro.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase: Buscan su puerta de embarque, la Puerta A cuatro." onClick={() => speak('Buscan su puerta de embarque, la Puerta A cuatro.', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">They look for their boarding gate, Gate A four.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué número de puerta buscan?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta: ¿Qué número de puerta buscan?" onClick={() => speak('¿Qué número de puerta buscan?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What gate number are they looking for?</p>
            <p><span className="response-icon">🧓</span> Buscan la Puerta A cuatro.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta: Buscan la Puerta A cuatro." onClick={() => speak('Buscan la Puerta A cuatro.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They are looking for Gate A four.</p>
          </div>
        </div>
      </div>

      {/* Story Block 5: Finally, they board the plane and say "Goodbye!" */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Finalmente, abordan el avión y dicen &quot;¡Adiós!&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase: Finalmente, abordan el avión y dicen ¡Adiós!" onClick={() => speak('Finalmente, abordan el avión y dicen ¡Adiós!', 'es-ES', 0.8)}>🔊</button>
            )}
          </p>
          <p className="translation">Finally, they board the plane and say &quot;Goodbye!&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué hacen al final?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta: ¿Qué hacen al final?" onClick={() => speak('¿Qué hacen al final?', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">What do they do at the end?</p>
            <p><span className="response-icon">🧓</span> Abordan el avión.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta: Abordan el avión." onClick={() => speak('Abordan el avión.', 'es-ES', 0.8)}>🔊</button>
            )}
            </p>
            <p className="translation">They board the plane.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/EyM_TPRS_Ret_AP_Plane.png"
            alt="Echo and Mike boarding a plane"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
