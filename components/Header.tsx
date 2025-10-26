import React from 'react';
import { FunnelStep } from '../types';

interface HeaderProps {
  currentStep: FunnelStep;
}

const steps = [
  { id: FunnelStep.Landing, name: 'Découverte' },
  { id: FunnelStep.Details, name: 'Détails' },
  { id: FunnelStep.Pricing, name: 'Offre' },
  { id: FunnelStep.Checkout, name: 'Paiement' },
  { id: FunnelStep.Upsell, name: 'Bonus' },
  { id: FunnelStep.ThankYou, name: 'Confirmation' },
];

const Header: React.FC<HeaderProps> = ({ currentStep }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-600"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <span className="text-xl font-bold text-slate-800">Solution Ultime</span>
        </div>
        <nav className="hidden md:flex flex-grow items-center justify-center px-8">
          {steps.map((step, index) => {
            const isBonusStep = step.id === FunnelStep.Upsell;
            const isCurrent = currentStep === step.id || (isBonusStep && currentStep === FunnelStep.Downsell);
            const completedStepId = isBonusStep ? FunnelStep.Downsell : step.id;
            const isCompleted = currentStep > completedStepId;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative text-center w-24">
                  <div 
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 border-2
                      ${isCurrent ? 'bg-white border-indigo-600 text-indigo-600' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-slate-300 text-slate-500'}
                    `}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : index + 1}
                  </div>
                  <p className={`mt-2 text-xs font-medium transition-colors duration-300 ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-auto h-1 transition-colors duration-500 ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
