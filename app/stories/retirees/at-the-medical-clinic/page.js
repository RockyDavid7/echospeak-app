// app/stories/retirees/at-the-medical-clinic/page.js
// This is the interactive story page for "At the Medical Clinic" for the Retiree Path
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
          console.log("Selected Spanish voice for clinic story:", spanishVoice.name, spanishVoice.lang);
        } else {
          console.warn("No specific Spanish voice found for clinic story, using default for 'es-ES'.");
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
export default function AtTheMedicalClinicStoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🏥 Eko y Mike en la clínica médica <span style={{ fontSize: '0.8em', color: '#0f766e' }}>(English ➡️ Spanish)</span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Eko y Mike en la clínica médica" onClick={() => speak('Eko y Mike en la clínica médica', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button>
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Learn how to describe symptoms and interact with medical staff in Spanish.
      </p>

      {/* Story Block 1: Arrival at the clinic */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo y Mike van a la clínica. Eko no se siente bien.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Eko y Mike van a la clínica. Eko no se siente bien.', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">Echo and Mike go to the clinic. Echo doesn&apos;t feel well.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Cómo se siente Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Cómo se siente Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">How does Echo feel?</p>
            <p><span className="response-icon">🧓</span> No se siente bien.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('No se siente bien.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They don&apos;t feel well.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-clinic-arrival.png"
            alt="Eko and Mike arriving at a medical clinic"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Talking to the receptionist */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/retiree-clinic-reception.png"
            alt="Eko and Mike talking to a clinic receptionist"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Hablan con la recepcionista. Eko dice: &quot;Tengo dolor de cabeza.&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('Hablan con la recepcionista. Eko dice: "Tengo dolor de cabeza."', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">They talk to the receptionist. Eko says: &quot;I have a headache.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué tiene Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué tiene Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What does Eko have?</p>
            <p><span className="response-icon">🧓</span> Tiene dolor de cabeza.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('Tiene dolor de cabeza.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They have a headache.</p>
          </div>
        </div>
      </div>

      {/* Story Block 3: Seeing the doctor */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>El doctor examina a Eko. Eko dice: &quot;También tengo fiebre.&quot;</strong>
            {isClient && (
              <button aria-label="Reproducir audio de la frase" onClick={() => speak('El doctor examina a Eko. Eko dice: "También tengo fiebre."', 'es-ES', 0.7)}>🔊</button>
            )}
          </p>
          <p className="translation">The doctor examines Eko. Eko says: &quot;I also have a fever.&quot;</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué más tiene Eko?
            {isClient && (
              <button aria-label="Reproducir audio de la pregunta" onClick={() => speak('¿Qué más tiene Eko?', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">What else does Eko have?</p>
            <p><span className="response-icon">🧓</span> También tiene fiebre.
            {isClient && (
              <button aria-label="Reproducir audio de la respuesta" onClick={() => speak('También tiene fiebre.', 'es-ES', 0.7)}>🔊</button>
            )}
            </p>
            <p className="translation">They also have a fever.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/retiree-clinic-doctor.png"
            alt="Doctor examining Eko in a clinic"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </main>
  );
}
