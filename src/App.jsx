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
    s.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
    s.onload = () => { window.XLSX = window.XLSXStyle || window.XLSX; setReady(true); };
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

// ─── DESIGN TOKENS — Sovereign Ledger ───────────────────────────────────────
const C = {
  // Primary palette
  primary:       "#012d1d",
  primaryMid:    "#1b4332",
  primaryLt:     "#2d6a4f",
  secondary:     "#712edd",
  secondaryLt:   "#9b5de5",
  secondaryCnt:  "rgba(113,46,221,0.12)",
  tertiary:      "#54001d",
  // Surfaces
  bg:            "#f9faf6",
  bgLow:         "#f3f4f0",
  card:          "#ffffff",
  cardLow:       "#f3f4f0",
  // Text
  text:          "#1a1c1a",
  muted:         "#4a5568",
  sub:           "#718096",
  outline:       "rgba(193,200,194,0.15)",
  // Semantic
  red:           "#c0392b",
  redLt:         "rgba(192,57,43,0.10)",
  gold:          "#2d6a4f",
  goldLt:        "rgba(45,106,79,0.10)",
  // Shadows — ambient only, no hard drops
  shadow:    "0 2px 24px rgba(26,28,26,0.04)",
  shadowMd:  "0 6px 32px rgba(26,28,26,0.06)",
  shadowLg:  "0 16px 48px rgba(26,28,26,0.08)",
  // Hero gradient
  heroGrad:  "linear-gradient(135deg, #012d1d 0%, #1b4332 100%)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`;

const G = `
  ${FONTS}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;overscroll-behavior:none;}
  body{background:#f9faf6;-webkit-font-smoothing:antialiased;font-family:'Manrope','Segoe UI',sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;font-size:15px;}
  #root{height:100%;display:flex;justify-content:center;background:#f9faf6;}
  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-thumb{background:#2d6a4f;border-radius:4px;}
  @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes sheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(.92);opacity:0}100%{transform:scale(1);opacity:1}}
  @keyframes fin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
  @keyframes gone{to{opacity:0;max-height:0;margin:0;padding:0;overflow:hidden}}
  .a1{animation:up .45s cubic-bezier(.16,1,.3,1) .04s both}
  .a2{animation:up .45s cubic-bezier(.16,1,.3,1) .10s both}
  .a3{animation:up .45s cubic-bezier(.16,1,.3,1) .16s both}
  .a4{animation:up .45s cubic-bezier(.16,1,.3,1) .22s both}
  .a5{animation:up .45s cubic-bezier(.16,1,.3,1) .28s both}
  .a6{animation:up .45s cubic-bezier(.16,1,.3,1) .34s both}
  .a7{animation:up .45s cubic-bezier(.16,1,.3,1) .40s both}
  .fin-in{animation:fin .3s ease both}
  .out{animation:gone .22s ease forwards;overflow:hidden;}
  .tbtn{transition:all .18s cubic-bezier(.16,1,.3,1);cursor:pointer;}
  .tbtn:active{transform:scale(.97);}
  .txrow:hover .txacts{opacity:1 !important;}
  .cat-card:hover{transform:translateY(-2px);box-shadow:${C.shadowMd} !important;}
  .eco-btn:hover{filter:brightness(1.04);}
  input,select{color-scheme:light;}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
  button{font-family:'Manrope','Segoe UI',sans-serif;}
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
  search: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  trophy: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><path d="M5 3h14"/><path d="M5 3v5a7 7 0 0014 0V3"/><path d="M9 17v-4"/><path d="M15 17v-4"/></svg>),
  xcircle: (c, s = 12) => (<svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><circle cx="12" cy="12" r="10" opacity="0.25"/><line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>),
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    dir: "ltr", font: "'Manrope','Segoe UI',sans-serif",
    greeting: "Resp-Caisse", userName: "Cheikh Brahim", subtitle: "Caisse communautaire",
    balanceGlobal: "Solde Global",
    stats: { contribution: "Contributions", don: "Dons", depense: "Dépenses" },
    activity: "Activité financière", recentTx: "Transactions récentes", seeAll: "Voir tout →",
    activeMembers: "Membres actifs", seeMembers: "Voir tous →",
    tabs: { home: "Accueil", ops: "Transactions", members: "Membres", reports: "Statistiques", settings: "Paramètres" },
    filters: { all: "Toutes", contribution: "Contributions", don: "Dons", depense: "Dépenses" }, filterMembers: { all: "Tous", hasContrib: "Avec contributions", noPay: "Sans paiement" },
    noTx: "Aucune transaction", noMembers: "Aucun membre", addMember: "+ Ajouter un membre",
    totalPaid: "Total versé", totalContrib: "Total contributions", totalDons: "Total dons",
    totalDep: "Total dépenses", monthlyEvo: "Bilan du mois",
    months: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    monthsFull: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    newTx: (t) => ({ contribution: "Nouvelle Contribution", don: "Nouveau Don", depense: "Nouvelle Dépense" }[t]),
    editTx: (t) => ({ contribution: "Modifier Contribution", don: "Modifier Don", depense: "Modifier Dépense" }[t]),
    flds: { amount: "Montant", desc: "Description", member: "Membre", date: "Date", donor: "Nom du donateur", donorPh: "Anonyme", memberPh: "Sélectionner un membre", notePh: "Description…" },
    save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", deleteTitle: "Supprimer ?",
    deleteMsg: (l, a) => `Supprimer cette ${l} de ${a} ?`,
    delMemberTitle: "Retirer ?", delMemberMsg: (n) => `Retirer "${n}" ?`,
    alertAmount: "Montant invalide.", alertMember: "Sélectionnez un membre.", alertName: "Saisissez un nom.",
    txTypes: { contribution: "Contribution", don: "Don", depense: "Dépense" }, donorDefault: "Donateur",
    newMember: "Nouveau membre", fullName: "Nom complet", fullNamePh: "Ex : Fatima Mint Ahmed",
    phone: "Téléphone", phonePh: "Ex : 22234567890", addMemberBtn: "Ajouter",
    exportBtn: "Exporter Excel", exportAll: "Toutes les transactions", exportMonth: "Ce mois", xlsxWait: "Chargement…", resetBtn: "Réinitialiser les données", resetConfirmTitle: "Tout supprimer ?", resetConfirmMsg: "Cette action supprimera TOUS les membres et TOUTES les transactions. Impossible d'annuler.", resetSuccess: "✅ Toutes les données ont été supprimées.",
    importBtn: "Importer Excel", importDesc: "Charger des transactions depuis un fichier .xlsx", importSuccess: (n) => `✅ ${n} transaction(s) importée(s) avec succès.`, importError: "❌ Erreur lors de la lecture du fichier. Vérifiez le format.", importColsError: "❌ Colonnes introuvables. Le fichier doit contenir : Type, Montant, Date, Membre.", importProcessing: "Importation en cours…",
    settingsTitle: "Paramètres", langLbl: "Langue", themeLbl: "Apparence", secLbl: "Sécurité",
    aboutLbl: "À propos", version: "Version 1.0.0", darkMode: "Mode sombre", changeLang: "Changer la langue",
    changePin: "Changer le PIN", aboutApp: "Caisse Coopérative · Gestion communautaire", logout: "Se déconnecter",
    exportSummaryRows: (s,c,d,dep,n) => [["Solde",s],["Contributions",c],["Dons",d],["Dépenses",dep],["Membres",n]],
    categories: "Actions rapides", apercu: "Aperçu du mois",
  },
  ar: {
    dir: "rtl", font: "'Manrope','Segoe UI',sans-serif",
    greeting: "مسؤول الصندوق", userName: "الشيخ إبراهيم", subtitle: "صندوق تعاوني",
    balanceGlobal: "الرصيد الإجمالي",
    stats: { contribution: "المساهمات", don: "التبرعات", depense: "المصروفات" },
    activity: "النشاط المالي", recentTx: "آخر المعاملات", seeAll: "عرض الكل ←",
    activeMembers: "الأعضاء النشطون", seeMembers: "عرض الكل ←",
    tabs: { home: "الرئيسية", ops: "المعاملات", members: "الأعضاء", reports: "إحصائيات", settings: "الإعدادات" },
    filters: { all: "الكل", contribution: "مساهمات", don: "تبرعات", depense: "مصروفات" }, filterMembers: { all: "الكل", hasContrib: "لديهم مساهمات", noPay: "بدون دفع" },
    noTx: "لا توجد معاملات", noMembers: "لا يوجد أعضاء", addMember: "+ إضافة عضو",
    totalPaid: "إجمالي المدفوع", totalContrib: "إجمالي المساهمات", totalDons: "إجمالي التبرعات",
    totalDep: "إجمالي المصروفات", monthlyEvo: "ميزان الشهر",
    months: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    monthsFull: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    newTx: (t) => ({ contribution: "مساهمة جديدة", don: "تبرع جديد", depense: "مصروف جديد" }[t]),
    editTx: (t) => ({ contribution: "تعديل المساهمة", don: "تعديل التبرع", depense: "تعديل المصروف" }[t]),
    flds: { amount: "المبلغ", desc: "الوصف", member: "العضو", date: "التاريخ", donor: "اسم المتبرع", donorPh: "مجهول", memberPh: "اختر عضواً", notePh: "وصف العملية…" },
    save: "حفظ", cancel: "إلغاء", delete: "حذف", deleteTitle: "حذف؟",
    deleteMsg: (l, a) => `هل تريد حذف هذه ${l} بقيمة ${a}؟`,
    delMemberTitle: "إزالة؟", delMemberMsg: (n) => `إزالة "${n}"؟`,
    alertAmount: "مبلغ غير صحيح.", alertMember: "اختر عضواً.", alertName: "أدخل الاسم.",
    txTypes: { contribution: "مساهمة", don: "تبرع", depense: "مصروف" }, donorDefault: "متبرع",
    newMember: "عضو جديد", fullName: "الاسم الكامل", fullNamePh: "مثال: فاطمة بنت أحمد",
    phone: "الهاتف", phonePh: "مثال: 22234567890", addMemberBtn: "إضافة",
    exportBtn: "تصدير Excel", exportAll: "كل العمليات", exportMonth: "هذا الشهر", xlsxWait: "جارٍ التحميل…", resetBtn: "مسح جميع البيانات", resetConfirmTitle: "حذف الكل؟", resetConfirmMsg: "سيتم حذف جميع الأعضاء والمعاملات. لا يمكن التراجع.", resetSuccess: "✅ تم مسح جميع البيانات.",
    importBtn: "استيراد Excel", importDesc: "تحميل المعاملات من ملف .xlsx", importSuccess: (n) => `✅ تم استيراد ${n} عملية بنجاح.`, importError: "❌ خطأ في قراءة الملف. تحقق من الصيغة.", importColsError: "❌ الأعمدة غير موجودة. يجب أن يحتوي الملف على: Type, Montant, Date, Membre.", importProcessing: "جارٍ الاستيراد…",
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
const fmt = (n) => new Intl.NumberFormat("fr-FR").format(n);
const fmtN = (n) => new Intl.NumberFormat("fr-FR").format(n);
const fmtSh = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
const fmtDt = (d, l) => new Date(d).toLocaleDateString(l === "ar" ? "ar-MA" : "fr-FR", { day: "2-digit", month: "short", year: "numeric" });
const inits = (n) => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const getYrs = (txs) => { const s = new Set(txs.map((t) => new Date(t.date).getFullYear())); s.add(new Date().getFullYear()); return [...s].sort((a, b) => b - a); };

const CFG = (lang) => ({
  contribution: { label: T[lang].txTypes.contribution, color: C.primaryLt,  lt: C.goldLt,         icon: () => Ic.up(C.primaryLt),  sign: "" },
  don:          { label: T[lang].txTypes.don,          color: C.secondary,   lt: C.secondaryCnt,   icon: () => Ic.heart(C.secondary), sign: "" },
  depense:      { label: T[lang].txTypes.depense,      color: C.red,         lt: C.redLt,           icon: () => Ic.dn(C.red),        sign: "" },
});

const AVC = [
  ["rgba(1,45,29,0.12)","#012d1d"],["rgba(113,46,221,0.12)","#712edd"],
  ["rgba(45,106,79,0.14)","#2d6a4f"],["rgba(1,45,29,0.18)","#1b4332"],
  ["rgba(113,46,221,0.08)","#9b5de5"],["rgba(84,0,29,0.10)","#54001d"],
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
  const [netError, setNetError] = useState(null); // message d'erreur réseau visible

  // Affiche une erreur pendant 4 secondes puis la fait disparaître
  const showError = (msg) => {
    setNetError(msg);
    setTimeout(() => setNetError(null), 4000);
  };

  const mapMember = (m) => ({ id: m.id, name: m.name, phone: m.phone || "" });
  const mapTx = (t) => ({ id: t.id, type: t.type, memberId: t.member_id, memberName: t.member_name, amount: t.amount, date: t.date, note: t.note || "" });

  const fetchAll = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [{ data: mData, error: mErr }, { data: tData, error: tErr }] = await Promise.all([
        supabase.from("members").select("*").order("created_at", { ascending: true }),
        supabase.from("transactions").select("*").order("created_at", { ascending: false }),
      ]);
      if (mErr) throw new Error(mErr.message);
      if (tErr) throw new Error(tErr.message);
      if (mData) setMembers(mData.map(mapMember));
      if (tData) setTxs(tData.map(mapTx));
    } catch (err) {
      showError("❌ Connexion échouée — vérifiez votre réseau.");
      console.error("fetchAll error:", err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const addTx = async (d) => {
    // Optimistic update : on ajoute localement tout de suite
    const tempId = "tmp_" + Date.now();
    const optimistic = { id: tempId, type: d.type, memberId: d.memberId || null, memberName: d.memberName, amount: d.amount, date: d.date, note: d.note || "" };
    setTxs(p => [optimistic, ...p]);
    try {
      const { data, error } = await supabase.from("transactions")
        .insert([{ type: d.type, member_id: d.memberId || null, member_name: d.memberName, amount: d.amount, date: d.date, note: d.note }])
        .select().single();
      if (error) throw new Error(error.message);
      // Remplace l'entrée temporaire par la vraie
      setTxs(p => p.map(tx => tx.id === tempId ? mapTx(data) : tx));
    } catch (err) {
      // Annule l'optimistic update
      setTxs(p => p.filter(tx => tx.id !== tempId));
      showError("❌ Ajout échoué — réessayez.");
      console.error("addTx error:", err);
    }
  };

  const updateTx = async (d) => {
    // Sauvegarde l'ancienne valeur pour rollback
    const prev = txs.find(tx => tx.id === d.id);
    setTxs(p => p.map(tx => tx.id === d.id ? d : tx));
    try {
      const { error } = await supabase.from("transactions")
        .update({ type: d.type, member_id: d.memberId || null, member_name: d.memberName, amount: d.amount, date: d.date, note: d.note })
        .eq("id", d.id);
      if (error) throw new Error(error.message);
    } catch (err) {
      // Rollback
      if (prev) setTxs(p => p.map(tx => tx.id === d.id ? prev : tx));
      showError("❌ Modification échouée — réessayez.");
      console.error("updateTx error:", err);
    }
  };

  const deleteTx = async (id) => {
    const prev = txs.find(tx => tx.id === id);
    setTxs(p => p.filter(tx => tx.id !== id));
    try {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (error) throw new Error(error.message);
    } catch (err) {
      if (prev) setTxs(p => [prev, ...p]);
      showError("❌ Suppression échouée — réessayez.");
      console.error("deleteTx error:", err);
    }
  };

  const addMember = async (d) => {
    const tempId = "tmp_" + Date.now();
    const optimistic = { id: tempId, name: d.name, phone: d.phone || "" };
    setMembers(p => [...p, optimistic]);
    try {
      const { data, error } = await supabase.from("members")
        .insert([{ name: d.name, phone: d.phone }])
        .select().single();
      if (error) throw new Error(error.message);
      setMembers(p => p.map(m => m.id === tempId ? mapMember(data) : m));
    } catch (err) {
      setMembers(p => p.filter(m => m.id !== tempId));
      showError("❌ Ajout du membre échoué — réessayez.");
      console.error("addMember error:", err);
    }
  };

  const deleteMember = async (id) => {
    const prev = members.find(m => m.id === id);
    setMembers(p => p.filter(m => m.id !== id));
    try {
      const { error } = await supabase.from("members").delete().eq("id", id);
      if (error) throw new Error(error.message);
    } catch (err) {
      if (prev) setMembers(p => [...p, prev]);
      showError("❌ Suppression du membre échouée — réessayez.");
      console.error("deleteMember error:", err);
    }
  };

  const resetAll = async () => {
    try {
      const { error: tErr } = await supabase.from("transactions").delete().gte("id", 0);
      if (tErr) {
        // Fallback pour UUIDs
        const { data: allTxs } = await supabase.from("transactions").select("id");
        if (allTxs?.length) {
          await supabase.from("transactions").delete().in("id", allTxs.map(t => t.id));
        }
      }
      const { error: mErr } = await supabase.from("members").delete().gte("id", 0);
      if (mErr) {
        const { data: allMembers } = await supabase.from("members").select("id");
        if (allMembers?.length) {
          await supabase.from("members").delete().in("id", allMembers.map(m => m.id));
        }
      }
      await fetchAll();
    } catch (err) {
      showError("❌ Réinitialisation échouée — réessayez.");
      console.error("resetAll error:", err);
    }
  };

  return { members, txs, loading, netError, addTx, updateTx, deleteTx, addMember, deleteMember, fetchAll, resetAll };
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function Card({ children, sx = {}, className = "" }) {
  return <div className={className} style={{ background: C.card, borderRadius: 20, boxShadow: "0 2px 16px rgba(26,43,46,0.07)", border: "1px solid rgba(26,43,46,0.06)", ...sx }}>{children}</div>;
}

function Lbl({ c }) {
  return <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Manrope',sans-serif" }}>{c}</div>;
}

function Inp({ label, dir = "ltr", sx = {}, ...p }) {
  const [f, sf] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <Lbl c={label} />}
      <input {...p} onFocus={(e) => { sf(true); p.onFocus?.(e); }} onBlur={(e) => { sf(false); p.onBlur?.(e); }}
        style={{ width: "100%", background: f ? C.card : C.bgLow, border: "none", borderBottom: `1.5px solid ${f ? C.primaryLt : "transparent"}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontSize: 14, outline: "none", direction: dir, fontFamily: "inherit", transition: "all .2s", ...sx }} />
    </div>
  );
}

