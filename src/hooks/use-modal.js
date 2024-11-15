import { useState } from "react";

export default function useModal(showing = false) {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return { show, toggle };
}
