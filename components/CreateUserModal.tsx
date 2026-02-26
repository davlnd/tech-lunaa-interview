"use client";

import {type SubmitEvent, useCallback, useEffect, useMemo, useState} from "react";
import { useToast } from "@/components/ToastProvider";
import { CreateUserInput } from "@/types/user";
import { ToBoolean } from "@/types/utils";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (user: CreateUserInput) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateUserModal({
  isOpen,
  onClose,
  onUserCreated,
}: CreateUserModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [touched, setTouched] = useState<ToBoolean<CreateUserInput>>({
    name: false,
    email: false,
    company: false,
  });

  const errors: Partial<CreateUserInput> = useMemo(() => {
    const err: Partial<CreateUserInput> = {};

    if (!name.trim()) err.name = "El nombre es obligatorio.";
    if (!email.trim()) err.email = "El email es obligatorio.";
    else if (!emailRegex.test(email.trim())) err.email = "Ingresa un email válido.";
    if (!company.trim()) err.company = "La empresa es obligatoria.";

    return err;
  }, [name, email, company]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setTouched({ name: false, email: false, company: false });
  };

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  },[onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);

  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, company: true });
    if (!isValid) {
      showToast("Revisa los campos del formulario.", "error");
      return;
    }

    onUserCreated({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
    });

    resetForm();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      role="presentation"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-user-title"
        className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="create-user-title"
            className="text-lg font-semibold text-gray-900"
          >
            Nuevo Usuario
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar modal"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={
                touched.name && errors.name ? "name-error" : undefined
              }
              className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 ${touched.name && errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
              placeholder="Nombre completo"
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={
                touched.email && errors.email ? "email-error" : undefined
              }
              className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 ${touched.name && errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              inputMode="email"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Empresa
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, company: true }))}
              aria-invalid={Boolean(touched.company && errors.company)}
              aria-describedby={
                touched.company && errors.company ? "company-error" : undefined
              }
              className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 ${touched.name && errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
              placeholder="Nombre de la empresa"
              autoComplete="organization"
            />
            {touched.company && errors.company && (
              <p id="company-error" className="mt-1 text-xs text-red-600">
                {errors.company}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
