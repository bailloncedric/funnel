
import React from 'react';
import TestimonialCard from './TestimonialCard';
import { ArrowRight, Zap, BarChart, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

interface DetailsPageProps {
  onNext: () => void;
}

const testimonials: Testimonial[] = [
  {
    quote: "Cette solution a complètement changé notre façon de travailler. Notre efficacité a augmenté de 200% en seulement trois mois. Incroyable !",
    author: "Jeanne Dubois",
    role: "CEO, Tech Innovators",
    avatarUrl: "https://picsum.photos/id/1027/100/100"
  },
  {
    quote: "J'étais sceptique au début, mais les résultats parlent d'eux-mêmes. Un investissement que je referais sans hésiter.",
    author: "Marc Petit",
    role: "Directeur Marketing, Creative Solutions",
    avatarUrl: "https://picsum.photos/id/1005/100/100"
  },
    {
    quote: "Le support client est exceptionnel. Ils sont toujours là pour nous aider à tirer le meilleur parti de l'outil. C'est un véritable partenariat.",
    author: "Sophie Martin",
    role: "Chef de projet, Stratégies Digitales",
    avatarUrl: "https://picsum.photos/id/1011/100/100"
  },
];

const features = [
    {
        icon: Zap,
        title: "Performance Éclair",
        description: "Optimisez vos processus avec une vitesse d'exécution inégalée qui vous laisse loin devant la concurrence."
    },
    {
        icon: BarChart,
        title: "Analyses Détaillées",
        description: "Prenez des décisions éclairées grâce à des tableaux de bord intuitifs et des données en temps réel."
    },
    {
        icon: ShieldCheck,
        title: "Sécurité Renforcée",
        description: "Dormez sur vos deux oreilles en sachant que vos données sont protégées par les normes de sécurité les plus élevées."
    }
];

const DetailsPage: React.FC<DetailsPageProps> = ({ onNext }) => {
  return (
    <div className="animate-slide-in-up space-y-16">
      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-2">Pourquoi Tout Le Monde Parle De Nous</h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">Nous ne sommes pas juste un autre outil. Nous sommes le partenaire de croissance qu'il vous manquait.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-block p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-2">Ils Nous Font Confiance, Pourquoi Pas Vous ?</h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">Découvrez ce que nos clients disent de leur succès fulgurant.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Voir l'offre irrésistible
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>
    </div>
  );
};

export default DetailsPage;
