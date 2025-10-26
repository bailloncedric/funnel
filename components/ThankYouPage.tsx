// Fix: Implement the ThankYouPage component.
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { PartyPopper } from 'lucide-react';

const ThankYouPage: React.FC = () => {
    const { order } = useContext(OrderContext);

    return (
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <PartyPopper className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Merci pour votre commande !</h1>
                <p className="text-lg text-slate-600 mb-8">
                    Votre paiement a été traité avec succès. Vous allez recevoir un email de confirmation avec tous les détails de votre accès.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-left">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Récapitulatif de la commande</h2>
                    <ul className="space-y-3 text-slate-700">
                        {order.mainProduct && (
                            <li className="flex justify-between">
                                <span>Solution Ultime - Accès à vie</span>
                                <span>49€</span>
                            </li>
                        )}
                        {order.upsellProduct && (
                            <li className="flex justify-between">
                                <span>Bonus : Pack Pro Accélérateur</span>
                                <span>29€</span>
                            </li>
                        )}
                        {order.downsellProduct && (
                            <li className="flex justify-between">
                                <span>Bonus : Guide Démarrage Rapide</span>
                                <span>9€</span>
                            </li>
                        )}
                        <li className="border-t border-slate-300 my-3"></li>
                        <li className="flex justify-between font-bold text-slate-900 text-lg">
                            <span>TOTAL</span>
                            <span>{order.total}€</span>
                        </li>
                    </ul>
                </div>
                 <p className="mt-8 text-sm text-slate-500">
                    Si vous avez des questions, n'hésitez pas à contacter notre <a href="#" className="text-indigo-600 hover:underline">support client</a>.
                </p>
            </div>
        </div>
    );
};

export default ThankYouPage;
