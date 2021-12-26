let document_observer = null;
const className = "extension-download-btn";

const createButton = ($el) => {
  const $button = document.createElement("button");
  $button.classList.add(className);
  $button.textContent = "다운로드";
  $button.onclick = () => {
    const { src } = $el.querySelector("img, video");
    const data = {
      from: "content_script",
      to: "sidebar",
      src,
    };
    whale.runtime.sendMessage(data, (response) => {
      console.log(response);
    });
  };

  return $button;
};

const insertButton = ($elements) => {
  $elements.forEach(($el) => {
    const hasButton = $el.querySelector(`.${className}`);
    if (!hasButton) {
      const $button = createButton($el);
      $el.append($button);
    }
  });
};

const attachMutationObserver = () => {
  if (document_observer) {
    return;
  }
  document_observer = new MutationObserver(() => {
    const media = document.querySelectorAll("._2dDPU .KL4Bh, ._2dDPU ._5wCQW");
    if (media) {
      insertButton(media);
    }
  });
  document_observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

window.addEventListener("DOMContentLoaded", () => {
  attachMutationObserver();
});
