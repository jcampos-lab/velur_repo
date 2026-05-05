"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const Graph3DLazy = dynamic(() => import("./Graph3D"), { ssr: false });

type Props = ComponentProps<typeof Graph3DLazy>;

export default function Graph3DClient(props: Props) {
  return <Graph3DLazy {...props} />;
}
