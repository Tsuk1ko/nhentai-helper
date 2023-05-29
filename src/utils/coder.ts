let textareaEl: HTMLTextAreaElement | undefined;

export const encodeHtml = (text: string) => {
  if (!textareaEl) textareaEl = document.createElement('textarea');
  textareaEl.innerText = text;
  const encodedText = textareaEl.innerHTML;
  textareaEl.innerHTML = '';
  return encodedText;
};
