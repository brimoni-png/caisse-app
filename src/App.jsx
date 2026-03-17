import { createClient } from "@supabase/supabase-js";
const SUPA_URL = "https://wfbhofjowqyfxejnlcoy.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYmhvZmpvd3F5Znhlam5sY295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDY0NTksImV4cCI6MjA4OTI4MjQ1OX0.T2-7AfWTn40OpQSkn7OPsWv8iJ24f7iBS629bvcffKQ";
const supabase = createClient(SUPA_URL, SUPA_KEY);

import { useState, useEffect, useRef } from "react";

function useSheetJS() {
  const [ready, setReady] = useState(() => typeof window !== "undefined" && !!window.XLSX);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.XLSX) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => setReady(true);
    s.onerror = () => console.warn("SheetJS failed to load");
    document.head.appendChild(s);
  }, []);
  return ready;
}

function useChartJS() {
  const [ready, setReady] = useState(() => typeof window !== "undefined" && !!window.Chart);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Chart) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
    s.onload = () => setReady(true);
    s.onerror = () => console.warn("Chart.js failed to load");
    document.head.appendChild(s);
  }, []);
  return ready;
}

// ─── ECO-FINTECH DESIGN TOKENS ────────────────────────────────────────────────
const C = {
  forest:    "#1A1A2E",
  forestMid: "#16213E",
  forestLt:  "#C8872A",
  mint:      "#F5C842",
  mintLt:    "#FFE082",
  mintPale:  "#FFF8E7",
  lime:      "#E8A838",
  sage:      "#D4A855",
  bg:        "#F8F6F2",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  muted:     "#6B5E4E",
  sub:       "#A89880",
  red:       "#E05252",
  redLt:     "#FDEAEA",
  gold:      "#C8872A",
  goldLt:    "#FFF3DC",
  shadow:    "0 2px 20px rgba(26,26,46,0.08)",
  shadowMd:  "0 8px 32px rgba(26,26,46,0.12)",
  shadowLg:  "0 20px 56px rgba(26,26,46,0.16)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');`;

const G = `
  ${FONTS}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;overscroll-behavior:none;}
  body{background:#1A1A2E;-webkit-font-smoothing:antialiased;font-family:'DM Sans',sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;}
  #root{height:100%;display:flex;justify-content:center;background:#1A1A2E;}
  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-thumb{background:${C.sage};border-radius:4px;}
  @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes sheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(.92);opacity:0}100%{transform:scale(1);opacity:1}}
  @keyframes fin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes gone{to{opacity:0;max-height:0;margin:0;padding:0;overflow:hidden}}
  .a1{animation:up .4s cubic-bezier(.16,1,.3,1) .04s both}
  .a2{animation:up .4s cubic-bezier(.16,1,.3,1) .10s both}
  .a3{animation:up .4s cubic-bezier(.16,1,.3,1) .16s both}
  .a4{animation:up .4s cubic-bezier(.16,1,.3,1) .22s both}
  .a5{animation:up .4s cubic-bezier(.16,1,.3,1) .28s both}
  .a6{animation:up .4s cubic-bezier(.16,1,.3,1) .34s both}
  .a7{animation:up .4s cubic-bezier(.16,1,.3,1) .40s both}
  .fin-in{animation:fin .3s ease both}
  .out{animation:gone .22s ease forwards;overflow:hidden;}
  .tbtn{transition:all .18s cubic-bezier(.16,1,.3,1);cursor:pointer;}
  .tbtn:active{transform:scale(.96);}
  .txrow:hover .txacts{opacity:1 !important;}
  .cat-card:hover{transform:translateY(-3px);box-shadow:${C.shadowMd} !important;}
  .eco-btn:hover{filter:brightness(1.06);}
  input,select{color-scheme:light;}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
  button{font-family:'DM Sans',sans-serif;}
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = {
  up: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>),
  dn: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>),
  heart: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>),
  users: (c, s = 20) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>),
  bar: (c, s = 20) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
  home: (c, s = 20) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
  swap: (c, s = 20) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>),
  gear: (c, s = 20) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>),
  bell: (c, s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>),
  moon: (c, s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>),
  plus: (c = "#fff", s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  trash: (c, s = 14) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>),
  edit: (c, s = 13) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
  dl: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
  chev: (c, s = 13) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>),
  fwd: (c, s = 13) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>),
  lock: (c, s = 17) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>),
  globe: (c, s = 17) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>),
  info: (c, s = 17) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>),
  rcpt: (c, s = 26) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    dir: "ltr", font: "'DM Sans', sans-serif",
    greeting: "السلام عليكم !", userName: "Cheikh Brahim", subtitle: "Caisse communautaire",
    balanceGlobal: "Solde Global",
    stats: { contribution: "Contributions", don: "Dons", depense: "Dépenses" },
    activity: "Activité financière", recentTx: "Transactions récentes", seeAll: "Voir tout →",
    activeMembers: "Membres actifs", seeMembers: "Voir tous →",
    tabs: { home: "Accueil", ops: "Transactions", members: "Membres", reports: "Statistiques", settings: "Paramètres" },
    filters: { all: "Toutes", contribution: "Contributions", don: "Dons", depense: "Dépenses" },
    noTx: "Aucune transaction", noMembers: "Aucun membre", addMember: "+ Ajouter un membre",
    totalPaid: "Total versé", totalContrib: "Total contributions", totalDons: "Total dons",
    totalDep: "Total dépenses", monthlyEvo: "Bilan du mois",
    months: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    monthsFull: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    newTx: (t) => ({ contribution: "Nouvelle Contribution", don: "Nouveau Don", depense: "Nouvelle Dépense" }[t]),
    editTx: (t) => ({ contribution: "Modifier Contribution", don: "Modifier Don", depense: "Modifier Dépense" }[t]),
    flds: { amount: "Montant (MRU)", desc: "Description", member: "Membre", date: "Date", donor: "Nom du donateur", donorPh: "Anonyme", memberPh: "Sélectionner un membre", notePh: "Description…" },
    save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", deleteTitle: "Supprimer ?",
    deleteMsg: (l, a) => `Supprimer cette ${l} de ${a} ?`,
    delMemberTitle: "Retirer ?", delMemberMsg: (n) => `Retirer "${n}" ?`,
    alertAmount: "Montant invalide.", alertMember: "Sélectionnez un membre.", alertName: "Saisissez un nom.",
    txTypes: { contribution: "Contribution", don: "Don", depense: "Dépense" }, donorDefault: "Donateur",
    newMember: "Nouveau membre", fullName: "Nom complet", fullNamePh: "Ex : Fatima Mint Ahmed",
    phone: "Téléphone", phonePh: "Ex : 22234567890", addMemberBtn: "Ajouter",
    exportBtn: "Exporter Excel", exportAll: "Toutes les transactions", exportMonth: "Ce mois", xlsxWait: "Chargement…",
    settingsTitle: "Paramètres", langLbl: "Langue", themeLbl: "Apparence", secLbl: "Sécurité",
    aboutLbl: "À propos", version: "Version 1.0.0", darkMode: "Mode sombre", changeLang: "Changer la langue",
    changePin: "Changer le PIN", aboutApp: "Caisse Coopérative · Gestion communautaire", logout: "Se déconnecter",
    exportSummaryRows: (s,c,d,dep,n) => [["Solde",s],["Contributions",c],["Dons",d],["Dépenses",dep],["Membres",n]],
    categories: "Actions rapides", apercu: "Aperçu du mois",
  },
  ar: {
    dir: "rtl", font: "'DM Sans', sans-serif",
    greeting: "السلام عليكم !", userName: "الشيخ إبراهيم", subtitle: "صندوق تعاوني",
    balanceGlobal: "الرصيد الإجمالي",
    stats: { contribution: "المساهمات", don: "التبرعات", depense: "المصروفات" },
    activity: "النشاط المالي", recentTx: "آخر المعاملات", seeAll: "عرض الكل ←",
    activeMembers: "الأعضاء النشطون", seeMembers: "عرض الكل ←",
    tabs: { home: "الرئيسية", ops: "المعاملات", members: "الأعضاء", reports: "إحصائيات", settings: "الإعدادات" },
    filters: { all: "الكل", contribution: "مساهمات", don: "تبرعات", depense: "مصروفات" },
    noTx: "لا توجد معاملات", noMembers: "لا يوجد أعضاء", addMember: "+ إضافة عضو",
    totalPaid: "إجمالي المدفوع", totalContrib: "إجمالي المساهمات", totalDons: "إجمالي التبرعات",
    totalDep: "إجمالي المصروفات", monthlyEvo: "ميزان الشهر",
    months: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    monthsFull: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    newTx: (t) => ({ contribution: "مساهمة جديدة", don: "تبرع جديد", depense: "مصروف جديد" }[t]),
    editTx: (t) => ({ contribution: "تعديل المساهمة", don: "تعديل التبرع", depense: "تعديل المصروف" }[t]),
    flds: { amount: "المبلغ (MRU)", desc: "الوصف", member: "العضو", date: "التاريخ", donor: "اسم المتبرع", donorPh: "مجهول", memberPh: "اختر عضواً", notePh: "وصف العملية…" },
    save: "حفظ", cancel: "إلغاء", delete: "حذف", deleteTitle: "حذف؟",
    deleteMsg: (l, a) => `هل تريد حذف هذه ${l} بقيمة ${a}؟`,
    delMemberTitle: "إزالة؟", delMemberMsg: (n) => `إزالة "${n}"؟`,
    alertAmount: "مبلغ غير صحيح.", alertMember: "اختر عضواً.", alertName: "أدخل الاسم.",
    txTypes: { contribution: "مساهمة", don: "تبرع", depense: "مصروف" }, donorDefault: "متبرع",
    newMember: "عضو جديد", fullName: "الاسم الكامل", fullNamePh: "مثال: فاطمة بنت أحمد",
    phone: "الهاتف", phonePh: "مثال: 22234567890", addMemberBtn: "إضافة",
    exportBtn: "تصدير Excel", exportAll: "كل العمليات", exportMonth: "هذا الشهر", xlsxWait: "جارٍ التحميل…",
    settingsTitle: "الإعدادات", langLbl: "اللغة", themeLbl: "المظهر", secLbl: "الأمان",
    aboutLbl: "حول التطبيق", version: "الإصدار 1.0.0", darkMode: "الوضع الداكن", changeLang: "تغيير اللغة",
    changePin: "تغيير رمز PIN", aboutApp: "الصندوق التعاوني · إدارة مجتمعية", logout: "تسجيل الخروج",
    exportSummaryRows: (s,c,d,dep,n) => [["الرصيد",s],["المساهمات",c],["التبرعات",d],["المصروفات",dep],["الأعضاء",n]],
    categories: "إجراءات سريعة", apercu: "نظرة عامة على الشهر",
  },
};

// ─── DATA VIDE ────────────────────────────────────────────────────────────────
const DEF_MEMBERS = [];
const DEF_TX = [];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("fr-FR").format(n) + " MRU";
const fmtSh = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
const fmtDt = (d, l) => new Date(d).toLocaleDateString(l === "ar" ? "ar-MA" : "fr-FR", { day: "2-digit", month: "short", year: "numeric" });
const inits = (n) => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const getYrs = (txs) => { const s = new Set(txs.map((t) => new Date(t.date).getFullYear())); s.add(new Date().getFullYear()); return [...s].sort((a, b) => b - a); };

const CFG = (lang) => ({
  contribution: { label: T[lang].txTypes.contribution, color: C.forestLt, lt: "rgba(200,135,42,0.12)", icon: () => Ic.up(C.forestLt), sign: "+" },
  don:          { label: T[lang].txTypes.don,          color: C.gold,      lt: C.goldLt,              icon: () => Ic.heart(C.gold),   sign: "+" },
  depense:      { label: T[lang].txTypes.depense,      color: C.red,       lt: C.redLt,               icon: () => Ic.dn(C.red),       sign: "−" },
});

const AVC = [
  ["rgba(168,230,207,0.35)","#0D3B2E"],["rgba(13,59,46,0.15)","#0D3B2E"],
  ["rgba(111,207,151,0.25)","#155740"],["rgba(168,230,207,0.50)","#0D3B2E"],
  ["rgba(200,135,42,0.25)","#0D3B2E"],  ["rgba(183,216,200,0.40)","#155740"],
];

// ─── PERSISTED STATE ──────────────────────────────────────────────────────────
function usePersisted(k, d) {
  const [s, set] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const v = localStorage.getItem(k);
        return v ? JSON.parse(v) : d;
      }
    } catch {}
    return d;
  });
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(k, JSON.stringify(s));
      }
    } catch {}
  }, [k, s]);
  return [s, set];
}

// ─── SUPABASE HOOKS ───────────────────────────────────────────────────────────
function useSupabaseData() {
  const [members, setMembers] = useState([]);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: mData }, { data: tData }] = await Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: true }),
      supabase.from("transactions").select("*").order("created_at", { ascending: false }),
    ]);
    if (mData) setMembers(mData.map(m => ({ id: m.id, name: m.name, phone: m.phone || "" })));
    if (tData) setTxs(tData.map(t => ({ id: t.id, type: t.type, memberId: t.member_id, memberName: t.member_name, amount: t.amount, date: t.date, note: t.note || "" })));
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const addTx = async (d) => {
    const { data } = await supabase.from("transactions").insert([{ type: d.type, member_id: d.memberId || null, member_name: d.memberName, amount: d.amount, date: d.date, note: d.note }]).select().single();
    if (data) setTxs(p => [{ id: data.id, type: data.type, memberId: data.member_id, memberName: data.member_name, amount: data.amount, date: data.date, note: data.note || "" }, ...p]);
  };

  const updateTx = async (d) => {
    await supabase.from("transactions").update({ type: d.type, member_id: d.memberId || null, member_name: d.memberName, amount: d.amount, date: d.date, note: d.note }).eq("id", d.id);
    setTxs(p => p.map(tx => tx.id === d.id ? d : tx));
  };

  const deleteTx = async (id) => {
    await supabase.from("transactions").delete().eq("id", id);
    setTxs(p => p.filter(tx => tx.id !== id));
  };

  const addMember = async (d) => {
    const { data } = await supabase.from("members").insert([{ name: d.name, phone: d.phone }]).select().single();
    if (data) setMembers(p => [...p, { id: data.id, name: data.name, phone: data.phone || "" }]);
  };

  const deleteMember = async (id) => {
    await supabase.from("members").delete().eq("id", id);
    setMembers(p => p.filter(m => m.id !== id));
  };

  return { members, txs, loading, addTx, updateTx, deleteTx, addMember, deleteMember };
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function Card({ children, sx = {}, className = "" }) {
  return <div className={className} style={{ background: C.card, borderRadius: 20, boxShadow: C.shadow, border: `1px solid ${C.mintLt}`, ...sx }}>{children}</div>;
}

function Lbl({ c }) {
  return <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 }}>{c}</div>;
}

function Inp({ label, dir = "ltr", sx = {}, ...p }) {
  const [f, sf] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <Lbl c={label} />}
      <input {...p} onFocus={(e) => { sf(true); p.onFocus?.(e); }} onBlur={(e) => { sf(false); p.onBlur?.(e); }}
        style={{ width: "100%", background: f ? C.card : C.bg, border: `1.5px solid ${f ? C.lime : C.mintLt}`, borderRadius: 12, padding: "12px 15px", color: C.text, fontSize: 14, outline: "none", direction: dir, fontFamily: "inherit", transition: "all .2s", boxShadow: f ? "0 0 0 3px rgba(111,207,151,0.2)" : "none", ...sx }} />
    </div>
  );
}

function Sel({ label, dir = "ltr", children, ...p }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <Lbl c={label} />}
      <div style={{ position: "relative" }}>
        <select {...p} style={{ width: "100%", background: C.bg, border: `1.5px solid ${C.mintLt}`, borderRadius: 12, padding: "12px 38px 12px 15px", color: C.text, fontSize: 14, outline: "none", direction: dir, fontFamily: "inherit", appearance: "none", cursor: "pointer" }}>{children}</select>
        <div style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{Ic.chev(C.muted)}</div>
      </div>
    </div>
  );
}

function PBtn({ children, onClick, sx = {}, disabled }) {
  return (
    <button className="tbtn eco-btn" disabled={disabled} onClick={onClick}
      style={{ background: disabled ? C.sage : `linear-gradient(135deg, #C8872A, #E8A838)`, border: "none", color: disabled ? C.muted : "#fff", borderRadius: 14, padding: "14px 20px", fontSize: 14, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", width: "100%", marginTop: 6, boxShadow: disabled ? "none" : "0 6px 20px rgba(13,59,46,0.28)", fontFamily: "inherit", ...sx }}>
      {children}
    </button>
  );
}

