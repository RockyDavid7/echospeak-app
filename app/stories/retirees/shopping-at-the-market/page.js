// app/stories/retirees/shopping-at-the-market/page.js
// This is the interactive story page for "Shopping at the Market" for the Retiree Path
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
          console.log("Selected Spanish voice for market story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for market story, using default for 'es-ES'.");
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
export default function ShoppingAtTheMarketStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🛍️ Eko y Mike de compras en el mercado <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Eko y Mike de compras en el mercado" onClick={() => speak('Eko y Mike de compras en el mercado', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Practice buying fresh produce and asking for prices at a lively Latin American market!
      </p>

      {/* Story Block 1: Arrival at the market */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike visitan un mercado local muy animado. Hay mucha gente y colores.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike visitan un mercado local muy animado. Hay mucha gente y colores.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike visit a very lively local market. There are many people and colors.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué visitan Echo y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué visitan Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What do Echo and Mike visit?</p>
            <p><span className="response-icon">🧓</span> Visitan un mercado local.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Visitan un mercado local.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They visit a local market.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-market-arrival.png"
            alt="Eko and Mike arriving at a bustling local market"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Buying fresh produce */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-market-produce.png"
            alt="Eko and Mike buying fresh fruits and vegetables like mangoes and plantains"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Echo compra mangos dulces y Mike compra plátanos verdes.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko compra mangos dulces y Mike compra plátanos verdes.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo buys sweet mangoes and Mike buys green plantains.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué compra Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué compra Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Echo buy?</p>
            <p><span className="response-icon">🧓</span> Compra mangos.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Compra mangos.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They buy mangoes.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Asking for prices and paying */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo pregunta a la vendedora: &quot;¿Cuánto cuesta la libra de mangos?&quot; Paga con dinero en efectivo.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko pregunta a la vendedora: "¿Cuánto cuesta la libra de mangos?" Paga con dinero en efectivo.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo asks the vendor: &quot;How much does a pound of mangoes cost?&quot; They pay with cash.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué pregunta Echo?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué pregunta Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Echo ask?</p>
            <p><span className="response-icon">🧓</span> Pregunta cuánto cuesta.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Pregunta cuánto cuesta.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They ask how much it costs.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-market-paying.png"
            alt="Eko paying for groceries at a market stall"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}

