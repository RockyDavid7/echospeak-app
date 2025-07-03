// app/stories/kids/at-the-market/page.js
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
      console.log("Selected Spanish voice for market story:", spanishVoice.name, spanishVoice.lang);
    } else {
      console.warn("No specific Spanish voice found for market story, using default for 'es-ES'.");
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

export default function AtTheMarketStoryPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="section">
      <h2 style={{ fontSize: '2.5em', color: '#f59e0b', marginBottom: '1em', textAlign: 'center' }}>
        🛒 Echo y Mike en el mercado <span style={{ fontSize: '0.8em', color: '#0f766e' }}></span>
        {isClient && (
          <button aria-label="Reproducir audio del título: Echo y Mike en el mercado" onClick={() => speak('Eko y Mike en el mercado', 'es-ES', 0.7)} style={{ marginLeft: '10px' }}>🔊</button> // Example: slower rate for title
        )}
      </h2>

      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2.5em', maxWidth: '700px', margin: '1em auto' }}>
        Help Echo and Mike shop for fruit and snacks while learning Spanish food vocabulary!
        {isClient && (
              <button aria-label="Play the phrase: Help Echo and Mike shop for fruit and snacks while learning Spanish food vocabulary!" onClick={() => speak('Help Eko and Mike shop for fruit and snacks while learning Spanish food vocabulary!', 'en-EN', 0.7)}>🔊</button> // Rate 0.7
            )}
      </p>

      {/* Story Block 1: Echo wants to buy fruit */}
      <div className="story-block">
        <div className="story-text">
          <p>
            <strong>Echo quiere comprar fruta.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de Echo quiere comprar fruta." onClick={() => speak('Eko quiere comprar fruta.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
          </p>
          <p className="translation">Echo wants to buy fruit.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Qué quiere comprar Echo?
            {isClient && (
              <button aria-label="Reproducir audio de Qué quiere comprar Echo?" onClick={() => speak('¿Qué quiere comprar Eko?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">What does Echo want to buy?</p>
            <p>🧒 Echo quiere comprar fruta.
            {isClient && (
              <button aria-label="Reproducir audio de Echo quiere comprar fruta." onClick={() => speak('Eko quiere comprar fruta.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Echo wants to buy fruit.</p>
            <p>👨‍🏫 ¿Echo quiere comprar pan o fruta?
            {isClient && (
              <button aria-label="Reproducir audio de Echo quiere comprar pan o fruta?" onClick={() => speak('¿Eko quiere comprar pan o fruta?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Does Echo want to buy bread or fruit?</p>
            <p>🧒 Echo quiere comprar fruta.
            {isClient && (
              <button aria-label="Reproducir audio de Echo quiere comprar fruta." onClick={() => speak('Eko quiere comprar fruta.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Echo wants to buy fruit.</p>
          </div>
        </div>
        <div className="story-image">
          <Image
            src="/images/Kid_Echo_Buys_Fruit.png"
            alt="Echo at the market buying fruit"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Story Block 2: Mike walks to the market */}
      <div className="story-block">
        <div className="story-image">
          <Image
            src="/images/Kid_Mike_2_Mkt .png"
            alt="Mike walking to the market"
            width={400}
            height={250}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="story-text">
          <p>
            <strong>Mike camina al mercado.</strong>
            {isClient && (
              <button aria-label="Reproducir audio de Mike camina al mercado." onClick={() => speak('Mike camina al mercado.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
          </p>
          <p className="translation">Mike walks to the market.</p>
          <div className="qa">
            <p>👨‍🏫 ¿Quién camina al mercado?
            {isClient && (
              <button aria-label="Reproducir audio de Quién camina al mercado?" onClick={() => speak('¿Quién camina al mercado?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Who walks to the market?</p>
            <p>🧒 Mike camina al mercado.
            {isClient && (
              <button aria-label="Reproducir audio de Mike camina al mercado." onClick={() => speak('Mike camina al mercado.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Mike walks to the market.</p>
            <p>👨‍🏫 ¿Camina Mike o Echo?
            {isClient && (
              <button aria-label="Reproducir audio de Camina Mike o Echo?" onClick={() => speak('¿Camina Mike o Eko?', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Does Mike walk or Echo walk to the market?</p>
            <p>🧒 Mike camina al mercado.
            {isClient && (
              <button aria-label="Reproducir audio de Mike camina al mercado." onClick={() => speak('Mike camina al mercado.', 'es-ES', 0.7)}>🔊</button> // Rate 0.7
            )}
            </p>
            <p className="translation">Mike walks to the market.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