function GBtn({ children, onClick, sx = {} }) {
  return (
    <button className="tbtn" onClick={onClick}
      style={{ background: C.bg, border: `1.5px solid ${C.mintLt}`, color: C.muted, borderRadius: 12, padding: "12px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", ...sx }}>
      {children}
    </button>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,0.18)", borderRadius: 10, padding: 3, gap: 2, border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}>
      {["fr", "ar"].map((l) => (
        <button key={l} className="tbtn" onClick={() => setLang(l)}
          style={{ background: lang === l ? "rgba(255,255,255,0.28)" : "transparent", border: "none", borderRadius: 7, color: lang === l ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 11, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>
          {l === "fr" ? "FR" : "ع"}
        </button>
      ))}
    </div>
  );
}

function Sheet({ title, onClose, children, dir = "ltr" }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(13,59,46,.5)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "93vh", overflowY: "auto", padding: "0 20px 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: dir, boxShadow: "0 -12px 50px rgba(13,59,46,0.22)" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 40, height: 4, background: C.sage, borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 17 }}>{title}</span>
          <button onClick={onClose} className="tbtn" style={{ background: C.mintPale, border: `1px solid ${C.mintLt}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Confirm({ title, message, onConfirm, onCancel, t }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(13,59,46,.55)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.card, borderRadius: 22, padding: "28px 22px", width: "100%", maxWidth: 310, direction: t.dir, fontFamily: t.font, boxShadow: C.shadowLg, animation: "pop .2s ease both", border: `1px solid ${C.mintLt}` }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: C.redLt, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.trash(C.red, 22)}</div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 16, marginBottom: 7 }}>{title}</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{message}</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <GBtn onClick={onCancel} sx={{ flex: 1 }}>{t.cancel}</GBtn>
          <button className="tbtn" onClick={onConfirm} style={{ flex: 1, background: C.red, border: "none", color: "#fff", borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t.delete}</button>
        </div>
      </div>
    </div>
  );
}

function SHdr({ title, badge, action, dir = "ltr" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
      <span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{title}</span>
      {badge && <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, background: C.mintPale, borderRadius: 8, padding: "2px 9px", border: `1px solid ${C.mintLt}` }}>{badge}</span>}
      {action && <button className="tbtn" onClick={action.fn} style={{ fontSize: 11, fontWeight: 600, color: C.forestLt, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{action.label}</button>}
    </div>
  );
}

// ─── TX ROW ───────────────────────────────────────────────────────────────────
function TxRow({ tx, onDelete, onEdit, delay = 0, lang }) {
  const t = T[lang];
  const cfg = CFG(lang)[tx.type];
  const [conf, setConf] = useState(false);
  const [out, setOut] = useState(false);
  const del = () => { setOut(true); setTimeout(() => onDelete(tx.id), 220); };
  return (
    <>
      <div className={`txrow fin-in${out ? " out" : ""}`}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 16, background: C.card, border: `1px solid ${C.mintLt}`, marginBottom: 8, animationDelay: `${delay}ms`, cursor: "default", flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: C.shadow }}>
        <div style={{ width: 42, height: 42, borderRadius: 13, background: cfg.lt, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{cfg.icon()}</div>
        <div style={{ flex: 1, minWidth: 0, textAlign: t.dir === "rtl" ? "right" : "left" }}>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.memberName}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexWrap: "wrap", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <span style={{ background: cfg.lt, color: cfg.color, fontSize: 10, fontWeight: 600, borderRadius: 6, padding: "1px 7px" }}>{cfg.label}</span>
            {tx.note && <span style={{ color: C.sub, fontSize: 10 }}>{tx.note}</span>}
          </div>
          <div style={{ color: C.sub, fontSize: 10, marginTop: 2 }}>{fmtDt(tx.date, lang)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <span style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.sign}{fmt(tx.amount)}</span>
          <div className="txacts" style={{ display: "flex", gap: 4, opacity: 0, transition: "opacity .15s" }}>
            <button className="tbtn" onClick={() => onEdit(tx)} style={{ background: C.mintPale, border: "none", color: C.forestLt, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.edit(C.forestLt)}</button>
            <button className="tbtn" onClick={() => setConf(true)} style={{ background: C.redLt, border: "none", color: C.red, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.trash(C.red)}</button>
          </div>
        </div>
      </div>
      {conf && <Confirm t={t} title={t.deleteTitle} message={t.deleteMsg(cfg.label, fmt(tx.amount))} onConfirm={() => { setConf(false); del(); }} onCancel={() => setConf(false)} />}
    </>
  );
}

// ─── 3 CATEGORY PILLS (Contribution / Dons / Dépenses uniquement) ────────────
function CatPills({ onAdd, lang }) {
  const cats = [
    { type: "contribution", emoji: "💰", color: C.forestLt, lt: "rgba(200,135,42,0.10)", border: "rgba(200,135,42,0.25)" },
    { type: "don",          emoji: "🎁", color: C.gold,      lt: C.goldLt,              border: "rgba(232,168,56,0.28)" },
    { type: "depense",      emoji: "💸", color: C.red,       lt: C.redLt,               border: "rgba(224,82,82,0.2)"  },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
      {cats.map(({ type, emoji, color, lt, border }) => (
        <button key={type} className="tbtn cat-card" onClick={() => onAdd(type)}
          style={{ background: C.card, border: `1.5px solid ${border}`, borderRadius: 18, padding: "16px 8px 13px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: C.shadow, transition: "all .22s" }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: lt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{emoji}</div>
          <span style={{ fontSize: 11, fontWeight: 600, color, textAlign: "center" }}>{T[lang].txTypes[type]}</span>
        </button>
      ))}
    </div>
  );
}

// ─── CHART ────────────────────────────────────────────────────────────────────
function FinChart({ txs, lang, chartReady }) {
  const t = T[lang];
  const ref = useRef();
  const cRef = useRef();
  useEffect(() => {
    if (!chartReady || !ref.current) return;
    if (cRef.current) cRef.current.destroy();
    const ms = t.months;
    const c = ms.map((_, i) => txs.filter((tx) => tx.type === "contribution" && new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0));
    const d = ms.map((_, i) => txs.filter((tx) => tx.type === "don"          && new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0));
    const e = ms.map((_, i) => txs.filter((tx) => tx.type === "depense"      && new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0));
    cRef.current = new window.Chart(ref.current, {
      type: "line",
      data: { labels: ms, datasets: [
        { label: t.stats.contribution, data: c, borderColor: C.forestLt, backgroundColor: "rgba(200,135,42,0.08)", tension: 0.45, fill: true, pointBackgroundColor: "#C8872A", pointRadius: 3, borderWidth: 2 },
        { label: t.stats.don,          data: d, borderColor: C.gold,     backgroundColor: "rgba(232,168,56,0.07)", tension: 0.45, fill: true, pointBackgroundColor: C.gold,     pointRadius: 3, borderWidth: 2 },
        { label: t.stats.depense,      data: e, borderColor: C.red,      backgroundColor: "rgba(224,82,82,0.06)",  tension: 0.45, fill: true, pointBackgroundColor: C.red,      pointRadius: 3, borderWidth: 2 },
      ]},
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom", labels: { boxWidth: 9, usePointStyle: true, pointStyle: "circle", color: C.muted, font: { size: 10, family: "DM Sans" } } },
          tooltip: { backgroundColor: C.card, titleColor: C.text, bodyColor: C.muted, borderColor: C.mintLt, borderWidth: 1, padding: 10, cornerRadius: 10 },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: C.sub, font: { size: 9, family: "DM Sans" } }, border: { display: false } },
          y: { grid: { color: C.mintLt }, ticks: { color: C.sub, font: { size: 9, family: "DM Sans" }, callback: (v) => `${(v / 1000).toFixed(0)}k` }, border: { display: false } },
        },
      },
    });
    return () => { if (cRef.current) cRef.current.destroy(); };
  }, [chartReady, txs, lang]);
  return (
    <Card sx={{ padding: "16px", marginBottom: 20 }}>
      <SHdr title={t.activity} dir={t.dir} />
      <div style={{ height: 190, position: "relative" }}>
        {chartReady ? <canvas ref={ref} /> : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: C.sub, fontSize: 12 }}>
            <div style={{ width: 18, height: 18, border: `2px solid ${C.lime}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: 8 }} />Chargement…
          </div>
        )}
      </div>
    </Card>
  );
}

