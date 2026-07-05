"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlayerPlay, IconPlayerRecordFilled, IconRefresh } from "@tabler/icons-react";
import { formatDuration } from "@/lib/format";
import { cx } from "@/lib/utils";

const ACCEPTED_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_SIZE_BYTES = 100 * 1024 * 1024;

export interface VideoUploadValue {
  file: File;
  objectUrl: string;
  durationSeconds: number;
}

export function VideoUpload({
  value,
  onChange,
}: {
  value: VideoUploadValue | null;
  onChange: (value: VideoUploadValue | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "ready" | "error">(
    value ? "ready" : "idle"
  );
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status !== "uploading") return;
    let current = 0;
    const interval = window.setInterval(() => {
      current += 18;
      if (current >= 100) {
        setProgress(100);
        window.clearInterval(interval);
        setStatus("ready");
      } else {
        setProgress(current);
      }
    }, 140);
    return () => window.clearInterval(interval);
  }, [status]);

  function handleFileSelected(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMessage("Upload didn't go through. Try again.");
      setStatus("error");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage("That video is too large. Try a clip under 100MB.");
      setStatus("error");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.src = objectUrl;
    probe.onloadedmetadata = () => {
      onChange({ file, objectUrl, durationSeconds: probe.duration || 0 });
      setProgress(0);
      setStatus("uploading");
    };
    probe.onerror = () => {
      setErrorMessage("Upload didn't go through. Try again.");
      setStatus("error");
    };
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMessage("");
    inputRef.current?.click();
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        capture="user"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFileSelected(file);
          event.target.value = "";
        }}
      />

      {status === "ready" && value ? (
        <div className="relative h-40 overflow-hidden rounded-modal bg-ink">
          <video src={value.objectUrl} className="h-full w-full object-cover" muted playsInline />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white">
              <IconPlayerPlay size={18} aria-hidden />
            </span>
          </div>
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-[6px] py-[2px] text-[11px] text-white font-sans">
            {formatDuration(value.durationSeconds)}
          </span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setStatus("idle");
            }}
            className="absolute top-2 right-2 rounded-full bg-black/50 px-[10px] py-[4px] text-[12px] text-white font-sans"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className={cx(
            "flex h-40 w-full flex-col items-center justify-center gap-[6px] rounded-modal border border-dashed border-[#D8D3C8] text-[14px] text-text-secondary font-sans",
            status === "uploading" && "opacity-70"
          )}
        >
          {status === "uploading" ? (
            <>
              <span>Uploading…</span>
              <span className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full bg-accent transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </span>
            </>
          ) : (
            <>
              <IconPlayerRecordFilled size={20} className="text-accent-strong" aria-hidden />
              Tap to record or upload
            </>
          )}
        </button>
      )}

      {status === "error" && (
        <div className="mt-2 flex items-center justify-between gap-3">
          <p role="alert" className="text-[13px] text-accent-strong font-sans">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="flex shrink-0 items-center gap-1 text-[13px] text-text-primary font-sans underline-offset-4 hover:underline"
          >
            <IconRefresh size={14} aria-hidden />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
