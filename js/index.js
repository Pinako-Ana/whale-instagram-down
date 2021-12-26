const $container = document.querySelector(".container");

const addItem = ({ src }) => {
  const $el = document.createElement("a");
  $el.href = src;
  $el.target = "_blank";
  $el.textContent = src;
  $el.classList.add("item");
  $container.append($el);
};
whale.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "content_script" && msg.to === "sidebar") {
    alert("test indexjs");
    addItem(msg);
    response("success");
  }
});
