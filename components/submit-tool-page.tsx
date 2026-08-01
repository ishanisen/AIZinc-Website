"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Loader2, Plus, X } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { fetchCategories } from "@/lib/categories";
import { isValidEmail, isValidUrl, normalizeUrl } from "@/lib/form-validation";
import {
  RELATIONSHIP_OPTIONS,
  SUBMIT_PRICING_OPTIONS,
  SubmitToolPayload,
  submitTool,
} from "@/lib/submit-tool";
import { CategoryRecord } from "@/lib/types";

type FieldErrors = {
  websiteUrl?: string;
  submitterEmail?: string;
};

const emptyForm = {
  toolName: "",
  websiteUrl: "",
  tagline: "",
  shortDescription: "",
  categoryId: "",
  pricingModel: "",
  submitterName: "",
  submitterEmail: "",
  isAiPowered: false,
  tagsInput: "",
  keyFeatures: [""],
  differentiator: "",
  relationship: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="form-error" role="alert">
      {message}
    </p>
  );
}

function ImagePreview({
  file,
  label,
  onRemove,
}: {
  file: File;
  label: string;
  onRemove: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="mt-3 flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewUrl}
        alt={`${label} preview`}
        className="h-16 w-16 rounded-xl border border-border object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-text-secondary">{file.name}</p>
        <button
          type="button"
          onClick={onRemove}
          className="mt-1 text-xs font-medium text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default function SubmitToolPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const data = await fetchCategories();
        if (!cancelled) setCategories(data);
      } catch (error) {
        console.error("[SubmitToolPage] failed to load categories:", error);
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    }

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const parsedTags = useMemo(() => {
    return form.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 5);
  }, [form.tagsInput]);

  const tagsOverLimit =
    form.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean).length > 5;

  const validateUrl = useCallback((value: string) => {
    if (!value.trim()) return "Website URL is required.";
    if (!isValidUrl(value)) return "Enter a valid URL (e.g. https://example.com).";
    return undefined;
  }, []);

  const validateEmail = useCallback((value: string) => {
    if (!value.trim()) return "Email is required.";
    if (!isValidEmail(value)) return "Enter a valid email address.";
    return undefined;
  }, []);

  const runBlurValidation = useCallback(
    (field: "websiteUrl" | "submitterEmail", value: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setFieldErrors((prev) => ({
        ...prev,
        [field]:
          field === "websiteUrl" ? validateUrl(value) : validateEmail(value),
      }));
    },
    [validateEmail, validateUrl],
  );

  const isFormValid = useMemo(() => {
    const urlError = validateUrl(form.websiteUrl);
    const emailError = validateEmail(form.submitterEmail);

    return (
      form.toolName.trim().length > 0 &&
      !urlError &&
      form.tagline.trim().length > 0 &&
      form.tagline.length <= 80 &&
      form.shortDescription.trim().length > 0 &&
      form.shortDescription.length <= 400 &&
      form.categoryId.length > 0 &&
      SUBMIT_PRICING_OPTIONS.includes(
        form.pricingModel as (typeof SUBMIT_PRICING_OPTIONS)[number],
      ) &&
      form.submitterName.trim().length > 0 &&
      !emailError &&
      form.isAiPowered &&
      !tagsOverLimit &&
      form.differentiator.length <= 300 &&
      form.keyFeatures.filter((f) => f.trim()).length <= 5
    );
  }, [form, tagsOverLimit, validateEmail, validateUrl]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateFeature(index: number, value: string) {
    setForm((prev) => {
      const next = [...prev.keyFeatures];
      next[index] = value;
      return { ...prev, keyFeatures: next };
    });
  }

  function addFeatureField() {
    setForm((prev) => {
      if (prev.keyFeatures.length >= 5) return prev;
      return { ...prev, keyFeatures: [...prev.keyFeatures, ""] };
    });
  }

  function removeFeatureField(index: number) {
    setForm((prev) => {
      const next = prev.keyFeatures.filter((_, i) => i !== index);
      return { ...prev, keyFeatures: next.length > 0 ? next : [""] };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const urlError = validateUrl(form.websiteUrl);
    const emailError = validateEmail(form.submitterEmail);

    setTouched({ websiteUrl: true, submitterEmail: true });
    setFieldErrors({ websiteUrl: urlError, submitterEmail: emailError });

    if (!isFormValid || urlError || emailError) return;

    const payload: SubmitToolPayload = {
      toolName: form.toolName.trim(),
      websiteUrl: normalizeUrl(form.websiteUrl),
      tagline: form.tagline.trim(),
      shortDescription: form.shortDescription.trim(),
      categoryId: form.categoryId,
      pricingModel: form.pricingModel as SubmitToolPayload["pricingModel"],
      submitterName: form.submitterName.trim(),
      submitterEmail: form.submitterEmail.trim(),
      isAiPowered: form.isAiPowered,
      tags: parsedTags,
      keyFeatures: form.keyFeatures.map((f) => f.trim()).filter(Boolean),
      differentiator: form.differentiator.trim(),
      relationship: form.relationship as SubmitToolPayload["relationship"],
      logo: logoFile
        ? { name: logoFile.name, size: logoFile.size, type: logoFile.type }
        : null,
      screenshot: screenshotFile
        ? {
            name: screenshotFile.name,
            size: screenshotFile.size,
            type: screenshotFile.type,
          }
        : null,
    };

    setSubmitting(true);
    try {
      await submitTool(payload);
      setSubmitted(true);
    } catch (error) {
      console.error("[SubmitToolPage] submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="bg-background py-16 sm:py-24">
          <div className="container-main mx-auto max-w-xl text-center">
            <div className="rounded-2xl border border-border bg-white px-6 py-12 shadow-card sm:px-10">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Thanks!
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Your tool is under review — we&apos;ll email you once it&apos;s
                approved.
              </p>
              <Link href="/" className="btn-primary mt-8">
                Return home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-background py-12 sm:py-16">
        <div className="container-main mx-auto max-w-[700px]">
          <header className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Submit your AI tool
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Get your tool in front of thousands of people searching for AI
              solutions.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 space-y-6 rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8"
          >
            {/* Tool Name */}
            <div>
              <label htmlFor="tool-name" className="form-label">
                Tool Name <span className="text-red-600">*</span>
              </label>
              <input
                id="tool-name"
                type="text"
                required
                value={form.toolName}
                onChange={(e) => updateField("toolName", e.target.value)}
                className="form-input mt-2"
                placeholder="e.g. Cursor"
              />
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website-url" className="form-label">
                Website URL <span className="text-red-600">*</span>
              </label>
              <input
                id="website-url"
                type="url"
                required
                value={form.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                onBlur={(e) => runBlurValidation("websiteUrl", e.target.value)}
                aria-invalid={touched.websiteUrl && !!fieldErrors.websiteUrl}
                aria-describedby={
                  touched.websiteUrl && fieldErrors.websiteUrl
                    ? "website-url-error"
                    : undefined
                }
                className={`form-input mt-2 ${
                  touched.websiteUrl && fieldErrors.websiteUrl
                    ? "form-input-error"
                    : ""
                }`}
                placeholder="https://example.com"
              />
              <FieldError
                id="website-url-error"
                message={touched.websiteUrl ? fieldErrors.websiteUrl : undefined}
              />
            </div>

            {/* Tagline */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="tagline" className="form-label">
                  Tagline <span className="text-red-600">*</span>
                </label>
                <span
                  className={`text-xs ${
                    form.tagline.length > 80
                      ? "text-red-600"
                      : "text-text-muted"
                  }`}
                  aria-live="polite"
                >
                  {form.tagline.length}/80
                </span>
              </div>
              <input
                id="tagline"
                type="text"
                required
                maxLength={80}
                value={form.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="form-input mt-2"
                placeholder="One-line summary of what the tool does"
              />
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="short-description" className="form-label">
                  Short Description <span className="text-red-600">*</span>
                </label>
                <span
                  className={`text-xs ${
                    form.shortDescription.length > 400
                      ? "text-red-600"
                      : "text-text-muted"
                  }`}
                  aria-live="polite"
                >
                  {form.shortDescription.length}/400
                </span>
              </div>
              <textarea
                id="short-description"
                required
                rows={4}
                maxLength={400}
                value={form.shortDescription}
                onChange={(e) =>
                  updateField("shortDescription", e.target.value)
                }
                className="form-textarea mt-2"
                placeholder="Describe the tool in a few sentences"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="form-label">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                required
                value={form.categoryId}
                onChange={(e) => updateField("categoryId", e.target.value)}
                disabled={categoriesLoading}
                className="form-select mt-2"
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories…"
                    : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.displayLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Model */}
            <div>
              <label htmlFor="pricing-model" className="form-label">
                Pricing Model <span className="text-red-600">*</span>
              </label>
              <select
                id="pricing-model"
                required
                value={form.pricingModel}
                onChange={(e) => updateField("pricingModel", e.target.value)}
                className="form-select mt-2"
              >
                <option value="">Select pricing model</option>
                {SUBMIT_PRICING_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Submitter Name */}
            <div>
              <label htmlFor="submitter-name" className="form-label">
                Submitter Name <span className="text-red-600">*</span>
              </label>
              <input
                id="submitter-name"
                type="text"
                required
                value={form.submitterName}
                onChange={(e) => updateField("submitterName", e.target.value)}
                className="form-input mt-2"
                placeholder="Your name"
              />
            </div>

            {/* Submitter Email */}
            <div>
              <label htmlFor="submitter-email" className="form-label">
                Submitter Email <span className="text-red-600">*</span>
              </label>
              <input
                id="submitter-email"
                type="email"
                required
                value={form.submitterEmail}
                onChange={(e) => updateField("submitterEmail", e.target.value)}
                onBlur={(e) =>
                  runBlurValidation("submitterEmail", e.target.value)
                }
                aria-invalid={
                  touched.submitterEmail && !!fieldErrors.submitterEmail
                }
                aria-describedby="submitter-email-helper submitter-email-error"
                className={`form-input mt-2 ${
                  touched.submitterEmail && fieldErrors.submitterEmail
                    ? "form-input-error"
                    : ""
                }`}
                placeholder="you@example.com"
              />
              <p id="submitter-email-helper" className="form-helper">
                We&apos;ll only use this to contact you about your submission.
              </p>
              <FieldError
                id="submitter-email-error"
                message={
                  touched.submitterEmail ? fieldErrors.submitterEmail : undefined
                }
              />
            </div>

            {/* AI-powered checkbox */}
            <div className="rounded-2xl border border-border bg-surface-2 px-4 py-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.isAiPowered}
                  onChange={(e) => updateField("isAiPowered", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  required
                />
                <span className="text-sm text-text-primary">
                  This tool is genuinely AI-powered{" "}
                  <span className="text-red-600">*</span>
                </span>
              </label>
            </div>

            {/* Optional details */}
            <div className="border-t border-border pt-2">
              <button
                type="button"
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
                className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-left text-sm font-semibold text-text-primary transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Add more details
                {detailsOpen ? (
                  <ChevronUp className="h-4 w-4 text-text-muted" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden="true" />
                )}
              </button>

              {detailsOpen && (
                <div className="mt-4 space-y-6 border-t border-border pt-6">
                  {/* Tags */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor="tags" className="form-label">
                        Tags
                      </label>
                      <span className="text-xs text-text-muted">
                        Up to 5, comma-separated
                      </span>
                    </div>
                    <input
                      id="tags"
                      type="text"
                      value={form.tagsInput}
                      onChange={(e) => updateField("tagsInput", e.target.value)}
                      className={`form-input mt-2 ${
                        tagsOverLimit ? "form-input-error" : ""
                      }`}
                      placeholder="e.g. coding, automation, agents"
                    />
                    {parsedTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {parsedTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {tagsOverLimit && (
                      <p className="form-error" role="alert">
                        Maximum 5 tags allowed.
                      </p>
                    )}
                  </div>

                  {/* Logo upload */}
                  <div>
                    <label htmlFor="logo-upload" className="form-label">
                      Logo upload
                    </label>
                    <p className="form-helper">
                      Square aspect ratio recommended.
                    </p>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setLogoFile(e.target.files?.[0] ?? null)
                      }
                      className="mt-2 block w-full text-sm text-text-secondary file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:bg-accent/10"
                    />
                    {logoFile && (
                      <ImagePreview
                        file={logoFile}
                        label="Logo"
                        onRemove={() => setLogoFile(null)}
                      />
                    )}
                  </div>

                  {/* Screenshot upload */}
                  <div>
                    <label htmlFor="screenshot-upload" className="form-label">
                      Screenshot upload
                    </label>
                    <input
                      id="screenshot-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setScreenshotFile(e.target.files?.[0] ?? null)
                      }
                      className="mt-2 block w-full text-sm text-text-secondary file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:bg-accent/10"
                    />
                    {screenshotFile && (
                      <ImagePreview
                        file={screenshotFile}
                        label="Screenshot"
                        onRemove={() => setScreenshotFile(null)}
                      />
                    )}
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="form-label">Key Features</span>
                      <span className="text-xs text-text-muted">Up to 5</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      {form.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              updateFeature(index, e.target.value)
                            }
                            aria-label={`Key feature ${index + 1}`}
                            className="form-input"
                            placeholder={`Feature ${index + 1}`}
                          />
                          {form.keyFeatures.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeatureField(index)}
                              aria-label={`Remove feature ${index + 1}`}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {form.keyFeatures.length < 5 && (
                      <button
                        type="button"
                        onClick={addFeatureField}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Add another
                      </button>
                    )}
                  </div>

                  {/* What makes this different */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label htmlFor="differentiator" className="form-label">
                        What makes this different
                      </label>
                      <span className="text-xs text-text-muted">
                        {form.differentiator.length}/300
                      </span>
                    </div>
                    <textarea
                      id="differentiator"
                      rows={3}
                      maxLength={300}
                      value={form.differentiator}
                      onChange={(e) =>
                        updateField("differentiator", e.target.value)
                      }
                      className="form-textarea mt-2"
                      placeholder="What sets this tool apart?"
                    />
                  </div>

                  {/* Relationship to tool */}
                  <div>
                    <label htmlFor="relationship" className="form-label">
                      Relationship to tool
                    </label>
                    <select
                      id="relationship"
                      value={form.relationship}
                      onChange={(e) =>
                        updateField("relationship", e.target.value)
                      }
                      className="form-select mt-2"
                    >
                      <option value="">Select an option</option>
                      {RELATIONSHIP_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className="btn-primary w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Submitting…
                </>
              ) : (
                "Submit tool"
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
