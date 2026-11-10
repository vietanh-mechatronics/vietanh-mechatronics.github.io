(() => {
  "use strict";
  const config = window.PORTFOLIO_MEDIA || {};
  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try { const url = new URL(value, document.baseURI); return ["http:", "https:"].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  }
  function youtubeId(value) {
    try {
      const url = new URL(value), host = url.hostname.replace(/^www\./, "");
      let id;
      if (host === "youtu.be") id = url.pathname.slice(1);
      if (["youtube.com", "youtube-nocookie.com"].includes(host)) {
        const match = url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
        id = url.searchParams.get("v") || (match && match[1]);
      }
      return /^[\w-]{11}$/.test(id || "") ? id : null;
    } catch { return null; }
  }
  function showError(element, url) {
    const link = document.createElement("a"); link.href = url; link.className = "media-error";
    link.textContent = "Media unavailable. Open original file ↗"; element.replaceWith(link);
  }
  function buildMedia(item) {
    const url = safeUrl(item && item.src); if (!url) return null;
    let element;
    if (item.type === "image" && item.alt) {
      element = document.createElement("img"); element.alt = item.alt; element.loading = "lazy";
      element.addEventListener("error", () => showError(element, url), { once: true }); element.src = url;
    } else if (item.type === "video") {
      element = document.createElement("video"); element.controls = true; element.playsInline = true; element.preload = "none";
      element.setAttribute("aria-label", item.caption || "Research demonstration video");
      if (safeUrl(item.poster)) element.poster = safeUrl(item.poster);
      element.addEventListener("error", () => showError(element, url), { once: true }); element.src = url;
    } else if (item.type === "youtube") {
      const id = youtubeId(url); if (!id) return null;
      element = document.createElement("iframe"); element.src = `https://www.youtube-nocookie.com/embed/${id}`;
      element.title = item.caption || "Research demonstration video"; element.loading = "lazy";
      element.allowFullscreen = true; element.referrerPolicy = "strict-origin-when-cross-origin";
    } else return null;
    const figure = document.createElement("figure"); figure.className = "media-item"; figure.append(element);
    if (item.caption) { const caption = document.createElement("figcaption"); caption.textContent = item.caption; figure.append(caption); }
    return figure;
  }
  document.querySelectorAll("[data-media]").forEach(container => {
    const key = container.dataset.media;
    if (key === "portrait") {
      const portrait = config.portrait, src = safeUrl(portrait && portrait.src); if (!src) return;
      const img = document.createElement("img"); img.alt = portrait.alt || "Portrait of Viet Anh Nguyen";
      img.addEventListener("load", () => container.replaceChildren(img), { once: true }); img.src = src; return;
    }
    if (!Array.isArray(config[key])) return;
    const items = config[key].map(buildMedia).filter(Boolean);
    if (items.length) container.replaceChildren(...items);
  });
})();
