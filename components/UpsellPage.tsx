// Fix: Implement the UpsellPage component.
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { ArrowRight, Zap } from 'lucide-react';

interface UpsellPageProps {
  onAccept: () => void;
  onDecline: () => void;
}

const UpsellPage: React.FC<UpsellPageProps> = ({ onAccept, onDecline }) => {
  const { setOrder } = useContext(OrderContext);

  const handleAccept = () => {
    setOrder(prev => ({ ...prev, upsellProduct: true, total: prev.total + 29 }));
    onAccept();
  };

  return (
    <div className="max-w-3xl mx-auto text-center animate-slide-in-up">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Zap />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
          <span className="text-indigo-600">Attendez !</span> Votre commande n'est pas complète...
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          Ajoutez notre <strong className="font-semibold text-slate-800">Pack Pro Accélérateur</strong> pour obtenir des résultats 3x plus rapidement.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-left my-8">
            <h2 className="text-xl font-bold mb-4">Le Pack Pro Accélérateur inclut :</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>10+ templates "prêts à l'emploi" pour des résultats immédiats.</li>
                <li>Une formation vidéo avancée de 2 heures.</li>
                <li>Accès à notre communauté privée d'experts.</li>
                <li>Consultation stratégique de 30 minutes.</li>
            </ul>
        </div>

        <div className="my-6">
            <span className="text-4xl font-bold text-indigo-600">Seulement 29€</span>
            <span className="text-lg text-slate-500 line-through ml-2">79€</span>
        </div>

        <button
          onClick={handleAccept}
          className="group w-full mb-4 inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Oui, Je Veux Accélérer Mes Résultats !
          <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={onDecline}
          className="text-slate-500 hover:text-slate-700 hover:underline transition-colors duration-200"
        >
          Non merci, je ne veux pas de résultats plus rapides.
        </button>
      </div>
    </div>
  );
};

export default UpsellPage;
