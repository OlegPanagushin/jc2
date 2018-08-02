export const focusNextControl = current => {
  const all = document.querySelectorAll(
    "input, button, a, area, object, select, textarea"
  );

  if (all.length) {
    let currentIdx;
    for (let i = 0; i < all.length; i++) {
      if (current.isEqualNode(all[i])) {
        currentIdx = i;
      }
    }

    const nextIdx = currentIdx + 1;
    if (nextIdx < all.length) all[nextIdx].focus();
  }
};