function Sel({ label, dir = "ltr", children, ...p }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <Lbl c={label} />}
      <div style={{ position: "relative" }}>
        <select {...p} style={{ width: "100%", background: C.bgLow, border: "none", borderRadius: 10, padding: "11px 28px 11px 14px", color: C.text, fontSize: 14, outline: "none", direction: dir, fontFamily: "inherit", appearance: "none", cursor: "pointer" }}>{children}</select>
        <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{Ic.chev(C.muted)}</div>
      </div>
    </div>
  );
}

function PBtn({ children, onClick, sx = {}, disabled }) {
  return (
    <button className="tbtn eco-btn" disabled={disabled} onClick={onClick}
      style={{ background: disabled ? C.muted : C.heroGrad, border: "none", color: "#fff", borderRadius: 24, padding: "16px 20px", fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", width: "100%", marginTop: 8, boxShadow: disabled ? "none" : "0 8px 32px rgba(1,45,29,0.22)", fontFamily: "inherit", letterSpacing: 0.3, ...sx }}>
      {children}
    </button>
  );
}

function GBtn({ children, onClick, sx = {} }) {
  return (
    <button className="tbtn" onClick={onClick}
      style={{ background: C.bgLow, border: "none", color: C.muted, borderRadius: 24, padding: "12px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: C.shadow, ...sx }}>
      {children}
    </button>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ display: "flex", background: C.card, borderRadius: 20, padding: 3, gap: 2, boxShadow: C.shadow }}>
      {["fr", "ar"].map((l) => (
        <button key={l} className="tbtn" onClick={() => setLang(l)}
          style={{ background: lang === l ? C.primary : "transparent", border: "none", borderRadius: 16, color: lang === l ? "#fff" : C.muted, fontWeight: 700, fontSize: 11, padding: "5px 13px", cursor: "pointer", fontFamily: "inherit", transition: "all .18s" }}>
          {l === "fr" ? "FR" : "ع"}
        </button>
      ))}
    </div>
  );
}

function Sheet({ title, onClose, children, dir = "ltr" }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(1,45,29,0.45)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 430, maxHeight: "93vh", overflowY: "auto", padding: "0 24px 48px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: dir, boxShadow: "0 -16px 60px rgba(1,45,29,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 36, height: 4, background: C.primaryLt, borderRadius: 4, opacity: 0.4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
          <span style={{ color: C.text, fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>{title}</span>
          <button onClick={onClose} className="tbtn" style={{ background: C.bgLow, border: "none", color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Confirm({ title, message, onConfirm, onCancel, t }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(1,45,29,0.50)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.card, borderRadius: 28, padding: "28px 24px", width: "100%", maxWidth: 320, direction: t.dir, fontFamily: t.font, boxShadow: C.shadowLg, animation: "pop .2s ease both" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: C.redLt, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.trash(C.red, 22)}</div>
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
      <span style={{ color: C.text, fontWeight: 800, fontSize: 13, letterSpacing: -0.2 }}>{title}</span>
      {badge && <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, background: C.bgLow, borderRadius: 8, padding: "2px 9px" }}>{badge}</span>}
      {action && <button className="tbtn" onClick={action.fn} style={{ fontSize: 11, fontWeight: 700, color: C.primaryLt, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: 0.2 }}>{action.label}</button>}
    </div>
  );
}


// ─── SEARCH BAR ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder, dir = "ltr" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      <div style={{ position: "absolute", left: dir === "rtl" ? "auto" : 13, right: dir === "rtl" ? 13 : "auto", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: focused ? 1 : 0.5, transition: "opacity .2s" }}>
        {Ic.search(focused ? C.primaryLt : C.muted, 15)}
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        dir={dir}
        style={{ width: "100%", background: focused ? C.card : C.bgLow, border: "none", borderRadius: 16, padding: dir === "rtl" ? "12px 44px 12px 16px" : "12px 16px 12px 40px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", transition: "all .2s", boxShadow: focused ? C.shadowMd : C.shadow }}
      />
      {value && (
        <button onClick={() => onChange("")} style={{ position: "absolute", right: dir === "rtl" ? "auto" : 11, left: dir === "rtl" ? 11 : "auto", top: "50%", transform: "translateY(-50%)", background: C.muted, border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
          {Ic.xcircle(C.muted, 18)}
        </button>
      )}
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
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 20, background: C.card, marginBottom: 10, animationDelay: `${delay}ms`, cursor: "default", flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: C.shadow }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: cfg.lt, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{cfg.icon()}</div>
        <div style={{ flex: 1, minWidth: 0, textAlign: t.dir === "rtl" ? "right" : "left" }}>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.memberName}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexWrap: "wrap", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <span style={{ background: cfg.lt, color: cfg.color, fontSize: 10, fontWeight: 600, borderRadius: 6, padding: "1px 7px" }}>{cfg.label}</span>
            {tx.note && <span style={{ color: C.sub, fontSize: 10 }}>{tx.note}</span>}
          </div>
          <div style={{ color: C.sub, fontSize: 10, marginTop: 2 }}>{fmtDt(tx.date, lang)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <span style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.sign}{fmtN(tx.amount)}</span>
          <div className="txacts" style={{ display: "flex", gap: 4, opacity: 0, transition: "opacity .15s" }}>
            <button className="tbtn" onClick={() => onEdit(tx)} style={{ background: C.bgLow, border: "none", color: C.primaryLt, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.edit(C.primaryLt)}</button>
            <button className="tbtn" onClick={() => setConf(true)} style={{ background: C.redLt, border: "none", color: C.red, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.trash(C.red)}</button>
          </div>
        </div>
      </div>
      {conf && <Confirm t={t} title={t.deleteTitle} message={t.deleteMsg(cfg.label, fmtN(tx.amount))} onConfirm={() => { setConf(false); del(); }} onCancel={() => setConf(false)} />}
    </>
  );
}

// ─── 3 CATEGORY PILLS (Contribution / Dons / Dépenses uniquement) ────────────
function CatPills({ onAdd, lang }) {
  const cats = [
    {
      type: "contribution",
      color: C.primaryLt,
      bg: "rgba(1,45,29,0.08)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Pièce de monnaie avec $ */}
          <circle cx="12" cy="12" r="9" fill="rgba(1,45,29,0.12)" stroke={C.primaryLt} strokeWidth="1.7"/>
          <path d="M12 7v10M9.5 9.5a2.5 2.5 0 015 0c0 1.4-1.2 2.2-2.5 2.5-1.3.3-2.5 1.1-2.5 2.5a2.5 2.5 0 005 0" stroke={C.primaryLt} strokeWidth="1.6"/>
        </svg>
      ),
    },
    {
      type: "don",
      color: C.secondary,
      bg: "rgba(113,46,221,0.10)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Mains ouvertes tendant un cœur */}
          <path d="M12 6c0 0-1.5-2-3-2C7.5 4 6 5.3 6 6.8 6 8.6 8 10 12 12c4-2 6-3.4 6-5.2C18 5.3 16.5 4 15 4c-1.5 0-3 2-3 2z" fill="rgba(113,46,221,0.12)" stroke={C.secondary} strokeWidth="1.7"/>
          <path d="M5 15c0-1 .7-1.5 1.5-1.5S8 14 8 15l.5 1h7l.5-1c0-1 .7-1.5 1.5-1.5S19 14 19 15v1.5c0 .8-.7 1.5-1.5 1.5h-11C5.7 18 5 17.3 5 16.5V15z" fill="rgba(113,46,221,0.12)" stroke={C.secondary} strokeWidth="1.7"/>
        </svg>
      ),
    },
    {
      type: "depense",
      color: "#e05252",
      bg: "rgba(224,82,82,0.10)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Reçu / facture */}
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="rgba(224,82,82,0.15)" stroke="#e05252" strokeWidth="1.7"/>
          <polyline points="14 2 14 8 20 8" stroke="#e05252" strokeWidth="1.7"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="#e05252" strokeWidth="1.5"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="#e05252" strokeWidth="1.5"/>
          <line x1="10" y1="9" x2="8" y2="9" stroke="#e05252" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
      {cats.map(cat => (
        <button key={cat.type} className="tbtn cat-card" onClick={() => onAdd(cat.type)}
          style={{ background: C.card, border: "none", borderRadius: 20, padding: "18px 8px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: C.shadow, transition: "all .22s" }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {cat.icon}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, textAlign: "center", letterSpacing: 0.2 }}>{T[lang].txTypes[cat.type]}</span>
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
        { label: t.stats.contribution, data: c, borderColor: C.primaryLt, backgroundColor: "rgba(1,45,29,0.06)", tension: 0.45, fill: true, pointBackgroundColor: C.primaryLt, pointRadius: 3, borderWidth: 2 },
        { label: t.stats.don,          data: d, borderColor: C.secondary, backgroundColor: "rgba(32,178,170,0.07)", tension: 0.45, fill: true, pointBackgroundColor: C.secondary, pointRadius: 3, borderWidth: 2 },
        { label: t.stats.depense,      data: e, borderColor: "#e05252", backgroundColor: "rgba(224,82,82,0.06)", tension: 0.45, fill: true, pointBackgroundColor: "#e05252", pointRadius: 3, borderWidth: 2 },
      ]},
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom", labels: { boxWidth: 9, usePointStyle: true, pointStyle: "circle", color: C.muted, font: { size: 10, family: "Manrope" } } },
          tooltip: { backgroundColor: C.card, titleColor: C.text, bodyColor: C.muted, borderColor: C.outline, borderWidth: 1, padding: 10, cornerRadius: 10 },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: C.sub, font: { size: 9, family: "Manrope" } }, border: { display: false } },
          y: { grid: { color: C.outline }, ticks: { color: C.sub, font: { size: 9, family: "Manrope" }, callback: (v) => `${(v / 1000).toFixed(0)}k` }, border: { display: false } },
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
            <div style={{ width: 18, height: 18, border: `2px solid ${C.secondaryLt}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: 8 }} />Chargement…
          </div>
        )}
      </div>
    </Card>
  );
}

function Empty({ label }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: C.sub }}>
      <div style={{ width: 58, height: 58, borderRadius: 18, background: C.bgLow, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.rcpt(C.primaryLt)}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ─── LOGO CAISSE ─────────────────────────────────────────────────────────────
function CaisseLogo() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 13, background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="3" fill={C.text} />
        <circle cx="11" cy="11.5" r="3.5" stroke="#F5C842" strokeWidth="1.4" fill="none" />
        <circle cx="11" cy="11.5" r="1.3" fill="#F5C842" />
        <line x1="11" y1="8.5" x2="11" y2="9.8" stroke="#F5C842" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="5" cy="7.5" r="0.9" fill="#F5C842" opacity="0.7" />
        <circle cx="5" cy="15.5" r="0.9" fill="#F5C842" opacity="0.7" />
        <rect x="5.5" y="17.5" width="2.5" height="1.8" rx="0.9" fill={C.text} />
        <rect x="14" y="17.5" width="2.5" height="1.8" rx="0.9" fill={C.text} />
      </svg>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ txs, members, onAdd, onDelete, onEdit, onTabChange, lang, setLang, chartReady }) {
  const t = T[lang];
  const [statModal, setStatModal] = useState(null);
  const [editPrevModal, setEditPrevModal] = useState(false);
  const [editPrevVal,   setEditPrevVal]   = useState("");
  const curYear  = new Date().getFullYear();
  const prevYear = curYear - 1;
  const txsPrev      = txs.filter(tx => new Date(tx.date).getFullYear() === prevYear);
  const soldePrevAuto = txsPrev.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
  const [soldePrevManual, setSoldePrevManual] = usePersisted(`cc_soldeprev_${prevYear}`, null);
  const soldePrev = soldePrevManual !== null ? Number(soldePrevManual) : soldePrevAuto;
  // Solde global = transactions + solde année passée manuel (si modifié)
  const soldeAuto = txs.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
  const solde = soldePrevManual !== null
    ? soldeAuto - soldePrevAuto + Number(soldePrevManual)
    : soldeAuto;
  const contrib = txs.filter((tx) => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
  const dons    = txs.filter((tx) => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
  const dep     = txs.filter((tx) => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
  const recent  = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const statsRow = [
    { label: t.stats.contribution, value: contrib, accentColor: C.secondaryLt,   sign: "", type: "contribution" },
    { label: t.stats.don,          value: dons,    accentColor: "#F5C842", sign: "", type: "don" },
    { label: t.stats.depense,      value: dep,     accentColor: "#FF9E9E", sign: "", type: "depense" },
  ];

  return (
    <div style={{ direction: t.dir }}>

      {/* ── HERO HEADER */}
      <div style={{ padding: "16px 4px 0px", marginTop: -20, position: "relative" }}>

        {/* Logo + greeting + lang switch */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <CaisseLogo />
            <div>
              <div style={{ color: C.muted, fontSize: 11, fontWeight: 500, letterSpacing: 0.3 }}>{t.greeting}</div>
              <div style={{ color: C.text, fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{t.userName}</div>
            </div>
          </div>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>

        {/* Balance card */}
        <div style={{ background: "linear-gradient(135deg, #1a2b2e 0%, #1f4a4e 50%, #2d9c8f 100%)", borderRadius: 24, padding: "24px 22px 20px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: 40, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />

          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>{t.balanceGlobal}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <div style={{ color: "#fff", fontSize: 44, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1, fontFamily: "'DM Serif Display', serif" }}>
              {new Intl.NumberFormat("fr-FR").format(solde)}
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500 }}>MRU</span>
          </div>
        </div>

        {/* Modal détail stat */}
        {statModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(19,17,28,0.55)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
            onClick={() => setStatModal(null)}>
            <div style={{ background: "#f0f4f5", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, padding: "0 20px 40px", animation: "sheet .3s cubic-bezier(.16,1,.3,1)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
                <div style={{ width: 40, height: 4, background: "#DEDAE8", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 8 }}>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: 18 }}>{statModal.label}</div>
                  <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{curYear}</div>
                </div>
                <div style={{ background: "rgba(139,92,246,0.1)", borderRadius: 14, padding: "8px 16px" }}>
                  <span style={{ color: "#8B5CF6", fontSize: 20, fontWeight: 700 }}>{statModal.sign}{fmtN(statModal.value)}</span>
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                {Array.from({ length: 12 }, (_, i) => {
                  const monthVal = txs.filter(tx => tx.type === statModal.type && new Date(tx.date).getFullYear() === curYear && new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0);
                  const maxVal = Math.max(...Array.from({ length: 12 }, (_, j) => txs.filter(tx => tx.type === statModal.type && new Date(tx.date).getFullYear() === curYear && new Date(tx.date).getMonth() === j).reduce((a, tx) => a + tx.amount, 0)), 1);
                  const pct = Math.min(100, (monthVal / maxVal) * 100);
                  if (monthVal === 0) return null;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 32, color: C.muted, fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{t.months[i]}</div>
                      <div style={{ flex: 1, background: "#EDEDF5", borderRadius: 6, height: 8, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: statModal.type === "depense" ? "#EF4444" : statModal.type === "don" ? "#DB2777" : "#8B5CF6", borderRadius: 6, transition: "width .6s" }} />
                      </div>
                      <div style={{ width: 70, textAlign: "right", color: C.text, fontSize: 12, fontWeight: 600 }}>{fmtN(monthVal)}</div>
                    </div>
                  );
                })}
                {txs.filter(tx => tx.type === statModal.type && new Date(tx.date).getFullYear() === curYear).length === 0 && (
                  <div style={{ textAlign: "center", color: C.muted, fontSize: 13, padding: "20px 0" }}>Aucune donnée pour {curYear}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4 CARTES STATS (2x2) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
          {/* Contributions */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[0])}
            style={{ background: C.card, border: "none", borderRadius: 20, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: C.shadow, transition: "all .2s" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(1,45,29,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône pièce/contribution */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primaryLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M9.5 10.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-2.5 3-2.5 3s-2.5-1.5-2.5-3z" fill="rgba(45,156,143,0.18)"/><path d="M9.5 13.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.contribution}</div>
              <div style={{ color: C.primaryLt, fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{fmtN(contrib)}</div>
            </div>
          </button>
          {/* Dons */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[1])}
            style={{ background: C.card, border: "none", borderRadius: 20, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: C.shadow, transition: "all .2s" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: C.secondaryCnt, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône mains offrantes / don */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.secondary} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 4.02 3.268 2 6 2c1.657 0 3.15.817 4 2.07C10.85 2.817 12.343 2 14 2c2.732 0 5 2.02 5 5.191 0 4.105-5.37 8.863-11 14.402z" fill="rgba(113,46,221,0.12)"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.don}</div>
              <div style={{ color: C.secondary, fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{fmtN(dons)}</div>
            </div>
          </button>
          {/* Dépenses */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[2])}
            style={{ background: C.card, border: "none", borderRadius: 20, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: C.shadow, transition: "all .2s" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(224,82,82,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône facture / dépense */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e05252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="rgba(224,82,82,0.12)"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.depense}</div>
              <div style={{ color: "#e05252", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{fmtN(dep)}</div>
            </div>
          </button>
          {/* Solde année passée — cliquable */}
          <button className="tbtn" onClick={() => { setEditPrevVal(String(soldePrev)); setEditPrevModal(true); }}
            style={{ background: soldePrev >= 0 ? "linear-gradient(135deg, rgba(1,45,29,0.06), rgba(1,45,29,0.12))" : "rgba(254,226,226,0.6)", border: `1.5px solid ${soldePrev >= 0 ? "rgba(1,45,29,0.2)" : "#FECACA"}`, borderRadius: 18, padding: "16px 14px 14px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, cursor: "pointer", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: soldePrev >= 0 ? "rgba(1,45,29,0.10)" : "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={soldePrev >= 0 ? C.primaryLt : "#EF4444"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, marginTop: 2 }}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>
                {lang === "ar" ? `رصيد ${prevYear}` : `Solde ${prevYear}`}
              </div>
              <div style={{ color: soldePrev >= 0 ? C.primaryLt : "#EF4444", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>
                {fmtN(Math.abs(soldePrev))}
              </div>
              {soldePrevManual !== null && <div style={{ fontSize: 8, color: C.sub, marginTop: 2 }}>✏️ {lang === "ar" ? "معدّل" : "modifié"}</div>}
            </div>
          </button>
        </div>

        {/* ── Modal édition Solde année passée ── */}
        {editPrevModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(1,45,29,0.50)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={e => e.target === e.currentTarget && setEditPrevModal(false)}>
            <div style={{ background: C.card, borderRadius: 22, padding: "26px 22px", width: "100%", maxWidth: 320, boxShadow: C.shadowLg, animation: "pop .2s ease both", border: `1px solid ${C.outline}` }}>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.outline, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.primaryLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {lang === "ar" ? `تعديل رصيد ${prevYear}` : `Modifier le solde ${prevYear}`}
                </div>
                <div style={{ color: C.muted, fontSize: 12 }}>{lang === "ar" ? "سيُضاف إلى الرصيد الإجمالي" : "Sera ajouté au solde global"}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7 }}>{lang === "ar" ? `رصيد ${prevYear}` : `Solde ${prevYear}`}</div>
                <input type="number" value={editPrevVal} onChange={e => setEditPrevVal(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { setSoldePrevManual(Number(editPrevVal)); setEditPrevModal(false); } }}
                  placeholder="0" autoFocus
                  style={{ width: "100%", background: C.outline, border: `1.5px solid ${C.outline}`, borderRadius: 12, padding: "12px 14px", fontSize: 18, color: C.text, outline: "none", fontFamily: "inherit", textAlign: "center", fontWeight: 700, transition: "border-color .2s" }}
                  onFocus={e => e.target.style.borderColor = C.primaryLt}
                  onBlur={e => e.target.style.borderColor = C.outline}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="tbtn" onClick={() => { setSoldePrevManual(null); setEditPrevModal(false); }}
                  style={{ flex: 1, background: C.outline, border: "none", borderRadius: 12, padding: "11px", fontSize: 12, fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
                  {lang === "ar" ? "إعادة ضبط" : "Réinitialiser"}
                </button>
                <button className="tbtn" onClick={() => { setSoldePrevManual(Number(editPrevVal)); setEditPrevModal(false); }}
                  style={{ flex: 2, background: C.primaryLt, border: "none", borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 14px rgba(45,156,143,0.35)` }}>
                  {lang === "ar" ? "حفظ" : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── BODY */}
      <div style={{ padding: "22px 0" }}>

        {/* Actions rapides */}
        <div className="a2" style={{ marginBottom: 22 }}>
          <SHdr title={t.categories} dir={t.dir} />
          <CatPills onAdd={onAdd} lang={lang} />
        </div>

        {/* Transactions récentes */}
        <div className="a5">
          <SHdr title={t.recentTx} badge={`${recent.length}`} action={{ label: t.seeAll, fn: () => onTabChange("ops") }} dir={t.dir} />
          {recent.length === 0 ? <Empty label={t.noTx} /> : recent.map((tx, i) => <TxRow key={tx.id} tx={tx} onDelete={onDelete} onEdit={onEdit} delay={i * 40} lang={lang} />)}
        </div>

        {/* Aperçu membres */}
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
              <button className="tbtn" onClick={() => onTabChange("members")} style={{ fontSize: 11, fontWeight: 600, color: C.primaryLt, background: C.bgLow, border: `1px solid rgba(200,135,42,0.2)`, borderRadius: 9, padding: "7px 13px", cursor: "pointer" }}>{t.seeMembers}</button>
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
  const allYears = getYrs(txs).filter(y => y !== 2025);
  const [selYear, setSelYear] = useState("all");
  const [selType, setSelType] = useState("all");

  const sorted = [...txs]
    .filter(tx => {
      const d = new Date(tx.date);
      if (selYear !== "all" && d.getFullYear() !== Number(selYear)) return false;
      if (selType !== "all" && tx.type         !== selType)          return false;
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const pillStyle = (active, color) => ({
    background: active ? (color || C.primary) : C.card,
    border: `1.5px solid ${active ? (color || C.primary) : C.outline}`,
    color: active ? "#fff" : C.muted,
    borderRadius: 20, padding: "7px 16px", fontSize: 11, fontWeight: 700,
    cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
    boxShadow: C.shadow, transition: "all .18s",
  });

  const activeLabel = [
    selYear !== "all" ? selYear : null,
    selType !== "all" ? CFG(lang)[selType]?.label : null,
  ].filter(Boolean).join(" · ");

  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <CatPills onAdd={onAdd} lang={lang} />

      {/* ─ ÉTAPE 1 : Année ─ */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7, paddingLeft: 2 }}>
          {lang === "ar" ? "① السنة" : "① Année"}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
          <button className="tbtn" onClick={() => { setSelYear("all"); setSelType("all"); }} style={pillStyle(selYear === "all")}>
            {lang === "ar" ? "الكل" : "Toutes"}
          </button>
          {allYears.map(y => (
            <button key={y} className="tbtn" onClick={() => { setSelYear(String(y)); setSelType("all"); }}
              style={pillStyle(selYear === String(y), C.primaryLt)}>
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* ─ ÉTAPE 2 : Type ─ */}
      <div style={{ marginBottom: 14, opacity: selYear === "all" ? 0.4 : 1, pointerEvents: selYear === "all" ? "none" : "auto", transition: "opacity .2s" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7, paddingLeft: 2 }}>
          {lang === "ar" ? "② نوع العملية" : "② Type"}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
          <button className="tbtn" onClick={() => setSelType("all")} style={pillStyle(selType === "all")}>
            {lang === "ar" ? "الكل" : "Tous"}
          </button>
          {["contribution", "don", "depense"].map(tp => {
            const cfg = CFG(lang)[tp];
            return (
              <button key={tp} className="tbtn" onClick={() => setSelType(tp)}
                style={pillStyle(selType === tp, cfg.color)}>
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compteur + badge */}
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, paddingLeft: 2, display: "flex", alignItems: "center", gap: 8 }}>
        <span>{sorted.length} {lang === "ar" ? "معاملة" : `transaction${sorted.length !== 1 ? "s" : ""}`}</span>
        {activeLabel && (
          <span style={{ background: C.bgLow, borderRadius: 6, padding: "2px 9px", border: `1px solid ${C.outline}`, color: C.primaryLt, fontWeight: 600 }}>
            {activeLabel}
          </span>
        )}
      </div>

      {sorted.length === 0 ? <Empty label={t.noTx} /> : sorted.map((tx, i) => <TxRow key={tx.id} tx={tx} onDelete={onDelete} onEdit={onEdit} delay={i * 25} lang={lang} />)}
    </div>
  );
}

// ─── MEMBERS ──────────────────────────────────────────────────────────────────
function MemberDetailModal({ member, txs, lang, onClose }) {
  const t = T[lang];
  const YEAR = 2026;
  const MONTHS_FULL = t.monthsFull;

  // Contributions 2026 de ce membre
  const contribTxs = txs.filter(tx =>
    tx.memberId === member.id &&
    tx.type === "contribution" &&
    new Date(tx.date).getFullYear() === YEAR
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const total2026 = contribTxs.reduce((a, tx) => a + tx.amount, 0);

  // Cumul par mois
  const byMonth = {};
  contribTxs.forEach(tx => {
    const m = new Date(tx.date).getMonth();
    byMonth[m] = (byMonth[m] || 0) + tx.amount;
  });
  const maxMonth = Math.max(...Object.values(byMonth), 1);

  const [bg] = AVC[0];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(1,45,29,0.5)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "88vh", overflowY: "auto", padding: "0 20px 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: t.dir }}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 36, height: 4, background: C.primaryLt, borderRadius: 4, opacity: 0.4 }} />
        </div>

        {/* Header membre */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, background: "linear-gradient(135deg,#7C3AED,#A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700, flexShrink: 0 }}>
              {inits(member.name)}
            </div>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{member.name}</div>
              {member.phone && <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{member.phone}</div>}
            </div>
          </div>
          <button onClick={onClose} className="tbtn" style={{ background: C.bgLow, border: `1px solid ${C.outline}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>✕</button>
        </div>

        {/* Carte total 2026 */}
        <div style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", borderRadius: 18, padding: "18px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: C.shadowMd }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>
              {lang === "ar" ? `إجمالي مساهمات ${YEAR}` : `Total contributions ${YEAR}`}
            </div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, letterSpacing: -1, fontFamily: "'DM Serif Display', serif" }}>
              {new Intl.NumberFormat("fr-FR").format(total2026)}
            </div>
          </div>
          <div style={{ fontSize: 36, opacity: 0.85 }}>🏆</div>
        </div>

        {/* Détail par mois */}
        {contribTxs.length > 0 ? (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>
              {lang === "ar" ? "التفصيل الشهري" : "Détail mensuel"}
            </div>
            {Object.entries(byMonth).map(([mIdx, val]) => {
              const pct = Math.round((val / maxMonth) * 100);
              return (
                <div key={mIdx} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{MONTHS_FULL[Number(mIdx)]}</span>
                    <span style={{ color: C.primaryLt, fontSize: 13, fontWeight: 700 }}>{fmtN(val)}</span>
                  </div>
                  <div style={{ background: C.bgLow, borderRadius: 6, height: 7, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#7C3AED,#C084FC)", borderRadius: 6, transition: "width .6s cubic-bezier(.16,1,.3,1)" }} />
                  </div>
                </div>
              );
            })}
            {/* Liste transactions */}
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10, marginTop: 20 }}>
              {lang === "ar" ? "جميع العمليات" : "Toutes les opérations"}
            </div>
            {contribTxs.map(tx => (
              <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 13px", background: C.card, borderRadius: 12, marginBottom: 8, border: `1px solid ${C.outline}` }}>
                <div>
                  <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{fmtDt(tx.date, lang)}</div>
                  {tx.note && <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{tx.note}</div>}
                </div>
                <div style={{ color: "#8B5CF6", fontWeight: 700, fontSize: 13 }}>{fmtN(tx.amount)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 0", color: C.muted }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>💤</div>
            <div style={{ fontSize: 13 }}>{lang === "ar" ? `لا توجد مساهمات في ${YEAR}` : `Aucune contribution en ${YEAR}`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Members({ members, txs, onAddMember, onDeleteMember, lang }) {
  const t = T[lang];
  const [confDel, setConfDel] = useState(null);
  const [detailMember, setDetailMember] = useState(null);
  const [search, setSearch] = useState("");
  const YEAR = 2026;

  const getTotal2026 = (id) => txs.filter(tx =>
    tx.memberId === id && tx.type === "contribution" &&
    new Date(tx.date).getFullYear() === YEAR
  ).reduce((a, tx) => a + tx.amount, 0);

  const filtered = members.filter(m => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return m.name?.toLowerCase().includes(q) || m.phone?.includes(q);
  });

  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <PBtn onClick={onAddMember} sx={{ marginBottom: 14 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{Ic.plus()} {t.addMember}</span>
      </PBtn>
      <SearchBar value={search} onChange={setSearch} placeholder={lang === "ar" ? "بحث في الأعضاء..." : "Rechercher un membre…"} dir={t.dir} />
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, paddingLeft: 2 }}>
        {filtered.length} {lang === "ar" ? "عضو" : `membre${filtered.length !== 1 ? "s" : ""}`}
        {search && filtered.length !== members.length && <span style={{ marginLeft: 6, color: C.primaryLt, fontWeight: 600 }}>/ {members.length} total</span>}
      </div>
      {filtered.length === 0 && <Empty label={t.noMembers} />}
      {filtered.map((m, i) => {
        const [bg, fg] = AVC[i % AVC.length];
        const total = getTotal2026(m.id);
        return (
          <Card key={m.id} className="fin-in" sx={{ padding: "14px 15px", marginBottom: 10, animationDelay: `${i * 55}ms`, cursor: "pointer" }}
            onClick={() => setDetailMember(m)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: fg, fontSize: 15, fontWeight: 700 }}>{inits(m.name)}</div>
                <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  {m.phone && <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{m.phone}</div>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {total > 0 && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: C.primaryLt, fontWeight: 700, fontSize: 12 }}>{fmtN(total)}</div>
                    <div style={{ color: C.muted, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.4 }}>{YEAR}</div>
                  </div>
                )}
                <div style={{ color: C.muted, opacity: 0.5 }}>{Ic.fwd(C.muted, 14)}</div>
                <button className="tbtn" onClick={e => { e.stopPropagation(); setConfDel(m); }}
                  style={{ background: C.redLt, border: "none", color: C.red, borderRadius: 10, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {Ic.trash(C.red, 14)}
                </button>
              </div>
            </div>
          </Card>
        );
      })}
      {confDel && <Confirm t={t} title={t.delMemberTitle} message={t.delMemberMsg(confDel.name)} onConfirm={() => { onDeleteMember(confDel.id); setConfDel(null); }} onCancel={() => setConfDel(null)} />}
      {detailMember && <MemberDetailModal member={detailMember} txs={txs} lang={lang} onClose={() => setDetailMember(null)} />}
    </div>
  );
}

// ─── DONUT CHART ─────────────────────────────────────────────────────────────
function DonutChart({ contrib, dons, dep, lang, chartReady }) {
  const t = T[lang];
  const ref = useRef();
  const cRef = useRef();
  const total = contrib + dons + dep;
  useEffect(() => {
    if (!chartReady || !ref.current) return;
    if (cRef.current) cRef.current.destroy();
    cRef.current = new window.Chart(ref.current, {
      type: "bar",
      data: {
        labels: [t.stats.contribution, t.stats.don, t.stats.depense],
        datasets: [{
          data: [contrib, dons, dep],
          backgroundColor: ["rgba(1,45,29,0.85)", "rgba(113,46,221,0.85)", "rgba(192,57,43,0.85)"],
          borderRadius: 10,
          borderSkipped: false,
          hoverBackgroundColor: [C.primary, C.secondary, C.red],
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff", titleColor: C.text, bodyColor: C.muted,
            borderColor: "rgba(193,200,194,0.2)", borderWidth: 1, padding: 10, cornerRadius: 10,
            callbacks: { label: ctx => " " + new Intl.NumberFormat("fr-FR").format(ctx.parsed.y) }
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: C.muted, font: { size: 11, family: "Manrope", weight: "700" } },
            border: { display: false },
          },
          y: {
            grid: { color: "rgba(193,200,194,0.2)" },
            ticks: { color: C.sub, font: { size: 9, family: "Manrope" }, callback: v => v >= 1000 ? (v/1000).toFixed(0)+"k" : v },
            border: { display: false },
          },
        },
      },
    });
    return () => { if (cRef.current) cRef.current.destroy(); };
  }, [chartReady, contrib, dons, dep, lang]);

  return (
    <div style={{ background: C.card, borderRadius: 24, boxShadow: C.shadowMd, padding: "16px", marginBottom: 16 }}>
      <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 9 }}>
        <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIAAgADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=" alt="distribution" style={{ width: 22, height: 22, objectFit: "contain", opacity: 0.85 }} />
        <span style={{ color: C.text, fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>{lang === "ar" ? "توزيع المالية" : "Répartition financière"}</span>
      </div>
      <div style={{ height: 180, position: "relative" }}>
        {!chartReady ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: C.sub, fontSize: 12 }}>
            <div style={{ width: 18, height: 18, border: "2px solid #C4B5FD", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: 8 }} />Chargement…
          </div>
        ) : total === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: C.sub, fontSize: 13 }}>Aucune donnée</div>
        ) : (
          <canvas ref={ref} />
        )}
      </div>
    </div>
  );
}

// ─── TOP MEMBERS ─────────────────────────────────────────────────────────────
function TopMembers({ members, txs, lang }) {
  const t = T[lang];
  const ranked = members
    .map(m => ({ ...m, total: txs.filter(tx => tx.memberId === m.id && tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0) }))
    .filter(m => m.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  if (ranked.length === 0) return null;
  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
  const maxVal = ranked[0].total;
  const AVC2 = ["#7C3AED","#A855F7","#C084FC","#DDD6FE","rgba(193,200,194,0.2)"];
  return (
    <div style={{ background: C.card, borderRadius: 24, boxShadow: C.shadowMd, padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        {Ic.trophy("#F5C842", 16)}
        <span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{lang === "ar" ? "أكبر المساهمين" : "Top contributeurs"}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, background: C.bgLow, borderRadius: 8, padding: "2px 9px", border: "none", marginLeft: "auto" }}>Top {ranked.length}</span>
      </div>
      {ranked.map((m, i) => (
        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < ranked.length - 1 ? 10 : 0, direction: t.dir }}>
          <div style={{ fontSize: 18, width: 28, textAlign: "center", flexShrink: 0 }}>{medals[i]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: C.text, fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{m.name}</span>
              <span style={{ color: AVC2[i], fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{new Intl.NumberFormat("fr-FR").format(m.total)}</span>
            </div>
            <div style={{ background: C.bgLow, borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ width: `${(m.total / maxVal) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${AVC2[i]}, ${AVC2[Math.min(i+1, 4)]})`, borderRadius: 4, transition: "width .7s cubic-bezier(.16,1,.3,1)" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PDF REPORT MODAL ─────────────────────────────────────────────────────────
function PdfReportModal({ txs, members, onClose, year }) {
  const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const today = new Date();
  const todayStr = today.toLocaleDateString("ar-MA", { year: "numeric", month: "long", day: "numeric" });

  const txsY = txs.filter(tx => new Date(tx.date).getFullYear() === year);
  const contribs = txsY.filter(tx => tx.type === "contribution");
  const dons     = txsY.filter(tx => tx.type === "don");
  const depenses = txsY.filter(tx => tx.type === "depense");

  const totalC = contribs.reduce((a, tx) => a + tx.amount, 0);
  const totalD = dons.reduce((a, tx)     => a + tx.amount, 0);
  const totalE = depenses.reduce((a, tx) => a + tx.amount, 0);
  const solde  = totalC + totalD - totalE;

  // Bar chart SVG helper
  const BAR_W = 560, BAR_H = 160, BAR_PAD = 50;
  const byMonth = Array.from({ length: 12 }, (_, i) => {
    const c = contribs.filter(tx => new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0);
    const d = dons.filter(tx => new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0);
    const e = depenses.filter(tx => new Date(tx.date).getMonth() === i).reduce((a, tx) => a + tx.amount, 0);
    return { c, d, e, net: c + d - e };
  });
  const maxVal = Math.max(...byMonth.map(m => Math.max(m.c + m.d, m.e)), 1);
  const barW = (BAR_W - BAR_PAD * 2) / 12;
  const toH = v => Math.round((v / maxVal) * (BAR_H - 20));
  const fmtAR = n => new Intl.NumberFormat("ar-MA").format(Math.round(n));

  // Pie chart SVG
  const pieTotal = totalC + totalD + totalE;
  function pieSlice(val, total, startAngle, color) {
    if (total === 0) return null;
    const pct = val / total;
    const angle = pct * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const cx = 80, cy = 80, r = 72;
    const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
    const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
    const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
    const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
    const large = angle > Math.PI ? 1 : 0;
    if (pct < 0.001) return null;
    return `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" opacity="0.9"/>`;
  }
  let sa = 0;
  const pieC = pieSlice(totalC, pieTotal, sa, C.primaryLt); sa += (totalC / (pieTotal || 1)) * 2 * Math.PI;
  const pieD = pieSlice(totalD, pieTotal, sa, C.secondary); sa += (totalD / (pieTotal || 1)) * 2 * Math.PI;
  const pieE = pieSlice(totalE, pieTotal, sa, "#e05252");

  // Top 5 members
  const topMembers = members
    .map(m => ({ ...m, total: contribs.filter(tx => tx.memberId === m.id).reduce((a, tx) => a + tx.amount, 0) }))
    .filter(m => m.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  const maxMem = topMembers[0]?.total || 1;

  // Sort all txs by date desc
  const allTxsSorted = [...txsY].sort((a, b) => new Date(b.date) - new Date(a.date));



  const pdfStyles = `
    .pdf-wrap{font-family:'Times New Roman','Times',serif;direction:rtl;background:#fff;color:#1a2b2e;padding:32px;max-width:860px;margin:0 auto;font-size:14px;}
    .pdf-header{background:linear-gradient(135deg,#1a2b2e,#2d9c8f);color:#fff;border-radius:18px;padding:28px 32px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}
    .pdf-title{font-size:22px;font-weight:800;margin-bottom:4px;}
    .pdf-sub{font-size:14px;opacity:0.7;}
    .pdf-date{font-size:12px;opacity:0.6;text-align:left;}
    .pdf-kpi-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px;margin-bottom:24px;}
    .pdf-kpi{border-radius:14px;padding:16px 14px;border:1.5px solid #e0f5f3;}
    .pdf-kpi-label{font-size:11px;font-weight:600;color:#7a9ea2;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;}
    .pdf-kpi-value{font-size:18px;font-weight:800;}
    .pdf-section{background:#fff;border:1.5px solid #e0f5f3;border-radius:16px;padding:20px;margin-bottom:20px;}
    .pdf-section-title{font-size:14px;font-weight:700;color:#1a2b2e;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid #e0f5f3;display:flex;align-items:center;gap:8px;}
    .pdf-table{width:100%;border-collapse:collapse;}
    .pdf-table th{background:#f0faf9;color:#2d9c8f;font-size:13px;font-weight:700;padding:9px 12px;text-align:right;border-bottom:2px solid #e0f5f3;}
    .pdf-table td{padding:8px 12px;font-size:13px;border-bottom:1px solid #f0faf9;text-align:right;color:#1a2b2e;}
    .pdf-table tr:last-child td{border-bottom:none;}
    .pdf-badge{display:inline-block;border-radius:6px;padding:2px 8px;font-size:12px;font-weight:600;}
    .pdf-footer{text-align:center;color:#7a9ea2;font-size:12px;margin-top:24px;padding-top:16px;border-top:1px solid #e0f5f3;}
  `;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(26,43,46,0.65)", backdropFilter: "blur(16px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "95vh", overflowY: "auto", padding: "0 0 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: "rtl" }}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 36, height: 4, background: C.primaryLt, borderRadius: 4, opacity: 0.4 }} />
        </div>

        {/* Header */}
        <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 17 }}>تقرير الصندوق {year}</div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>تقرير مالي شامل — معاينة</div>
          </div>
          <button onClick={onClose} className="tbtn" style={{ background: C.bgLow, border: `1px solid ${C.outline}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", flexShrink: 0 }}>✕</button>
        </div>

        {/* Preview card */}
        <div style={{ padding: "0 20px" }}>

          {/* KPI summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "المساهمات", val: totalC, color: C.primaryLt, bg: "rgba(45,156,143,0.07)", sign: "" },
              { label: "التبرعات",  val: totalD, color: C.secondary, bg: "rgba(32,178,170,0.07)", sign: "" },
              { label: "المصروفات", val: totalE, color: "#e05252", bg: "rgba(224,82,82,0.07)",  sign: "" },
              { label: "الرصيد الصافي", val: Math.abs(solde), color: solde >= 0 ? C.primaryLt : "#e05252", bg: solde >= 0 ? "rgba(45,156,143,0.07)" : "rgba(224,82,82,0.07)", sign: "" },
            ].map(k => (
              <div key={k.label} style={{ background: k.bg, borderRadius: 14, padding: "14px 12px", border: `1.5px solid ${k.color}22` }}>
                <div style={{ color: C.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{k.label}</div>
                <div style={{ color: k.color, fontSize: 16, fontWeight: 800 }}>{k.sign}{new Intl.NumberFormat("ar-MA").format(k.val)}</div>
              </div>
            ))}
          </div>

          {/* Mini bar chart preview */}
          <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.outline}`, marginBottom: 14 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>📊 الحركة الشهرية</div>
            <svg width="100%" viewBox={`0 0 ${BAR_W} ${BAR_H + 30}`} style={{ display: "block" }}>
              {byMonth.map((m, i) => {
                const x = BAR_PAD + i * barW;
                const hC = toH(m.c);
                const hD = toH(m.d);
                const hE = toH(m.e);
                const bw = barW * 0.28;
                return (
                  <g key={i}>
                    <rect x={x + 2} y={BAR_H - hC - 10} width={bw} height={hC || 1} fill={C.primaryLt} rx="2" opacity="0.85" />
                    <rect x={x + bw + 4} y={BAR_H - hD - 10} width={bw} height={hD || 1} fill={C.secondary} rx="2" opacity="0.75" />
                    <rect x={x + bw * 2 + 6} y={BAR_H - hE - 10} width={bw} height={hE || 1} fill="#e05252" rx="2" opacity="0.75" />
                    <text x={x + barW / 2} y={BAR_H + 20} textAnchor="middle" fontSize="9" fill="#7a9ea2" fontFamily="sans-serif">
                      {MONTHS_AR[i].slice(0, 3)}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 4 }}>
              {[[C.primaryLt,"مساهمات"],[C.secondary,"تبرعات"],["#e05252","مصروفات"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, background: c, borderRadius: 2 }} />
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "sans-serif" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie preview */}
          <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.outline}`, marginBottom: 14, display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="100" height="100" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
              {pieTotal === 0
                ? <circle cx="80" cy="80" r="72" fill="#e0f5f3" />
                : <g dangerouslySetInnerHTML={{ __html: [pieC, pieD, pieE].filter(Boolean).join("") }} />}
              <circle cx="80" cy="80" r="38" fill="#fff" />
              <text x="80" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a2b2e" fontFamily="sans-serif">{Math.round((totalC + totalD) / (pieTotal || 1) * 100)}%</text>
              <text x="80" y="99" textAnchor="middle" fontSize="8" fill="#7a9ea2" fontFamily="sans-serif">إيرادات</text>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: C.text, marginBottom: 10 }}>📈 توزيع المالية</div>
              {[
                { label: "المساهمات", val: totalC, color: C.primaryLt, pct: pieTotal ? Math.round(totalC / pieTotal * 100) : 0 },
                { label: "التبرعات",  val: totalD, color: C.secondary, pct: pieTotal ? Math.round(totalD / pieTotal * 100) : 0 },
                { label: "المصروفات", val: totalE, color: "#e05252", pct: pieTotal ? Math.round(totalE / pieTotal * 100) : 0 },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, background: s.color, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: C.muted }}>{s.label}</span>
                      <span style={{ fontSize: 9, color: s.color, fontWeight: 700 }}>{s.pct}%</span>
                    </div>
                    <div style={{ background: "#f0faf9", borderRadius: 3, height: 4, overflow: "hidden" }}>
                      <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top members preview */}
          {topMembers.length > 0 && (
            <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.outline}`, marginBottom: 14 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🏆 أكبر المساهمين</div>
              {topMembers.map((m, i) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 14, width: 22 }}>{"🥇🥈🥉4️⃣5️⃣"[i * 2]}{"🥇🥈🥉4️⃣5️⃣"[i * 2 + 1]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{m.name}</span>
                      <span style={{ fontSize: 10, color: C.primaryLt, fontWeight: 700 }}>{fmtAR(m.total)}</span>
                    </div>
                    <div style={{ background: C.bgLow, borderRadius: 3, height: 4, overflow: "hidden" }}>
                      <div style={{ width: `${(m.total / (topMembers[0]?.total || 1)) * 100}%`, height: "100%", background: "rgba(255,255,255,0.7)", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div style={{ background: C.bgLow, borderRadius: 12, padding: "11px 14px", marginBottom: 16, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
            📄 سيتم إنشاء تقرير PDF شامل يتضمن جميع العمليات المسجلة ({allTxsSorted.length} عملية)، الرسوم البيانية، قائمة الأعضاء وتقرير مالي مفصل.
          </div>

          {/* Hidden print content */}
          <div id="pdf-report-content" style={{ display: "none" }}>
            <style>{pdfStyles}</style>
            <div className="pdf-wrap">
              {/* Header */}
              <div className="pdf-header">
                <div>
                  <div className="pdf-title">تقرير عن الوضعية المالية للصندوق</div>
                  <div className="pdf-sub">السنة المالية {year} — تقرير شامل لجميع العمليات</div>
                </div>
                <div className="pdf-date">
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#b2ede7" }}>تاريخ الإصدار</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{todayStr}</div>
                </div>
              </div>

              {/* KPIs */}
              <div className="pdf-kpi-row">
                {[
                  { label: "إجمالي المساهمات", val: totalC, color: C.primaryLt, sign: "" },
                  { label: "إجمالي التبرعات",  val: totalD, color: C.secondary, sign: "" },
                  { label: "إجمالي المصروفات", val: totalE, color: "#e05252", sign: "" },
                  { label: "الرصيد الصافي",    val: Math.abs(solde), color: solde >= 0 ? C.primaryLt : "#e05252", sign: "" },
                ].map(k => (
                  <div key={k.label} className="pdf-kpi" style={{ background: k.color + "0d" }}>
                    <div className="pdf-kpi-label">{k.label}</div>
                    <div className="pdf-kpi-value" style={{ color: k.color }}>{k.sign}{new Intl.NumberFormat("ar-MA").format(Math.round(k.val))}</div>
                  </div>
                ))}
              </div>

              {/* Bar chart SVG */}
              <div className="pdf-section">
                <div className="pdf-section-title">📊 الحركة الشهرية للمعاملات — {year}</div>
                <svg width="100%" viewBox={`0 0 ${BAR_W} ${BAR_H + 40}`} style={{ display: "block" }}>
                  {/* Grid lines */}
                  {[0.25, 0.5, 0.75, 1].map(f => {
                    const y = BAR_H - f * (BAR_H - 20) - 10;
                    return (
                      <g key={f}>
                        <line x1={BAR_PAD} y1={y} x2={BAR_W - BAR_PAD} y2={y} stroke="#e0f5f3" strokeWidth="1" />
                        <text x={BAR_W - BAR_PAD + 4} y={y + 4} fontSize="8" fill="#7a9ea2" textAnchor="start" fontFamily="sans-serif">
                          {fmtAR(f * maxVal)}
                        </text>
                      </g>
                    );
                  })}
                  {byMonth.map((m, i) => {
                    const x = BAR_PAD + i * barW;
                    const hC = toH(m.c);
                    const hD = toH(m.d);
                    const hE = toH(m.e);
                    const bw = barW * 0.28;
                    return (
                      <g key={i}>
                        <rect x={x + 2}           y={BAR_H - hC - 10} width={bw} height={hC || 1} fill={C.primaryLt} rx="2" />
                        <rect x={x + bw + 4}       y={BAR_H - hD - 10} width={bw} height={hD || 1} fill={C.secondary} rx="2" />
                        <rect x={x + bw * 2 + 6}   y={BAR_H - hE - 10} width={bw} height={hE || 1} fill="#e05252" rx="2" />
                        <text x={x + barW / 2} y={BAR_H + 22} textAnchor="middle" fontSize="8" fill="#7a9ea2" fontFamily="sans-serif">
                          {MONTHS_AR[i].slice(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
                  {[[C.primaryLt,"المساهمات"],[C.secondary,"التبرعات"],["#e05252","المصروفات"]].map(([c, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 12, height: 12, background: c, borderRadius: 3 }} />
                      <span style={{ fontSize: 11, color: "#4a6568" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie + Top members side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {/* Pie */}
                <div className="pdf-section" style={{ marginBottom: 0 }}>
                  <div className="pdf-section-title">📈 توزيع الإيرادات والمصروفات</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                    <svg width="130" height="130" viewBox="0 0 160 160">
                      {pieTotal === 0
                        ? <circle cx="80" cy="80" r="72" fill="#e0f5f3" />
                        : <g dangerouslySetInnerHTML={{ __html: [pieC, pieD, pieE].filter(Boolean).join("") }} />}
                      <circle cx="80" cy="80" r="38" fill="#fff" />
                      <text x="80" y="85" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a2b2e" fontFamily="sans-serif">
                        {Math.round((totalC + totalD) / (pieTotal || 1) * 100)}%
                      </text>
                      <text x="80" y="99" textAnchor="middle" fontSize="9" fill="#7a9ea2" fontFamily="sans-serif">إيرادات</text>
                    </svg>
                    <div>
                      {[
                        { label: "مساهمات", val: totalC, color: C.primaryLt },
                        { label: "تبرعات",  val: totalD, color: C.secondary },
                        { label: "مصروفات", val: totalE, color: "#e05252" },
                      ].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                          <div style={{ width: 10, height: 10, background: s.color, borderRadius: 2 }} />
                          <span style={{ fontSize: 11, color: "#1a2b2e" }}>{s.label}</span>
                          <span style={{ fontSize: 10, color: s.color, fontWeight: 700, marginRight: "auto" }}>
                            {fmtAR(s.val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top members */}
                <div className="pdf-section" style={{ marginBottom: 0 }}>
                  <div className="pdf-section-title">🏆 أكبر المساهمين</div>
                  {topMembers.length === 0
                    ? <div style={{ color: "#7a9ea2", fontSize: 12, textAlign: "center", padding: "20px 0" }}>لا توجد بيانات</div>
                    : topMembers.map((m, i) => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 15 }}>{"🥇🥈🥉4️⃣5️⃣".split("").filter((_, j) => j % 2 === 0 || "🥇🥈🥉4️⃣5️⃣"[j-1] === "️")[i] || (i+1)+"."}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 11, fontWeight: 600 }}>{m.name}</span>
                            <span style={{ fontSize: 10, color: C.primaryLt, fontWeight: 700 }}>{fmtAR(m.total)}</span>
                          </div>
                          <div style={{ background: "#e0f5f3", borderRadius: 3, height: 5 }}>
                            <div style={{ width: `${(m.total / maxMem) * 100}%`, height: "100%", background: "rgba(255,255,255,0.7)", borderRadius: 3 }} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Monthly summary table */}
              <div className="pdf-section">
                <div className="pdf-section-title">📅 الملخص الشهري</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>الشهر</th>
                      <th>المساهمات</th>
                      <th>التبرعات</th>
                      <th>المصروفات</th>
                      <th>الرصيد الشهري</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byMonth.map((m, i) => {
                      const net = m.c + m.d - m.e;
                      const hasData = m.c > 0 || m.d > 0 || m.e > 0;
                      if (!hasData) return null;
                      return (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{MONTHS_AR[i]}</td>
                          <td style={{ color: C.primaryLt }}>{m.c > 0 ? fmtAR(m.c) : "—"}</td>
                          <td style={{ color: C.secondary }}>{m.d > 0 ? fmtAR(m.d) : "—"}</td>
                          <td style={{ color: "#e05252" }}>{m.e > 0 ? fmtAR(m.e) : "—"}</td>
                          <td style={{ fontWeight: 700, color: net >= 0 ? C.primaryLt : "#e05252" }}>{net >= 0 ? "" : ""}{fmtAR(net)}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "#f0faf9", fontWeight: 700 }}>
                      <td style={{ fontWeight: 800 }}>الإجمالي</td>
                      <td style={{ color: C.primaryLt, fontWeight: 800 }}>{fmtAR(totalC)}</td>
                      <td style={{ color: C.secondary, fontWeight: 800 }}>{fmtAR(totalD)}</td>
                      <td style={{ color: "#e05252", fontWeight: 800 }}>{fmtAR(totalE)}</td>
                      <td style={{ color: solde >= 0 ? C.primaryLt : "#e05252", fontWeight: 800 }}>{solde >= 0 ? "" : ""}{fmtAR(Math.abs(solde))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Members contributions summary table */}
              <div className="pdf-section">
                <div className="pdf-section-title">👥 مساهمات جميع الأعضاء</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>اسم العضو</th>
                      <th>إجمالي المساهمات</th>
                      <th>نسبة المشاركة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const memberContribs = members.map(m => {
                        const mContribs = contribs.filter(tx => tx.memberId === m.id);
                        const total = mContribs.reduce((a, tx) => a + tx.amount, 0);
                        return { ...m, total };
                      }).sort((a, b) => b.total - a.total);
                      const grandTotal = memberContribs.reduce((a, m) => a + m.total, 0);
                      return memberContribs.map((m, i) => {
                        const pct = grandTotal > 0 ? Math.round(m.total / grandTotal * 100) : 0;
                        return (
                          <tr key={m.id}>
                            <td style={{ color: "#7a9ea2", fontWeight: 600 }}>{i + 1}</td>
                            <td style={{ fontWeight: 600 }}>{m.name}</td>
                            <td style={{ color: m.total > 0 ? C.primaryLt : "#7a9ea2", fontWeight: 700 }}>
                              {m.total > 0 ? `${fmtAR(m.total)}` : "—"}
                            </td>
                            <td>
                              {m.total > 0 ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <div style={{ flex: 1, background: "#e0f5f3", borderRadius: 3, height: 6 }}>
                                    <div style={{ width: `${pct}%`, height: "100%", background: "rgba(255,255,255,0.7)", borderRadius: 3 }} />
                                  </div>
                                  <span style={{ fontSize: 10, color: C.primaryLt, fontWeight: 700, minWidth: 28 }}>{pct}%</span>
                                </div>
                              ) : "—"}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                    <tr style={{ background: "#f0faf9", fontWeight: 700 }}>
                      <td colSpan={2} style={{ fontWeight: 800 }}>الإجمالي</td>
                      <td style={{ color: C.primaryLt, fontWeight: 800 }}>{fmtAR(totalC)}</td>
                      <td style={{ color: C.primaryLt, fontWeight: 800 }}>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>



              {/* Footer */}
              <div className="pdf-footer">
                <div>تقرير صادر عن أمين الصندوق — تاريخ الإصدار: {todayStr}</div>
                <div style={{ marginTop: 4 }}>جميع المبالغ بالأوقية الموريتانية (MRU)</div>
              </div>
            </div>
          </div>

          {/* Import/Download Report button */}
          <button className="tbtn eco-btn" onClick={() => {
            const el = document.getElementById("pdf-report-content");
            const html = `<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8"/><title>تقرير الصندوق - ${year}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Times New Roman','Times',serif;background:#fff;color:#1a2b2e;direction:rtl;font-size:14px;}
  @media print{
    body{margin:0;padding:0;}
    .pdf-wrap{padding:16px !important;max-width:100% !important;}
    .pdf-section{page-break-inside:avoid;break-inside:avoid;}
    .pdf-kpi-row{page-break-inside:avoid;break-inside:avoid;}
    table{page-break-inside:auto;}
    tr{page-break-inside:avoid;break-inside:avoid;}
    thead{display:table-header-group;}
  }
</style></head><body>${el.innerHTML}<script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};};<\/script></body></html>`;
            const blob = new Blob([html], { type: "text/html;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const printWin = window.open(url, "_blank");
            if (!printWin) {
              const a = document.createElement("a");
              a.href = url;
              a.download = `تقرير-الصندوق-${year}.html`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
            setTimeout(() => URL.revokeObjectURL(url), 10000);
          }}
            style={{ width: "100%", background: "linear-gradient(135deg,#1a2b2e,#2d9c8f)", border: "none", color: "#fff", borderRadius: 50, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(26,43,46,0.28)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>📥</span>
            <span>تنزيل التقرير</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports({ txs, members, lang, xlsxReady, chartReady, onRefresh, onReset, onAddTx }) {
  const t = T[lang];
  const years = getYrs(txs);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState(null);
  const importRef = useRef(null);

  useEffect(() => { setImportMsg(null); }, []);

  async function doImport(file) {
    if (!file) return;
    const XLSX = window.XLSX;
    if (!XLSX) return setImportMsg({ ok: false, text: t.xlsxWait });
    setImporting(true);
    setImportMsg(null);
    try {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array", cellDates: true });
      const ws = wb.Sheets[wb.SheetNames[0]];

      // Convert to array-of-arrays to handle banner rows from our own export format
      const aoa = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

      // Find the header row: the first row that contains "type" or "montant" (case-insensitive)
      const isHeaderRow = (row) => row.some(cell => {
        const s = String(cell).toLowerCase().trim();
        return s === "type" || s === "typ" || s.includes("montant") || s.includes("amount") || s === "نوع";
      });
      const headerIdx = aoa.findIndex(isHeaderRow);
      if (headerIdx === -1) { setImportMsg({ ok: false, text: t.importColsError }); setImporting(false); return; }

      const headers = aoa[headerIdx].map(h => String(h).trim());
      const dataRows = aoa.slice(headerIdx + 1).filter(r => r.some(c => String(c).trim() !== ""));

      if (!dataRows.length) { setImportMsg({ ok: false, text: t.importError }); setImporting(false); return; }

      // Flexible column index finder (case-insensitive substring match)
      const findCol = (candidates) => {
        const idx = headers.findIndex(h => candidates.some(c => h.toLowerCase().includes(c.toLowerCase())));
        return idx === -1 ? null : idx;
      };

      // "Montant (MRU)", "Membre / Payeur" — our own export headers included
      const iType   = findCol(["type","typ","نوع"]);
      const iAmt    = findCol(["montant","amount","مبلغ","amt"]);
      const iDate   = findCol(["date","تاريخ","dat"]);
      const iMember = findCol(["membre","member","عضو","payeur","nom","name","اسم"]);
      const iNote   = findCol(["note","desc","remarque","ملاحظة","وصف"]);

      if (iType === null || iAmt === null || iDate === null) {
        setImportMsg({ ok: false, text: t.importColsError });
        setImporting(false);
        return;
      }

      // Normalize type values (also handle our own export labels "Contribution", "Don", "Dépense")
      const typeMap = {
        "contribution": "contribution", "contrib": "contribution", "مساهمة": "contribution",
        "don": "don", "donation": "don", "تبرع": "don",
        "depense": "depense", "dépense": "depense", "expense": "depense", "مصروف": "depense",
        // exported labels (capitalised)
        "Contribution": "contribution", "Don": "don", "Dépense": "depense", "Depense": "depense",
      };

      // Parse date helper
      const parseDate = (rawDate) => {
        if (rawDate instanceof Date && !isNaN(rawDate)) {
          return `${rawDate.getFullYear()}-${String(rawDate.getMonth()+1).padStart(2,"0")}-${String(rawDate.getDate()).padStart(2,"0")}`;
        }
        const s = String(rawDate).trim();
        // DD/MM/YYYY
        const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (m1) return `${m1[3]}-${m1[2].padStart(2,"0")}-${m1[1].padStart(2,"0")}`;
        // YYYY-MM-DD already
        if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
        // Excel serial number
        if (/^\d+$/.test(s)) {
          const d = XLSX.SSF.parse_date_code(parseInt(s));
          if (d) return `${d.y}-${String(d.m).padStart(2,"0")}-${String(d.d).padStart(2,"0")}`;
        }
        return null;
      };

      let count = 0;
      for (const row of dataRows) {
        const rawType = String(row[iType] || "").trim();
        const type = typeMap[rawType] || typeMap[rawType.toLowerCase()];
        if (!type) continue;

        const rawAmt = parseFloat(String(row[iAmt]).replace(/[^0-9.,-]/g, "").replace(",", "."));
        if (!rawAmt || isNaN(rawAmt) || rawAmt <= 0) continue;

        const dateStr = parseDate(row[iDate]);
        if (!dateStr) continue;

        const memberName = iMember !== null ? (String(row[iMember] || "").trim() || "—") : "—";
        const note = iNote !== null ? String(row[iNote] || "").trim() : "";

        await onAddTx({ type, memberName, memberId: null, amount: rawAmt, date: dateStr, note });
        count++;
      }
      setImportMsg({ ok: true, text: t.importSuccess(count) });
    } catch (e) {
      console.error("Import error:", e);
      setImportMsg({ ok: false, text: t.importError });
    }
    setImporting(false);
    if (importRef.current) importRef.current.value = "";
  }

  const all = txs.filter((tx) => { const d = new Date(tx.date); return d.getMonth() + 1 === month && d.getFullYear() === year; });

  const YEAR_STATS = year;  // Suit l'année sélectionnée
  const txs2026 = txs.filter(tx => new Date(tx.date).getFullYear() === YEAR_STATS);
  const yC = txs2026.filter(tx => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
  const yD = txs2026.filter(tx => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
  const yE = txs2026.filter(tx => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
  const yB = yC + yD - yE;

  function doExport(mode) {
    const XLSX = window.XLSX;
    if (!XLSX) return alert(t.xlsxWait);

    const EXPORT_YEAR = year;
    const today = new Date().toLocaleDateString("fr-FR");
    const typeLabels = { contribution: "Contribution", don: "Don", depense: "Dépense" };
    const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

    // ── Palette couleurs (ARGB sans #) ──
    const CLR = {
      greenDark:  "FF012D1D", greenMid:   "FF1B4332", greenLight: "FF2D6A4F",
      greenPale:  "FFD8F3DC", greenXl:    "FFEEF7EF",
      purple:     "FF712EDD", purplePale: "FFEDE8F9",
      red:        "FFC0392B", redPale:    "FFFDECEA",
      white:      "FFFFFFFF", grayLight:  "FFF3F4F0",
      grayMid:    "FFCBD5E0", grayDark:   "FF4A5568",
      black:      "FF1A1C1A", blue:       "FF0000FF",
    };

    // ── Helpers styles ──
    const solidFill  = (argb)     => ({ patternFill: { patternType: "solid", fgColor: { rgb: argb } } });
    const font       = (bold, sz, argb, name = "Arial") => ({ name, sz: sz || 11, bold: !!bold, color: { rgb: argb || CLR.black } });
    const align      = (h, v, wrap) => ({ horizontal: h || "left", vertical: v || "center", wrapText: !!wrap });
    const thinBorder = () => {
      const s = { style: "thin", color: { rgb: CLR.grayMid } };
      return { top: s, bottom: s, left: s, right: s };
    };
    const fmtMoney = '#,##0.00\\ "MRU"';
    const fmtDate  = "DD/MM/YYYY";
    const fmtPct   = "0.0%";

    // Apply style helper (sets fill, font, alignment, border, numFmt on a cell object)
    function styled(cell, { fill, fnt, aln, border, numFmt }) {
      if (!cell) return;
      cell.s = {};
      if (fill)   cell.s.fill   = fill;
      if (fnt)    cell.s.font   = fnt;
      if (aln)    cell.s.alignment = aln;
      if (border) cell.s.border = border;
      if (numFmt) { cell.s.numFmt = numFmt; cell.z = numFmt; }
    }

    const wb = XLSX.utils.book_new();

    // ════════════════════════════════════════════════════════════════
    // FEUILLE 1 — TRANSACTIONS
    // ════════════════════════════════════════════════════════════════
    const txsToExport = (mode === "month"
      ? txs.filter(tx => { const d = new Date(tx.date); return d.getFullYear() === year && d.getMonth() + 1 === month; })
      : txs.filter(tx => new Date(tx.date).getFullYear() === EXPORT_YEAR)
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

    const TX_START = 5; // data rows start at row index 4 (0-based) → Excel row 5
    const txAoa = [
      // Row 1 – Banner
      [`🌿  CAISSE COOPÉRATIVE — REGISTRE DES TRANSACTIONS`,"","","","","","","","",""],
      // Row 2 – subtitle
      [`Modèle de saisie — Exporté le ${today}`,"","","","","","","","",""],
      // Row 3 – legend
      ["  ■ Contribution (vert)    ■ Don (violet)    ■ Dépense (rouge)","","","","","","","","",""],
      // Row 4 – headers
      ["#","Date","Type","Membre / Payeur","Montant (MRU)","Description / Note","Mois","Année","Statut","Réf."],
      // Data rows
      ...txsToExport.map((tx, i) => {
        const d = new Date(tx.date);
        const mon = isNaN(d) ? "" : d.getMonth() + 1;
        const yr  = isNaN(d) ? "" : d.getFullYear();
        const ref = `TXN-${String(i + 1).padStart(3, "0")}`;
        return [
          i + 1,
          tx.date,
          typeLabels[tx.type] || tx.type,
          tx.memberName || "—",
          tx.amount,
          tx.note || "",
          mon,
          yr,
          "Confirmé",
          ref,
        ];
      }),
    ];

    // Add totals block (3 rows gap + 4 rows)
    const dataEndRow = TX_START + txsToExport.length; // 1-based last data row
    const totRow = dataEndRow + 2;
    // Pad aoa to reach totRow
    while (txAoa.length < totRow - 1) txAoa.push(["","","","","","","","","",""]);
    const totalC_tx = txsToExport.filter(tx => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
    const totalD_tx = txsToExport.filter(tx => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
    const totalE_tx = txsToExport.filter(tx => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);
    txAoa.push(["","","","Total Contributions :","", totalC_tx,"","","",""]);
    txAoa.push(["","","","Total Dons :","",          totalD_tx,"","","",""]);
    txAoa.push(["","","","Total Dépenses :","",       totalE_tx,"","","",""]);
    txAoa.push(["","","","","","","","","",""]);
    txAoa.push(["","","","SOLDE NET :","",            totalC_tx + totalD_tx - totalE_tx,"","","",""]);

    const wsT = XLSX.utils.aoa_to_sheet(txAoa);
    wsT["!cols"] = [{wch:5},{wch:14},{wch:16},{wch:22},{wch:18},{wch:32},{wch:10},{wch:9},{wch:13},{wch:14}];

    // Merges: banner rows span A:J (cols 0-9)
    wsT["!merges"] = [
      {s:{r:0,c:0},e:{r:0,c:9}},
      {s:{r:1,c:0},e:{r:1,c:9}},
      {s:{r:2,c:0},e:{r:2,c:9}},
      {s:{r:totRow-1,c:3},e:{r:totRow-1,c:4}},
      {s:{r:totRow  ,c:3},e:{r:totRow  ,c:4}},
      {s:{r:totRow+1,c:3},e:{r:totRow+1,c:4}},
      {s:{r:totRow+3,c:3},e:{r:totRow+3,c:4}},
    ];

    // Style banner row 1
    const cellA1 = wsT["A1"] || (wsT["A1"] = {t:"s", v:txAoa[0][0]});
    styled(cellA1, { fill: solidFill(CLR.greenDark), fnt: font(true, 14, CLR.white), aln: align("center","center"), border: thinBorder() });

    // Style banner row 2
    const cellA2 = wsT["A2"] || (wsT["A2"] = {t:"s", v:txAoa[1][0]});
    styled(cellA2, { fill: solidFill(CLR.greenMid), fnt: font(false, 9, "FFAAAAAA"), aln: align("center","center") });

    // Style legend row 3
    const cellA3 = wsT["A3"] || (wsT["A3"] = {t:"s", v:txAoa[2][0]});
    styled(cellA3, { fill: solidFill(CLR.grayLight), fnt: font(false, 9, CLR.grayDark), aln: align("left","center") });

    // Style header row 4
    const txHdrs = ["A","B","C","D","E","F","G","H","I","J"];
    txHdrs.forEach(col => {
      const c = wsT[`${col}4`];
      if (c) styled(c, { fill: solidFill(CLR.greenMid), fnt: font(true, 10, CLR.white), aln: align("center","center"), border: thinBorder() });
    });

    // Style data rows
    txsToExport.forEach((tx, i) => {
      const r = TX_START + i; // 1-based Excel row
      const isEven = i % 2 === 1;
      const rowFill = isEven ? solidFill(CLR.greenXl) : solidFill(CLR.white);
      let typeFill = rowFill;
      let typeFnt  = font(false, 10, CLR.black);
      if (tx.type === "contribution") { typeFill = solidFill(CLR.greenPale);  typeFnt = font(false, 10, CLR.greenLight); }
      if (tx.type === "don")          { typeFill = solidFill(CLR.purplePale); typeFnt = font(false, 10, CLR.purple); }
      if (tx.type === "depense")      { typeFill = solidFill(CLR.redPale);    typeFnt = font(false, 10, CLR.red); }

      txHdrs.forEach((col, ci) => {
        const addr = `${col}${r}`;
        const cell = wsT[addr];
        if (!cell) return;
        const isAmount = col === "E";
        const isDate   = col === "B";
        styled(cell, {
          fill:   typeFill,
          fnt:    ci === 6 || ci === 7 ? font(false, 9, CLR.greenLight) : typeFnt,
          aln:    align(isAmount ? "right" : col === "A" || isDate || col === "G" || col === "H" || col === "I" || col === "J" ? "center" : "left", "center"),
          border: thinBorder(),
          numFmt: isAmount ? fmtMoney : isDate ? fmtDate : undefined,
        });
      });
    });

    // Style totals
    const totColors = [CLR.greenLight, CLR.purple, CLR.red, undefined, CLR.greenDark];
    [0,1,2,4].forEach((offset, idx) => {
      const r = totRow + offset;
      const clr = totColors[idx] || CLR.greenDark;
      ["D","E","F"].forEach(col => {
        const cell = wsT[`${col}${r}`];
        if (!cell) return;
        styled(cell, {
          fill: solidFill(clr),
          fnt:  font(true, offset === 4 ? 13 : 10, CLR.white),
          aln:  align("right","center"),
          border: thinBorder(),
          numFmt: col === "F" ? fmtMoney : undefined,
        });
      });
    });

    XLSX.utils.book_append_sheet(wb, wsT, "Transactions");

    // ════════════════════════════════════════════════════════════════
    // FEUILLE 2 — RÉCAPITULATIF MENSUEL (enrichi)
    // ════════════════════════════════════════════════════════════════
    const txsYear = txs.filter(tx => new Date(tx.date).getFullYear() === EXPORT_YEAR);
    const allC = txsYear.filter(tx => tx.type === "contribution").reduce((a, tx) => a + tx.amount, 0);
    const allD = txsYear.filter(tx => tx.type === "don").reduce((a, tx) => a + tx.amount, 0);
    const allE = txsYear.filter(tx => tx.type === "depense").reduce((a, tx) => a + tx.amount, 0);

    // ── Section 1 : tableau mensuel (lignes 1-19) ──
    const sumAoa = [
      [`🌿  RÉCAPITULATIF MENSUEL — CAISSE COOPÉRATIVE ${EXPORT_YEAR}`,"","","","",""],
      ["Exporté le " + today + "  ·  " + members.length + " membres  ·  " + txsYear.length + " opérations","","","","",""],
      ["","","","","",""],
      ["Mois","Contributions (MRU)","Dons (MRU)","Dépenses (MRU)","Solde du mois (MRU)","Δ vs mois préc."],
    ];
    let cumul = 0;
    let prevMonthSolde = null;
    const monthlyData = MONTHS_FR.map((mname, mi) => {
      const mIdx = mi + 1;
      const mC = txsYear.filter(tx => tx.type === "contribution" && new Date(tx.date).getMonth()+1 === mIdx).reduce((a,tx)=>a+tx.amount,0);
      const mD = txsYear.filter(tx => tx.type === "don"          && new Date(tx.date).getMonth()+1 === mIdx).reduce((a,tx)=>a+tx.amount,0);
      const mE = txsYear.filter(tx => tx.type === "depense"      && new Date(tx.date).getMonth()+1 === mIdx).reduce((a,tx)=>a+tx.amount,0);
      const mS = mC + mD - mE;
      cumul += mS;
      const evo = prevMonthSolde !== null && prevMonthSolde !== 0 ? (mS - prevMonthSolde) / Math.abs(prevMonthSolde) : "";
      prevMonthSolde = mS;
      return { mname, mC, mD, mE, mS, evo };
    });
    monthlyData.forEach(({ mname, mC, mD, mE, mS, evo }) => sumAoa.push([mname, mC, mD, mE, mS, evo]));
    sumAoa.push(["TOTAL ANNUEL", allC, allD, allE, allC + allD - allE, ""]);
    // blank + solde cumulé
    sumAoa.push(["","","","","",""]);
    sumAoa.push(["Solde cumulé fin d'année :", allC + allD - allE,"","","",""]);

    // ── Section 2 : contributions par membre (lignes 22+) ──
    const MBR_START_ROW = sumAoa.length + 2; // 1-based Excel row where member table starts
    sumAoa.push(["","","","","",""]);
    sumAoa.push([`👥  CONTRIBUTIONS PAR MEMBRE — ${EXPORT_YEAR}`,"","","","",""]);
    const mbrHeaderCols = ["Membre", ...MONTHS_FR, "TOTAL (MRU)", "% du total"];
    sumAoa.push(mbrHeaderCols);

    const mbrRows = members.map(m => {
      const monthlyContribs = MONTHS_FR.map((_, mi) => {
        const mIdx = mi + 1;
        return txsYear.filter(tx =>
          tx.type === "contribution" &&
          new Date(tx.date).getMonth()+1 === mIdx &&
          (tx.memberName === m.name || tx.memberId === m.id)
        ).reduce((a,tx)=>a+tx.amount, 0);
      });
      const total = monthlyContribs.reduce((a,v)=>a+v, 0);
      const pct = allC > 0 ? total / allC : 0;
      return [m.name, ...monthlyContribs, total, pct];
    });
    // Also add anonymous donors row if any
    const anonContribs = MONTHS_FR.map((_, mi) => {
      const mIdx = mi + 1;
      return txsYear.filter(tx =>
        tx.type === "contribution" &&
        new Date(tx.date).getMonth()+1 === mIdx &&
        !members.some(m => m.name === tx.memberName || m.id === tx.memberId)
      ).reduce((a,tx)=>a+tx.amount, 0);
    });
    const anonTotal = anonContribs.reduce((a,v)=>a+v, 0);
    if (anonTotal > 0) mbrRows.push(["(Autres / non identifiés)", ...anonContribs, anonTotal, allC > 0 ? anonTotal/allC : 0]);

    // Total contributions row
    const totalContribByMonth = MONTHS_FR.map((_, mi) => {
      const mIdx = mi + 1;
      return txsYear.filter(tx => tx.type === "contribution" && new Date(tx.date).getMonth()+1 === mIdx).reduce((a,tx)=>a+tx.amount,0);
    });
    mbrRows.push(["TOTAL", ...totalContribByMonth, allC, allC > 0 ? 1 : 0]);

    mbrRows.forEach(row => sumAoa.push(row));

    // ── Section 3 : récap dépenses par mois (lignes après membres) ──
    const DEP_START_ROW = sumAoa.length + 2;
    sumAoa.push(["","","","","",""]);
    sumAoa.push([`📋  DÉPENSES PAR MOIS — ${EXPORT_YEAR}`,"","","","",""]);
    sumAoa.push(["Mois","Nb opérations","Total Dépenses (MRU)","% des recettes",""," "]);
    MONTHS_FR.forEach((mname, mi) => {
      const mIdx = mi + 1;
      const depTxs = txsYear.filter(tx => tx.type === "depense" && new Date(tx.date).getMonth()+1 === mIdx);
      const mE = depTxs.reduce((a,tx)=>a+tx.amount,0);
      const recettes = monthlyData[mi].mC + monthlyData[mi].mD;
      const pct = recettes > 0 ? mE / recettes : 0;
      sumAoa.push([mname, depTxs.length, mE, pct, "", ""]);
    });
    sumAoa.push(["TOTAL", txsYear.filter(tx=>tx.type==="depense").length, allE, (allC+allD)>0?allE/(allC+allD):0,"",""]);

    // ── Build sheet ──
    const wsS = XLSX.utils.aoa_to_sheet(sumAoa);
    // Cols: A=Mois/Membre(24), B-M=months or values(12 each), N=Total(18), O=%(10)
    const mbrTableCols = 14; // Membre + 12 mois + Total + %
    wsS["!cols"] = [
      {wch:26},{wch:12},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},
      {wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:16},{wch:10},
    ];
    // Merges
    const nCols = 5; // A-F for monthly summary (0-5)
    const mbrNcols = mbrHeaderCols.length - 1; // B to last (0-indexed end)
    wsS["!merges"] = [
      {s:{r:0,c:0},e:{r:0,c:nCols}},   // banner
      {s:{r:1,c:0},e:{r:1,c:nCols}},   // subtitle
    ];

    // Style banner row 1
    const sA1 = wsS["A1"]; if (sA1) styled(sA1,{fill:solidFill(CLR.greenDark),fnt:font(true,13,CLR.white),aln:align("center","center")});
    const sA2 = wsS["A2"]; if (sA2) styled(sA2,{fill:solidFill(CLR.greenMid),fnt:font(false,9,"FFAAAAAA"),aln:align("center","center")});

    // Monthly table header (row 4)
    ["A","B","C","D","E","F"].forEach(col => {
      const c = wsS[`${col}4`];
      if (c) styled(c,{fill:solidFill(CLR.greenMid),fnt:font(true,10,CLR.white),aln:align("center","center"),border:thinBorder()});
    });
    // Monthly data rows 5-16
    monthlyData.forEach(({ mC, mD, mE, mS, evo }, mi) => {
      const r = 5 + mi;
      const isEven = mi % 2 === 1;
      ["A","B","C","D","E","F"].forEach((col,ci) => {
        const cell = wsS[`${col}${r}`]; if (!cell) return;
        let rf = isEven ? solidFill(CLR.greenXl) : solidFill(CLR.white);
        let cf = CLR.black; let nf;
        if      (ci===0){cf=CLR.greenMid;}
        else if (ci===1){rf=solidFill(CLR.greenPale);nf=fmtMoney;}
        else if (ci===2){rf=solidFill(CLR.purplePale);nf=fmtMoney;}
        else if (ci===3){rf=solidFill(CLR.redPale);nf=fmtMoney;}
        else if (ci===4){cf=CLR.greenDark;nf=fmtMoney;}
        else if (ci===5 && cell.t==="n"){nf=fmtPct;}
        styled(cell,{fill:rf,fnt:font(ci===0,10,cf),aln:align(ci>=1&&ci<=4?"right":"center","center"),border:thinBorder(),numFmt:nf});
      });
    });
    // Total annual row (row 17)
    ["A","B","C","D","E","F"].forEach((col,ci)=>{
      const cell=wsS[`${col}17`]; if(!cell)return;
      styled(cell,{fill:solidFill(CLR.greenDark),fnt:font(true,10,CLR.white),aln:align(ci>=1?"right":"center","center"),border:thinBorder(),numFmt:ci>=1&&ci<=4?fmtMoney:undefined});
    });
    // Solde cumulé row (row 19)
    const sCum=wsS["A19"]; if(sCum)styled(sCum,{fnt:font(true,10,CLR.greenDark),aln:align("right","center")});
    const sCumV=wsS["B19"]; if(sCumV)styled(sCumV,{fill:solidFill(CLR.greenPale),fnt:font(true,11,CLR.greenDark),aln:align("right","center"),border:thinBorder(),numFmt:fmtMoney});

    // Member section banner (MBR_START_ROW + 1 for the section title)
    const mbrBannerRow = MBR_START_ROW + 1;
    const mbrBannerCell = wsS[`A${mbrBannerRow}`];
    if (mbrBannerCell) styled(mbrBannerCell,{fill:solidFill(CLR.greenMid),fnt:font(true,11,CLR.white),aln:align("left","center")});
    // Member header row
    const mbrHdrRow = mbrBannerRow + 1;
    mbrHeaderCols.forEach((_, ci) => {
      const col = String.fromCharCode(65+ci);
      const cell = wsS[`${col}${mbrHdrRow}`];
      if (cell) styled(cell,{fill:solidFill(CLR.primaryMid||CLR.greenMid),fnt:font(true,9,CLR.white),aln:align("center","center"),border:thinBorder()});
    });
    // Member data rows
    mbrRows.forEach((row, ri) => {
      const r = mbrHdrRow + 1 + ri;
      const isTotal = ri === mbrRows.length - 1;
      const isEven = ri % 2 === 1;
      row.forEach((_, ci) => {
        const col = String.fromCharCode(65+ci);
        const cell = wsS[`${col}${r}`]; if (!cell) return;
        const isAmt = ci >= 1 && ci < row.length - 1;
        const isPct = ci === row.length - 1;
        styled(cell,{
          fill: isTotal ? solidFill(CLR.greenDark) : isEven ? solidFill(CLR.greenXl) : solidFill(CLR.white),
          fnt: font(isTotal||ci===0, 9, isTotal?CLR.white:(ci===0?CLR.greenMid:(isAmt&&cell.v>0?CLR.greenLight:CLR.black))),
          aln: align(ci===0?"left":"right","center"),
          border: thinBorder(),
          numFmt: isAmt ? fmtMoney : isPct ? fmtPct : undefined,
        });
      });
    });

    // Depense section banner
    const depBannerRow = DEP_START_ROW + 1;
    const depBannerCell = wsS[`A${depBannerRow}`];
    if (depBannerCell) styled(depBannerCell,{fill:solidFill(CLR.red),fnt:font(true,11,CLR.white),aln:align("left","center")});
    const depHdrRow = depBannerRow + 1;
    ["A","B","C","D"].forEach(col => {
      const cell=wsS[`${col}${depHdrRow}`]; if(!cell)return;
      styled(cell,{fill:solidFill(CLR.greenMid),fnt:font(true,10,CLR.white),aln:align("center","center"),border:thinBorder()});
    });
    MONTHS_FR.forEach((_,mi)=>{
      const r = depHdrRow+1+mi;
      ["A","B","C","D"].forEach((col,ci)=>{
        const cell=wsS[`${col}${r}`]; if(!cell)return;
        const isEven=mi%2===1;
        styled(cell,{
          fill:ci===2?solidFill(CLR.redPale):(isEven?solidFill(CLR.greenXl):solidFill(CLR.white)),
          fnt:font(false,10,ci===0?CLR.greenMid:(ci===2?CLR.red:CLR.black)),
          aln:align(ci===0?"center":"right","center"),
          border:thinBorder(),
          numFmt:ci===2?fmtMoney:ci===3?fmtPct:undefined,
        });
      });
    });
    const depTotRow=depHdrRow+13;
    ["A","B","C","D"].forEach((col,ci)=>{
      const cell=wsS[`${col}${depTotRow}`]; if(!cell)return;
      styled(cell,{fill:solidFill(CLR.red),fnt:font(true,10,CLR.white),aln:align(ci===0?"center":"right","center"),border:thinBorder(),numFmt:ci===2?fmtMoney:ci===3?fmtPct:undefined});
    });

    XLSX.utils.book_append_sheet(wb, wsS, "Récap. Mensuel");

    // ════════════════════════════════════════════════════════════════
    // FEUILLE 3 — MEMBRES
    // ════════════════════════════════════════════════════════════════
    const mbAoa = [
      ["👥  REGISTRE DES MEMBRES — CAISSE COOPÉRATIVE","","","","","",""],
      ["","","","","","",""],
      ["#","Nom complet","Téléphone","Email","Date d'adhésion","Total Contributions (MRU)","Statut"],
      ...members.map((m, i) => {
        const mTotal = txs.filter(tx => tx.type === "contribution" && (tx.memberName === m.name || tx.memberId === m.id)).reduce((a, tx) => a + tx.amount, 0);
        return [i + 1, m.name, m.phone || "", "", "", mTotal, "Actif"];
      }),
    ];
    const wsM = XLSX.utils.aoa_to_sheet(mbAoa);
    wsM["!cols"] = [{wch:5},{wch:28},{wch:16},{wch:26},{wch:16},{wch:26},{wch:12}];
    wsM["!merges"] = [{s:{r:0,c:0},e:{r:0,c:6}}];

    const mA1 = wsM["A1"];
    if (mA1) styled(mA1, { fill: solidFill(CLR.greenDark), fnt: font(true, 13, CLR.white), aln: align("center","center") });
    ["A","B","C","D","E","F","G"].forEach(col => {
      const c = wsM[`${col}3`];
      if (c) styled(c, { fill: solidFill(CLR.greenMid), fnt: font(true, 10, CLR.white), aln: align("center","center"), border: thinBorder() });
    });
    members.forEach((_, i) => {
      const r = 4 + i;
      const isEven = i % 2 === 1;
      ["A","B","C","D","E","F","G"].forEach((col, ci) => {
        const cell = wsM[`${col}${r}`];
        if (!cell) return;
        styled(cell, {
          fill: isEven ? solidFill(CLR.greenXl) : solidFill(CLR.white),
          fnt: font(false, 10, ci === 5 ? CLR.greenMid : CLR.black),
          aln: align(ci === 5 ? "right" : ci === 0 || ci >= 4 ? "center" : "left","center"),
          border: thinBorder(),
          numFmt: ci === 5 ? fmtMoney : undefined,
        });
      });
    });

    XLSX.utils.book_append_sheet(wb, wsM, "Membres");

    // ════════════════════════════════════════════════════════════════
    // FEUILLE 4 — MODE D'EMPLOI
    // ════════════════════════════════════════════════════════════════
    const helpData = [
      ["📖  MODE D'EMPLOI — CAISSE COOPÉRATIVE","","",""],
      ["","","",""],
      ["ONGLET : Transactions","","",""],
      ["Date","Format JJ/MM/AAAA. Obligatoire.","",""],
      ["Type","Contribution, Don ou Dépense.","",""],
      ["Membre / Payeur","Nom du membre ou du donateur.","",""],
      ["Montant (MRU)","Montant en Ouguiya. Toujours positif.","",""],
      ["Description","Objet de la transaction (optionnel).","",""],
      ["Mois / Année","Extraits automatiquement de la date.","",""],
      ["Statut","En attente → Confirmé après validation.","",""],
      ["","","",""],
      ["ONGLET : Récap. Mensuel","","",""],
      ["Totaux par mois","Contributions + Dons − Dépenses = Solde.","",""],
      ["Évolution","Variation % du solde vs mois précédent.","",""],
      ["","","",""],
      ["CODES COULEUR","","",""],
      ["Vert","Transaction de type Contribution.","",""],
      ["Violet","Transaction de type Don.","",""],
      ["Rouge","Transaction de type Dépense.","",""],
      ["Texte bleu","Valeur à saisir manuellement (input).","",""],
      ["Texte vert","Valeur calculée automatiquement.","",""],
    ];
    const wsH = XLSX.utils.aoa_to_sheet(helpData);
    wsH["!cols"] = [{wch:5},{wch:28},{wch:48},{wch:18}];
    wsH["!merges"] = [{s:{r:0,c:0},e:{r:0,c:3}}];
    const hA1 = wsH["A1"];
    if (hA1) styled(hA1, { fill: solidFill(CLR.greenDark), fnt: font(true, 13, CLR.white), aln: align("center","center") });
    const sectionRows = [2,11,15];
    const sectionColors = [CLR.greenMid, CLR.greenLight, CLR.purple];
    sectionRows.forEach((ri, si) => {
      const cell = wsH[`A${ri + 1}`];
      if (cell) styled(cell, { fill: solidFill(sectionColors[si]), fnt: font(true, 11, CLR.white), aln: align("left","center") });
    });

    XLSX.utils.book_append_sheet(wb, wsH, "Mode d'emploi");

    // ── Write file ──
    const suffix = mode === "month" ? `_${year}-${String(month).padStart(2,"0")}` : `_${EXPORT_YEAR}`;
    // Write with cellStyles support
    const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "binary", cellStyles: true });
    const buf = new ArrayBuffer(wbOut.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbOut.length; i++) view[i] = wbOut.charCodeAt(i) & 0xFF;
    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `CaisseCooperative${suffix}.xlsx`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const [showPdf, setShowPdf] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const doReset = async () => {
    setResetting(true);
    await onReset();
    setResetting(false);
    setResetConfirm(false);
  };



  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      {/* TITRE STATS */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 4, height: 20, background: "linear-gradient(180deg,#7C3AED,#C084FC)", borderRadius: 2 }} />
        <span style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{lang === "ar" ? `إحصائيات ${YEAR_STATS}` : `Statistiques ${YEAR_STATS}`}</span>
      </div>

      {/* BOUTON RAPPORT PDF */}
      <button className="tbtn" onClick={() => setShowPdf(true)}
        style={{ width: "100%", background: "linear-gradient(135deg,#1a2b2e,#2d9c8f)", border: "none", color: "#fff", borderRadius: 16, padding: "14px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16, boxShadow: "0 6px 20px rgba(26,43,46,0.25)", letterSpacing: 0.2 }}>
        <span style={{ fontSize: 18 }}>📄</span>
        <span>{lang === "ar" ? "تقرير الوضعية المالية" : "Rapport de situation"}</span>
        <span style={{ marginRight: "auto", background: "rgba(255,255,255,0.18)", borderRadius: 8, padding: "2px 8px", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{lang === "ar" ? "عربي" : "AR"}</span>
      </button>

      {/* 3 CARTES STATS 2026 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { label: t.stats.contribution, value: yC, color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", icon: Ic.up("#8B5CF6", 15), sign: "" },
          { label: t.stats.don,          value: yD, color: "#DB2777", bg: "rgba(219,39,119,0.08)", icon: Ic.heart("#DB2777", 15), sign: "" },
          { label: t.stats.depense,      value: yE, color: C.red,     bg: C.redLt,                icon: Ic.dn(C.red, 15), sign: "" },
        ].map(s => (
          <Card key={s.label} sx={{ padding: "12px 10px" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: C.muted, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>{s.label}</div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.sign}{fmtN(s.value)}</div>
          </Card>
        ))}
      </div>

      {/* DONUT + TOP 5 + LINE CHART (données année sélectionnée) */}
      <DonutChart contrib={yC} dons={yD} dep={yE} lang={lang} chartReady={chartReady} />
      <TopMembers members={members} txs={txs2026} lang={lang} />
      <FinChart txs={txs2026} lang={lang} chartReady={chartReady} />

      {/* RESET */}
      <div style={{ marginTop: 20, borderTop: `1px solid ${C.outline}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.redLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🗑️</div>
          <span style={{ color: C.red, fontWeight: 700, fontSize: 14 }}>{t.resetBtn}</span>
        </div>
        {!resetConfirm ? (
          <button className="tbtn" onClick={() => setResetConfirm(true)}
            style={{ width: "100%", background: C.redLt, border: `1.5px solid rgba(224,82,82,0.3)`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.red }}>{t.resetBtn}</span>
          </button>
        ) : (
          <div style={{ background: C.redLt, border: `1.5px solid rgba(224,82,82,0.3)`, borderRadius: 14, padding: "16px" }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t.resetConfirmTitle}</div>
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>{t.resetConfirmMsg}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="tbtn" onClick={() => setResetConfirm(false)} style={{ flex: 1, background: C.card, border: `1.5px solid ${C.outline}`, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 500, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>{t.cancel}</button>
              <button className="tbtn" onClick={doReset} disabled={resetting} style={{ flex: 1, background: C.red, border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: resetting ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {resetting ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />...</> : t.delete}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EXPORT */}
      <div style={{ marginTop: 6, borderTop: `1px solid ${C.outline}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.bgLow, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.dl(C.primaryLt)}</div>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{t.exportBtn}</span>
          {!xlsxReady && <span style={{ fontSize: 10, color: C.muted, background: C.bgLow, border: `1px solid ${C.outline}`, borderRadius: 7, padding: "2px 8px", animation: "blink 1.4s infinite" }}>{t.xlsxWait}</span>}
        </div>
        {[
          { mode: "month", label: t.exportMonth, sub: `${t.monthsFull[month - 1]} ${year}`, color: C.primaryLt, lt: C.bgLow, icon: "📊" },
          { mode: "all",   label: lang === "ar" ? "كل السنوات" : "Toutes les années", sub: `${txs.length} op · ${[...new Set(txs.map(tx => new Date(tx.date).getFullYear()))].length} an(s)`, color: C.gold, lt: C.goldLt, icon: "📥" },
        ].map((btn) => (
          <button key={btn.mode} className="tbtn" onClick={() => doExport(btn.mode)} disabled={!xlsxReady}
            style={{ width: "100%", background: xlsxReady ? btn.lt : C.bgLow, border: `1.5px solid ${xlsxReady ? C.outline : "transparent"}`, borderRadius: 14, padding: "14px 16px", cursor: xlsxReady ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: t.dir === "rtl" ? "row-reverse" : "row", fontFamily: "inherit", marginBottom: 10, opacity: xlsxReady ? 1 : 0.5, boxShadow: xlsxReady ? C.shadow : "none" }}>
            <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
              <div style={{ color: xlsxReady ? btn.color : C.muted, fontWeight: 600, fontSize: 13 }}>{btn.label}</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{btn.sub}</div>
            </div>
            <span style={{ fontSize: 22 }}>{btn.icon}</span>
          </button>
        ))}
      </div>
      {/* IMPORT */}
      <div style={{ marginTop: 6, borderTop: `1px solid ${C.outline}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.secondaryCnt, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.secondaryLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{t.importBtn}</span>
          {!xlsxReady && <span style={{ fontSize: 10, color: C.muted, background: C.bgLow, border: `1px solid ${C.outline}`, borderRadius: 7, padding: "2px 8px", animation: "blink 1.4s infinite" }}>{t.xlsxWait}</span>}
        </div>

        {/* feedback message */}
        {importMsg && (
          <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 12, background: importMsg.ok ? C.goldLt : C.redLt, border: `1px solid ${importMsg.ok ? C.primaryLt : C.red}20`, fontSize: 12, fontWeight: 600, color: importMsg.ok ? C.primaryLt : C.red, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <span>{importMsg.text}</span>
            <button onClick={() => setImportMsg(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", opacity: 0.6, fontSize: 16, lineHeight: 1, padding: "0 2px", flexShrink: 0 }}>✕</button>
          </div>
        )}

        {/* hidden file input */}
        <input
          ref={importRef}
          type="file"
          accept=".xlsx,.xls"
          style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) doImport(f); }}
        />

        <button
          className="tbtn eco-btn"
          onClick={() => { if (xlsxReady && !importing) importRef.current?.click(); }}
          disabled={!xlsxReady || importing}
          style={{ width: "100%", background: xlsxReady ? C.secondaryCnt : C.bgLow, border: `1.5px solid ${xlsxReady ? "rgba(113,46,221,0.25)" : "transparent"}`, borderRadius: 14, padding: "14px 16px", cursor: xlsxReady && !importing ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: t.dir === "rtl" ? "row-reverse" : "row", fontFamily: "inherit", opacity: xlsxReady ? 1 : 0.5, boxShadow: xlsxReady ? C.shadow : "none" }}>
          <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
            <div style={{ color: xlsxReady ? C.secondaryLt : C.muted, fontWeight: 600, fontSize: 13 }}>
              {importing ? t.importProcessing : t.importDesc}
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>
              {lang === "ar" ? "صيغة .xlsx · الأعمدة: Type, Montant, Date, Membre" : "Format .xlsx · Colonnes : Type, Montant, Date, Membre"}
            </div>
          </div>
          {importing
            ? <div style={{ width: 22, height: 22, border: `2.5px solid ${C.secondaryLt}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", flexShrink: 0 }} />
            : <span style={{ fontSize: 22, flexShrink: 0 }}>📂</span>
          }
        </button>

        {/* format helper */}
        <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 12, background: C.bgLow, border: `1px solid ${C.outline}`, fontSize: 11, color: C.muted, lineHeight: 1.6, direction: "ltr" }}>
          <div style={{ fontWeight: 700, color: C.sub, marginBottom: 4 }}>📋 {lang === "ar" ? "مثال على بنية الملف:" : "Exemple de structure du fichier :"}</div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: C.primaryLt }}>
            Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Montant | Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Membre<br/>
            contribution | 500 &nbsp;&nbsp;&nbsp;&nbsp;| 2026-01-15 | Ahmed<br/>
            don &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 200 &nbsp;&nbsp;&nbsp;&nbsp;| 15/01/2026 | —<br/>
            depense &nbsp;&nbsp;| 150 &nbsp;&nbsp;&nbsp;&nbsp;| 2026-01-20 | —
          </div>
        </div>
      </div>

      {showPdf && <PdfReportModal txs={txs} members={members} onClose={() => setShowPdf(false)} year={YEAR_STATS} />}
    </div>
  );
}
// ─── SETTINGS ─────────────────────────────────────────────────────────────────
const PROFILE_IMG = "data:image/png;base64,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";

function Settings({ lang, setLang, t, onLogout }) {
  const groups = [
    { title: t.settingsTitle, items: [
      { icon: Ic.globe(C.primaryLt), label: t.langLbl, value: lang === "fr" ? "Français" : "عربي", action: () => setLang(lang === "fr" ? "ar" : "fr") },
      { icon: Ic.moon(C.muted),    label: t.themeLbl, value: t.darkMode, action: () => {} },
    ]},
    { title: t.secLbl, items: [{ icon: Ic.lock(C.gold), label: t.changePin, value: "****", action: () => {} }] },
    { title: t.aboutLbl, items: [{ icon: Ic.info(C.primaryLt), label: t.aboutLbl, value: t.version, action: () => {} }] },
  ];
  return (
    <div style={{ direction: t.dir, padding: "10px 0" }}>
      <div className="a1" style={{ background: C.heroGrad, borderRadius: 28, padding: "24px 22px", marginBottom: 24, boxShadow: "0 8px 32px rgba(1,45,29,0.22)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, overflow: "hidden", flexShrink: 0, border: "2px solid rgba(255,255,255,0.35)", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}>
            <img src={PROFILE_IMG} alt="Profil" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>{t.userName}</div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12, marginTop: 2 }}>{t.subtitle}</div>
          </div>
        </div>
      </div>
      {groups.map((g, gi) => (
        <div key={gi} className={`a${gi + 2}`} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8, paddingLeft: 3 }}>{g.title}</div>
          <Card sx={{ overflow: "hidden" }}>
            {g.items.map((item, ii) => (
              <button key={ii} className="tbtn" onClick={item.action}
                style={{ width: "100%", background: "none", border: "none", borderTop: ii > 0 ? `1px solid ${C.outline}` : "none", padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, justifyContent: "space-between", fontFamily: "inherit", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: C.bgLow, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
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
        <button className="tbtn" onClick={onLogout} style={{ width: "100%", background: C.redLt, border: "none", borderRadius: 24, padding: "15px", color: C.red, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(192,57,43,0.10)" }}>{t.logout}</button>
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
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20, padding: "12px 14px", background: cfg.lt, borderRadius: 14, border: `1.5px solid ${C.outline}`, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
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
    <button className="tbtn" onClick={onClick} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "2px 4px", fontFamily: "inherit" }}>
      <div style={{ width: 44, height: 32, borderRadius: 16, background: active ? "rgba(1,45,29,0.30)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s" }}>
        {active ? activeIcon : icon}
      </div>
      <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)", transition: "color .18s", letterSpacing: 0.3 }}>{label}</span>
      {active && <div style={{ width: 16, height: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.7)", marginTop: 1 }} />}
    </button>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const VALID_PIN = "2526";

const LOGIN_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-7px); }
    40%,80%  { transform: translateX(7px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(64,224,208,0.35); }
    70%  { box-shadow: 0 0 0 14px rgba(64,224,208,0); }
    100% { box-shadow: 0 0 0 0 rgba(64,224,208,0); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .ls-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .ls-root {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    max-width: 430px;
    margin: 0 auto;
    overflow: hidden;
    background: #0a1c1f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 28px;
  }

  .ls-bg-gradient {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 55% at 80% 10%, rgba(32,178,150,0.22) 0%, transparent 65%),
      radial-gradient(ellipse 55% 45% at 10% 85%, rgba(20,140,120,0.18) 0%, transparent 60%),
      linear-gradient(180deg, #0a1c1f 0%, #0d2624 60%, #0f2f2c 100%);
  }
  .ls-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image:
      linear-gradient(rgba(64,224,208,1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(64,224,208,1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .ls-scanline {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(64,224,208,0.12), transparent);
    animation: scanline 6s linear infinite;
    pointer-events: none;
  }

  .ls-inner {
    position: relative; z-index: 1;
    width: 100%; max-width: 340px;
    display: flex; flex-direction: column; align-items: center;
  }

  .ls-logo-wrap {
    width: 72px; height: 72px; border-radius: 22px;
    background: linear-gradient(145deg, #1a4a45 0%, #0d3330 100%);
    border: 1.5px solid rgba(64,224,208,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 22px;
    animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both;
    box-shadow:
      0 8px 32px rgba(0,0,0,0.4),
      0 0 0 1px rgba(64,224,208,0.08) inset,
      0 20px 60px rgba(32,178,150,0.12);
    transition: box-shadow .3s;
  }
  .ls-logo-wrap:hover { animation: pulse-ring 1.8s ease infinite; }

  .ls-title-block {
    text-align: center; margin-bottom: 32px;
    animation: fadeUp .5s cubic-bezier(.16,1,.3,1) .08s both;
  }
  .ls-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px; line-height: 1.1;
    margin-bottom: 6px;
  }
  .ls-subtitle {
    font-size: 11px; font-weight: 500;
    color: rgba(64,224,208,0.7);
    letter-spacing: 3px; text-transform: uppercase;
  }

  .ls-card {
    width: 100%;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.1);
    padding: 24px 22px 22px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
    animation: fadeUp .5s cubic-bezier(.16,1,.3,1) .16s both;
  }

  .ls-label {
    font-size: 10px; font-weight: 600;
    color: rgba(178,237,233,0.7);
    letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 7px; display: block;
  }

  .ls-inp-wrap { position: relative; margin-bottom: 16px; }
  .ls-inp-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    opacity: 0.45; pointer-events: none; display: flex; align-items: center;
  }
  .ls-inp {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-size: 14px; color: #fff;
    font-family: 'DM Sans', sans-serif;
    outline: none; transition: all .2s ease;
    -webkit-appearance: none;
  }
  .ls-inp::placeholder { color: rgba(255,255,255,0.25); }
  .ls-inp:focus {
    background: rgba(64,224,208,0.07);
    border-color: rgba(64,224,208,0.6);
    box-shadow: 0 0 0 3px rgba(64,224,208,0.12);
  }
  .ls-inp.has-error {
    border-color: rgba(239,68,68,0.7);
    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
    animation: shake .4s ease;
  }
  .ls-inp.pin-inp { letter-spacing: 10px; font-size: 20px; }

  .ls-forgot {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 7px;
  }
  .ls-forgot-btn {
    background: none; border: none; cursor: pointer;
    font-size: 10px; font-weight: 600;
    color: rgba(64,224,208,0.65);
    letter-spacing: 1.5px; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
    transition: color .18s; padding: 0;
  }
  .ls-forgot-btn:hover { color: rgba(64,224,208,1); }

  .ls-error {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.35);
    border-radius: 10px;
    padding: 9px 13px; margin-bottom: 14px;
    font-size: 12px; color: #fca5a5; font-weight: 500;
    display: flex; align-items: center; gap: 7px;
    animation: fadeUp .25s ease both;
  }

  .ls-btn {
    width: 100%;
    background: linear-gradient(135deg, #20b2a0 0%, #40e0d0 100%);
    border: none; border-radius: 14px;
    padding: 15px;
    font-size: 13px; font-weight: 700;
    font-family: 'Syne', sans-serif;
    color: #0a1c1f;
    letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(32,178,160,0.45), inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all .2s cubic-bezier(.16,1,.3,1);
    display: flex; align-items: center; justify-content: center; gap: 9px;
    margin-top: 4px;
  }
  .ls-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
  .ls-btn:active { transform: scale(.97); }
  .ls-btn:disabled { opacity: 0.55; cursor: not-allowed; filter: none; transform: none; }

  .ls-divider {
    width: 100%; display: flex; align-items: center; gap: 12px;
    margin: 20px 0 16px;
  }
  .ls-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
  .ls-divider-text {
    font-size: 10px; color: rgba(255,255,255,0.3);
    letter-spacing: 1px; text-transform: uppercase; white-space: nowrap;
  }

  .ls-touchid {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.45);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    transition: color .18s; padding: 6px; width: 100%;
  }
  .ls-touchid:hover { color: rgba(64,224,208,0.75); }

  .ls-lang {
    position: absolute; top: 0; right: 0;
    display: flex;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 20px; padding: 3px; gap: 2px;
  }
  .ls-lang-btn {
    background: transparent; border: none;
    border-radius: 14px;
    color: rgba(255,255,255,0.55);
    font-size: 11px; font-weight: 700;
    padding: 5px 13px; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all .18s;
  }
  .ls-lang-btn.active { background: rgba(64,224,208,0.2); color: #40e0d0; }
`;

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLang, setLoginLang] = usePersisted("cc5_lang", "fr");

  const isAr = loginLang === "ar";

  const handleLogin = async () => {
    if (!name.trim()) {
      setError(isAr ? "يرجى إدخال اسمك" : "Veuillez saisir votre nom.");
      return;
    }
    if (pin !== VALID_PIN) {
      setError(isAr ? "رمز PIN غير صحيح" : "Code PIN incorrect.");
      setShake(true);
      setPin("");
      setTimeout(() => { setShake(false); setError(""); }, 1800);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    onLogin(name.trim());
  };

  return (
    <div className="ls-root" dir={isAr ? "rtl" : "ltr"}>
      <style>{LOGIN_CSS}</style>

      <div className="ls-bg-gradient" />
      <div className="ls-grid" />
      <div className="ls-scanline" />

      <div className="ls-inner">

        <div className="ls-lang">
          {["fr", "ar"].map(l => (
            <button key={l} className={`ls-lang-btn${loginLang === l ? " active" : ""}`} onClick={() => setLoginLang(l)}>
              {l === "fr" ? "FR" : "ع"}
            </button>
          ))}
        </div>

        <div className="ls-logo-wrap">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect x="7" y="20" width="34" height="22" rx="3" fill="rgba(64,224,208,0.15)" stroke="rgba(64,224,208,0.85)" strokeWidth="1.6"/>
            <path d="M4 21 L24 7 L44 21" stroke="rgba(64,224,208,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <rect x="20" y="31" width="8" height="11" rx="2" fill="rgba(64,224,208,0.9)"/>
            <rect x="10" y="25" width="7" height="5" rx="1.5" fill="rgba(64,224,208,0.6)"/>
            <rect x="31" y="25" width="7" height="5" rx="1.5" fill="rgba(64,224,208,0.6)"/>
            <circle cx="37" cy="14" r="5" fill="#20b2a0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"/>
            <text x="37" y="17.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">$</text>
          </svg>
        </div>

        <div className="ls-title-block">
          <div className="ls-title">{isAr ? "صندوق الشباب" : "Caisse Al Shabab"}</div>
          <div className="ls-subtitle">{isAr ? "خزينة رقمية آمنة" : "Secure Digital Vault"}</div>
        </div>

        <div className="ls-card">

          <label className="ls-label">{isAr ? "الاسم" : "Username"}</label>
          <div className="ls-inp-wrap">
            <span className="ls-inp-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(64,224,208,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              className="ls-inp"
              value={name}
              onChange={e => { setName(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder={isAr ? "اسمك..." : "Enter identification"}
              autoComplete="username"
            />
          </div>

          <div className="ls-forgot">
            <label className="ls-label" style={{ marginBottom: 0 }}>{isAr ? "رمز PIN" : "Access Key"}</label>
            <button className="ls-forgot-btn">{isAr ? "نسيت؟" : "Forgot?"}</button>
          </div>
          <div className="ls-inp-wrap">
            <span className="ls-inp-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(64,224,208,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </span>
            <input
              className={`ls-inp pin-inp${shake ? " has-error" : ""}`}
              value={pin}
              onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 4); setPin(v); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="● ● ● ●"
              type="password"
              inputMode="numeric"
              maxLength={4}
            />
          </div>

          {error && (
            <div className="ls-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button className="ls-btn" onClick={handleLogin} disabled={loading}>
            {loading ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/><path d="M12 3a9 9 0 019 9"/>
              </svg>
            ) : (
              <>
                {isAr ? "تسجيل الدخول" : "Authenticate Session"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="ls-divider">
          <div className="ls-divider-line" />
          <span className="ls-divider-text">{isAr ? "أو" : "or"}</span>
          <div className="ls-divider-line" />
        </div>
        <button className="ls-touchid">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a5 5 0 015 5v3a5 5 0 01-10 0V7a5 5 0 015-5z"/>
            <path d="M12 12v3"/><path d="M9 9a3 3 0 006 0"/>
            <path d="M5 15a9 9 0 0014 0"/>
          </svg>
          {isAr ? "الدخول ببصمة الإصبع" : "Touch ID Access"}
        </button>

      </div>
    </div>
  );
}



export default function App() {
  const xlsxReady = useSheetJS();
  const chartReady = useChartJS();
  const [lang, setLang] = usePersisted("cc5_lang", "fr");
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null);
  const [loggedIn, setLoggedIn] = useState(() => {
    try { return !!sessionStorage.getItem("cc_user"); } catch { return false; }
  });
  const { members, txs, loading, netError, addTx, updateTx, deleteTx, addMember, deleteMember, fetchAll, resetAll } = useSupabaseData();

  const handleLogin = (name) => {
    try { sessionStorage.setItem("cc_user", name); } catch {}
    setLoggedIn(true);
  };

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />;

  const t = T[lang];
  const saveTx = (d) => { if (modal?.editTx) updateTx(d); else addTx(d); };
  const editTx = (tx) => setModal({ kind: "tx", txType: tx.type, editTx: tx });

  const nC = "rgba(255,255,255,0.35)";
  const TABS = [
    { id: "home",     label: t.tabs.home,     icon: Ic.home(nC),   aicon: Ic.home(C.secondaryLt)  },
    { id: "ops",      label: t.tabs.ops,      icon: Ic.swap(nC),   aicon: Ic.swap(C.secondaryLt)  },
    { id: "members",  label: t.tabs.members,  icon: Ic.users(nC),  aicon: Ic.users(C.secondaryLt) },
    { id: "reports",  label: t.tabs.reports,  icon: Ic.bar(nC),    aicon: Ic.bar(C.secondaryLt)   },
    { id: "settings", label: t.tabs.settings, icon: Ic.gear(nC),   aicon: Ic.gear(C.secondaryLt)  },
  ];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
      <div style={{ width: 36, height: 36, border: `3px solid ${C.secondaryLt}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <div style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>Chargement…</div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", minHeight: "100dvh", width: "100%", maxWidth: 430, margin: "0 auto", fontFamily: "'Manrope','Segoe UI',sans-serif", color: C.text, position: "relative", paddingBottom: 90, overflowX: "hidden" }}>
      <style>{G}</style>
      {netError && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "#c0392b", color: "#fff", borderRadius: 14, padding: "12px 20px", fontSize: 13, fontWeight: 600, boxShadow: "0 6px 24px rgba(192,57,43,0.35)", maxWidth: 370, width: "calc(100% - 32px)", textAlign: "center", animation: "pop .2s ease both", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {netError}
        </div>
      )}
      <div style={{ padding: "20px 16px" }}>
        {tab === "home"     && <Dashboard txs={txs} members={members} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} onTabChange={setTab} lang={lang} setLang={setLang} chartReady={chartReady} />}
        {tab === "ops"      && <Operations txs={txs} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} lang={lang} />}
        {tab === "members"  && <Members members={members} txs={txs} onAddMember={() => setModal({ kind: "membre" })} onDeleteMember={deleteMember} lang={lang} />}
        {tab === "reports"  && <Reports key="reports-tab" txs={txs} members={members} lang={lang} xlsxReady={xlsxReady} chartReady={chartReady} onRefresh={fetchAll} onReset={resetAll} onAddTx={addTx} />}
        {tab === "settings" && <Settings lang={lang} setLang={setLang} t={t} onLogout={() => { try { sessionStorage.removeItem("cc_user"); } catch {} setLoggedIn(false); }} />}
      </div>
      <nav style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 398, background: "rgba(1,45,29,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 36, display: "flex", padding: "10px 12px", zIndex: 200, gap: 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: "0 8px 40px rgba(1,45,29,0.25)" }}>
        {TABS.map((tb) => <NavItem key={tb.id} label={tb.label} icon={tb.icon} activeIcon={tb.aicon} active={tab === tb.id} onClick={() => setTab(tb.id)} />)}
      </nav>
      {modal?.kind === "tx"     && <TxSheet type={modal.txType} members={members} onSave={saveTx} onClose={() => setModal(null)} lang={lang} editTx={modal.editTx || null} />}
      {modal?.kind === "membre" && <MemberSheet onSave={addMember} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}
