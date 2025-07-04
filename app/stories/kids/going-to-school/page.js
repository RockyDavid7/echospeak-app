// app/stories/kids/going-to-school/page.js
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

let spanishVoice = null;

function loadAndSelectVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
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
      console.log("Selected Spanish voice:", spanishVoice.name, spanishVoice.lang);
    } else {
      console.warn("No specific Spanish voice found, using default for 'es-ES'.");
    }
  };
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = setSpanishVoice;
  }
  setSpanishVoice();
}
if (typeof window !== 'undefined') {
  loadAndSelectVoice();
}

// MODIFIED speak function to accept 'rate'
function speak(text, lang = 'es-ES', rate = 0.7) { // Added 'rate' parameter with default 0.7
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API is not supported in this browser.');
    return;
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.rate = rate; // Set the playback rate
  utterance.onend = function(event) {
    console.log('Speech finished for:', text);
  };
  utterance.onerror = function(event) {
    console.error('Speech synthesis error:', event.error);
  };
  try {
    speechSynthesis.speak(utterance);
    console.log(`Attempting to speak: "${text}" with voice "${utterance.voice ? utterance.voice.name : 'default'}" in ${utterance.lang} at rate ${utterance.rate}`);
  } catch (e) {
    console.error('Error calling speechSynthesis.speak():', e);
  }
}

export default function GoingToSchoolStoryPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        📚 Echo y Mike van a la escuela <span style={{ fontSize: '0.8em', color: '#0f766e' }}></span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike van a la escuela" onClick={() => speak('Eko y Mike van a la escuela', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button> // Example: slower rate for title
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Join Echo and Mike as they go to school in San Juan, Puerto Rico and learn classroom words in Spanish!
       
      </p>

      {/* Story Block 1: The children go to school */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Los niños van a la escuela.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de Los niños van a la escuela." onClick={() => speak('Los niños van a la escuela.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
          </p>
          <p className="translation">The children go to school.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Quiénes van a la escuela?
            {isClient && (
              <button aria-label="Reproducir audio de Quiénes van a la escuela?" onClick={() => speak('¿Quiénes van a la escuela?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Who goes to school?</p>
            <p>🧒 Los niños van a la escuela.
            {isClient && (
              <button aria-label="Reproducir audio de Los niños van a la escuela." onClick={() => speak('Los niños van a la escuela.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">The children go to school.</p>

            <p>👨‍🏫 ¿Van a la escuela o al parque?
            {isClient && (
              <button aria-label="Reproducir audio de Van a la escuela o al parque?" onClick={() => speak('¿Van a la escuela o al parque?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Do they go to school or the park?</p>
            <p>🧒 Van a la escuela.
            {isClient && (
              <button aria-label="Reproducir audio de Van a la escuela.', 'es-ES')" onClick={() => speak('Van a la escuela.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">They go to school.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Kid_School/EyM_2_School.png"
            alt="Children at school"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: The teacher teaches math */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Kid_School/EyM_Math.png"
            alt="Echo and Mike in math class"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p><strong>La maestra enseña matemáticas.</strong>
          {isClient && (
            <button aria-label="Reproducir audio de La maestra enseña matemáticas." onClick={() => speak('La maestra enseña matemáticas.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
          )}
          </p>
          <p className="translation">The teacher teaches math.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué enseña la maestra?
            {isClient && (
              <button aria-label="Reproducir audio de Qué enseña la maestra?" onClick={() => speak('¿Qué enseña la maestra?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">What does the teacher teach?</p>
            <p>🧒 Ella enseña matemáticas.
            {isClient && (
              <button aria-label="Reproducir audio de Ella enseña matemáticas." onClick={() => speak('Ella enseña matemáticas.', 'es-ES', 0.7)}>🔊</button> // Rate .7
            )}
            </p>
            <p className="translation">She teaches math.</p>

            <p>👨‍🏫 ¿Enseña inglés o matemáticas?
            {isClient && (
              <button aria-label="Reproducir audio de Enseña inglés o matemáticas?" onClick={() => speak('¿Enseña inglés o matemáticas?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Does she teach English or math?</p>
            <p>🧒 Enseña matemáticas.
            {isClient && (
              <button aria-label="Reproducir audio de Enseña matemáticas.', 'es-ES')" onClick={() => speak('Enseña matemáticas.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">She teaches math.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
