/* ---------- youtube id helper (frame viewer lives at VIEWER_URL) ---------- */
function ytId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return { id: u.pathname.slice(1).split("/")[0], t: u.searchParams.get("t") };
    if (u.hostname.includes("youtube.com")) {
      let id = u.searchParams.get("v");
      const m = u.pathname.match(/\/(shorts|embed|live)\/([^/?]+)/);
      if (!id && m) id = m[2];
      return id ? { id, t: u.searchParams.get("t") } : null;
    }
  } catch {}
  return null;
}
