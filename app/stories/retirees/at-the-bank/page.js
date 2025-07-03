// app/stories/retirees/at-the-bank/page.js
// This is the interactive story page for "At the Bank" for the Retiree Path
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
          console.log("Selected Spanish voice for bank story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for bank story, using default for 'es-ES'.");
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
export default function AtTheBankStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🏦 Echo y Mike en el banco <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Eko y Mike en el banco" onClick={() => speak('Eko y Mike en el banco', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Learn essential phrases for banking transactions and interacting with bank tellers.
      </p>

      {/* Story Block 1: Arrival at the bank */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Eko y Mike van al banco. Necesitan cambiar dinero.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike van al banco. Necesitan cambiar dinero.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Eko and Mike go to the bank. They need to exchange money.</p>
          <div className="qa">
            <p>👨‍🏫 ¿A dónde van Eko y Mike?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿A dónde van Eko y Mike?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">Where do Eko and Mike go?</p>
            <p><span className="response-icon">🧓</span> Van al banco.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Van al banco.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They go to the bank.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-bank-entrance.png"
            alt="Eko and Mike at the entrance of a bank"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Talking to the teller */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-bank-teller.png"
            alt="Eko and Mike talking to a bank teller"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Hablan con el cajero. Eko dice: &quot;Quiero cambiar dólares a pesos.&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Hablan con el cajero. Eko dice: "Quiero cambiar dólares a pesos."', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They talk to the teller. Eko says: &quot;I want to exchange dollars for pesos.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué quiere hacer Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué quiere hacer Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Eko want to do?</p>
            <p><span className="response-icon">🧓</span> Quiere cambiar dinero.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Quiere cambiar dinero.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They want to exchange money.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Using the ATM */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Mike usa el cajero automático. Retira dinero en efectivo.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Mike usa el cajero automático. Retira dinero en efectivo.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Mike uses the ATM. They withdraw cash.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué hace Mike en el cajero automático?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué hace Mike en el cajero automático?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Mike do at the ATM?</p>
            <p><span className="response-icon">🧓</span> Retira dinero.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Retira dinero.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They withdraw money.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-bank-atm.png"
            alt="Mike using an ATM"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
