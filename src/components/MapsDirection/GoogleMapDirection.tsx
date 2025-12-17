"use client";

import dynamic from "next/dynamic";
import styles from "./GoogleMapDirection.module.scss";

const GoogleMapDirection = dynamic(() => import("./GoogleMap"), {
  ssr: false,
});

export default GoogleMapDirection;