function Empty({ label }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: C.sub }}>
      <div style={{ width: 58, height: 58, borderRadius: 18, background: C.mintPale, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.rcpt(C.sage)}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ─── LOGO CAISSE ─────────────────────────────────────────────────────────────
function CaisseLogo() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 13, background: "linear-gradient(135deg, #C8872A, #F5C842)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(200,135,42,0.45)" }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="3" fill="#1A1A2E" />
        <circle cx="11" cy="11.5" r="3.5" stroke="#F5C842" strokeWidth="1.4" fill="none" />
        <circle cx="11" cy="11.5" r="1.3" fill="#F5C842" />
        <line x1="11" y1="8.5" x2="11" y2="9.8" stroke="#F5C842" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="5" cy="7.5" r="0.9" fill="#F5C842" opacity="0.7" />
        <circle cx="5" cy="15.5" r="0.9" fill="#F5C842" opacity="0.7" />
        <rect x="5.5" y="17.5" width="2.5" height="1.8" rx="0.9" fill="#1A1A2E" />
        <rect x="14" y="17.5" width="2.5" height="1.8" rx="0.9" fill="#1A1A2E" />
      </svg>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ txs, members, onAdd, onDelete, onEdit, onTabChange, lang, chartReady }) {
  const t = T[lang];
  const solde   = txs.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
  const contrib = txs.filter((tx) => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
  const dons    = txs.filter((tx) => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
  const dep     = txs.filter((tx) => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
  const recent  = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const statsRow = [
    { label: t.stats.contribution, value: contrib, accentColor: C.mint,   dimColor: "rgba(168,230,207,0.5)", sign: "+", onClick: () => onAdd("contribution") },
    { label: t.stats.don,          value: dons,    accentColor: "#F5C842", dimColor: "rgba(245,200,66,0.45)", sign: "+", onClick: () => onAdd("don") },
    { label: t.stats.depense,      value: dep,     accentColor: "#FF9E9E", dimColor: "rgba(255,158,158,0.4)", sign: "−", onClick: () => onAdd("depense") },
  ];

  return (
    <div style={{ direction: t.dir }}>

      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(155deg, #1A1A2E 0%, #16213E 40%, #1E2A4A 100%)`, borderRadius: "0 0 36px 36px", padding: "28px 20px 30px", marginLeft: -16, marginRight: -16, marginTop: -20, position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(200,135,42,0.2)" }}>
        {/* Gold accent blobs */}
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(200,135,42,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, left: -10, width: 120, height: 120, borderRadius: "50%", background: "rgba(245,200,66,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: 20, width: 2, height: 60, background: "linear-gradient(to bottom, transparent, rgba(200,135,42,0.3), transparent)", transform: "translateY(-50%)", pointerEvents: "none" }} />

        {/* Logo + greeting + icons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <CaisseLogo />
            <div>
              <div style={{ color: "rgba(200,135,42,0.85)", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{t.greeting}</div>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: -0.1 }}>{t.userName}</div>
            </div>
          </div>

        </div>

        {/* Balance */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ color: "rgba(200,135,42,0.9)", fontSize: 10, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 5 }}>{t.balanceGlobal}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <div style={{ color: "#fff", fontSize: 36, fontWeight: 700, letterSpacing: -1.8, lineHeight: 1, fontFamily: "'DM Serif Display', serif" }}>
              {new Intl.NumberFormat("fr-FR").format(solde)}
            </div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 400 }}>MRU</span>
          </div>
          <div style={{ width: 40, height: 2, background: C.mint, borderRadius: 2, marginTop: 8, opacity: 0.65 }} />
        </div>

        {/* 3 STATS PILLS — Contributions | Dons | Dépenses */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {statsRow.map((s) => (
            <button key={s.label} className="tbtn eco-btn" onClick={s.onClick}
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "11px 6px 9px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, backdropFilter: "blur(6px)", transition: "all .2s" }}>
              <span style={{ color: s.accentColor, fontSize: 14, fontWeight: 700, letterSpacing: -0.4 }}>
                {s.sign}{fmtSh(s.value)}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center", lineHeight: 1.2 }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div style={{ padding: "22px 0" }}>

        {/* 3 CATEGORIES SEULEMENT */}
        <div className="a2" style={{ marginBottom: 22 }}>
          <SHdr title={t.categories} dir={t.dir} />
          <CatPills onAdd={onAdd} lang={lang} />
        </div>

        {/* APERÇU DU MOIS */}
        <div className="a3" style={{ marginBottom: 22 }}>
          <SHdr title={t.apercu} dir={t.dir} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { emoji: "💰", label: t.stats.contribution, value: fmtSh(contrib) + " MRU", pos: true },
              { emoji: "🎁", label: t.stats.don,          value: fmtSh(dons) + " MRU",   pos: true },
              { emoji: "💸", label: t.stats.depense,      value: fmtSh(dep) + " MRU",    pos: false },
              { emoji: "📋", label: "Transactions",       value: String(txs.length),      pos: true },
            ].map((s, i) => (
              <Card key={i} sx={{ padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                  <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: s.pos ? C.forestLt : C.red, background: s.pos ? "rgba(200,135,42,0.10)" : "rgba(224,82,82,0.09)", borderRadius: 6, padding: "2px 7px" }}>0%</span>
                </div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6 }}>{s.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="a4"><FinChart txs={txs} lang={lang} chartReady={chartReady} /></div>

        {/* Recent transactions */}
        <div className="a5">
          <SHdr title={t.recentTx} badge={`${recent.length}`} action={{ label: t.seeAll, fn: () => onTabChange("ops") }} dir={t.dir} />
          {recent.length === 0 ? <Empty label={t.noTx} /> : recent.map((tx, i) => <TxRow key={tx.id} tx={tx} onDelete={onDelete} onEdit={onEdit} delay={i * 40} lang={lang} />)}
        </div>

        {/* Members preview */}
        <div className="a6">
          <Card sx={{ padding: "16px", marginTop: 6 }}>
            <SHdr title={t.activeMembers} badge={`${members.length}`} dir={t.dir} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
              <div style={{ display: "flex" }}>
                {members.slice(0, 4).map((m, i) => {
                  const [bg, fg] = AVC[i % AVC.length];
                  return <div key={m.id} style={{ width: 38, height: 38, borderRadius: 12, background: bg, border: `2px solid ${C.card}`, marginLeft: i === 0 ? 0 : -9, display: "flex", alignItems: "center", justifyContent: "center", color: fg, fontSize: 12, fontWeight: 700, zIndex: 10 - i }}>{inits(m.name)}</div>;
                })}
              </div>
              <button className="tbtn" onClick={() => onTabChange("members")} style={{ fontSize: 11, fontWeight: 600, color: C.forestLt, background: C.mintPale, border: `1px solid rgba(200,135,42,0.2)`, borderRadius: 9, padding: "7px 13px", cursor: "pointer" }}>{t.seeMembers}</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── OPERATIONS ───────────────────────────────────────────────────────────────
function Operations({ txs, onAdd, onDelete, onEdit, lang }) {
  const t = T[lang];
  const [filter, setFilter] = useState("all");
  const sorted = [...txs].filter((tx) => filter === "all" || tx.type === filter).sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <CatPills onAdd={onAdd} lang={lang} />
      <div style={{ display: "flex", gap: 7, marginBottom: 18, overflowX: "auto", paddingBottom: 4, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
        {["all", "contribution", "don", "depense"].map((f) => {
          const a = filter === f;
          const cfg = f !== "all" ? CFG(lang)[f] : null;
          return (
            <button key={f} className="tbtn" onClick={() => setFilter(f)}
              style={{ background: a ? (cfg ? cfg.color : C.forest) : C.card, border: `1.5px solid ${a ? (cfg ? cfg.color : C.forest) : C.mintLt}`, color: a ? "#fff" : C.muted, borderRadius: 20, padding: "7px 16px", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", boxShadow: C.shadow }}>
              {t.filters[f]}
            </button>
          );
        })}
      </div>
      {sorted.length === 0 ? <Empty label={t.noTx} /> : sorted.map((tx, i) => <TxRow key={tx.id} tx={tx} onDelete={onDelete} onEdit={onEdit} delay={i * 25} lang={lang} />)}
    </div>
  );
}

// ─── MEMBERS ──────────────────────────────────────────────────────────────────
function Members({ members, txs, onAddMember, onDeleteMember, lang }) {
  const t = T[lang];
  const [confDel, setConfDel] = useState(null);
  const getTotal = (id) => txs.filter((tx) => tx.memberId === id && tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
  const mx = members.length > 0 ? Math.max(...members.map((m) => getTotal(m.id)), 1) : 1;
  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <PBtn onClick={onAddMember} sx={{ marginBottom: 20 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{Ic.plus()} {t.addMember}</span>
      </PBtn>
      {members.length === 0 && <Empty label={t.noMembers} />}
      {members.map((m, i) => {
        const total = getTotal(m.id);
        const pct = Math.min(100, (total / mx) * 100);
        const [bg, fg] = AVC[i % AVC.length];
        return (
          <Card key={m.id} className="fin-in" sx={{ padding: "15px", marginBottom: 10, animationDelay: `${i * 55}ms` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: total > 0 ? 13 : 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: fg, fontSize: 15, fontWeight: 700 }}>{inits(m.name)}</div>
                <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{m.phone}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ textAlign: t.dir === "rtl" ? "left" : "right" }}>
                  <div style={{ color: C.forestLt, fontWeight: 700, fontSize: 13 }}>{fmt(total)}</div>
                  <div style={{ color: C.muted, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.4, marginTop: 2 }}>{t.totalPaid}</div>
                </div>
                <button className="tbtn" onClick={() => setConfDel(m)} style={{ background: C.redLt, border: "none", color: C.red, borderRadius: 10, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Ic.trash(C.red, 14)}</button>
              </div>
            </div>
            {total > 0 && (<>
              <div style={{ background: C.mintPale, borderRadius: 5, height: 4, overflow: "hidden" }}>
                <div style={{ background: `linear-gradient(90deg, #C8872A, #F5C842)`, width: `${pct}%`, height: "100%", borderRadius: 5, transition: "width .7s cubic-bezier(.16,1,.3,1)" }} />
              </div>
              <div style={{ color: C.sub, fontSize: 10, marginTop: 5, textAlign: t.dir === "rtl" ? "right" : "left" }}>{Math.round(pct)}% du maximum</div>
            </>)}
          </Card>
        );
      })}
      {confDel && <Confirm t={t} title={t.delMemberTitle} message={t.delMemberMsg(confDel.name)} onConfirm={() => { onDeleteMember(confDel.id); setConfDel(null); }} onCancel={() => setConfDel(null)} />}
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports({ txs, members, lang, xlsxReady, chartReady }) {
  const t = T[lang];
  const years = getYrs(txs);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const all = txs.filter((tx) => { const d = new Date(tx.date); return d.getMonth() + 1 === month && d.getFullYear() === year; });
  const solde = txs.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
  const mC = all.filter((tx) => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
  const mD = all.filter((tx) => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
  const mE = all.filter((tx) => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
  const mB = mC + mD - mE;
  const ms = members.map((m) => ({
    ...m,
    total: txs.filter((tx) => tx.memberId === m.id && tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0),
    month: all.filter((tx) => tx.memberId === m.id && tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0),
  }));
  const mx = ms.length > 0 ? Math.max(...ms.map((m) => m.total), 1) : 1;

  function doExport(mode) {
    const XLSX = window.XLSX;
    if (!XLSX) return alert(t.xlsxWait);
    const list = mode === "month" ? all : txs;
    const rows = [["Date","Type","Membre","Montant","Note"], ...list.map((tx) => [tx.date, CFG(lang)[tx.type].label, tx.memberName, tx.type === "depense" ? -tx.amount : tx.amount, tx.note||""])];
    const mrows = [["Membre","Téléphone","Total"], ...members.map((m) => [m.name, m.phone, txs.filter((tx) => tx.memberId === m.id && tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0)])];
    const s2 = txs.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
    const c2 = txs.filter((tx) => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
    const d2 = txs.filter((tx) => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
    const dep2 = txs.filter((tx) => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
    const srows = [["Indicateur","Valeur"], ...t.exportSummaryRows(s2, c2, d2, dep2, members.length)];
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.aoa_to_sheet(rows), "Transactions");
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.aoa_to_sheet(mrows), "Membres");
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.aoa_to_sheet(srows), "Résumé");
    window.XLSX.writeFile(wb, `caisse_${year}_${String(month).padStart(2,"0")}.xlsx`);
  }

  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <select value={month} onChange={(e) => setMonth(+e.target.value)} style={{ width: "100%", background: C.card, border: `1.5px solid ${C.mintLt}`, borderRadius: 12, padding: "11px 36px 11px 14px", color: C.text, fontSize: 13, outline: "none", fontFamily: "inherit", appearance: "none", cursor: "pointer", boxShadow: C.shadow }}>
            {t.monthsFull.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{Ic.chev(C.muted)}</div>
        </div>
        <div style={{ position: "relative" }}>
          <select value={year} onChange={(e) => setYear(+e.target.value)} style={{ width: 95, background: C.card, border: `1.5px solid ${C.mintLt}`, borderRadius: 12, padding: "11px 30px 11px 13px", color: C.text, fontSize: 13, outline: "none", fontFamily: "inherit", appearance: "none", cursor: "pointer", boxShadow: C.shadow }}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <div style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{Ic.chev(C.muted)}</div>
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #1E2A4A 100%)`, borderRadius: 20, padding: "20px 22px", marginBottom: 16, boxShadow: C.shadowMd, border: "1px solid rgba(200,135,42,0.2)" }}>
        <div style={{ color: "rgba(255,255,255,.5)", fontSize: 10, fontWeight: 500, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 5 }}>{t.balanceGlobal}</div>
        <div style={{ color: "#fff", fontSize: 30, fontWeight: 700, letterSpacing: -1.2, fontFamily: "'DM Serif Display', serif" }}>{new Intl.NumberFormat("fr-FR").format(solde)} MRU</div>
      </div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{t.monthsFull[month - 1]} {year}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: t.totalContrib, value: mC, color: C.forestLt, lt: "rgba(200,135,42,0.12)", icon: Ic.up(C.forestLt) },
          { label: t.totalDons, value: mD, color: C.gold, lt: C.goldLt, icon: Ic.heart(C.gold) },
          { label: t.totalDep, value: mE, color: C.red, lt: C.redLt, icon: Ic.dn(C.red) },
          { label: t.monthlyEvo, value: mB, color: mB >= 0 ? C.forestLt : C.red, lt: mB >= 0 ? "rgba(200,135,42,0.12)" : C.redLt, icon: mB >= 0 ? Ic.up(C.forestLt) : Ic.dn(C.red) },
        ].map((s) => (
          <Card key={s.label} sx={{ padding: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: s.lt, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 15 }}>{fmt(s.value)}</div>
          </Card>
        ))}
      </div>
      <FinChart txs={txs} lang={lang} chartReady={chartReady} />
      <SHdr title={t.activeMembers} dir={t.dir} />
      {ms.map((m, i) => (
        <Card key={m.id} className="fin-in" sx={{ padding: "13px 15px", marginBottom: 8, animationDelay: `${i * 50}ms` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <span style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{m.name}</span>
            <span style={{ color: C.forestLt, fontWeight: 700, fontSize: 13 }}>{fmt(m.total)}</span>
          </div>
          <div style={{ background: C.mintPale, borderRadius: 4, height: 4, overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(90deg, #C8872A, #F5C842)`, width: `${Math.min(100, (m.total / mx) * 100)}%`, height: "100%", borderRadius: 4, transition: "width .7s" }} />
          </div>
          <div style={{ color: C.sub, fontSize: 10, marginTop: 5, textAlign: t.dir === "rtl" ? "right" : "left" }}>{t.monthsFull[month - 1]} : {fmt(m.month)}</div>
        </Card>
      ))}
      <div style={{ marginTop: 26, borderTop: `1px solid ${C.mintLt}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.mintPale, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.dl(C.forestLt)}</div>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{t.exportBtn}</span>
          {!xlsxReady && <span style={{ fontSize: 10, color: C.muted, background: C.mintPale, border: `1px solid ${C.mintLt}`, borderRadius: 7, padding: "2px 8px", animation: "blink 1.4s infinite" }}>{t.xlsxWait}</span>}
        </div>
        {[
          { mode: "month", label: t.exportMonth, sub: `${t.monthsFull[month - 1]} ${year}`, color: C.forestLt, lt: C.mintPale, icon: "📊" },
          { mode: "all",   label: t.exportAll,   sub: `${txs.length} op · ${members.length} membres`, color: C.gold, lt: C.goldLt, icon: "📥" },
        ].map((btn) => (
          <button key={btn.mode} className="tbtn" onClick={() => doExport(btn.mode)} disabled={!xlsxReady}
            style={{ width: "100%", background: xlsxReady ? btn.lt : C.mintPale, border: `1.5px solid ${xlsxReady ? C.mintLt : "transparent"}`, borderRadius: 14, padding: "14px 16px", cursor: xlsxReady ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: t.dir === "rtl" ? "row-reverse" : "row", fontFamily: "inherit", marginBottom: 10, opacity: xlsxReady ? 1 : 0.5, boxShadow: xlsxReady ? C.shadow : "none" }}>
            <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
              <div style={{ color: xlsxReady ? btn.color : C.muted, fontWeight: 600, fontSize: 13 }}>{btn.label}</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{btn.sub}</div>
            </div>
            <span style={{ fontSize: 22 }}>{btn.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({ lang, setLang, t }) {
  const groups = [
    { title: t.settingsTitle, items: [
      { icon: Ic.globe(C.forestLt), label: t.langLbl, value: lang === "fr" ? "Français" : "عربي", action: () => setLang(lang === "fr" ? "ar" : "fr") },
      { icon: Ic.moon(C.muted),    label: t.themeLbl, value: t.darkMode, action: () => {} },
    ]},
    { title: t.secLbl, items: [{ icon: Ic.lock(C.gold), label: t.changePin, value: "****", action: () => {} }] },
    { title: t.aboutLbl, items: [{ icon: Ic.info(C.forestLt), label: t.aboutLbl, value: t.version, action: () => {} }] },
  ];
  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <div className="a1" style={{ background: `linear-gradient(135deg, #1A1A2E, #16213E)`, borderRadius: 22, padding: "22px 20px", marginBottom: 20, boxShadow: C.shadowMd, border: "1px solid rgba(200,135,42,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(168,230,207,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", border: "1.5px solid rgba(168,230,207,0.3)", fontFamily: "'DM Serif Display', serif" }}>
            {t.userName[0].toUpperCase()}
          </div>
          <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>{t.userName}</div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12, marginTop: 2 }}>{t.subtitle}</div>
          </div>
        </div>
      </div>
      {groups.map((g, gi) => (
        <div key={gi} className={`a${gi + 2}`} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7, paddingLeft: 3 }}>{g.title}</div>
          <Card sx={{ overflow: "hidden" }}>
            {g.items.map((item, ii) => (
              <button key={ii} className="tbtn" onClick={item.action}
                style={{ width: "100%", background: "none", border: "none", borderTop: ii > 0 ? `1px solid ${C.mintLt}` : "none", padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, justifyContent: "space-between", fontFamily: "inherit", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: C.mintPale, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: C.sub, fontSize: 11 }}>{item.value}</span>
                  {Ic.fwd(C.sub)}
                </div>
              </button>
            ))}
          </Card>
        </div>
      ))}
      <div className="a5">
        <button className="tbtn" style={{ width: "100%", background: C.redLt, border: `1.5px solid rgba(224,82,82,0.2)`, borderRadius: 14, padding: "14px", color: C.red, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t.logout}</button>
      </div>
    </div>
  );
}

// ─── TX SHEET ─────────────────────────────────────────────────────────────────
function TxSheet({ type, members, onSave, onClose, lang, editTx }) {
  const t = T[lang];
  const cfg = CFG(lang)[type];
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState(
    editTx
      ? { memberId: editTx.memberId ? String(editTx.memberId) : "", memberName: editTx.memberName || "", amount: String(editTx.amount), date: editTx.date, note: editTx.note || "" }
      : { memberId: "", memberName: "", amount: "", date: today, note: "" }
  );
  const save = () => {
    if (!form.amount || +form.amount <= 0) return alert(t.alertAmount);
    if (type === "contribution" && !form.memberId) return alert(t.alertMember);
    const member = members.find((m) => m.id === +form.memberId);
    onSave({ ...(editTx ? { id: editTx.id } : { id: Date.now() }), type, memberId: member?.id || null, memberName: type === "depense" ? "—" : type === "don" ? form.memberName || t.donorDefault : member?.name || "", amount: +form.amount, date: form.date, note: form.note });
    onClose();
  };
  return (
    <Sheet title={editTx ? t.editTx(type) : t.newTx(type)} onClose={onClose} dir={t.dir}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20, padding: "12px 14px", background: cfg.lt, borderRadius: 14, border: `1.5px solid ${C.mintLt}`, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: C.card, boxShadow: C.shadow, display: "flex", alignItems: "center", justifyContent: "center" }}>{cfg.icon()}</div>
        <span style={{ color: cfg.color, fontWeight: 700, fontSize: 14 }}>{cfg.label}</span>
      </div>
      {type === "contribution" && (
        <Sel label={t.flds.member} dir={t.dir} value={form.memberId} onChange={(e) => setForm((f) => ({ ...f, memberId: e.target.value }))}>
          <option value="">{t.flds.memberPh}</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </Sel>
      )}
      {type === "don" && <Inp label={t.flds.donor} dir={t.dir} value={form.memberName} onChange={(e) => setForm((f) => ({ ...f, memberName: e.target.value }))} placeholder={t.flds.donorPh} />}
      <Inp label={t.flds.amount} dir="ltr" type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="0" />
      <Inp label={t.flds.date} dir="ltr" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
      <Inp label={t.flds.desc} dir={t.dir} value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} placeholder={t.flds.notePh} />
      <PBtn onClick={save}>{t.save}</PBtn>
    </Sheet>
  );
}

function MemberSheet({ onSave, onClose, lang }) {
  const t = T[lang];
  const [form, setForm] = useState({ name: "", phone: "" });
  const save = () => { if (!form.name.trim()) return alert(t.alertName); onSave(form); onClose(); };
  return (
    <Sheet title={t.newMember} onClose={onClose} dir={t.dir}>
      <Inp label={t.fullName} dir={t.dir} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder={t.fullNamePh} />
      <Inp label={t.phone} dir="ltr" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder={t.phonePh} />
      <PBtn onClick={save}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{Ic.plus()} {t.addMemberBtn}</span></PBtn>
    </Sheet>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function NavItem({ label, icon, activeIcon, active, onClick }) {
  return (
    <button className="tbtn" onClick={onClick} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "3px 4px", fontFamily: "inherit" }}>
      <div style={{ width: 36, height: 26, borderRadius: 9, background: active ? "rgba(168,230,207,0.18)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s" }}>
        {active ? activeIcon : icon}
      </div>
      <span style={{ fontSize: 9, fontWeight: active ? 600 : 400, color: active ? C.mint : "rgba(255,255,255,0.35)", transition: "color .18s", letterSpacing: 0.2 }}>{label}</span>
      {active && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.gold, marginTop: -1 }} />}
    </button>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const xlsxReady = useSheetJS();
  const chartReady = useChartJS();
  const [lang, setLang] = usePersisted("cc5_lang", "fr");
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null);
  const { members, txs, loading, addTx, updateTx, deleteTx, addMember, deleteMember } = useSupabaseData();

  const t = T[lang];
  const saveTx = (d) => { if (modal?.editTx) updateTx(d); else addTx(d); };
  const editTx = (tx) => setModal({ kind: "tx", txType: tx.type, editTx: tx });

  const nC = "rgba(255,255,255,0.35)";
  const TABS = [
    { id: "home",     label: t.tabs.home,     icon: Ic.home(nC),   aicon: Ic.home(C.mint)  },
    { id: "ops",      label: t.tabs.ops,      icon: Ic.swap(nC),   aicon: Ic.swap(C.mint)  },
    { id: "members",  label: t.tabs.members,  icon: Ic.users(nC),  aicon: Ic.users(C.mint) },
    { id: "reports",  label: t.tabs.reports,  icon: Ic.bar(nC),    aicon: Ic.bar(C.mint)   },
    { id: "settings", label: t.tabs.settings, icon: Ic.gear(nC),   aicon: Ic.gear(C.mint)  },
  ];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
      <div style={{ width: 36, height: 36, border: `3px solid ${C.mint}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <div style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>Chargement…</div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", minHeight: "100dvh", width: "100%", maxWidth: 430, margin: "0 auto", fontFamily: t.font, color: C.text, position: "relative", paddingBottom: 65, boxShadow: "0 0 80px rgba(0,0,0,0.5)", overflowX: "hidden" }}>
      <style>{G}</style>
      <div style={{ padding: "20px 16px" }}>
        {tab === "home"     && <Dashboard txs={txs} members={members} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} onTabChange={setTab} lang={lang} chartReady={chartReady} />}
        {tab === "ops"      && <Operations txs={txs} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} lang={lang} />}
        {tab === "members"  && <Members members={members} txs={txs} onAddMember={() => setModal({ kind: "membre" })} onDeleteMember={deleteMember} lang={lang} />}
        {tab === "reports"  && <Reports txs={txs} members={members} lang={lang} xlsxReady={xlsxReady} chartReady={chartReady} />}
        {tab === "settings" && <Settings lang={lang} setLang={setLang} t={t} />}
      </div>
      <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.forest, borderRadius: "22px 22px 0 0", display: "flex", padding: "5px 8px 10px", zIndex: 200, gap: 2, flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: "0 -6px 28px rgba(13,59,46,0.22)", borderTop: "1px solid rgba(168,230,207,0.1)" }}>
        {TABS.map((tb) => <NavItem key={tb.id} label={tb.label} icon={tb.icon} activeIcon={tb.aicon} active={tab === tb.id} onClick={() => setTab(tb.id)} />)}
      </nav>
      {modal?.kind === "tx"     && <TxSheet type={modal.txType} members={members} onSave={saveTx} onClose={() => setModal(null)} lang={lang} editTx={modal.editTx || null} />}
      {modal?.kind === "membre" && <MemberSheet onSave={addMember} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}
