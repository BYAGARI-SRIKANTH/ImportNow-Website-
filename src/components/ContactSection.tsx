import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Instagram,
  MapPin,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  CONTACT_INFO,
  QUOTE_BUDGETS,
  QUOTE_CATEGORIES,
} from '../data/importNowData';
import { WhatsAppIcon } from './BrandPrimitives';

interface ContactSectionProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

interface FormErrors {
  name?: string;
  city?: string;
}

export function ContactSection({
  selectedCategory,
  onCategoryChange,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState(selectedCategory || QUOTE_CATEGORIES[0]);
  const [quantity, setQuantity] = useState('');
  const [budget, setBudget] = useState(QUOTE_BUDGETS[1]);
  const [details, setDetails] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedCategory && QUOTE_CATEGORIES.includes(selectedCategory)) {
      setCategory(selectedCategory);
      setSubmittedPayload(null);
    }
  }, [selectedCategory]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    } else if (name.trim().length < 2) {
      nextErrors.name = 'Please enter at least 2 characters.';
    }
    if (city.trim().length === 1) {
      nextErrors.city = 'Please enter a valid city name.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const lines = [
      'Hi ImportNow team, I would like a free sourcing quote:',
      `• Name: ${name.trim()}`,
      city.trim() ? `• City: ${city.trim()}` : null,
      `• Category: ${category}`,
      quantity.trim() ? `• Approx. quantity: ${quantity.trim()}` : null,
      `• Budget: ${budget}`,
      details.trim() ? `• Details: ${details.trim()}` : null,
    ].filter(Boolean);

    const message = lines.join('\n');
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    setSubmittedPayload({ message, whatsappUrl });
  };

  const handleCopy = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(submittedPayload.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setCopied(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left column: Contact info & offices */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#EA580C]">
              Start importing
            </p>
            <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.8vw,3.15rem)] leading-[1.08] tracking-[-0.025em] text-[#0B132B]">
              Tell us what you want to import.{' '}
              <span className="bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent">
                We&apos;ll take it from there.
              </span>
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-slate-600">
              Share the product and quantity. You&apos;ll get supplier options, landed cost and
              timelines, free of charge.
            </p>

            <div className="mt-8 space-y-3.5">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-[#EA580C]/50 hover:bg-[#FFF7ED]/30 transition-all group"
              >
                <span className="w-11 h-11 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0 group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Call or WhatsApp</div>
                  <div className="font-display font-bold text-[16px] text-[#0B132B] tabular-nums">
                    {CONTACT_INFO.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-[#EA580C]/50 hover:bg-[#FFF7ED]/30 transition-all group"
              >
                <span className="w-11 h-11 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0 group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Instagram</div>
                  <div className="font-display font-bold text-[16px] text-[#0B132B]">
                    {CONTACT_INFO.instagramHandle}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-[#F8FAFC]">
                <span className="w-11 h-11 rounded-lg bg-white border border-slate-200 text-[#0B132B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-[12px] font-medium text-slate-500">Offices</div>
                  <div className="font-display font-bold text-[15.5px] text-[#0B132B]">
                    {CONTACT_INFO.officesSummary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Validated Quotation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_-28px_rgba(11,19,43,0.16)]">
              {submittedPayload ? (
                <div className="py-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-[22px] text-[#0B132B]">
                    Your sourcing quote is ready to send
                  </h3>
                  <p className="mt-1.5 text-[15px] text-slate-600">
                    Open WhatsApp below to send your pre-filled inquiry straight to our team at{' '}
                    <strong className="text-[#0B132B]">{CONTACT_INFO.phoneDisplay}</strong>.
                  </p>

                  <pre className="mt-5 p-4 rounded-xl bg-white border border-slate-200 text-[13.5px] leading-relaxed text-[#0B132B] whitespace-pre-wrap font-sans">
                    {submittedPayload.message}
                  </pre>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={submittedPayload.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-[15px] transition-colors shadow-xs"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Continue to WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg border border-slate-300 bg-white hover:border-[#0B132B] text-[#0B132B] text-[14px] font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-3.5 text-[14px] font-medium text-slate-500 hover:text-[#0B132B] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Edit details</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-display font-bold text-[22px] text-[#0B132B]">
                    Get a free sourcing quote
                  </h3>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="f-name"
                        className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                      >
                        Your name <span className="text-[#EA580C]">*</span>
                      </label>
                      <input
                        id="f-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Full name"
                        aria-invalid={Boolean(errors.name)}
                        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-[#EA580C] focus:ring-[#EA580C]/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="f-city"
                        className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                      >
                        City
                      </label>
                      <input
                        id="f-city"
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
                        }}
                        placeholder="e.g. Hyderabad"
                        aria-invalid={Boolean(errors.city)}
                        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                          errors.city
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-slate-300 focus:border-[#EA580C] focus:ring-[#EA580C]/20'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="f-cat"
                      className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                    >
                      What do you want to import?
                    </label>
                    <select
                      id="f-cat"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        onCategoryChange(e.target.value);
                      }}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-colors"
                    >
                      {QUOTE_CATEGORIES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="f-qty"
                        className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                      >
                        Approx. quantity
                      </label>
                      <input
                        id="f-qty"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 1 container"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="f-budget"
                        className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                      >
                        Budget
                      </label>
                      <select
                        id="f-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-colors"
                      >
                        {QUOTE_BUDGETS.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="f-msg"
                      className="block text-[13px] font-semibold text-[#0B132B] mb-1.5"
                    >
                      Details
                    </label>
                    <textarea
                      id="f-msg"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Product, specs, reference photos or links…"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-[15.5px] transition-colors shadow-sm cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5" />
                    <span>Send on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <p className="mt-3 text-center text-[13px] text-slate-500">
                    Opens WhatsApp with your details filled in. We usually reply within a few hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
