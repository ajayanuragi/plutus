"use client";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { latestMediaResult } from "@/atoms/media";
import { MediaResult } from "@/types/MediaResultTypes";

type Props = { media: MediaResult };

export default function SetMediaAtomClient({ media }: Props) {
  const set = useSetAtom(latestMediaResult);

  useEffect(() => {
    set(media);
  }, [media, set]);

  return null;
}
