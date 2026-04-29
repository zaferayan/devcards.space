"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  zoomLabel: string;
  closeLabel: string;
  hint: string;
  actualSizeLabel: string;
  fitToScreenLabel: string;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  caption,
  zoomLabel,
  closeLabel,
  hint,
  actualSizeLabel,
  fitToScreenLabel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);

  const requestFullscreen = useCallback(async (el: HTMLElement) => {
    const node = el as FullscreenElement;
    try {
      if (node.requestFullscreen) {
        await node.requestFullscreen();
      } else if (node.webkitRequestFullscreen) {
        await node.webkitRequestFullscreen();
      }
    } catch {
      /* fullscreen blocked or not supported — modal still works */
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    const doc = document as FullscreenDocument;
    const el = doc.fullscreenElement || doc.webkitFullscreenElement;
    if (!el) return;
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  const open = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    setIsOpen(true);
    setActualSize(false);
    await requestFullscreen(dialog);
  }, [requestFullscreen]);

  const close = useCallback(async () => {
    await exitFullscreen();
    const dialog = dialogRef.current;
    if (dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
    document.body.style.overflow = "";
    setIsOpen(false);
    setActualSize(false);
  }, [exitFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as FullscreenDocument;
      const inFullscreen = Boolean(
        doc.fullscreenElement || doc.webkitFullscreenElement
      );
      if (!inFullscreen && dialogRef.current?.open) {
        dialogRef.current.close();
        document.body.style.overflow = "";
        setIsOpen(false);
        setActualSize(false);
      }
    };
    const handleDialogClose = () => {
      void exitFullscreen();
      document.body.style.overflow = "";
      setIsOpen(false);
      setActualSize(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange as EventListener
    );
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", handleDialogClose);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange as EventListener
      );
      dialog?.removeEventListener("close", handleDialogClose);
    };
  }, [exitFullscreen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggleSize = useCallback(() => {
    setActualSize((s) => !s);
  }, []);

  return (
    <>
      <figure className="my-10 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm dark:border-white/10 dark:bg-ink-800">
        <button
          type="button"
          onClick={open}
          aria-label={zoomLabel}
          className="group relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 768px) 768px, 100vw"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M3 3.5A1.5 1.5 0 0 1 4.5 2h3a.75.75 0 0 1 0 1.5h-3a0 0 0 0 0 0 0v3a.75.75 0 0 1-1.5 0v-3Zm9.75-.75a.75.75 0 0 1 .75-.75h3A1.5 1.5 0 0 1 18 3.5v3a.75.75 0 0 1-1.5 0v-3a0 0 0 0 0 0 0h-3a.75.75 0 0 1-.75-.75ZM3.75 12.75a.75.75 0 0 1 .75.75v3a0 0 0 0 0 0 0h3a.75.75 0 0 1 0 1.5h-3A1.5 1.5 0 0 1 3 16.5v-3a.75.75 0 0 1 .75-.75Zm12.5 0a.75.75 0 0 1 .75.75v3A1.5 1.5 0 0 1 15.5 18h-3a.75.75 0 0 1 0-1.5h3a0 0 0 0 0 0 0v-3a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            {hint}
          </span>
        </button>
        <figcaption className="border-t border-ink-100 bg-ink-50 px-4 py-3 text-center text-xs text-ink-500 dark:border-white/10 dark:bg-ink-900 dark:text-ink-400">
          {caption}
        </figcaption>
      </figure>

      <dialog
        ref={dialogRef}
        aria-label={zoomLabel}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-ink-900 p-0 text-white backdrop:bg-ink-900"
      >
        {isOpen ? (
          <div className="relative flex h-full w-full flex-col">
            <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSize}
                aria-pressed={actualSize}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-lg ring-1 ring-ink-900/10 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  {actualSize ? (
                    <path
                      fillRule="evenodd"
                      d="M3.75 7a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-.69l3.22 3.22a.75.75 0 1 1-1.06 1.06L5.25 8.81v.69a.75.75 0 0 1-1.5 0V7Zm9 6a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l3.22 3.22v-.69a.75.75 0 0 1 1.5 0V13Z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M3.5 4.75a1.25 1.25 0 0 1 1.25-1.25h3a.75.75 0 0 1 0 1.5h-2.75v2.75a.75.75 0 0 1-1.5 0v-3Zm9-.5a.75.75 0 0 1 .75-.75h3a1.25 1.25 0 0 1 1.25 1.25v3a.75.75 0 0 1-1.5 0V5h-2.75a.75.75 0 0 1-.75-.75ZM4.25 12a.75.75 0 0 1 .75.75V15.5h2.75a.75.75 0 0 1 0 1.5h-3a1.25 1.25 0 0 1-1.25-1.25v-3a.75.75 0 0 1 .75-.75Zm11.5 0a.75.75 0 0 1 .75.75v3a1.25 1.25 0 0 1-1.25 1.25h-3a.75.75 0 0 1 0-1.5H15.5v-2.75a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                {actualSize ? fitToScreenLabel : actualSizeLabel}
              </button>
              <button
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lg ring-1 ring-ink-900/10 transition hover:bg-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>

            <div
              className={`flex-1 ${
                actualSize ? "overflow-auto" : "flex items-center justify-center overflow-hidden"
              }`}
              onDoubleClick={toggleSize}
            >
              {actualSize ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={alt}
                  onClick={toggleSize}
                  className="block h-auto w-auto max-w-none cursor-zoom-out select-none"
                  draggable={false}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={alt}
                  onClick={toggleSize}
                  className="max-h-full max-w-full cursor-zoom-in object-contain select-none"
                  draggable={false}
                />
              )}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
