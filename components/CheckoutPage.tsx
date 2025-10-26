// Fix: Implement the CheckoutPage component and correct a minor typo.
import React, { useContext, useState, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Lock, Mail, CreditCard, CalendarDays, User } from 'lucide-react';
import VisaIcon from './icons/VisaIcon';
import MastercardIcon from './icons/MastercardIcon';
import AmexIcon from './icons/AmexIcon';

interface CheckoutPageProps {
  onNext: () => void;
}

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{1,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

const formatExpiryDate = (value: string) => {
    const v = value.replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
        return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
};


const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNext }) => {
  const { order } = useContext(OrderContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
      email: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
      name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value) return "L'adresse email est requise.";
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? '' : "Adresse email invalide.";
      case 'cardNumber':
        if (!value) return "Le numéro de carte est requis.";
        return value.replace(/\s/g, '').length === 16 ? '' : "Numéro de carte invalide (16 chiffres).";
      case 'expiry':
        if (!value) return "La date d'expiration est requise.";
        return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value) ? '' : "Date invalide (MM/AA).";
      case 'cvc':
        if (!value) return "Le CVC est requis.";
        return value.length >= 3 && value.length <= 4 ? '' : "CVC invalide (3-4 chiffres).";
      case 'name':
        if (!value) return "Le nom est requis.";
        return value.trim().length >= 2 ? '' : "Le nom sur la carte est trop court.";
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cardNumber') {
        formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
        formattedValue = formatExpiryDate(value);
    }
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: Record<string, string> = {};
    // FIX: Iterate over formData keys in a type-safe way to prevent TypeScript errors.
    // The previous implementation had a type inference issue with the 'key' variable.
    // This revised loop correctly treats 'key' as a string and casts it only for property access.
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        setIsProcessing(true);
        setTimeout(() => {
          onNext();
        }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">
      {/* Order Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 order-last md:order-first">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Récapitulatif</h2>
        <div className="space-y-4 text-slate-600">
            <div className="flex justify-between">
                <span>Solution Ultime - Accès à vie</span>
                <span className="font-semibold text-slate-800">49€</span>
            </div>
             <div className="border-t border-slate-200"></div>
            <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>{order.total}€</span>
            </div>
        </div>
        <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
            <p className="font-semibold mb-2">Garantie 100% Satisfait ou Remboursé</p>
            <p>Si vous n'êtes pas entièrement satisfait dans les 30 jours, nous vous remboursons intégralement, sans poser de questions.</p>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Paiement Sécurisé</h2>
        <div className="flex items-center gap-2 mb-6">
            <VisaIcon />
            <MastercardIcon />
            <AmexIcon />
        </div>
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
                {/* Email */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input type="email" name="email" id="email" className={`peer block w-full rounded-md border py-3 pl-10 text-slate-900 shadow-sm placeholder:text-transparent focus:outline-none focus:ring-2 sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} placeholder="Adresse Email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required />
                    <label htmlFor="email" className="pointer-events-none absolute left-10 top-3 origin-left -translate-y-1/2 scale-100 text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600">Adresse Email</label>
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                {/* Card Number */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CreditCard className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input type="tel" name="cardNumber" id="card-number" inputMode="numeric" autoComplete="cc-number" maxLength={19} className={`peer block w-full rounded-md border py-3 pl-10 text-slate-900 shadow-sm placeholder:text-transparent focus:outline-none focus:ring-2 sm:text-sm ${errors.cardNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} placeholder="Numéro de carte" value={formData.cardNumber} onChange={handleChange} onBlur={handleBlur} required />
                    <label htmlFor="card-number" className="pointer-events-none absolute left-10 top-3 origin-left -translate-y-1/2 scale-100 text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600">Numéro de carte</label>
                     {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
                </div>
                <div className="flex gap-4">
                    {/* Expiry */}
                    <div className="relative flex-1">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <CalendarDays className="h-5 w-5 text-slate-400" aria-hidden="true" />
                        </div>
                        <input type="text" name="expiry" id="expiry" maxLength={5} className={`peer block w-full rounded-md border py-3 pl-10 text-slate-900 shadow-sm placeholder:text-transparent focus:outline-none focus:ring-2 sm:text-sm ${errors.expiry ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} placeholder="MM/AA" value={formData.expiry} onChange={handleChange} onBlur={handleBlur} required />
                        <label htmlFor="expiry" className="pointer-events-none absolute left-10 top-3 origin-left -translate-y-1/2 scale-100 text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600">MM/AA</label>
                         {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
                    </div>
                    {/* CVC */}
                    <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                        </div>
                        <input type="text" name="cvc" id="cvc" maxLength={4} className={`peer block w-full rounded-md border py-3 pl-10 text-slate-900 shadow-sm placeholder:text-transparent focus:outline-none focus:ring-2 sm:text-sm ${errors.cvc ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} placeholder="CVC" value={formData.cvc} onChange={handleChange} onBlur={handleBlur} required />
                        <label htmlFor="cvc" className="pointer-events-none absolute left-10 top-3 origin-left -translate-y-1/2 scale-100 text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600">CVC</label>
                         {errors.cvc && <p className="mt-1 text-xs text-red-600">{errors.cvc}</p>}
                    </div>
                </div>
                 {/* Name */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input type="text" name="name" id="name" className={`peer block w-full rounded-md border py-3 pl-10 text-slate-900 shadow-sm placeholder:text-transparent focus:outline-none focus:ring-2 sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} placeholder="Nom sur la carte" value={formData.name} onChange={handleChange} onBlur={handleBlur} required />
                    <label htmlFor="name" className="pointer-events-none absolute left-10 top-3 origin-left -translate-y-1/2 scale-100 text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-indigo-600">Nom sur la carte</label>
                     {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
            </div>
            <button 
                type="submit"
                disabled={isProcessing}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:from-indigo-400 disabled:to-purple-400 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isProcessing ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement...
                    </>
                ) : (
                    <>
                        <Lock className="h-5 w-5" />
                        Payer {order.total}€ en toute sécurité
                    </>
                )}
            </button>
            <p className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                <Lock className="h-3 w-3" />
                Transactions sécurisées par chiffrement SSL.
            </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;