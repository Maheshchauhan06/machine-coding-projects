import { useRef } from "react";

interface MemoProps {
  depn: any[]; // dependencies
  cb: () => any; // callback
}

const isEqual = (depn1: any[], depn2: any[]) => {
  if (!depn1 || depn1.length !== depn2.length) return false;

  for (let i = 0; i < depn1.length; i++) {
    if (depn1[i] !== depn2[i]) {
      return false;
    }
  }

  return true;
};

const useMemoFn = ({ depn, cb }: MemoProps) => {
  const preValue = useRef<{ value: any; depn: any[] } | null>(null);

  if (!preValue.current || !isEqual(preValue.current.depn, depn)) {
    preValue.current = {
      value: cb(),
      depn,
    };
  }

  return preValue.current.value;
};

export default useMemoFn;
