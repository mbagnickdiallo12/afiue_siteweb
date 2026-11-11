import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Protection des Données | AFI-L'UE",
  description:
    "Règles relatives à la collecte, au traitement et à la protection des données personnelles des candidats et étudiants d'AFI-L'UE.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-sm space-y-6">
        <h1 className="font-heading font-black text-3xl text-slate-900 border-b border-slate-100 pb-4">
          Politique de Confidentialité & Protection des Données
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              1. Engagement de l&apos;Établissement
            </h2>
            <p>
              L&apos;Université AFI-L&apos;UE accorde la plus haute importance à la protection de la vie privée et des données à caractère personnel de ses étudiants, candidats, diplômés et partenaires, conformément aux dispositions de la loi sénégalaise n° 2008-12 relative à la protection des données à caractère personnel et aux délibérations de la Commission des Données Personnelles (CDP).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              2. Données Collectées lors des Candidatures
            </h2>
            <p>
              Les données personnelles collectées via le portail de candidature (nom, prénom, date de naissance, téléphone, email, relevés de notes et diplômes antérieurs) sont strictement réservées à l&apos;instruction pédagogique et administrative des dossiers d&apos;admission.
            </p>
            <p>
              Les documents justificatifs téléversés sont stockés dans des espaces privés sécurisés (Row Level Security et accès restreint au personnel habilité de la scolarité). Ils ne font l&apos;objet d&apos;aucune commercialisation ni cession à des tiers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              3. Droits des Candidats et Utilisateurs
            </h2>
            <p>
              Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès, de rectification, de limitation et de suppression de vos données personnelles. Pour exercer ces droits, vous pouvez adresser votre demande accompagnée d&apos;une copie de votre pièce d&apos;identité à l&apos;adresse email officielle : <strong>dpo@afi-ue.sn</strong> ou par courrier au siège de l&apos;établissement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
