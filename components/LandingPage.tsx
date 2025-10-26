import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
}

const personalizations: Record<string, { headline: React.ReactNode; subheading: string }> = {
  facebook: {
    headline: (
      <>
        Merci de nous rejoindre depuis Facebook ! Découvrez la{' '}
        <span className="text-indigo-600">Solution Exclusive</span> qui fait parler.
      </>
    ),
    subheading:
      'Vous avez vu ce que nous pouvons faire. Il est maintenant temps de découvrir comment notre méthode secrète peut décupler votre productivité.',
  },
  // On peut facilement ajouter d'autres sources ici
  // google: { ... }
};

const defaultContent = {
  headline: (
    <>
      Transformez Votre Entreprise Avec Notre{' '}
      <span className="text-indigo-600">Solution Révolutionnaire</span>
    </>
  ),
  subheading:
    "Arrêtez de perdre du temps avec des outils inefficaces. Découvrez la méthode secrète que les leaders de l'industrie utilisent pour décupler leur productivité.",
};

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');
    if (source && personalizations[source]) {
      setContent(personalizations[source]);
    }
  }, []);

  return (
    <div className="text-center animate-fade-in">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="relative bg-white/50 backdrop-blur-lg p-8 md:p-16 rounded-2xl shadow-lg border border-slate-200">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {content.subheading}
          </p>
          <button
            onClick={onNext}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Je Veux Découvrir La Suite
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-sm text-slate-500">Rejoignez plus de 10,000+ entreprises satisfaites.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
