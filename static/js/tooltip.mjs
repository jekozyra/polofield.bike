import {
  computePosition,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.5.0/+esm";
const tooltips = document.createDocumentFragment();
let tooltipId = 0;
let cleanup;
function updatePosition(referenceEl, floatingEl, arrowEl) {
  computePosition(referenceEl, floatingEl, {
    placement: "top",
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowEl }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(floatingEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      right: "",
      bottom: "",
      [staticSide]: "-4px",
    });
  });
}
function toggleTooltip(e) {
  const referenceEl = e.currentTarget;
  const floatingEl = document.getElementById(
    referenceEl.getAttribute("aria-describedby"),
  );
  e.preventDefault();
  if (cleanup) {
    if (floatingEl.dataset.event === "click") {
      floatingEl.dataset.event = "";
      return hideTooltip(e);
    }
  } else {
    showTooltip(e);
  }
  floatingEl.dataset.event = "click";
}
function showTooltip(e) {
  const referenceEl = e.currentTarget;
  const floatingEl = document.getElementById(
    referenceEl.getAttribute("aria-describedby"),
  );
  const arrowEl = floatingEl.querySelector(".tooltip-arrow");
  cleanup && cleanup();
  cleanup = ((f) => () => {
    floatingEl.style.opacity = "0";
    floatingEl.dataset.event = "";
    f();
  })(
    autoUpdate(referenceEl, floatingEl, () =>
      updatePosition(referenceEl, floatingEl, arrowEl),
    ),
  );
  floatingEl.style.opacity = "1";
  floatingEl.dataset.event = "";
}
function hideTooltip(e) {
  const referenceEl = e.currentTarget;
  const floatingEl = document.getElementById(
    referenceEl.getAttribute("aria-describedby"),
  );
  cleanup && cleanup();
  cleanup = undefined;
}
Array.prototype.forEach.call(
  document.querySelectorAll(".intervals button[aria-label]"),
  (el) => {
    const tooltip = document.createElement("div");
    tooltip.id = `tooltip-${tooltipId++}`;
    tooltip.className = "tooltip";
    tooltip.innerText = el.getAttribute("aria-label");
    tooltip.style.opacity = "0";
    tooltip.setAttribute("role", "tooltip");
    el.setAttribute("aria-describedby", tooltip.id);
    const arrow = document.createElement("div");
    arrow.className = "tooltip-arrow";
    tooltip.appendChild(arrow);
    tooltips.appendChild(tooltip);
    [
      ["mouseenter", showTooltip],
      ["mouseleave", hideTooltip],
      ["focus", showTooltip],
      ["blur", hideTooltip],
      ["click", toggleTooltip],
    ].forEach(([event, listener]) => {
      el.addEventListener(event, listener);
    });
  },
);
document.body.appendChild(tooltips);
