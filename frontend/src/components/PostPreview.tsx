"use client";

import { useState } from "react";
import { AlertCircle, Bookmark, ChevronLeft, ChevronRight, Heart, MessageCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: { name: string; avatar?: string };
  type: "photo" | "carousel" | "reel";
  media: string[];
  caption: string;
  when: string | null; // ISO o null si es borrador
};

const isVideo = (u: string) => /\.(mp4|mov|webm)(\?|$)/i.test(u);
const CAPTION_PREVIEW = 125; // Instagram corta el texto en el feed y muestra «más»

/** Vista previa de cómo se verá el post en Instagram, con lo que hay en el editor (aunque no esté guardado). */
export default function PostPreview(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-sm overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vista previa</DialogTitle>
          <DialogDescription>Así se verá en el feed de Instagram.</DialogDescription>
        </DialogHeader>
        <Mock {...props} />
      </DialogContent>
    </Dialog>
  );
}

function Mock({ account, type, media, caption, when }: Props) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const i = Math.min(index, Math.max(media.length - 1, 0));
  const url = media[i];
  const long = caption.length > CAPTION_PREVIEW;
  const shown = expanded || !long ? caption : `${caption.slice(0, CAPTION_PREVIEW).trimEnd()}… `;

  const warnings = [
    media.length === 0 && "Falta la imagen o el video.",
    type === "carousel" && media.length < 2 && "Un carrusel necesita al menos 2 láminas.",
    type === "carousel" && media.length > 10 && "Un carrusel admite máximo 10 láminas.",
    caption.length > 2200 && `El texto supera el límite de 2.200 caracteres (${caption.length}).`,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          {account.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={account.avatar} alt="" className="size-8 rounded-full object-cover" />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">{account.name.charAt(0).toUpperCase()}</span>
          )}
          <span className="flex-1 truncate text-sm font-semibold">{account.name}</span>
          <span className="text-muted-foreground" aria-hidden>•••</span>
        </div>

        <div className="relative aspect-[4/5] bg-black">
          {!url ? (
            <div className="flex size-full items-center justify-center text-sm text-white/50">Sin imagen</div>
          ) : isVideo(url) ? (
            <video key={url} src={url} controls muted loop playsInline className="size-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={`Lámina ${i + 1}`} className="size-full object-cover" />
          )}

          {media.length > 1 && (
            <>
              <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium tabular-nums text-white">
                {i + 1}/{media.length}
              </span>
              {i > 0 && (
                <button onClick={() => setIndex(i - 1)} aria-label="Lámina anterior" className="absolute left-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow">
                  <ChevronLeft className="size-4" />
                </button>
              )}
              {i < media.length - 1 && (
                <button onClick={() => setIndex(i + 1)} aria-label="Lámina siguiente" className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow">
                  <ChevronRight className="size-4" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-1.5 px-3 py-2.5">
          <div className="flex items-center gap-3.5">
            <Heart className="size-6" strokeWidth={1.75} />
            <MessageCircle className="size-6" strokeWidth={1.75} />
            <Send className="size-6" strokeWidth={1.75} />
            {media.length > 1 && (
              <span className="mx-auto flex gap-1" aria-hidden>
                {media.map((_, d) => (
                  <span key={d} className={`size-1.5 rounded-full ${d === i ? "bg-primary" : "bg-muted-foreground/40"}`} />
                ))}
              </span>
            )}
            <Bookmark className={`size-6 ${media.length > 1 ? "" : "ml-auto"}`} strokeWidth={1.75} />
          </div>

          {caption ? (
            <p className="whitespace-pre-line break-words text-sm leading-snug">
              <span className="font-semibold">{account.name}</span> {shown}
              {long && !expanded && (
                <button onClick={() => setExpanded(true)} className="text-muted-foreground hover:text-foreground">
                  más
                </button>
              )}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Sin texto.</p>
          )}

          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {when ? new Date(when).toLocaleString("es", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "Borrador · sin fecha"}
          </p>
        </div>
      </div>

      {warnings.length > 0 && (
        <ul className="space-y-1.5">
          {warnings.map((w) => (
            <li key={w} className="flex items-start gap-2 rounded-xl bg-[#f0716a]/12 px-3 py-2 text-xs text-foreground">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-[#f0716a]" />
              {w}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
