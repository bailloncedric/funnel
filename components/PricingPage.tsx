// Fix: Implement the PricingPage component.
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useCountdown } from '../hooks/useCountdown';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

interface PricingPageProps {
  onNext: () => void;
  onDecline: () => void;
}

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <span className="text-xl font-bold text-red-600">Offre expirée !</span>;
  }

  return (
    <div className="flex items-center space-x-2 text-slate-800">
      <Clock className="h-6 w-6 text-indigo-500" />
      <span className="font-semibold">Offre se termine dans :</span>
      <span className="font-bold text-lg text-indigo-600 tabular-nums">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

const PricingPage: React.FC<PricingPageProps> = ({ onNext, onDecline }) => {
  const { setOrder } = useContext(OrderContext);
  const fiveMinutesFromNow = new Date(new Date().getTime() + 5 * 60 * 1000);

  const handleSelectPlan = () => {
    setOrder(prev => ({ ...prev, mainProduct: true, total: prev.total + 49 }));
    onNext();
  };

  const features = [
    "Accès illimité à la plateforme",
    "Support client prioritaire 24/7",
    "Analyses avancées et rapports",
    "Mises à jour gratuites à vie",
    "Intégrations exclusives",
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Une Offre Que Vous Ne Pouvez Pas Refuser</h2>
          <p className="text-slate-600 mb-6">Obtenez un accès complet à notre solution pour un paiement unique et dérisoire.</p>
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg mb-8">
            <CountdownTimer targetDate={fiveMinutesFromNow} />
          </div>

          <div className="my-8">
            <span className="text-5xl font-bold text-indigo-600">49€</span>
            <span className="text-xl text-slate-500 line-through ml-2">99€</span>
            <p className="text-slate-500 font-medium mt-2">Paiement unique, accès à vie.</p>
          </div>

          <button
            onClick={handleSelectPlan}
            className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Oui, Je Veux Profiter De L'Offre !
            <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
           <button
            onClick={onDecline}
            className="mt-4 text-slate-500 hover:text-slate-700 hover:underline transition-colors duration-200 text-sm"
          >
            Non merci, cette offre ne m'intéresse pas pour le moment.
          </button>
        </div>
        <div className="bg-slate-50 p-8 border-t border-slate-200">
          <h3 className="font-semibold text-lg mb-4 text-slate-800 text-center">Ce que vous obtenez :</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <span className="text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
       <p className="text-center text-slate-500 mt-6 text-sm">Paiement 100% sécurisé. Garantie satisfait ou remboursé de 30 jours.</p>
    </div>
  );
};

export default PricingPage;