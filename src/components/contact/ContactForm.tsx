"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "Renseignements sur les admissions",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-black text-xl text-slate-900">
          Message envoyé
        </h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Merci <strong className="text-slate-900">{formData.full_name}</strong>. Nos équipes vous répondront sous 24h ouvrées.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                full_name: "",
                email: "",
                phone: "",
                subject: "Renseignements sur les admissions",
                message: "",
              });
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Nouveau message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4"
    >
      <div>
        <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900">
          Envoyez-nous un message
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Réponse garantie sous 24h ouvrées.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-600 text-white text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Nom & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label htmlFor="full_name" className="block text-xs font-bold text-slate-800">
            Nom et prénom <span className="text-afi-red">*</span>
          </label>
          <input
            id="full_name"
            type="text"
            required
            placeholder="Aminata Sarr"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-bold text-slate-800">
            Email <span className="text-afi-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="aminata@exemple.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>
      </div>

      {/* Téléphone & Objet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label htmlFor="phone" className="block text-xs font-bold text-slate-800">
            Téléphone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+221 77 123 45 67"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="subject" className="block text-xs font-bold text-slate-800">
            Objet <span className="text-afi-red">*</span>
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
          >
            <option value="Renseignements sur les admissions">Admissions (Licences & Masters)</option>
            <option value="Cours du soir & Executive Education">Cours du soir & Formation continue</option>
            <option value="Partenariat entreprise / Stages">Partenariat & Recrutement</option>
            <option value="AFI Research Center">Recherche & Colloques</option>
            <option value="Autre demande">Autre demande</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="block text-xs font-bold text-slate-800">
          Message <span className="text-afi-red">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="Votre message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-afi-red hover:bg-red-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer le message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
