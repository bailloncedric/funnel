// Fix: Implement the main App component to orchestrate the sales funnel flow.
import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DetailsPage from './components/DetailsPage';
import PricingPage from './components/PricingPage';
import CheckoutPage from './components/CheckoutPage';
import UpsellPage from './components/UpsellPage';
import DownsellPage from './components/DownsellPage';
import ThankYouPage from './components/ThankYouPage';
import Footer from './components/Footer';
import { FunnelStep } from './types';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>(FunnelStep.Landing);

  const renderStep = () => {
    switch (currentStep) {
      case FunnelStep.Landing:
        return <LandingPage onNext={() => setCurrentStep(FunnelStep.Details)} />;
      case FunnelStep.Details:
        return <DetailsPage onNext={() => setCurrentStep(FunnelStep.Pricing)} />;
      case FunnelStep.Pricing:
        return (
          <PricingPage
            onNext={() => setCurrentStep(FunnelStep.Checkout)}
            onDecline={() => setCurrentStep(FunnelStep.Downsell)}
          />
        );
      case FunnelStep.Checkout:
        return <CheckoutPage onNext={() => setCurrentStep(FunnelStep.Upsell)} />;
      case FunnelStep.Upsell:
        return (
          <UpsellPage
            onAccept={() => setCurrentStep(FunnelStep.ThankYou)}
            onDecline={() => setCurrentStep(FunnelStep.Downsell)}
          />
        );
      case FunnelStep.Downsell:
        return (
          <DownsellPage
            onAccept={() => setCurrentStep(FunnelStep.ThankYou)}
            onDecline={() => setCurrentStep(FunnelStep.ThankYou)}
          />
        );
      case FunnelStep.ThankYou:
        return <ThankYouPage />;
      default:
        return <LandingPage onNext={() => setCurrentStep(FunnelStep.Details)} />;
    }
  };

  return (
    <OrderProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <Header currentStep={currentStep} />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          {renderStep()}
        </main>
        <Footer />
      </div>
    </OrderProvider>
  );
}

export default App;