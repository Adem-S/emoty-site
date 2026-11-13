// Génère les pages du site (anglais à la racine, français dans /fr/).
// Usage : node scripts/build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://emoty.ideonot.com';
const EMAIL = 'support@ideonot.com';
const PUBLISHER = 'Ideonot';
// Identifiant Apple de l'app (App Store Connect → App Information → Apple ID).
// Laisser vide tant que l'app n'est pas en ligne : le bouton affiche « Bientôt ».
const APP_STORE_ID = '6832748067';
const UPDATED = { en: 'November 13, 2026', fr: '13 novembre 2026' };

const storeUrl = APP_STORE_ID ? `https://apps.apple.com/app/id${APP_STORE_ID}` : '';
const characters = ['joy', 'calm', 'pride', 'motivation', 'sadness', 'fear', 'stress', 'fatigue', 'anger', 'neutral'];
const apple = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.33-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.07 1.96-.49 2.56-1.22z"/></svg>';

const T = {
  en: {
    lang: 'en', other: 'fr', otherLabel: 'Français', base: '/', otherBase: '/fr/',
    nav: { privacy: 'Privacy', terms: 'Terms', support: 'Support' },
    store: storeUrl ? ['Download on the', 'App Store'] : ['Coming soon on the', 'App Store'],
    home: {
      title: 'Emoty — Feelings & Affirmations',
      desc: 'Write how you feel each day, understand your emotions and read affirmations made for your day. A private journal that stays on your iPhone.',
      eyebrow: 'For iPhone',
      h1: 'Put your feelings into words.',
      lead: 'Write down how you feel each day, understand what you are going through and read affirmations chosen for your day. A gentle journal that stays on your iPhone.',
      note: 'Free to use. No account needed.',
      featH: 'A small moment for yourself, every day',
      featSub: 'Emoty helps you notice what you feel, without judgment and without pressure.',
      feats: [
        ['joy', '✍️', 'Write, your way', 'Type or dictate a few words. Emoty suggests the emotion behind them, and you can always change it.'],
        ['sadness', '🫧', 'Meet your emotions', 'Each feeling becomes a character in your space. Watch your mind fill up day after day.'],
        ['calm', '🌿', 'Affirmations for you', 'Thousands of gentle affirmations, picked for how you feel today, plus themed collections.'],
        ['pride', '📆', 'See your story', 'Look back on your days and weeks, and see which emotions take the most space.'],
        ['motivation', '🔔', 'Gentle reminders', 'A kind word in the morning, an invitation to write in the evening. You choose.'],
        ['fear', '🧩', 'Widgets', 'Keep an affirmation on your Home Screen and Lock Screen.'],
      ],
      crowdH: 'Ten emotions, ten little characters',
      crowdSub: 'Joy, calm, pride, motivation, sadness, fear, stress, fatigue, anger… and neutral.',
      privH: 'Your journal stays yours',
      privSub: 'What you write is personal. Emoty was designed so it never has to leave your iPhone.',
      privList: [
        'No account, no sign-in.',
        'Your journal is stored on your iPhone, not on our servers.',
        'Emotion suggestions run on your device with Apple Intelligence.',
        'Dictation is transcribed on your iPhone.',
        'No ads.',
        'Encrypted backups, protected by a passphrase only you know.',
      ],
      privLink: 'Read the privacy policy',
      premH: 'Go further with Premium',
      premSub: 'Weekly, monthly or yearly subscription. Prices are shown in the app.',
      premList: [
        ['joy', 'Unlimited new affirmations every day'],
        ['calm', 'Every affirmation collection, including Unfiltered'],
        ['pride', 'Character collections for your emotions'],
        ['sadness', 'Reading backgrounds for your affirmations'],
        ['motivation', 'Monthly and yearly trends'],
      ],
      premFree: 'Your journal, history, personal affirmations, favorites and backups always stay free.',
      ctaH: 'Ready to take a moment for yourself?',
      ctaSub: 'Emoty is available on iPhone, in English and French.',
    },
  },
  fr: {
    lang: 'fr', other: 'en', otherLabel: 'English', base: '/fr/', otherBase: '/',
    nav: { privacy: 'Confidentialité', terms: 'Conditions', support: 'Support' },
    store: storeUrl ? ['Télécharger dans', 'l’App Store'] : ['Bientôt sur', 'l’App Store'],
    home: {
      title: 'Emoty — Ressentis et affirmations',
      desc: 'Écris ce que tu ressens chaque jour, comprends tes émotions et lis des affirmations choisies pour ta journée. Un journal privé qui reste sur ton iPhone.',
      eyebrow: 'Pour iPhone',
      h1: 'Mets des mots sur ce que tu ressens.',
      lead: 'Note ce que tu ressens chaque jour, comprends ce que tu traverses et lis des affirmations choisies pour ta journée. Un journal doux, qui reste sur ton iPhone.',
      note: 'Gratuit. Sans compte.',
      featH: 'Un petit moment pour toi, chaque jour',
      featSub: 'Emoty t’aide à remarquer ce que tu ressens, sans jugement et sans pression.',
      feats: [
        ['joy', '✍️', 'Écris à ta façon', 'Tape ou dicte quelques mots. Emoty te propose l’émotion qui s’en dégage, et tu peux toujours la changer.'],
        ['sadness', '🫧', 'Rencontre tes émotions', 'Chaque ressenti devient un personnage dans ton espace. Ton esprit se remplit jour après jour.'],
        ['calm', '🌿', 'Des affirmations pour toi', 'Des milliers d’affirmations douces, choisies selon ce que tu ressens aujourd’hui, et des collections à thème.'],
        ['pride', '📆', 'Revois ton histoire', 'Retrouve tes journées et tes semaines, et vois quelles émotions prennent le plus de place.'],
        ['motivation', '🔔', 'Des rappels doux', 'Un mot gentil le matin, une invitation à écrire le soir. C’est toi qui choisis.'],
        ['fear', '🧩', 'Des widgets', 'Garde une affirmation sur ton écran d’accueil et ton écran verrouillé.'],
      ],
      crowdH: 'Dix émotions, dix petits personnages',
      crowdSub: 'Joie, calme, fierté, motivation, tristesse, peur, stress, fatigue, colère… et neutre.',
      privH: 'Ton journal reste à toi',
      privSub: 'Ce que tu écris est personnel. Emoty a été conçu pour que ça n’ait jamais à quitter ton iPhone.',
      privList: [
        'Pas de compte, pas de connexion.',
        'Ton journal est enregistré sur ton iPhone, pas sur nos serveurs.',
        'Les suggestions d’émotion sont faites sur ton appareil avec Apple Intelligence.',
        'La dictée est transcrite sur ton iPhone.',
        'Pas de publicité.',
        'Des sauvegardes chiffrées, protégées par une phrase secrète que toi seul connais.',
      ],
      privLink: 'Lire la politique de confidentialité',
      premH: 'Va plus loin avec Premium',
      premSub: 'Abonnement hebdomadaire, mensuel ou annuel. Les prix sont affichés dans l’app.',
      premList: [
        ['joy', 'De nouvelles affirmations sans limite chaque jour'],
        ['calm', 'Toutes les collections d’affirmations, dont Sans filtre'],
        ['pride', 'Des collections de personnages pour tes émotions'],
        ['sadness', 'Des fonds de lecture pour tes affirmations'],
        ['motivation', 'Tes tendances du mois et de l’année'],
      ],
      premFree: 'Le journal, l’historique, les affirmations personnelles, les favoris et les sauvegardes restent toujours gratuits.',
      ctaH: 'Prêt à prendre un moment pour toi ?',
      ctaSub: 'Emoty est disponible sur iPhone, en français et en anglais.',
    },
  },
};

