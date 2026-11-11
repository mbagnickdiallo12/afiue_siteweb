"use client";

import { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Share2,
  Sparkles,
  Building2,
  RefreshCw,
} from "lucide-react";
import { SiteSettings } from "@/types/database";

interface Props {
  initialSettings: SiteSettings;
}

export function SettingsAdminManager({ initialSettings }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde");
      }

      setSettings(data.data);
      showToast("Paramètres du site mis à jour et synchronisés !");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Paramètres Généraux du Site
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configurez les coordonnées de contact, numéros de téléphone officiels, adresses des campus et métadonnées globales.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md shadow-afi-navy/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section: Identité de l'Institution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-afi-navy" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Identité de l&apos;Université & Session Académique
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nom officiel de l&apos;établissement
              </label>
              <input
                type="text"
                value={settings.university_name || ""}
                onChange={(e) =>
                  setSettings({ ...settings, university_name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Acronyme
              </label>
              <input
                type="text"
                value={settings.acronym || ""}
                onChange={(e) =>
                  setSettings({ ...settings, acronym: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Année Académique Courante
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={settings.academic_year || "2026-2027"}
                  onChange={(e) =>
                    setSettings({ ...settings, academic_year: e.target.value })
                  }
                  placeholder="2026-2027"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Slogan institutionnel (Tagline)
              </label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>
          </div>
        </div>

        {/* Section: Téléphones & Contacts Directs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Phone className="w-4 h-4 text-afi-red" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Numéros de Téléphone & Contact Direct
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Téléphone Standard Fixe (Dakar) *
              </label>
              <input
                type="text"
                value={settings.phone_main || ""}
                onChange={(e) =>
                  setSettings({ ...settings, phone_main: e.target.value })
                }
                placeholder="+221 33 824 71 10"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Affiché dans le bandeau supérieur et le pied de page
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Téléphone Mobile / Scolarité *
              </label>
              <input
                type="text"
                value={settings.phone_mobile || ""}
                onChange={(e) =>
                  setSettings({ ...settings, phone_mobile: e.target.value })
                }
                placeholder="+221 77 508 87 28"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Ligne directe du bureau des admissions
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Numéro WhatsApp Admissions
              </label>
              <input
                type="text"
                value={settings.whatsapp || ""}
                onChange={(e) =>
                  setSettings({ ...settings, whatsapp: e.target.value })
                }
                placeholder="+221 77 508 87 28"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Alimente le bouton de chat WhatsApp flottant
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Téléphone Admissions / Concours
              </label>
              <input
                type="text"
                value={settings.phone_admission || ""}
                onChange={(e) =>
                  setSettings({ ...settings, phone_admission: e.target.value })
                }
                placeholder="+221 33 824 71 10"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>
          </div>
        </div>

        {/* Section: Adresses Email & Campus */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Emails Officiels & Localisation des Campus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Général (contact)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={settings.main_email || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, main_email: e.target.value })
                  }
                  placeholder="afi@afi-ue.sn"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Inscriptions & Admissions
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={settings.admission_email || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, admission_email: e.target.value })
                  }
                  placeholder="admission@afi-ue.sn"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresse Campus Principal (Dakar)
              </label>
              <textarea
                rows={2}
                value={settings.main_address || ""}
                onChange={(e) =>
                  setSettings({ ...settings, main_address: e.target.value })
                }
                placeholder="Dakar, zone B Rue G, Sénégal"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresse Campus Régional (Thiès)
              </label>
              <textarea
                rows={2}
                value={settings.campus_thies || ""}
                onChange={(e) =>
                  setSettings({ ...settings, campus_thies: e.target.value })
                }
                placeholder="Quartier Caritas, En face Cité Malick Sy, Thiès, Sénégal"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>
          </div>
        </div>

        {/* Section: Réseaux Sociaux */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Réseaux Sociaux Officiels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Page Facebook
              </label>
              <input
                type="text"
                value={settings.socials?.facebook || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/afildakar"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Profil LinkedIn
              </label>
              <input
                type="text"
                value={settings.socials?.linkedin || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/school/afi-l-ue"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Compte Instagram
              </label>
              <input
                type="text"
                value={settings.socials?.instagram || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/afi_ue_dakar"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Compte Twitter / X
              </label>
              <input
                type="text"
                value={settings.socials?.twitter || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, twitter: e.target.value },
                  })
                }
                placeholder="https://twitter.com/afi_ue"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-lg shadow-afi-navy/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? "Enregistrement..." : "Enregistrer tous les paramètres"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

