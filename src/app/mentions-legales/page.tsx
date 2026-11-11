import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | AFI-L'UE",
  description: "Mentions légales officielles du site web de l'Université AFI-L'UE.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-sm space-y-6">
        <h1 className="font-heading font-black text-3xl text-slate-900 border-b border-slate-100 pb-4">
          Mentions Légales
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              1. Éditeur de la Plateforme
            </h2>
            <p>
              Le site officiel <strong>https://afi-ue.sn</strong> est édité par l&apos;Université AFI-L&apos;UE (AFI-L&apos;Université de l&apos;Entreprise), établissement privé d&apos;enseignement supérieur agréé par le Ministère de l&apos;Enseignement Supérieur, de la Recherche et de l&apos;Innovation du Sénégal.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Siège social :</strong> Dakar, zone B Rue G, Sénégal</li>
              <li><strong>Téléphone :</strong> +221 33 824 71 10 / +221 77 508 87 28</li>
              <li><strong>Email officiel :</strong> afi@afi-ue.sn</li>
              <li><strong>Site web officiel :</strong> www.afi-ue.sn</li>
              <li><strong>Directeur de la publication :</strong> Direction Générale d&apos;AFI-L&apos;UE</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              2. Hébergement & Infrastructure
            </h2>
            <p>
              La plateforme est hébergée sur des serveurs sécurisés managés par Coolify / Contabo avec sauvegardes chiffrées et conformité aux standards de sécurité applicative.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              3. Propriété Intellectuelle
            </h2>
            <p>
              L&apos;ensemble des éléments graphiques, marques, logos, textes, vidéos et architectures logicielles présents sur ce site sont la propriété exclusive d&apos;AFI-L&apos;UE ou font l&apos;objet d&apos;une autorisation expresse de diffusion. Toute reproduction totale ou partielle sans accord préalable écrit est strictement interdite.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
