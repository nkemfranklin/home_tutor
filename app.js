import React, { useState, useEffect } from 'react';

const SimplifiedFrenchTutor = () => {
  const [currentCategory, setCurrentCategory] = useState('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [language, setLanguage] = useState('french');
  const [score, setScore] = useState(0);
  
  // Grade 2 French content in categories
  const content = {
    syllables: [
      { french: "bou", english: "boo" },
      { french: "dou", english: "doo" },
      { french: "fou", english: "foo" },
      { french: "mou", english: "moo" },
      { french: "pou", english: "poo" },
      { french: "tou", english: "too" },
      { french: "sou", english: "soo" },
      { french: "rou", english: "roo" },
      { french: "lou", english: "loo" },
      { french: "boi", english: "bwah" },
      { french: "doi", english: "dwah" },
      { french: "foi", english: "fwah" },
      { french: "moi", english: "mwah" },
      { french: "poi", english: "pwah" },
      { french: "toi", english: "twah" },
      { french: "eau", english: "oh" },
      { french: "ain", english: "an" },
      { french: "ein", english: "an" },
      { french: "che", english: "shuh" },
      { french: "cha", english: "shah" }
    ],
    words: [
      { french: "livre", english: "book" },
      { french: "école", english: "school" },
      { french: "maison", english: "house" },
      { french: "bonjour", english: "hello" },
      { french: "merci", english: "thank you" },
      { french: "au revoir", english: "goodbye" },
      { french: "pomme", english: "apple" },
      { french: "banane", english: "banana" },
      { french: "orange", english: "orange" },
      { french: "table", english: "table" },
      { french: "chaise", english: "chair" },
      { french: "crayon", english: "pencil" },
      { french: "papier", english: "paper" },
      { french: "cahier", english: "notebook" },
      { french: "garçon", english: "boy" },
      { french: "fille", english: "girl" },
      { french: "frère", english: "brother" },
      { french: "soeur", english: "sister" },
      { french: "jouet", english: "toy" },
      { french: "vélo", english: "bicycle" }
    ],
    phrases: [
      { french: "Comment ça va?", english: "How are you?" },
      { french: "Je vais à l'école", english: "I am going to school" },
      { french: "C'est très bon", english: "It's very good" },
      { french: "J'aime les pommes", english: "I like apples" },
      { french: "Tu es mon ami", english: "You are my friend" },
      { french: "Je vais jouer dehors", english: "I am going to play outside" },
      { french: "J'ai un chat", english: "I have a cat" },
      { french: "Il fait beau aujourd'hui", english: "The weather is nice today" },
      { french: "Je vais au parc", english: "I am going to the park" },
      { french: "C'est mon anniversaire", english: "It's my birthday" },
      { french: "Où sont mes jouets?", english: "Where are my toys?" },
      { french: "Je veux un verre d'eau", english: "I want a glass of water" },
      { french: "J'aime lire des livres", english: "I like to read books" },
      { french: "Je ne sais pas", english: "I don't know" },
      { french: "Quelle heure est-il?", english: "What time is it?" }
    ]
  };
  
  // Get current item based on category and index
  const getCurrentItem = () => {
    if (currentCategory === 'welcome') return null;
    if (!content[currentCategory]) return null;
    if (currentIndex >= content[currentCategory].length) return content[currentCategory][0];
    return content[currentCategory][currentIndex];
  };
  
  // Text-to-speech function
  const speak = (text, lang = 'fr-FR') => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // Slower rate for learning
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Play current item
  const playCurrentItem = () => {
    const item = getCurrentItem();
    if (!item) return;
    
    if (language === 'french') {
      speak(item.french, 'fr-FR');
    } else {
      speak(item.french, 'fr-FR');
      setTimeout(() => {
        speak(item.english, 'en-US');
      }, 1500);
    }
    
    // Simulate some learning progress
    setScore(prevScore => prevScore + 0.1);
  };
  
  // Navigate to next item
  const nextItem = () => {
    if (!content[currentCategory]) return;
    if (currentIndex < content[currentCategory].length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to beginning
    }
  };
  
  // Navigate to previous item
  const prevItem = () => {
    if (!content[currentCategory]) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(content[currentCategory].length - 1); // Loop to end
    }
  };
  
  // Switch category
  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentIndex(0);
    
    // Play introduction based on category
    if (category === 'syllables') {
      if (language === 'french') {
        speak("Pratiquons les syllabes françaises.", 'fr-FR');
      } else {
        speak("Let's practice French syllables.", 'en-US');
      }
    } else if (category === 'words') {
      if (language === 'french') {
        speak("Apprenons des mots français.", 'fr-FR');
      } else {
        speak("Let's learn French words.", 'en-US');
      }
    } else if (category === 'phrases') {
      if (language === 'french') {
        speak("Répétons des phrases utiles.", 'fr-FR');
      } else {
        speak("Let's repeat useful phrases.", 'en-US');
      }
    }
  };
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'french' ? 'english' : 'french');
  };
  
  // Initial welcome message
  useEffect(() => {
    if (currentCategory === 'welcome') {
      const timer = setTimeout(() => {
        if (language === 'french') {
          speak("Bonjour! Je suis votre tuteur de français pour la deuxième année.", 'fr-FR');
        } else {
          speak("Hello! I am your French tutor for grade 2.", 'en-US');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentCategory, language]);
  
  // Color based on category
  const getCategoryColor = (cat) => {
    if (cat === 'syllables') return 'bg-blue-500';
    if (cat === 'words') return 'bg-green-500';
    if (cat === 'phrases') return 'bg-purple-500';
    return 'bg-gray-500';
  };
  
  // Get lighter background color for content display
  const getLightCategoryColor = (cat) => {
    if (cat === 'syllables') return 'bg-blue-100';
    if (cat === 'words') return 'bg-green-100';
    if (cat === 'phrases') return 'bg-purple-100';
    return 'bg-gray-100';
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 bg-blue-50 rounded-xl shadow-lg">
      {/* Header with language toggle */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-700">
          {language === 'french' ? 'Tuteur de Français - 2ème Année' : 'French Tutor - Grade 2'}
        </h1>
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold"
        >
          {language === 'french' ? 'EN' : 'FR'}
        </button>
      </div>
      
      {/* Tutor Character */}
      <div className="mb-6 relative">
        <img 
          src="/api/placeholder/150/150" 
          alt="Tutor Character" 
          className={`rounded-full border-4 border-yellow-400 ${speaking ? 'animate-pulse' : ''}`}
        />
        {speaking && (
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-blue-200 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        <button 
          onClick={() => changeCategory('syllables')}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            currentCategory === 'syllables' ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          {language === 'french' ? 'Syllabes' : 'Syllables'}
        </button>
        <button 
          onClick={() => changeCategory('words')}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            currentCategory === 'words' ? 'bg-green-600 ring-2 ring-green-300' : 'bg-green-400 hover:bg-green-500'
          }`}
        >
          {language === 'french' ? 'Mots' : 'Words'}
        </button>
        <button 
          onClick={() => changeCategory('phrases')}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            currentCategory === 'phrases' ? 'bg-purple-600 ring-2 ring-purple-300' : 'bg-purple-400 hover:bg-purple-500'
          }`}
        >
          {language === 'french' ? 'Phrases' : 'Phrases'}
        </button>
      </div>
      
      {/* Welcome section */}
      {currentCategory === 'welcome' && (
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            {language === 'french' ? 'Bienvenue!' : 'Welcome!'}
          </h2>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <img 
              src="/api/placeholder/400/300" 
              alt="Welcome" 
              className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div>
              <p className="text-lg mb-3">
                {language === 'french' 
                  ? 'Bonjour! Je suis votre tuteur de français pour la deuxième année. Je vais vous aider à améliorer votre prononciation!' 
                  : 'Hello! I am your French tutor for grade 2. I will help you improve your pronunciation!'}
              </p>
              <p className="text-lg">
                {language === 'french'
                  ? "Choisissez 'Syllabes', 'Mots', ou 'Phrases' pour commencer." 
                  : "Choose 'Syllables', 'Words', or 'Phrases' to begin."}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Learning content */}
      {currentCategory !== 'welcome' && getCurrentItem() && (
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            {language === 'french' 
              ? (currentCategory === 'syllables' ? 'Syllabes' : currentCategory === 'words' ? 'Mots' : 'Phrases') 
              : (currentCategory === 'syllables' ? 'Syllables' : currentCategory === 'words' ? 'Words' : 'Phrases')}
          </h2>
          
          <div 
            className={`text-center p-8 rounded-lg cursor-pointer mb-4 ${getLightCategoryColor(currentCategory)}`}
            onClick={playCurrentItem}
          >
            <p className="text-4xl font-bold mb-3">{getCurrentItem().french}</p>
            <p className="text-xl text-gray-600">{getCurrentItem().english}</p>
          </div>
          
          <div className="flex justify-center mb-4">
            <button 
              onClick={playCurrentItem}
              className={`px-6 py-3 ${getCategoryColor(currentCategory)} text-white font-semibold rounded-lg flex items-center`}
              disabled={speaking}
            >
              <span className="mr-2">
                {language === 'french' ? 'Écouter' : 'Listen'}
              </span>
              <span className="text-xl">🔊</span>
            </button>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center justify-between w-full mt-6">
            <button 
              onClick={prevItem}
              className={`px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white`}
            >
              ← {language === 'french' ? 'Précédent' : 'Previous'}
            </button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {content[currentCategory].length}
              </span>
            </div>
            
            <button 
              onClick={nextItem}
              className={`px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white`}
            >
              {language === 'french' ? 'Suivant' : 'Next'} →
            </button>
          </div>
        </div>
      )}
      
      {/* Progress display */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">
            {language === 'french' ? 'Progrès' : 'Progress'}
          </h3>
          <div className="flex items-center">
            <span className="font-bold mr-2">{Math.floor(score)}</span>
            <span className="text-yellow-500">⭐</span>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-4">
          <div 
            className="bg-yellow-500 h-4 rounded-full" 
            style={{ width: `${Math.min(100, (score / 30) * 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Deployment instructions */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="font-semibold text-lg mb-2">
          {language === 'french' ? 'Installation sur Tablette Android' : 'Android Tablet Installation'}
        </h3>
        
        <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
          <h4 className="font-semibold">1. WebView (Simple)</h4>
          <ol className="list-decimal pl-5 space-y-1 mb-2">
            <li>{language === 'french' ? 'Installez Chrome ou Kiwi Browser' : 'Install Chrome or Kiwi Browser'}</li>
            <li>{language === 'french' ? 'Ouvrez le site web' : 'Open the website'}</li>
            <li>{language === 'french' ? 'Menu → "Ajouter à l\'écran d\'accueil"' : 'Menu → "Add to Home Screen"'}</li>
          </ol>
        </div>
        
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold">2. {language === 'french' ? 'Application Hors-ligne' : 'Offline App'}</h4>
          <ol className="list-decimal pl-5 space-y-1 mb-2">
            <li>{language === 'french' ? 'Hébergez sur GitHub Pages (gratuit)' : 'Host on GitHub Pages (free)'}</li>
            <li>{language === 'french' ? 'Utilisez WebDGap pour convertir en APK' : 'Use WebDGap to convert to APK'}</li>
            <li>{language === 'french' ? 'Installez l\'APK sur la tablette' : 'Install the APK on the tablet'}</li>
          </ol>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="p-4 bg-yellow-100 rounded-lg text-sm">
        <p className="font-semibold mb-1">
          {language === 'french' ? 'Conseils:' : 'Tips:'}
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            {language === 'french' 
              ? 'Cliquez sur la carte ou le bouton "Écouter" pour entendre la prononciation.' 
              : 'Click on the card or "Listen" button to hear the pronunciation.'}
          </li>
          <li>
            {language === 'french' 
              ? 'Répétez à voix haute pour pratiquer.' 
              : 'Repeat out loud to practice.'}
          </li>
          <li>
            {language === 'french' 
              ? 'Utilisez les boutons pour naviguer entre les éléments.' 
              : 'Use the buttons to navigate between items.'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimplifiedFrenchTutor;