// Sur les pages anglaises (racine), un visiteur francophone est envoyé vers /fr/,
// sauf s'il a choisi une langue avec le bouton (mémorisé dans le navigateur).
function langScript(t, path) {
  if (t.lang !== 'en') return '';
  return `\n<script>try{var l=localStorage.getItem('lang');if(l!=='en'&&(l==='fr'||/^fr\\b/i.test(navigator.language||''))){location.replace('/fr/${path}'+location.search+location.hash)}}catch(e){}</script>`;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(t, { title, desc, path }) {
  const url = SITE + t.base + path;
  const alt = SITE + t.otherBase + path;
  const banner = APP_STORE_ID ? `\n<meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}">` : '';
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${t.lang}" href="${url}">
<link rel="alternate" hreflang="${t.other}" href="${alt}">
<link rel="alternate" hreflang="x-default" href="${SITE}/${path}">
<meta name="theme-color" content="#1D2768">${banner}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/characters-hero.webp">
<link rel="icon" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/style.css">${langScript(t, path)}
</head>
<body>
`;
}

function topbar(t, path, light) {
  return `<header class="top${light ? ' light' : ''}">
  <a class="brand" href="${t.base}"><img src="/assets/icon.png" alt="" width="34" height="34">Emoty</a>
  <a class="lang" href="${t.otherBase}${path}" hreflang="${t.other}" lang="${t.other}" onclick="try{localStorage.setItem('lang','${t.other}')}catch(e){}">${t.otherLabel}</a>
</header>
`;
}

function storeButton(t) {
  const inner = `${apple}<span><small>${t.store[0]}</small>${t.store[1]}</span>`;
  return storeUrl
    ? `<a class="store" href="${storeUrl}">${inner}</a>`
    : `<span class="store soon" aria-disabled="true">${inner}</span>`;
}

function footer(t) {
  return `<footer>
  <div class="wrap foot">
    <span>© 2026 ${PUBLISHER}</span>
    <nav>
      <a href="${t.base}privacy">${t.nav.privacy}</a>
      <a href="${t.base}terms">${t.nav.terms}</a>
      <a href="${t.base}support">${t.nav.support}</a>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
    </nav>
  </div>
</footer>
</body>
</html>
`;
}

function home(t) {
  const h = t.home;
  return head(t, { title: h.title, desc: h.desc, path: '' }) + `<div class="hero">
${topbar(t, '', false)}  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">${h.eyebrow}</p>
      <h1>${h.h1}</h1>
      <p class="lead">${h.lead}</p>
      ${storeButton(t)}
      <p class="note">${h.note}</p>
    </div>
    <div class="hero-img"><img src="/assets/characters-hero.webp" alt="" width="1448" height="1086"></div>
  </div>
</div>
<main>
<section>
  <div class="wrap">
    <h2>${h.featH}</h2>
    <p class="sub">${h.featSub}</p>
    <div class="cards">
${h.feats.map(([c, icon, title, body]) => `      <div class="card"><div class="dot" style="background:var(--${c})" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${body}</p></div>`).join('\n')}
    </div>
  </div>
</section>
<section class="center" style="padding-top:0">
  <div class="wrap">
    <h2>${h.crowdH}</h2>
    <p class="sub">${h.crowdSub}</p>
    <div class="crowd">
${characters.map((c) => `      <img src="/assets/characters/${c}.webp" alt="" width="76" height="76" loading="lazy">`).join('\n')}
    </div>
  </div>
</section>
<section class="privacy">
  <div class="wrap split">
    <div>
      <h2>${h.privH}</h2>
      <p class="sub" style="margin-bottom:20px">${h.privSub}</p>
      <a href="${t.base}privacy">${h.privLink} →</a>
    </div>
    <ul class="checks">
${h.privList.map((x) => `      <li>${x}</li>`).join('\n')}
    </ul>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="premium">
      <div>
        <h2>${h.premH}</h2>
        <p class="sub">${h.premSub}</p>
        <ul>
${h.premList.map(([c, x]) => `          <li><i style="background:var(--${c})"></i>${x}</li>`).join('\n')}
        </ul>
        <p class="free">${h.premFree}</p>
      </div>
      <img src="/assets/characters-hero.webp" alt="" width="1448" height="1086" loading="lazy">
    </div>
  </div>
</section>
<section class="cta center">
  <div class="wrap">
    <h2>${h.ctaH}</h2>
    <p class="sub">${h.ctaSub}</p>
    ${storeButton(t)}
  </div>
</section>
</main>
` + footer(t);
}

function doc(t, path, title, desc, body) {
  return head(t, { title: `${title} — Emoty`, desc, path }) + topbar(t, path, true) + `<main class="wrap doc">
<h1>${title}</h1>
<p class="updated">${t.lang === 'fr' ? 'Dernière mise à jour' : 'Last updated'} : ${UPDATED[t.lang]}</p>
${body.trim()}
</main>
` + footer(t);
}

const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

const privacy = {
  en: ['Privacy Policy', 'How Emoty handles your data: your journal stays on your iPhone.', `
<div class="box"><p><strong>In short:</strong> Emoty has no account and no servers that store your journal. What you write stays on your iPhone and is never used for statistics. There are no ads in the app. Outside your device, we only handle subscription data (through Apple and RevenueCat) anonymous usage statistics and the measurement of our TikTok ads, both of which you can turn off.</p></div>

<h2>Who we are</h2>
<p>Emoty is published by ${PUBLISHER} (“we”). For any question about your data, contact us at ${mail}.</p>

<h2>Your journal</h2>
<p>Your feelings, the emotions you choose, your personal affirmations, favorites and settings are stored only on your iPhone, in the app’s protected storage. We do not receive them and cannot read them. There is no cloud sync.</p>
<p>If you delete the app without a backup, this data is lost, because no copy exists anywhere else.</p>

<h2>Emotion suggestions (Apple Intelligence)</h2>
<p>On compatible iPhones with Apple Intelligence turned on, Emoty suggests an emotion, an excerpt and spelling fixes using Apple’s on-device model. Your text is processed on your iPhone and is not sent to us or to any third-party AI service. You can turn this off in the app’s settings. On other iPhones, you choose the emotion yourself.</p>

<h2>Dictation</h2>
<p>If you use dictation, Emoty asks for access to the microphone and speech recognition. Your voice is transcribed on your iPhone (on-device recognition) and the audio is not recorded or sent to us.</p>

<h2>Backups</h2>
<p>You can export an encrypted backup of your journal. It is protected by a passphrase that you choose and that we never know: we cannot recover a forgotten passphrase. Where you save or share the file (Files, iCloud Drive, email…) is your choice, and that service applies its own rules.</p>

<h2>Reminders and widgets</h2>
<p>Reminders are local notifications scheduled on your iPhone. They never include what you wrote. Widgets display affirmations from the app and are generated on your device.</p>

<h2>Subscriptions</h2>
<p>Purchases are processed by Apple. We never see your payment details. To manage subscriptions, we use RevenueCat, Inc. (United States), which receives an anonymous app user identifier, purchase information (product, date, status, price, currency, country/storefront) and basic technical data (app version, iOS version, device model) needed to confirm your access to Premium. RevenueCat does not receive your journal. See <a href="https://www.revenuecat.com/privacy">RevenueCat’s privacy policy</a>.</p>
<p>This data is kept as long as needed to manage your subscription and to meet accounting obligations.</p>

<h2>Anonymous usage statistics</h2>
<p>To understand how Emoty is used and improve it (for example, which onboarding step people leave, or whether they come back), the app sends anonymous usage events to PostHog, hosted in the European Union. These events say what happened, such as “feeling saved”, “paywall viewed” or “subscription started”, with a random identifier generated by the app, the app language, the app version, the device model, the iOS version and an approximate country. They <strong>never</strong> contain the content of your journal, the emotion you chose, your name or your email address, and they are not used to track you across other companies’ apps or websites.</p>
<p>You can turn this off at any time in the app: Profile → “Anonymous statistics”. See <a href="https://posthog.com/privacy">PostHog’s privacy policy</a>.</p>

<h2>Measuring our TikTok ads</h2>
<p>We advertise Emoty on TikTok. To know whether these ads work, the app uses TikTok’s official measurement kit (TikTok App Events SDK, TikTok Pte. Ltd. and affiliates). It tells TikTok only that the app was installed or opened, that the onboarding was completed, that the Premium offer was shown, and when a subscription starts (plan, price and currency), together with technical data such as the app version, iOS version and device model. It <strong>never</strong> receives your journal, your emotions, your name or your email address. The app does not ask for permission to track you and does not use the advertising identifier (IDFA): attribution relies on Apple’s privacy-preserving SKAdNetwork.</p>
<p>The same setting turns this off: Profile → “Anonymous statistics”. See <a href="https://www.tiktok.com/legal/page/global/privacy-policy/en">TikTok’s privacy policy</a>.</p>

<h2>What we do not do</h2>
<ul>
  <li>No account, no email address or name collected by the app.</li>
  <li>No ads in the app. We do not use the advertising identifier (IDFA) or track you across other companies’ apps and websites; the app would always ask your permission first.</li>
  <li>No statistics on the content of your journal: usage statistics are anonymous and can be turned off (see above).</li>
  <li>No sale or sharing of personal data.</li>
</ul>

<h2>Delete your data</h2>
<p>Your journal and settings exist only on your iPhone: deleting the Emoty app permanently removes them. Backup files you saved elsewhere are not affected: delete them yourself if needed.</p>

<h2>Your rights</h2>
<p>Under the GDPR and similar laws, you have the right to access, correct, delete or object to the processing of your data. Since your journal never leaves your device, you control it directly. For subscription data, write to ${mail} and include, if possible, the support identifier shown on the Premium screen of the app (for subscribers). You can also lodge a complaint with your data protection authority (in France, the CNIL).</p>

<h2>Children</h2>
<p>Emoty is not intended for children under 13 and some optional content contains mild language.</p>

<h2>Changes</h2>
<p>We may update this policy. The date at the top shows the latest version. Significant changes will be announced in the app or on this page.</p>

<h2>This website</h2>
<p>This website currently uses no cookies and no analytics. It is hosted by GitHub Pages, which may keep technical logs (such as IP addresses) for security reasons.</p>
`],
  fr: ['Politique de confidentialité', 'Comment Emoty traite tes données : ton journal reste sur ton iPhone.', `
<div class="box"><p><strong>En bref :</strong> Emoty n’a ni compte ni serveur qui stocke ton journal. Ce que tu écris reste sur ton iPhone et ne sert jamais à des statistiques. Il n’y a pas de publicité dans l’app. Hors de ton appareil, nous traitons seulement les données d’abonnement (via Apple et RevenueCat) des statistiques d’usage anonymes et la mesure de nos publicités TikTok, que tu peux désactiver.</p></div>

<h2>Qui sommes-nous</h2>
<p>Emoty est éditée par ${PUBLISHER} (« nous »). Pour toute question sur tes données, écris-nous à ${mail}.</p>

<h2>Ton journal</h2>
<p>Tes ressentis, les émotions choisies, tes affirmations personnelles, tes favoris et tes réglages sont enregistrés uniquement sur ton iPhone, dans l’espace protégé de l’app. Nous ne les recevons pas et ne pouvons pas les lire. Il n’y a pas de synchronisation dans le cloud.</p>
<p>Si tu supprimes l’app sans sauvegarde, ces données sont perdues, car il n’en existe aucune copie ailleurs.</p>

<h2>Suggestions d’émotion (Apple Intelligence)</h2>
<p>Sur les iPhone compatibles où Apple Intelligence est activé, Emoty propose une émotion, un extrait et des corrections d’orthographe grâce au modèle d’Apple qui fonctionne sur l’appareil. Ton texte est traité sur ton iPhone et n’est envoyé ni à nous, ni à aucun service d’IA tiers. Tu peux désactiver cette fonction dans les réglages de l’app. Sur les autres iPhone, tu choisis l’émotion toi-même.</p>

<h2>Dictée</h2>
<p>Si tu utilises la dictée, Emoty demande l’accès au micro et à la reconnaissance vocale. Ta voix est transcrite sur ton iPhone (reconnaissance sur l’appareil) ; l’audio n’est ni enregistré ni envoyé.</p>

<h2>Sauvegardes</h2>
<p>Tu peux exporter une sauvegarde chiffrée de ton journal. Elle est protégée par une phrase secrète que tu choisis et que nous ne connaissons jamais : nous ne pouvons pas récupérer une phrase oubliée. L’endroit où tu enregistres ou partages le fichier (Fichiers, iCloud Drive, e-mail…) est ton choix, et ce service applique ses propres règles.</p>

<h2>Rappels et widgets</h2>
<p>Les rappels sont des notifications locales programmées sur ton iPhone. Ils ne contiennent jamais ce que tu as écrit. Les widgets affichent des affirmations de l’app et sont générés sur ton appareil.</p>

<h2>Abonnements</h2>
<p>Les achats sont traités par Apple. Nous ne voyons jamais tes informations de paiement. Pour gérer les abonnements, nous utilisons RevenueCat, Inc. (États-Unis), qui reçoit un identifiant anonyme d’utilisateur de l’app, les informations d’achat (produit, date, statut, prix, devise, pays de la boutique) et quelques données techniques (version de l’app, version d’iOS, modèle d’appareil) nécessaires pour confirmer ton accès à Premium. RevenueCat ne reçoit pas ton journal. Voir la <a href="https://www.revenuecat.com/privacy">politique de confidentialité de RevenueCat</a>.</p>
<p>Ces données sont conservées le temps nécessaire à la gestion de ton abonnement et au respect des obligations comptables.</p>

<h2>Statistiques d’usage anonymes</h2>
<p>Pour comprendre comment Emoty est utilisée et l’améliorer (par exemple, à quelle étape de la découverte on s’arrête, ou si l’on revient), l’app envoie des événements d’usage anonymes à PostHog, hébergé dans l’Union européenne. Ces événements indiquent ce qui s’est passé, comme « ressenti enregistré », « offre Premium affichée » ou « abonnement commencé », avec un identifiant aléatoire créé par l’app, la langue et la version de l’app, le modèle d’appareil, la version d’iOS et un pays approximatif. Ils ne contiennent <strong>jamais</strong> le contenu de ton journal, l’émotion choisie, ton nom ou ton e-mail, et ne servent pas à te suivre dans les apps ou sites d’autres entreprises.</p>
<p>Tu peux les désactiver à tout moment dans l’app : Profil → « Statistiques anonymes ». Voir la <a href="https://posthog.com/privacy">politique de confidentialité de PostHog</a>.</p>

<h2>Mesure de nos publicités TikTok</h2>
<p>Nous faisons connaître Emoty avec des publicités sur TikTok. Pour savoir si elles fonctionnent, l’app utilise le kit de mesure officiel de TikTok (TikTok App Events SDK, TikTok Pte. Ltd. et ses sociétés affiliées). Il indique seulement à TikTok que l’app a été installée ou ouverte, que la découverte a été terminée, que l’offre Premium a été affichée et quand un abonnement commence (formule, prix et devise), avec des données techniques comme la version de l’app, la version d’iOS et le modèle d’appareil. Il ne reçoit <strong>jamais</strong> ton journal, tes émotions, ton nom ni ton e-mail. L’app ne te demande pas d’autorisation de suivi et n’utilise pas l’identifiant publicitaire (IDFA) : l’attribution passe par SKAdNetwork, le système d’Apple qui protège la vie privée.</p>
<p>Le même réglage la désactive : Profil → « Statistiques anonymes ». Voir la <a href="https://www.tiktok.com/legal/page/global/privacy-policy/fr">politique de confidentialité de TikTok</a>.</p>

<h2>Ce que nous ne faisons pas</h2>
<ul>
  <li>Pas de compte : l’app ne collecte ni e-mail ni nom.</li>
  <li>Pas de publicité dans l’app. Nous n’utilisons pas l’identifiant publicitaire (IDFA) ni de suivi entre les apps et sites d’autres entreprises ; l’app te demanderait toujours ton autorisation avant.</li>
  <li>Aucune statistique sur le contenu de ton journal : les statistiques d’usage sont anonymes et désactivables (voir ci-dessus).</li>
  <li>Aucune vente ni aucun partage de données personnelles.</li>
</ul>

<h2>Supprimer tes données</h2>
<p>Ton journal et tes réglages n’existent que sur ton iPhone : supprimer l’app Emoty les efface définitivement. Les sauvegardes que tu as enregistrées ailleurs ne sont pas concernées : supprime-les toi-même si besoin.</p>

<h2>Tes droits</h2>
<p>Selon le RGPD, tu disposes d’un droit d’accès, de rectification, d’effacement et d’opposition. Ton journal ne quittant jamais ton appareil, tu en gardes directement le contrôle. Pour les données liées à l’abonnement, écris à ${mail} en joignant si possible l’identifiant de support affiché sur l’écran Premium de l’app (pour les abonnés). Tu peux aussi adresser une réclamation à la CNIL (cnil.fr).</p>

<h2>Enfants</h2>
<p>Emoty ne s’adresse pas aux enfants de moins de 13 ans, et certains contenus facultatifs contiennent un langage familier.</p>

<h2>Modifications</h2>
<p>Cette politique peut évoluer. La date en haut de page indique la dernière version. Les changements importants seront signalés dans l’app ou sur cette page.</p>

<h2>Ce site</h2>
<p>Ce site n’utilise pour le moment ni cookies ni mesure d’audience. Il est hébergé par GitHub Pages, qui peut conserver des journaux techniques (comme les adresses IP) pour des raisons de sécurité.</p>
`],
};

const terms = {
  en: ['Terms of Use', 'Terms of use and subscription terms for Emoty.', `
<h2>1. About</h2>
<p>These terms govern your use of the Emoty iPhone app, published by ${PUBLISHER}. Contact: ${mail}. By using the app, you accept these terms. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> also applies.</p>

<h2>2. What Emoty is — and is not</h2>
<p>Emoty is a personal well-being tool: a journal, emotion suggestions and affirmations. It is not a medical device and does not replace advice, diagnosis or care from a health professional. Emotion suggestions are automatic and may be wrong.</p>
<div class="box"><p>If you are in distress or thinking about harming yourself, contact a professional or the emergency services right away (112 in Europe, 911 in the US). In France, you can call 3114, free and available 24/7.</p></div>

<h2>3. Free version and Premium</h2>
<p>The journal, history, personal affirmations, favorites and backups are free. Premium unlocks additional content and features described in the app.</p>

<h2>4. Subscriptions</h2>
<ul>
  <li>Premium is offered as an auto-renewable subscription: weekly, monthly or yearly. The price and duration are shown in the app before purchase.</li>
  <li>Payment is charged to your Apple Account when you confirm the purchase.</li>
  <li>The subscription renews automatically unless you cancel it at least 24 hours before the end of the current period. Your account is charged for renewal within 24 hours before the end of the period.</li>
  <li>You can manage or cancel your subscription in your iPhone’s Settings → your name → Subscriptions. Cancelling stops the next renewal; you keep Premium until the end of the period already paid.</li>
  <li>Refunds are handled by Apple according to its policies: <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</li>
  <li>To recover Premium on a new device with the same Apple Account, use “Restore purchases” in the app.</li>
</ul>

<h2>5. Content</h2>
<p>Affirmations are general texts written for inspiration. They are not personalized advice. The optional “Unfiltered” collection uses a franker tone with mild language; you only see it if you open it.</p>
<p>The app, its texts, characters, illustrations and design belong to ${PUBLISHER} and are protected. You may use them for your personal use within the app. Any other reproduction requires our permission. What you write in your journal belongs to you.</p>

<h2>6. Your data and backups</h2>
<p>Your journal is stored only on your iPhone (see the <a href="privacy">Privacy Policy</a>). You are responsible for making backups and keeping your passphrase. We cannot recover lost data or a forgotten passphrase.</p>

<h2>7. Availability and changes</h2>
<p>The app is provided “as is” and “as available”, without any guarantee about how it works, its availability or the absence of errors. We may change, suspend or stop all or part of the app, its content or Premium at any time, including permanently, without notice. If the app is discontinued, we will stop new subscriptions and renewals; the data already on your iPhone remains accessible as long as the app is installed and works on your device.</p>

<h2>8. Liability</h2>
<p>To the extent permitted by law, ${PUBLISHER} is not liable for indirect damages resulting from the use of, or inability to use, the app, including loss of data. Nothing in these terms limits your rights as a consumer under applicable law.</p>

<h2>9. Changes to these terms</h2>
<p>We may update these terms. The date at the top shows the latest version. If you keep using the app after a change, you accept the new terms.</p>

<h2>10. Applicable law</h2>
<p>These terms are governed by French law. If a dispute arises, please contact us first at ${mail} so we can try to solve it amicably. Consumers keep the protection of the mandatory rules of their country of residence.</p>

<h2>Legal notice</h2>
<p>Publisher: ${PUBLISHER} — ${mail}<br>
Hosting: GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States.</p>
`],
  fr: ['Conditions d’utilisation', 'Conditions d’utilisation et conditions d’abonnement d’Emoty.', `
<h2>1. Objet</h2>
<p>Ces conditions encadrent l’utilisation de l’app iPhone Emoty, éditée par ${PUBLISHER}. Contact : ${mail}. En utilisant l’app, tu acceptes ces conditions. Le <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">contrat de licence standard d’Apple</a> (EULA) s’applique également.</p>

<h2>2. Ce qu’est Emoty, et ce qu’il n’est pas</h2>
<p>Emoty est un outil de bien-être personnel : un journal, des suggestions d’émotion et des affirmations. Ce n’est pas un dispositif médical et il ne remplace en aucun cas l’avis, le diagnostic ou le suivi d’un professionnel de santé. Les suggestions d’émotion sont automatiques et peuvent se tromper.</p>
<div class="box"><p>Si tu traverses une détresse ou que tu penses à te faire du mal, contacte sans attendre un professionnel ou les urgences (112). En France, le 3114 est gratuit et joignable 24 h/24, 7 j/7.</p></div>

<h2>3. Version gratuite et Premium</h2>
<p>Le journal, l’historique, les affirmations personnelles, les favoris et les sauvegardes sont gratuits. Premium débloque des contenus et fonctions supplémentaires décrits dans l’app.</p>

<h2>4. Abonnements</h2>
<ul>
  <li>Premium est proposé sous forme d’abonnement à renouvellement automatique : hebdomadaire, mensuel ou annuel. Le prix et la durée sont affichés dans l’app avant l’achat.</li>
  <li>Le paiement est débité sur ton compte Apple à la confirmation de l’achat.</li>
  <li>L’abonnement se renouvelle automatiquement, sauf si tu l’annules au moins 24 heures avant la fin de la période en cours. Le renouvellement est débité dans les 24 heures précédant la fin de la période.</li>
  <li>Tu peux gérer ou annuler ton abonnement dans Réglages de l’iPhone → ton nom → Abonnements. L’annulation arrête le prochain renouvellement ; tu gardes Premium jusqu’à la fin de la période déjà payée.</li>
  <li>Les remboursements sont gérés par Apple selon ses règles : <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</li>
  <li>Pour retrouver Premium sur un nouvel appareil avec le même compte Apple, utilise « Restaurer mes achats » dans l’app.</li>
</ul>

<h2>5. Contenus</h2>
<p>Les affirmations sont des textes généraux écrits pour inspirer. Ce ne sont pas des conseils personnalisés. La collection facultative « Sans filtre » adopte un ton plus franc, avec un langage familier ; elle n’apparaît que si tu l’ouvres.</p>
<p>L’app, ses textes, personnages, illustrations et son design appartiennent à ${PUBLISHER} et sont protégés. Tu peux les utiliser pour ton usage personnel dans l’app ; toute autre reproduction nécessite notre accord. Ce que tu écris dans ton journal t’appartient.</p>

<h2>6. Tes données et tes sauvegardes</h2>
<p>Ton journal est enregistré uniquement sur ton iPhone (voir la <a href="privacy">politique de confidentialité</a>). Il t’appartient de faire des sauvegardes et de conserver ta phrase secrète. Nous ne pouvons pas récupérer des données perdues ni une phrase oubliée.</p>

<h2>7. Disponibilité et évolution</h2>
<p>L’app est fournie « en l’état » et « selon sa disponibilité », sans garantie particulière quant à son fonctionnement, sa disponibilité ou l’absence d’erreurs. Nous pouvons modifier, suspendre ou arrêter tout ou partie de l’app, de ses contenus ou de Premium à tout moment, y compris définitivement, sans préavis. En cas d’arrêt, nous cesserons les nouveaux abonnements et les renouvellements ; les données déjà présentes sur ton iPhone restent accessibles tant que l’app est installée et fonctionne sur ton appareil.</p>

<h2>8. Responsabilité</h2>
<p>Dans la mesure permise par la loi, ${PUBLISHER} ne saurait être tenue responsable des dommages indirects résultant de l’utilisation ou de l’impossibilité d’utiliser l’app, y compris une perte de données. Rien dans ces conditions ne limite tes droits de consommateur prévus par la loi.</p>

<h2>9. Modification des conditions</h2>
<p>Ces conditions peuvent évoluer. La date en haut de page indique la dernière version. Continuer à utiliser l’app après une modification vaut acceptation des nouvelles conditions.</p>

<h2>10. Droit applicable</h2>
<p>Ces conditions sont soumises au droit français. En cas de litige, écris-nous d’abord à ${mail} pour chercher une solution amiable. Tu peux aussi recourir gratuitement à un médiateur de la consommation. Les consommateurs conservent la protection des règles impératives de leur pays de résidence.</p>

<h2>Mentions légales</h2>
<p>Éditeur : ${PUBLISHER} — ${mail}<br>
Hébergement : GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</p>
`],
};

const support = {
  en: ['Support', 'Help and contact for Emoty.', `
<p>A question, a problem or an idea? Write to us, we usually reply within a few days.</p>
<a class="mail" href="mailto:${EMAIL}">${EMAIL}</a>
<p style="margin-top:20px">To help us, include your iPhone model, your iOS version and the app version (Profile, at the bottom). Never send us the content of your journal or your backup passphrase.</p>

<h2>Frequently asked questions</h2>
<details><summary>How do I restore my Premium subscription?</summary><p>In Emoty, open Profile → Subscription → “Restore purchases”, with the same Apple Account used for the purchase.</p></details>
<details><summary>How do I cancel my subscription?</summary><p>On your iPhone, open Settings → your name → Subscriptions → Emoty → Cancel subscription. You keep Premium until the end of the period already paid.</p></details>
<details><summary>How do I get a refund?</summary><p>Refunds are handled by Apple: go to <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> and sign in with your Apple Account.</p></details>
<details><summary>I changed iPhone. How do I get my journal back?</summary><p>Your journal is stored only on your iPhone. Before changing device, export an encrypted backup (Profile → Encrypted backup), keep the file and your passphrase, then restore it in Emoty on the new iPhone.</p></details>
<details><summary>I forgot my backup passphrase.</summary><p>We cannot recover it: it is never sent to us. Without it, the backup cannot be opened.</p></details>
<details><summary>Why can’t Emoty detect my emotion automatically?</summary><p>Automatic suggestions need an iPhone compatible with Apple Intelligence, with Apple Intelligence turned on. Otherwise, simply pick the emotion yourself.</p></details>
<details><summary>How do I delete all my data?</summary><p>Delete the Emoty app from your iPhone: your journal and settings are removed with it. Backups saved elsewhere are not affected.</p></details>

<div class="box"><p>Emoty does not replace professional support. If you are in distress, contact a professional or the emergency services (112 in Europe, 911 in the US). In France, call 3114 (free, 24/7).</p></div>
`],
  fr: ['Support', 'Aide et contact pour Emoty.', `
<p>Une question, un problème ou une idée ? Écris-nous, nous répondons en général sous quelques jours.</p>
<a class="mail" href="mailto:${EMAIL}">${EMAIL}</a>
<p style="margin-top:20px">Pour nous aider, indique ton modèle d’iPhone, ta version d’iOS et la version de l’app (en bas du Profil). Ne nous envoie jamais le contenu de ton journal ni ta phrase secrète de sauvegarde.</p>

<h2>Questions fréquentes</h2>
<details><summary>Comment restaurer mon abonnement Premium ?</summary><p>Dans Emoty, ouvre Profil → Abonnement → « Restaurer mes achats », avec le même compte Apple que celui utilisé pour l’achat.</p></details>
<details><summary>Comment annuler mon abonnement ?</summary><p>Sur ton iPhone : Réglages → ton nom → Abonnements → Emoty → Annuler l’abonnement. Tu gardes Premium jusqu’à la fin de la période déjà payée.</p></details>
<details><summary>Comment obtenir un remboursement ?</summary><p>Les remboursements sont gérés par Apple : va sur <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> et connecte-toi avec ton compte Apple.</p></details>
<details><summary>J’ai changé d’iPhone. Comment retrouver mon journal ?</summary><p>Ton journal est enregistré uniquement sur ton iPhone. Avant de changer d’appareil, exporte une sauvegarde chiffrée (Profil → Sauvegarde chiffrée), garde le fichier et ta phrase secrète, puis restaure-la dans Emoty sur le nouvel iPhone.</p></details>
<details><summary>J’ai oublié ma phrase secrète de sauvegarde.</summary><p>Nous ne pouvons pas la retrouver : elle ne nous est jamais envoyée. Sans elle, la sauvegarde ne peut pas être ouverte.</p></details>
<details><summary>Pourquoi Emoty ne détecte pas mon émotion automatiquement ?</summary><p>Les suggestions automatiques nécessitent un iPhone compatible avec Apple Intelligence, avec Apple Intelligence activé. Sinon, choisis simplement l’émotion toi-même.</p></details>
<details><summary>Comment supprimer toutes mes données ?</summary><p>Supprime l’app Emoty de ton iPhone : ton journal et tes réglages sont effacés avec elle. Les sauvegardes enregistrées ailleurs ne sont pas concernées.</p></details>

<div class="box"><p>Emoty ne remplace pas un accompagnement professionnel. En cas de détresse, contacte un professionnel ou les urgences (112). En France, le 3114 est gratuit et joignable 24 h/24.</p></div>
`],
};

function write(rel, html) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const lang of ['en', 'fr']) {
  const t = T[lang];
  const dir = lang === 'en' ? '' : 'fr/';
  write(`${dir}index.html`, home(t));
  for (const [name, pages] of [['privacy', privacy], ['terms', terms], ['support', support]]) {
    const [title, desc, body] = pages[lang];
    write(`${dir}${name}.html`, doc(t, name, title, desc, body));
  }
}

write('404.html', head(T.en, { title: 'Page not found — Emoty', desc: 'Page not found', path: '' }) + topbar(T.en, '', true) +
  `<main class="wrap doc"><h1>Page not found</h1><p><a href="/">Back to Emoty</a> · <a href="/fr/">Retour à l’accueil</a></p></main>\n` + footer(T.en));
write('CNAME', 'emoty.ideonot.com\n');
write('.nojekyll', '');
console.log('Site généré.');
