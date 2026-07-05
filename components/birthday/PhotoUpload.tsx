"use client";

import { useRef } from "react";
import { IconPlus } from "@tabler/icons-react";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export function PhotoUpload({
  photoUrl,
  onChange,
  label = "Recipient photo (optional)",
  error,
}: {
  photoUrl?: string;
  onChange: (objectUrl: string | undefined) => void;
  label?: string;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES) {
      return;
    }
    onChange(URL.createObjectURL(file));
  }

  return (
    <div>
      <label className="block text-[14px] text-text-secondary mb-[6px] font-sans">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
          event.target.value = "";
        }}
      />
      {photoUrl ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- object URL preview, not next/image compatible */}
          <img
            src={photoUrl}
            alt="Recipient"
            className="h-16 w-16 rounded-full object-cover border border-border"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[14px] text-text-primary underline-offset-4 hover:underline font-sans"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-full items-center justify-center gap-2 rounded-card border border-dashed border-[#D8D3C8] text-[14px] text-text-secondary font-sans"
        >
          <IconPlus size={16} aria-hidden />
          Add a photo
        </button>
      )}
      {error && (
        <p role="alert" className="mt-[6px] text-[13px] text-accent-strong">
          {error}
        </p>
      )}
    </div>
  );
}
