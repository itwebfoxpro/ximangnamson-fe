"use client";

import React from "react";
import styles from "./chatGroup.module.scss";
import MessengerBubble from "@/components/MessengerBubble/MessengerBubble";
// Nếu bạn đã có ZaloBubble component, import nó. Nếu không, mình đã cung cấp fallback below.
import ZaloBubble from "@/components/ZaloBubble/ZaloBubble";

type Props = {
  messengerUrl?: string;
  zaloPhone?: string;
  // optional badge counts
  messengerBadge?: number | null;
  zaloBadge?: number | null;
};

export default function ChatBubbleGroup({
  messengerUrl,
  zaloPhone,
  messengerBadge = null,
  zaloBadge = null,
}: Props) {
  return (
    <div className={styles.group} aria-hidden={false}>
      {/* ZaloBubble is expected in your project; if path differs, adjust import */}
      <div className={styles.item}>
        <ZaloBubble
          phone={zaloPhone || "0909090000"}
          tooltipText=""
          badge={zaloBadge ?? null}
        />
      </div>

      <div className={styles.item}>
        <MessengerBubble
          messengerUrl={messengerUrl}
          tooltipText=""
          badge={messengerBadge}
        />
      </div>
    </div>
  );
}
