// Fix: Implement the DownsellPage component.
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { ArrowRight, FileText } from 'lucide-react';

interface DownsellPageProps {
  onAccept: () => void;
  onDecline: () => void;
}

const DownsellPage: React.FC<DownsellPageProps> = ({ onAccept, onDecline }) => {
  const { setOrder } = useContext(OrderContext);

  const handleAccept = () => {
    setOrder(prev => ({ ...prev, downsellProduct: true, total: prev.total + 9 }));
    onAccept();
  };

  return (
    <div className="max-w-3xl mx-auto text-center animate-slide-in-up">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <FileText />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
          Une Dernière Chose...
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          Nous comprenons. Le Pack Pro n'est peut-être pas pour vous. Mais que diriez-vous de notre <strong className="font-semibold text-slate-800">Guide de Démarrage Rapide</strong> ?
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-left my-8">
            <p className="text-slate-700">
                Ce guide PDF de 20 pages vous donne les stratégies essentielles pour être opérationnel en moins d'une heure. C'est le moyen le plus rapide de commencer à voir des résultats.
            </p>
        </div>

        <div className="my-6">
            <span className="text-4xl font-bold text-indigo-600">Seulement 9€</span>
            <span className="text-lg text-slate-500 line-through ml-2">29€</span>
        </div>

        <button
          onClick={handleAccept}
          className="group w-full mb-4 inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Oui, Ajoutez Le Guide À Ma Commande !
          <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={onDecline}
          className="text-slate-500 hover:text-slate-700 hover:underline transition-colors duration-200"
        >
          Non merci, je souhaite finaliser ma commande.
        </button>
      </div>
    </div>
  );
};

export default DownsellPage;
