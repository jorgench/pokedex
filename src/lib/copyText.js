export default textToCopy => {
  const fakeDoc = document.createElement('div');
  fakeDoc.innerHTML = textToCopy;

  document.body.appendChild(fakeDoc);

  const selection = document.createRange();
  selection.selectNodeContents(fakeDoc);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(selection);
  const result = document.execCommand('copy');
  window.getSelection().removeRange(selection);

  document.body.removeChild(fakeDoc);

  return result;
};
