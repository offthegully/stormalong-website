export const AGE_COOKIE = "stormalong_age_ok";
export const AGE_COOKIE_DAYS = 365;

/**
 * Runs in <head>, before first paint, so nobody sees a frame of the
 * page behind the gate and returning visitors see no flash at all.
 *
 * The gate's markup ships hidden by default (see globals.css). This
 * script *reveals* it, and only when all three are true: no consent
 * cookie, not a crawler, not an automated browser. That ordering is
 * what makes the gate bot-aware — anything that does not run this
 * script simply gets the page, so search results, link unfurls and
 * paid-social landings are not sitting behind an interstitial. See
 * canvas review, finding 08.
 *
 * Kept in its own module, with no "use client" and no component
 * export, so editing the gate does not force a full reload.
 */
export const AGE_GATE_BOOTSTRAP = `
(function () {
  try {
    var d = document;
    if (d.cookie.indexOf("${AGE_COOKIE}=1") !== -1) return;
    var ua = navigator.userAgent || "";
    var bot = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|vkshare|w3c_validator|whatsapp|telegram|discord|lighthouse|headlesschrome|chrome-lighthouse|gptbot|claudebot|perplexity|applebot|duckduckbot|yandex|baiduspider/i;
    if (bot.test(ua) || navigator.webdriver) return;
    d.documentElement.setAttribute("data-age-gate", "1");
  } catch (e) {}
})();
`;
