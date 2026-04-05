"use client";
export const Toast = ({ content, showToast }) => {
  const [toast, setToast] = useState(false);
  const [show, setShow] = useState(false);

  
  return <div className={`${typeToast}`}>{content.message}</div>;
};
