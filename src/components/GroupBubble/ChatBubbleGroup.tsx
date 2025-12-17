"use client";

import React from "react";
import styles from "./chatGroup.module.scss";

import MessengerBubble from "@/components/MessengerBubble/MessengerBubble";
import ZaloBubble from "@/components/ZaloBubble/ZaloBubble";
import PhoneBubble from "@/components/PhoneBubble/PhoneBubble";

type Props = {
  messengerUrl?: string;
  zaloPhone?: string;
  phonestring?: string;
  phonenumber?: string;

  messengerBadge?: number | null;
  zaloBadge?: number | null;
  phoneBadge?: number | null;
};

export default function ChatBubbleGroup({
  messengerUrl,
  zaloPhone,
  phonestring = "0932.687.219",
  phonenumber = "0932687219",

  messengerBadge = null,
  zaloBadge = null,
  phoneBadge = null,
}: Props) {
  return (
    <div className={styles.group} aria-hidden={false}>
      <div className={styles.item}>
        <PhoneBubble phoneString={phonestring} phoneNumber={phonenumber} label="Gọi ngay" className="" />
      </div>
      <div className={styles.item}>
        <ZaloBubble
          phone={zaloPhone || "0909090000"}
          tooltipText=""
          badge={zaloBadge ?? null}
        />
      </div>
    </div>
  );
}
