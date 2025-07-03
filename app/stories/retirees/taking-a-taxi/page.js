// app/stories/retirees/taking-an-uber-or-taxi/page.js
// This is the interactive story page for "Taking an taxi or Taxi" for the Retiree Path
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
          console.log("Selected Spanish voice for taxi/Taxi story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for taxi/Taxi story, using default for 'es-ES'.");
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
async function speak(text, lang = 'es-ES', rate = 0.7) {
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
export default function TakingAnUberiStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🚕 Eko y Mike toman un taxi o taxi <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike toman un taxi o taxi" onClick={() => speak('Eko y Mike toman un taxi o taxi', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Practice ordering a ride, giving directions, and asking about the fare in Spanish.
      </p>

      {/* Story Block 1: Ordering/Finding the Ride */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike necesitan un taxi. Abren la aplicación en su teléfono.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike necesitan un taxi. Abren la aplicación en su teléfono.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike need a taxi. They open the app on their phone.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué necesitan Eko y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué necesitan Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike need?</p>
            <p><span className="response-icon">🧓</span> Necesitan un taxi.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Necesitan un taxi.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They need a taxi.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-uber-arrival.png"
            alt="Echo and Mike looking at a phone, waiting for a ride"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Giving Directions */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-uber-directions.png"
            alt="Echo and Mike in a car, giving directions to the driver"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Suben al coche. Echo dice: &quot;Vamos a la estación de tren, por favor.&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Suben al coche. Eko dice: "Vamos a la estación de tren, por favor."', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They get in the car. Echo says: &quot;Let&apos;s go to the train station, please.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Adónde van Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Adónde van Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Where are Echo and Mike going?</p>
            <p><span className="response-icon">🧓</span> Van a la estación de tren.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Van a la estación de tren.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They are going to the train station.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Asking about the Fare/Paying */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Llegan a la estación. Mike pregunta: &quot;¿Cuánto es?&quot; Paga con tarjeta de crédito.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Llegan a la estación. Mike pregunta: "¿Cuánto es?" Paga con tarjeta de crédito.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They arrive at the station. Mike asks: &quot;How much is it?&quot; They pay with a credit card.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué pregunta Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué pregunta Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Mike ask?</p>
            <p><span className="response-icon">🧓</span> Pregunta cuánto es.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Pregunta cuánto es.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They ask how much it is.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-uber-fare.png"
            alt="Mike paying for an taxi ride"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
