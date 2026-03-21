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

// ─── DESIGN TOKENS — #1a2b2e Teal Dark ──────────────────────────────────────
const C = {
  forest:    "#1a2b2e",
  forestMid: "#1f3a3e",
  forestLt:  "#2d9c8f",
  mint:      "#b2ede7",
  mintLt:    "#e0f5f3",
  mintPale:  "#f0faf9",
  lime:      "#6dcfc4",
  sage:      "#4db8ab",
  bg:        "#f0f4f5",
  card:      "#ffffff",
  text:      "#1a2b2e",
  muted:     "#4a6568",
  sub:       "#7a9ea2",
  red:       "#e05252",
  redLt:     "#fde8e8",
  gold:      "#2d9c8f",
  goldLt:    "#e6faf8",
  shadow:    "0 2px 14px rgba(26,43,46,0.08)",
  shadowMd:  "0 6px 24px rgba(26,43,46,0.12)",
  shadowLg:  "0 16px 48px rgba(26,43,46,0.16)",
};

const FONTS = ``;

const G = `
  ${FONTS}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;overscroll-behavior:none;}
  body{background:#f0f4f5;-webkit-font-smoothing:antialiased;font-family:'Times New Roman','Times',serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;font-size:15px;}
  #root{height:100%;display:flex;justify-content:center;background:#f0f4f5;}
  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-thumb{background:${C.sage};border-radius:4px;}
  @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes sheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(.92);opacity:0}100%{transform:scale(1);opacity:1}}
  @keyframes fin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
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
  button{font-family:'Times New Roman','Times',serif;}
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
    dir: "ltr", font: "'Times New Roman','Times',serif",
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
    flds: { amount: "Montant (MRU)", desc: "Description", member: "Membre", date: "Date", donor: "Nom du donateur", donorPh: "Anonyme", memberPh: "Sélectionner un membre", notePh: "Description…" },
    save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", deleteTitle: "Supprimer ?",
    deleteMsg: (l, a) => `Supprimer cette ${l} de ${a} ?`,
    delMemberTitle: "Retirer ?", delMemberMsg: (n) => `Retirer "${n}" ?`,
    alertAmount: "Montant invalide.", alertMember: "Sélectionnez un membre.", alertName: "Saisissez un nom.",
    txTypes: { contribution: "Contribution", don: "Don", depense: "Dépense" }, donorDefault: "Donateur",
    newMember: "Nouveau membre", fullName: "Nom complet", fullNamePh: "Ex : Fatima Mint Ahmed",
    phone: "Téléphone", phonePh: "Ex : 22234567890", addMemberBtn: "Ajouter",
    exportBtn: "Exporter Excel", exportAll: "Toutes les transactions", exportMonth: "Ce mois", xlsxWait: "Chargement…", resetBtn: "Réinitialiser les données", resetConfirmTitle: "Tout supprimer ?", resetConfirmMsg: "Cette action supprimera TOUS les membres et TOUTES les transactions. Impossible d'annuler.", resetSuccess: "✅ Toutes les données ont été supprimées.", importBtn: "Importer Excel", importSuccess: (m, t) => `✅ ${m} membres et ${t} transactions importés !`, importError: "❌ Erreur: vérifiez le format du fichier.", importInfo: "Format attendu: feuilles Membres (Membre, Téléphone) et Transactions (Date, Type, Membre, Montant, Note)",
    settingsTitle: "Paramètres", langLbl: "Langue", themeLbl: "Apparence", secLbl: "Sécurité",
    aboutLbl: "À propos", version: "Version 1.0.0", darkMode: "Mode sombre", changeLang: "Changer la langue",
    changePin: "Changer le PIN", aboutApp: "Caisse Coopérative · Gestion communautaire", logout: "Se déconnecter",
    exportSummaryRows: (s,c,d,dep,n) => [["Solde",s],["Contributions",c],["Dons",d],["Dépenses",dep],["Membres",n]],
    categories: "Actions rapides", apercu: "Aperçu du mois",
  },
  ar: {
    dir: "rtl", font: "'Times New Roman','Times',serif",
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
    flds: { amount: "المبلغ (MRU)", desc: "الوصف", member: "العضو", date: "التاريخ", donor: "اسم المتبرع", donorPh: "مجهول", memberPh: "اختر عضواً", notePh: "وصف العملية…" },
    save: "حفظ", cancel: "إلغاء", delete: "حذف", deleteTitle: "حذف؟",
    deleteMsg: (l, a) => `هل تريد حذف هذه ${l} بقيمة ${a}؟`,
    delMemberTitle: "إزالة؟", delMemberMsg: (n) => `إزالة "${n}"؟`,
    alertAmount: "مبلغ غير صحيح.", alertMember: "اختر عضواً.", alertName: "أدخل الاسم.",
    txTypes: { contribution: "مساهمة", don: "تبرع", depense: "مصروف" }, donorDefault: "متبرع",
    newMember: "عضو جديد", fullName: "الاسم الكامل", fullNamePh: "مثال: فاطمة بنت أحمد",
    phone: "الهاتف", phonePh: "مثال: 22234567890", addMemberBtn: "إضافة",
    exportBtn: "تصدير Excel", exportAll: "كل العمليات", exportMonth: "هذا الشهر", xlsxWait: "جارٍ التحميل…", resetBtn: "مسح جميع البيانات", resetConfirmTitle: "حذف الكل؟", resetConfirmMsg: "سيتم حذف جميع الأعضاء والمعاملات. لا يمكن التراجع.", resetSuccess: "✅ تم مسح جميع البيانات.", importBtn: "استيراد Excel", importSuccess: (m, t) => `✅ تم استيراد ${m} عضو و ${t} عملية !`, importError: "❌ خطأ: تحقق من تنسيق الملف.", importInfo: "الصيغة المطلوبة: أوراق Membres و Transactions",
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

  const resetAll = async () => {
    await supabase.from("transactions").delete().neq("id", 0);
    await supabase.from("members").delete().neq("id", 0);
    await fetchAll();
  };

  return { members, txs, loading, addTx, updateTx, deleteTx, addMember, deleteMember, fetchAll, resetAll };
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function Card({ children, sx = {}, className = "" }) {
  return <div className={className} style={{ background: C.card, borderRadius: 20, boxShadow: "0 2px 16px rgba(26,43,46,0.07)", border: "1px solid rgba(26,43,46,0.06)", ...sx }}>{children}</div>;
}

function Lbl({ c }) {
  return <div style={{ fontSize: 10, fontWeight: 700, color: "#1A1429", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{c}</div>;
}

function Inp({ label, dir = "ltr", sx = {}, ...p }) {
  const [f, sf] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <Lbl c={label} />}
      <input {...p} onFocus={(e) => { sf(true); p.onFocus?.(e); }} onBlur={(e) => { sf(false); p.onBlur?.(e); }}
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `2px solid ${f ? "#2d9c8f" : "rgba(26,43,46,0.18)"}`, borderRadius: 0, padding: "10px 2px", color: "#1A1429", fontSize: 15, outline: "none", direction: dir, fontFamily: "inherit", transition: "border-color .2s", ...sx }} />
    </div>
  );
}

function Sel({ label, dir = "ltr", children, ...p }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <Lbl c={label} />}
      <div style={{ position: "relative" }}>
        <select {...p} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "2px solid rgba(107,33,232,0.2)", borderRadius: 0, padding: "10px 28px 10px 2px", color: "#1A1429", fontSize: 15, outline: "none", direction: dir, fontFamily: "inherit", appearance: "none", cursor: "pointer" }}>{children}</select>
        <div style={{ position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{Ic.chev("#6B21E8")}</div>
      </div>
    </div>
  );
}

function PBtn({ children, onClick, sx = {}, disabled }) {
  return (
    <button className="tbtn eco-btn" disabled={disabled} onClick={onClick}
      style={{ background: disabled ? "#7ab5b0" : "#1a2b2e", border: "none", color: "#fff", borderRadius: 50, padding: "16px 20px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", width: "100%", marginTop: 8, boxShadow: disabled ? "none" : "0 8px 24px rgba(26,43,46,0.28)", fontFamily: "inherit", letterSpacing: 0.2, ...sx }}>
      {children}
    </button>
  );
}

function GBtn({ children, onClick, sx = {} }) {
  return (
    <button className="tbtn" onClick={onClick}
      style={{ background: "#F2EFE9", border: "1.5px solid rgba(107,33,232,0.15)", color: "#7A6E8A", borderRadius: 50, padding: "12px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", ...sx }}>
      {children}
    </button>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,0.8)", borderRadius: 20, padding: 3, gap: 2, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      {["fr", "ar"].map((l) => (
        <button key={l} className="tbtn" onClick={() => setLang(l)}
          style={{ background: lang === l ? "#1A1A1A" : "transparent", border: "none", borderRadius: 16, color: lang === l ? "#fff" : "#6B7A6B", fontWeight: 600, fontSize: 11, padding: "5px 13px", cursor: "pointer", fontFamily: "inherit", transition: "all .18s" }}>
          {l === "fr" ? "FR" : "ع"}
        </button>
      ))}
    </div>
  );
}

function Sheet({ title, onClose, children, dir = "ltr" }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(26,43,46,0.5)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#f0f4f5", borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "93vh", overflowY: "auto", padding: "0 20px 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: dir, boxShadow: "0 -12px 50px rgba(26,20,41,0.18)" }}>
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
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(26,43,46,0.55)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
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


// ─── SEARCH BAR ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder, dir = "ltr" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      <div style={{ position: "absolute", left: dir === "rtl" ? "auto" : 13, right: dir === "rtl" ? 13 : "auto", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: focused ? 1 : 0.5, transition: "opacity .2s" }}>
        {Ic.search(focused ? C.forestLt : C.muted, 15)}
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        dir={dir}
        style={{ width: "100%", background: focused ? C.card : C.mintPale, border: `1.5px solid ${focused ? C.forestLt : C.mintLt}`, borderRadius: 14, padding: dir === "rtl" ? "11px 42px 11px 14px" : "11px 14px 11px 38px", fontSize: 13, color: C.text, outline: "none", fontFamily: "inherit", transition: "all .2s", boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.1)" : "none" }}
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
    {
      type: "contribution",
      color: "#2d9c8f",
      bg: "rgba(45,156,143,0.10)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Pièce de monnaie avec $ */}
          <circle cx="12" cy="12" r="9" fill="rgba(45,156,143,0.15)" stroke="#2d9c8f" strokeWidth="1.7"/>
          <path d="M12 7v10M9.5 9.5a2.5 2.5 0 015 0c0 1.4-1.2 2.2-2.5 2.5-1.3.3-2.5 1.1-2.5 2.5a2.5 2.5 0 005 0" stroke="#2d9c8f" strokeWidth="1.6"/>
        </svg>
      ),
    },
    {
      type: "don",
      color: "#20b2aa",
      bg: "rgba(32,178,170,0.10)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Mains ouvertes tendant un cœur */}
          <path d="M12 6c0 0-1.5-2-3-2C7.5 4 6 5.3 6 6.8 6 8.6 8 10 12 12c4-2 6-3.4 6-5.2C18 5.3 16.5 4 15 4c-1.5 0-3 2-3 2z" fill="rgba(32,178,170,0.18)" stroke="#20b2aa" strokeWidth="1.7"/>
          <path d="M5 15c0-1 .7-1.5 1.5-1.5S8 14 8 15l.5 1h7l.5-1c0-1 .7-1.5 1.5-1.5S19 14 19 15v1.5c0 .8-.7 1.5-1.5 1.5h-11C5.7 18 5 17.3 5 16.5V15z" fill="rgba(32,178,170,0.18)" stroke="#20b2aa" strokeWidth="1.7"/>
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
        { label: t.stats.contribution, data: c, borderColor: "#2d9c8f", backgroundColor: "rgba(45,156,143,0.08)", tension: 0.45, fill: true, pointBackgroundColor: "#2d9c8f", pointRadius: 3, borderWidth: 2 },
        { label: t.stats.don,          data: d, borderColor: "#20b2aa", backgroundColor: "rgba(32,178,170,0.07)", tension: 0.45, fill: true, pointBackgroundColor: "#20b2aa", pointRadius: 3, borderWidth: 2 },
        { label: t.stats.depense,      data: e, borderColor: "#e05252", backgroundColor: "rgba(224,82,82,0.06)", tension: 0.45, fill: true, pointBackgroundColor: "#e05252", pointRadius: 3, borderWidth: 2 },
      ]},
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "bottom", labels: { boxWidth: 9, usePointStyle: true, pointStyle: "circle", color: C.muted, font: { size: 10, family: "Times New Roman" } } },
          tooltip: { backgroundColor: C.card, titleColor: C.text, bodyColor: C.muted, borderColor: C.mintLt, borderWidth: 1, padding: 10, cornerRadius: 10 },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: C.sub, font: { size: 9, family: "Times New Roman" } }, border: { display: false } },
          y: { grid: { color: C.mintLt }, ticks: { color: C.sub, font: { size: 9, family: "Times New Roman" }, callback: (v) => `${(v / 1000).toFixed(0)}k` }, border: { display: false } },
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
    <div style={{ width: 40, height: 40, borderRadius: 13, background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}>
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
    { label: t.stats.contribution, value: contrib, accentColor: C.mint,   sign: "+", type: "contribution" },
    { label: t.stats.don,          value: dons,    accentColor: "#F5C842", sign: "+", type: "don" },
    { label: t.stats.depense,      value: dep,     accentColor: "#FF9E9E", sign: "−", type: "depense" },
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
                  <span style={{ color: "#8B5CF6", fontSize: 20, fontWeight: 700 }}>{statModal.sign}{fmt(statModal.value)}</span>
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
                      <div style={{ width: 70, textAlign: "right", color: C.text, fontSize: 12, fontWeight: 600 }}>{fmt(monthVal)}</div>
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
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(45,156,143,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône pièce/contribution */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d9c8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M9.5 10.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-2.5 3-2.5 3s-2.5-1.5-2.5-3z" fill="rgba(45,156,143,0.18)"/><path d="M9.5 13.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.contribution}</div>
              <div style={{ color: "#2d9c8f", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>+{fmt(contrib)}</div>
            </div>
          </button>
          {/* Dons */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[1])}
            style={{ background: C.card, border: "none", borderRadius: 20, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: C.shadow, transition: "all .2s" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(32,178,170,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône mains offrantes / don */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#20b2aa" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 4.02 3.268 2 6 2c1.657 0 3.15.817 4 2.07C10.85 2.817 12.343 2 14 2c2.732 0 5 2.02 5 5.191 0 4.105-5.37 8.863-11 14.402z" fill="rgba(32,178,170,0.18)"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.don}</div>
              <div style={{ color: "#20b2aa", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>+{fmt(dons)}</div>
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
              <div style={{ color: "#e05252", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>-{fmt(dep)}</div>
            </div>
          </button>
          {/* Solde année passée — cliquable */}
          <button className="tbtn" onClick={() => { setEditPrevVal(String(soldePrev)); setEditPrevModal(true); }}
            style={{ background: soldePrev >= 0 ? "linear-gradient(135deg,rgba(45,156,143,0.08),rgba(45,156,143,0.15))" : "rgba(254,226,226,0.6)", border: `1.5px solid ${soldePrev >= 0 ? "rgba(45,156,143,0.3)" : "#FECACA"}`, borderRadius: 18, padding: "16px 14px 14px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, cursor: "pointer", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: soldePrev >= 0 ? "rgba(45,156,143,0.12)" : "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={soldePrev >= 0 ? "#2d9c8f" : "#EF4444"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, marginTop: 2 }}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>
                {lang === "ar" ? `رصيد ${prevYear}` : `Solde ${prevYear}`}
              </div>
              <div style={{ color: soldePrev >= 0 ? "#2d9c8f" : "#EF4444", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>
                {soldePrev >= 0 ? "+" : ""}{fmt(Math.abs(soldePrev))}
              </div>
              {soldePrevManual !== null && <div style={{ fontSize: 8, color: C.sub, marginTop: 2 }}>✏️ {lang === "ar" ? "معدّل" : "modifié"}</div>}
            </div>
          </button>
        </div>

        {/* ── Modal édition Solde année passée ── */}
        {editPrevModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(26,43,46,0.6)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={e => e.target === e.currentTarget && setEditPrevModal(false)}>
            <div style={{ background: C.card, borderRadius: 22, padding: "26px 22px", width: "100%", maxWidth: 320, boxShadow: C.shadowLg, animation: "pop .2s ease both", border: `1px solid ${C.mintLt}` }}>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.mintLt, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.forestLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {lang === "ar" ? `تعديل رصيد ${prevYear}` : `Modifier le solde ${prevYear}`}
                </div>
                <div style={{ color: C.muted, fontSize: 12 }}>{lang === "ar" ? "سيُضاف إلى الرصيد الإجمالي" : "Sera ajouté au solde global"}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7 }}>{lang === "ar" ? `رصيد ${prevYear} (MRU)` : `Solde ${prevYear} (MRU)`}</div>
                <input type="number" value={editPrevVal} onChange={e => setEditPrevVal(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { setSoldePrevManual(Number(editPrevVal)); setEditPrevModal(false); } }}
                  placeholder="0" autoFocus
                  style={{ width: "100%", background: C.mintLt, border: `1.5px solid ${C.mintLt}`, borderRadius: 12, padding: "12px 14px", fontSize: 18, color: C.text, outline: "none", fontFamily: "inherit", textAlign: "center", fontWeight: 700, transition: "border-color .2s" }}
                  onFocus={e => e.target.style.borderColor = C.forestLt}
                  onBlur={e => e.target.style.borderColor = C.mintLt}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="tbtn" onClick={() => { setSoldePrevManual(null); setEditPrevModal(false); }}
                  style={{ flex: 1, background: C.mintLt, border: "none", borderRadius: 12, padding: "11px", fontSize: 12, fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
                  {lang === "ar" ? "إعادة ضبط" : "Réinitialiser"}
                </button>
                <button className="tbtn" onClick={() => { setSoldePrevManual(Number(editPrevVal)); setEditPrevModal(false); }}
                  style={{ flex: 2, background: C.forestLt, border: "none", borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 14px rgba(45,156,143,0.35)` }}>
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
    background: active ? (color || C.forest) : C.card,
    border: `1.5px solid ${active ? (color || C.forest) : C.mintLt}`,
    color: active ? "#fff" : C.muted,
    borderRadius: 20, padding: "7px 15px", fontSize: 11, fontWeight: 600,
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
              style={pillStyle(selYear === String(y), C.forestLt)}>
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
          <span style={{ background: C.mintPale, borderRadius: 6, padding: "2px 9px", border: `1px solid ${C.mintLt}`, color: C.forestLt, fontWeight: 600 }}>
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
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(19,17,28,0.6)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "88vh", overflowY: "auto", padding: "0 20px 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: t.dir }}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 40, height: 4, background: C.sage, borderRadius: 4 }} />
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
          <button onClick={onClose} className="tbtn" style={{ background: C.mintPale, border: `1px solid ${C.mintLt}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>✕</button>
        </div>

        {/* Carte total 2026 */}
        <div style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", borderRadius: 18, padding: "18px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: C.shadowMd }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>
              {lang === "ar" ? `إجمالي مساهمات ${YEAR}` : `Total contributions ${YEAR}`}
            </div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, letterSpacing: -1, fontFamily: "'DM Serif Display', serif" }}>
              {new Intl.NumberFormat("fr-FR").format(total2026)}
              <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 5, opacity: 0.8 }}>MRU</span>
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
                    <span style={{ color: C.forestLt, fontSize: 13, fontWeight: 700 }}>{fmt(val)}</span>
                  </div>
                  <div style={{ background: C.mintPale, borderRadius: 6, height: 7, overflow: "hidden" }}>
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
              <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 13px", background: C.card, borderRadius: 12, marginBottom: 8, border: `1px solid ${C.mintLt}` }}>
                <div>
                  <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{fmtDt(tx.date, lang)}</div>
                  {tx.note && <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{tx.note}</div>}
                </div>
                <div style={{ color: "#8B5CF6", fontWeight: 700, fontSize: 13 }}>+{fmt(tx.amount)}</div>
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
        {search && filtered.length !== members.length && <span style={{ marginLeft: 6, color: C.forestLt, fontWeight: 600 }}>/ {members.length} total</span>}
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
                    <div style={{ color: C.forestLt, fontWeight: 700, fontSize: 12 }}>{fmt(total)}</div>
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
          backgroundColor: ["rgba(124,58,237,0.85)", "rgba(219,39,119,0.85)", "rgba(239,68,68,0.85)"],
          borderRadius: 10,
          borderSkipped: false,
          hoverBackgroundColor: ["#7C3AED", "#DB2777", "#EF4444"],
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff", titleColor: "#1A1A2E", bodyColor: "#6B5E8A",
            borderColor: "#EDE9FE", borderWidth: 1, padding: 10, cornerRadius: 10,
            callbacks: { label: ctx => " " + new Intl.NumberFormat("fr-FR").format(ctx.parsed.y) + " MRU" }
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6B5E8A", font: { size: 11, family: "Times New Roman", weight: "600" } },
            border: { display: false },
          },
          y: {
            grid: { color: "#EDE9FE" },
            ticks: { color: "#9D8BC0", font: { size: 9, family: "Times New Roman" }, callback: v => v >= 1000 ? (v/1000).toFixed(0)+"k" : v },
            border: { display: false },
          },
        },
      },
    });
    return () => { if (cRef.current) cRef.current.destroy(); };
  }, [chartReady, contrib, dons, dep, lang]);

  return (
    <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 2px 16px rgba(124,58,237,0.08)", border: "1px solid #EDE9FE", padding: "16px", marginBottom: 16 }}>
      <div style={{ marginBottom: 14 }}>
        <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: 14 }}>{lang === "ar" ? "توزيع المالية" : "Répartition financière"}</span>
      </div>
      <div style={{ height: 180, position: "relative" }}>
        {!chartReady ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9D8BC0", fontSize: 12 }}>
            <div style={{ width: 18, height: 18, border: "2px solid #C4B5FD", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: 8 }} />Chargement…
          </div>
        ) : total === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9D8BC0", fontSize: 13 }}>Aucune donnée</div>
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
  const AVC2 = ["#7C3AED","#A855F7","#C084FC","#DDD6FE","#EDE9FE"];
  return (
    <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 2px 16px rgba(124,58,237,0.08)", border: "1px solid #EDE9FE", padding: "16px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        {Ic.trophy("#F5C842", 16)}
        <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: 14 }}>{lang === "ar" ? "أكبر المساهمين" : "Top contributeurs"}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#6B5E8A", background: "#F5F3FF", borderRadius: 8, padding: "2px 9px", border: "1px solid #EDE9FE", marginLeft: "auto" }}>Top {ranked.length}</span>
      </div>
      {ranked.map((m, i) => (
        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < ranked.length - 1 ? 10 : 0, direction: t.dir }}>
          <div style={{ fontSize: 18, width: 28, textAlign: "center", flexShrink: 0 }}>{medals[i]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: "#1A1A2E", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{m.name}</span>
              <span style={{ color: AVC2[i], fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{new Intl.NumberFormat("fr-FR").format(m.total)} MRU</span>
            </div>
            <div style={{ background: "#F5F3FF", borderRadius: 4, height: 5, overflow: "hidden" }}>
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
  const pieC = pieSlice(totalC, pieTotal, sa, "#2d9c8f"); sa += (totalC / (pieTotal || 1)) * 2 * Math.PI;
  const pieD = pieSlice(totalD, pieTotal, sa, "#20b2aa"); sa += (totalD / (pieTotal || 1)) * 2 * Math.PI;
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
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap');
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .pdf-wrap { padding: 20px; }
      .pdf-section { page-break-inside: avoid; break-inside: avoid; }
      .pdf-header { page-break-after: avoid; break-after: avoid; }
      .pdf-kpi-row { page-break-inside: avoid; break-inside: avoid; }
      .pdf-table { page-break-inside: auto; }
      .pdf-table tr { page-break-inside: avoid; break-inside: avoid; }
      .pdf-table thead { display: table-header-group; }
      .pdf-footer { page-break-before: avoid; break-before: avoid; }
    }
    .pdf-wrap{font-family:'Times New Roman','Times',serif;direction:rtl;background:#fff;color:#1a2b2e;padding:32px;max-width:860px;margin:0 auto;font-size:14px;}
    .pdf-header{background:linear-gradient(135deg,#1a2b2e,#2d9c8f);color:#fff;border-radius:18px;padding:28px 32px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}
    .pdf-title{font-size:24px;font-weight:800;margin-bottom:4px;}
    .pdf-sub{font-size:14px;opacity:0.7;}
    .pdf-date{font-size:14px;opacity:0.6;text-align:left;}
    .pdf-kpi-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px;margin-bottom:24px;}
    .pdf-kpi{border-radius:14px;padding:16px 14px;border:1.5px solid #e0f5f3;}
    .pdf-kpi-label{font-size:12px;font-weight:600;color:#7a9ea2;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;}
    .pdf-kpi-value{font-size:20px;font-weight:800;}
    .pdf-section{background:#fff;border:1.5px solid #e0f5f3;border-radius:16px;padding:20px;margin-bottom:20px;}
    .pdf-section-title{font-size:16px;font-weight:700;color:#1a2b2e;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid #e0f5f3;display:flex;align-items:center;gap:8px;}
    .pdf-table{width:100%;border-collapse:collapse;}
    .pdf-table th{background:#f0faf9;color:#2d9c8f;font-size:14px;font-weight:700;padding:9px 12px;text-align:right;border-bottom:2px solid #e0f5f3;}
    .pdf-table td{padding:8px 12px;font-size:14px;border-bottom:1px solid #f0faf9;text-align:right;color:#1a2b2e;}
    .pdf-table tr:last-child td{border-bottom:none;}
    .pdf-badge{display:inline-block;border-radius:6px;padding:2px 8px;font-size:13px;font-weight:600;}
    .pdf-footer{text-align:center;color:#7a9ea2;font-size:13px;margin-top:24px;padding-top:16px;border-top:1px solid #e0f5f3;}
  `;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(26,43,46,0.65)", backdropFilter: "blur(16px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bg, borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "95vh", overflowY: "auto", padding: "0 0 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: "rtl" }}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "13px 0 8px" }}>
          <div style={{ width: 40, height: 4, background: C.sage, borderRadius: 4 }} />
        </div>

        {/* Header */}
        <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 17 }}>تقرير الصندوق {year}</div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>تقريرٌ ماليٌّ شاملٌ — معاينة</div>
          </div>
          <button onClick={onClose} className="tbtn" style={{ background: C.mintPale, border: `1px solid ${C.mintLt}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", flexShrink: 0 }}>✕</button>
        </div>

        {/* Preview card */}
        <div style={{ padding: "0 20px" }}>

          {/* KPI summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "المساهمات", val: totalC, color: "#2d9c8f", bg: "rgba(45,156,143,0.07)", sign: "+" },
              { label: "التبرعات",  val: totalD, color: "#20b2aa", bg: "rgba(32,178,170,0.07)", sign: "+" },
              { label: "المصروفات", val: totalE, color: "#e05252", bg: "rgba(224,82,82,0.07)",  sign: "−" },
              { label: "الرصيد الصافي", val: Math.abs(solde), color: solde >= 0 ? "#2d9c8f" : "#e05252", bg: solde >= 0 ? "rgba(45,156,143,0.07)" : "rgba(224,82,82,0.07)", sign: solde >= 0 ? "+" : "−" },
            ].map(k => (
              <div key={k.label} style={{ background: k.bg, borderRadius: 14, padding: "14px 12px", border: `1.5px solid ${k.color}22` }}>
                <div style={{ color: C.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{k.label}</div>
                <div style={{ color: k.color, fontSize: 16, fontWeight: 800 }}>{k.sign}{new Intl.NumberFormat("ar-MA").format(k.val)} MRU</div>
              </div>
            ))}
          </div>

          {/* Mini bar chart preview */}
          <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.mintLt}`, marginBottom: 14 }}>
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
                    <rect x={x + 2} y={BAR_H - hC - 10} width={bw} height={hC || 1} fill="#2d9c8f" rx="2" opacity="0.85" />
                    <rect x={x + bw + 4} y={BAR_H - hD - 10} width={bw} height={hD || 1} fill="#20b2aa" rx="2" opacity="0.75" />
                    <rect x={x + bw * 2 + 6} y={BAR_H - hE - 10} width={bw} height={hE || 1} fill="#e05252" rx="2" opacity="0.75" />
                    <text x={x + barW / 2} y={BAR_H + 20} textAnchor="middle" fontSize="9" fill="#7a9ea2" fontFamily="sans-serif">
                      {MONTHS_AR[i].slice(0, 3)}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 4 }}>
              {[["#2d9c8f","مساهمات"],["#20b2aa","تبرعات"],["#e05252","مصروفات"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 8, height: 8, background: c, borderRadius: 2 }} />
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "sans-serif" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie preview */}
          <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.mintLt}`, marginBottom: 14, display: "flex", alignItems: "center", gap: 16 }}>
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
                { label: "المساهمات", val: totalC, color: "#2d9c8f", pct: pieTotal ? Math.round(totalC / pieTotal * 100) : 0 },
                { label: "التبرعات",  val: totalD, color: "#20b2aa", pct: pieTotal ? Math.round(totalD / pieTotal * 100) : 0 },
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
            <div style={{ background: C.card, borderRadius: 16, padding: "14px", border: `1px solid ${C.mintLt}`, marginBottom: 14 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🏆 أكبر المساهمين</div>
              {topMembers.map((m, i) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 14, width: 22 }}>{"🥇🥈🥉4️⃣5️⃣"[i * 2]}{"🥇🥈🥉4️⃣5️⃣"[i * 2 + 1]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{m.name}</span>
                      <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700 }}>{fmtAR(m.total)} MRU</span>
                    </div>
                    <div style={{ background: "#f0faf9", borderRadius: 3, height: 4 }}>
                      <div style={{ width: `${(m.total / maxMem) * 100}%`, height: "100%", background: "#2d9c8f", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div style={{ background: C.mintPale, borderRadius: 12, padding: "11px 14px", marginBottom: 16, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
            📄 سيتم إنشاء تقريرٍ PDF شاملٍ يتضمن جميع العمليات المُسجَّلة ({allTxsSorted.length} عملية)، الرسوم البيانية، قائمة الأعضاء وتقريرٌ ماليٌّ مفصَّل.
          </div>

          {/* Hidden print content */}
          <div id="pdf-report-content" style={{ display: "none" }}>
            <style>{pdfStyles}</style>
            <div className="pdf-wrap">
              {/* Header */}
              <div className="pdf-header">
                <div>
                  <div className="pdf-title">تقريرٌ عن الوضعية المالية للصندوق التعاوني</div>
                  <div className="pdf-sub">السنة المالية {year} — تقريرٌ شاملٌ لجميع العمليات</div>
                </div>
                <div className="pdf-date">
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#b2ede7" }}>تاريخ الإصدار</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{todayStr}</div>
                </div>
              </div>

              {/* KPIs */}
              <div className="pdf-kpi-row">
                {[
                  { label: "إجمالي المساهمات", val: totalC, color: "#2d9c8f", sign: "+" },
                  { label: "إجمالي التبرعات",  val: totalD, color: "#20b2aa", sign: "+" },
                  { label: "إجمالي المصروفات", val: totalE, color: "#e05252", sign: "−" },
                  { label: "الرصيد الصافي",    val: Math.abs(solde), color: solde >= 0 ? "#2d9c8f" : "#e05252", sign: solde >= 0 ? "+" : "−" },
                ].map(k => (
                  <div key={k.label} className="pdf-kpi" style={{ background: k.color + "0d" }}>
                    <div className="pdf-kpi-label">{k.label}</div>
                    <div className="pdf-kpi-value" style={{ color: k.color }}>{k.sign}{new Intl.NumberFormat("ar-MA").format(Math.round(k.val))} MRU</div>
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
                        <rect x={x + 2}           y={BAR_H - hC - 10} width={bw} height={hC || 1} fill="#2d9c8f" rx="2" />
                        <rect x={x + bw + 4}       y={BAR_H - hD - 10} width={bw} height={hD || 1} fill="#20b2aa" rx="2" />
                        <rect x={x + bw * 2 + 6}   y={BAR_H - hE - 10} width={bw} height={hE || 1} fill="#e05252" rx="2" />
                        <text x={x + barW / 2} y={BAR_H + 22} textAnchor="middle" fontSize="8" fill="#7a9ea2" fontFamily="sans-serif">
                          {MONTHS_AR[i].slice(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
                  {[["#2d9c8f","المساهمات"],["#20b2aa","التبرعات"],["#e05252","المصروفات"]].map(([c, l]) => (
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
                        { label: "مساهمات", val: totalC, color: "#2d9c8f" },
                        { label: "تبرعات",  val: totalD, color: "#20b2aa" },
                        { label: "مصروفات", val: totalE, color: "#e05252" },
                      ].map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                          <div style={{ width: 10, height: 10, background: s.color, borderRadius: 2 }} />
                          <span style={{ fontSize: 11, color: "#1a2b2e" }}>{s.label}</span>
                          <span style={{ fontSize: 10, color: s.color, fontWeight: 700, marginRight: "auto" }}>
                            {fmtAR(s.val)} MRU
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
                            <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700 }}>{fmtAR(m.total)} MRU</span>
                          </div>
                          <div style={{ background: "#e0f5f3", borderRadius: 3, height: 5 }}>
                            <div style={{ width: `${(m.total / maxMem) * 100}%`, height: "100%", background: "#2d9c8f", borderRadius: 3 }} />
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
                          <td style={{ color: "#2d9c8f" }}>{m.c > 0 ? fmtAR(m.c) + " MRU" : "—"}</td>
                          <td style={{ color: "#20b2aa" }}>{m.d > 0 ? fmtAR(m.d) + " MRU" : "—"}</td>
                          <td style={{ color: "#e05252" }}>{m.e > 0 ? fmtAR(m.e) + " MRU" : "—"}</td>
                          <td style={{ fontWeight: 700, color: net >= 0 ? "#2d9c8f" : "#e05252" }}>{net >= 0 ? "+" : ""}{fmtAR(net)} MRU</td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "#f0faf9", fontWeight: 700 }}>
                      <td style={{ fontWeight: 800 }}>الإجمالي</td>
                      <td style={{ color: "#2d9c8f", fontWeight: 800 }}>{fmtAR(totalC)} MRU</td>
                      <td style={{ color: "#20b2aa", fontWeight: 800 }}>{fmtAR(totalD)} MRU</td>
                      <td style={{ color: "#e05252", fontWeight: 800 }}>{fmtAR(totalE)} MRU</td>
                      <td style={{ color: solde >= 0 ? "#2d9c8f" : "#e05252", fontWeight: 800 }}>{solde >= 0 ? "+" : ""}{fmtAR(Math.abs(solde))} MRU</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* All transactions table */}
              <div className="pdf-section">
                <div className="pdf-section-title">📋 قائمة جميع العمليات ({allTxsSorted.length})</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>التاريخ</th>
                      <th>النوع</th>
                      <th>العضو / الجهة</th>
                      <th>المبلغ</th>
                      <th>ملاحظة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTxsSorted.map((tx, i) => {
                      const typeLabel = { contribution: "مساهمة", don: "تبرع", depense: "مصروف" }[tx.type];
                      const typeColor = { contribution: "#2d9c8f", don: "#20b2aa", depense: "#e05252" }[tx.type];
                      const typeBg   = { contribution: "rgba(45,156,143,0.1)", don: "rgba(32,178,170,0.1)", depense: "rgba(224,82,82,0.1)" }[tx.type];
                      const d = new Date(tx.date).toLocaleDateString("ar-MA", { day: "2-digit", month: "short", year: "numeric" });
                      return (
                        <tr key={tx.id}>
                          <td style={{ color: "#7a9ea2", fontWeight: 600 }}>{i + 1}</td>
                          <td>{d}</td>
                          <td>
                            <span className="pdf-badge" style={{ color: typeColor, background: typeBg }}>{typeLabel}</span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{tx.memberName || "—"}</td>
                          <td style={{ color: typeColor, fontWeight: 700 }}>{tx.type === "depense" ? "−" : "+"}{fmtAR(tx.amount)} MRU</td>
                          <td style={{ color: "#7a9ea2" }}>{tx.note || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Members contributions detail */}
              {topMembers.length > 0 && (
                <div className="pdf-section">
                  <div className="pdf-section-title">👥 تفصيل مساهمات الأعضاء</div>
                  <table className="pdf-table">
                    <thead>
                      <tr>
                        <th>العضو</th>
                        <th>عدد المساهمات</th>
                        <th>إجمالي المساهمات</th>
                        <th>نسبة المشاركة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(m => {
                        const mContribs = contribs.filter(tx => tx.memberId === m.id);
                        const total = mContribs.reduce((a, tx) => a + tx.amount, 0);
                        if (total === 0) return null;
                        const pct = totalC > 0 ? Math.round(total / totalC * 100) : 0;
                        return (
                          <tr key={m.id}>
                            <td style={{ fontWeight: 600 }}>{m.name}</td>
                            <td style={{ textAlign: "center" }}>{mContribs.length}</td>
                            <td style={{ color: "#2d9c8f", fontWeight: 700 }}>{fmtAR(total)} MRU</td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ flex: 1, background: "#e0f5f3", borderRadius: 3, height: 6 }}>
                                  <div style={{ width: `${pct}%`, height: "100%", background: "#2d9c8f", borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700, minWidth: 28 }}>{pct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              <div className="pdf-footer">
                <div>تقريرٌ صادرٌ عن أمين الصندوق التعاوني — تاريخ الإصدار: {todayStr}</div>
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
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Times New Roman','Times',serif;background:#fff;color:#1a2b2e;direction:rtl;font-size:14px;}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.pdf-section{page-break-inside:avoid;break-inside:avoid;}.pdf-header{page-break-after:avoid;}.pdf-kpi-row{page-break-inside:avoid;}.pdf-table{page-break-inside:auto;}.pdf-table tr{page-break-inside:avoid;}.pdf-table thead{display:table-header-group;}.pdf-footer{page-break-before:avoid;}}
</style></head><body>${el.innerHTML}</body></html>`;
            const blob = new Blob([html], { type: "text/html;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `تقرير-الصندوق-${year}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
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
function Reports({ txs, members, lang, xlsxReady, chartReady, onImportMembers, onImportTxs, onRefresh, onReset }) {
  const t = T[lang];
  const years = getYrs(txs);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

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

    const EXPORT_YEAR = 2026;
    const wb = window.XLSX.utils.book_new();
    const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

    // Transactions 2026 uniquement
    const txs2026all = txs.filter(tx => new Date(tx.date).getFullYear() === EXPORT_YEAR);

    // ── Feuille 1 : Contributions 2026 — matrice Membre × Mois ──
    const contribTxs = txs2026all.filter(tx => tx.type === "contribution");

    // Construire la matrice : pour chaque membre, montant par mois
    const contribMatrix = {}; // { memberName: { 0: montant, 1: montant, ... } }
    contribTxs.forEach(tx => {
      const key = tx.memberName || "—";
      const mIdx = new Date(tx.date).getMonth(); // 0-11
      if (!contribMatrix[key]) contribMatrix[key] = {};
      contribMatrix[key][mIdx] = (contribMatrix[key][mIdx] || 0) + tx.amount;
    });

    // Membres triés alphabétiquement (ou par total décroissant)
    const memberNames = members.map(m => m.name);
    // Ajouter membres qui ont contribué mais pas dans la liste
    contribTxs.forEach(tx => { if (!memberNames.includes(tx.memberName)) memberNames.push(tx.memberName || "—"); });

    // En-tête : Membre | janvier | février | ... | décembre | TOTAL
    const contribHeader = ["Membre", ...MONTHS_FR, "TOTAL"];
    const contribRows = [contribHeader];

    let grandTotal = 0;
    const totalsPerMonth = new Array(12).fill(0);

    memberNames.forEach(name => {
      const monthData = contribMatrix[name] || {};
      const rowTotal = Object.values(monthData).reduce((a, v) => a + v, 0);
      if (rowTotal === 0) {
        // Membre sans contribution — inclure quand même avec 0
        contribRows.push([name, ...new Array(12).fill(""), 0]);
        return;
      }
      grandTotal += rowTotal;
      const row = [name];
      for (let m = 0; m < 12; m++) {
        const val = monthData[m] || "";
        row.push(val);
        if (monthData[m]) totalsPerMonth[m] += monthData[m];
      }
      row.push(rowTotal);
      contribRows.push(row);
    });

    // Ligne totaux par mois
    const totalRow = ["TOTAL", ...totalsPerMonth.map(v => v || ""), grandTotal];
    contribRows.push([]);
    contribRows.push(totalRow);

    const wsC = window.XLSX.utils.aoa_to_sheet(contribRows);
    wsC["!cols"] = [{wch:28}, ...new Array(12).fill({wch:10}), {wch:12}];
    window.XLSX.utils.book_append_sheet(wb, wsC, `Contributions ${EXPORT_YEAR}`);

    // ── Feuille 2 : Dons 2026 — matrice Donateur × Mois ──
    const donTxs = txs2026all.filter(tx => tx.type === "don");
    const donMatrix = {};
    donTxs.forEach(tx => {
      const key = tx.memberName || "Anonyme";
      const mIdx = new Date(tx.date).getMonth();
      if (!donMatrix[key]) donMatrix[key] = {};
      donMatrix[key][mIdx] = (donMatrix[key][mIdx] || 0) + tx.amount;
    });

    const donHeader = ["Donateur", ...MONTHS_FR, "TOTAL"];
    const donRows = [donHeader];
    let grandTotalDon = 0;
    const donTotalsPerMonth = new Array(12).fill(0);

    Object.entries(donMatrix).forEach(([name, monthData]) => {
      const rowTotal = Object.values(monthData).reduce((a, v) => a + v, 0);
      grandTotalDon += rowTotal;
      const row = [name];
      for (let m = 0; m < 12; m++) {
        const val = monthData[m] || "";
        row.push(val);
        if (monthData[m]) donTotalsPerMonth[m] += monthData[m];
      }
      row.push(rowTotal);
      donRows.push(row);
    });

    donRows.push([]);
    donRows.push(["TOTAL", ...donTotalsPerMonth.map(v => v || ""), grandTotalDon]);

    const wsD = window.XLSX.utils.aoa_to_sheet(donRows);
    wsD["!cols"] = [{wch:28}, ...new Array(12).fill({wch:10}), {wch:12}];
    window.XLSX.utils.book_append_sheet(wb, wsD, `Dons ${EXPORT_YEAR}`);

    // ── Feuille 3 : Dépenses 2026 — liste détaillée ──
    const depTxs = txs2026all.filter(tx => tx.type === "depense").sort((a,b) => new Date(a.date) - new Date(b.date));
    const depRows = [
      ["Description / Objet", "Date", "Mois", "Montant (MRU)", "Note"],
      ...depTxs.map(tx => {
        const d = new Date(tx.date);
        return [tx.note || tx.memberName || "—", tx.date, MONTHS_FR[d.getMonth()], tx.amount, tx.note || ""];
      }),
      [],
      ["TOTAL DÉPENSES", "", "", depTxs.reduce((a, tx) => a + tx.amount, 0), ""]
    ];
    const wsE = window.XLSX.utils.aoa_to_sheet(depRows);
    wsE["!cols"] = [{wch:32},{wch:13},{wch:12},{wch:16},{wch:32}];
    window.XLSX.utils.book_append_sheet(wb, wsE, `Dépenses ${EXPORT_YEAR}`);

    // ── Feuille 4 : Résumé 2026 ──
    const totalC = contribTxs.reduce((a, tx) => a + tx.amount, 0);
    const totalD = donTxs.reduce((a, tx) => a + tx.amount, 0);
    const totalE = depTxs.reduce((a, tx) => a + tx.amount, 0);
    const resumeRows = [
      ["Indicateur", "Montant (MRU)"],
      ["Total Contributions", totalC],
      ["Total Dons", totalD],
      ["Total Dépenses", totalE],
      ["Solde net (Contributions + Dons − Dépenses)", totalC + totalD - totalE],
      [],
      ["Membres ayant contribué", Object.keys(contribMatrix).length],
      ["Nombre total d'opérations 2026", txs2026all.length],
    ];
    const wsR = window.XLSX.utils.aoa_to_sheet(resumeRows);
    wsR["!cols"] = [{wch:46},{wch:18}];
    window.XLSX.utils.book_append_sheet(wb, wsR, `Résumé ${EXPORT_YEAR}`);

    window.XLSX.writeFile(wb, `caisse_${EXPORT_YEAR}.xlsx`);
  }
  const [showPdf, setShowPdf] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const doReset = async () => {
    setResetting(true);
    await onReset();
    setResetting(false);
    setResetConfirm(false);
    setImportMsg(t.resetSuccess);
  };

  const doImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const XLSX = window.XLSX;
    if (!XLSX) return alert(t.xlsxWait);
    setImporting(true);
    setImportMsg(null);
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const sheetNames = wb.SheetNames;

      // Helper: parse date from various formats
      const parseDate = (raw) => {
        if (!raw) return new Date().toISOString().split("T")[0];
        if (raw instanceof Date) return raw.toISOString().split("T")[0];
        if (typeof raw === "number") { const d = new Date(Math.round((raw - 25569)*86400*1000)); return d.toISOString().split("T")[0]; }
        const s = String(raw).trim();
        if (s.includes("\\") || s.includes("/")) {
          const parts = s.split(/[\\/]/);
          if (parts.length === 3) {
            const [d, m, y] = parts;
            return `${y.padStart(4,"0")}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
          }
        }
        return s || new Date().toISOString().split("T")[0];
      };

      // Helper: insert a transaction row
      const insertTx = async (type, memberName, amount, date, note, memberIdx) => {
        if (amount <= 0) return 0;
        const foundMember = memberIdx[memberName.toLowerCase()];
        const memberId = foundMember ? foundMember.id : null;
        const finalMemberName = type === "depense" ? "—" : (foundMember ? foundMember.name : memberName);
        const { data: newTx } = await supabase.from("transactions").insert([{
          type, member_id: memberId, member_name: finalMemberName, amount, date, note
        }]).select().single();
        return newTx ? 1 : 0;
      };

      // ── Étape 1 : construire un index des membres existants (nom → id) ──
      const memberIndex = {};
      members.forEach(m => { memberIndex[m.name.trim().toLowerCase()] = m; });

      let membersImported = 0;
      let txsImported = 0;
      const newMemberIndex = { ...memberIndex };

      // ── DÉTECTION DU FORMAT ──────────────────────────────────────────────────
      // Format A : feuilles "Membres" + "Transactions"  (format import standard)
      // Format B : feuilles "Contributions YYYY" / "Dons YYYY" / "Dépenses YYYY" (export de l'app)
      const hasStdSheets  = sheetNames.includes("Membres") || sheetNames.includes("Transactions");
      const hasExportSheet = sheetNames.some(n => /^(Contributions|Dons|D.penses)/i.test(n));

      // ── FORMAT A : Membres + Transactions ───────────────────────────────────
      if (hasStdSheets) {
        // Import membres
        if (sheetNames.includes("Membres")) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets["Membres"]);
          for (const row of rows) {
            const name = String(row["Membre"] || row["membre"] || row["Name"] || row["name"] || "").trim();
            const phone = String(row["Téléphone"] || row["telephone"] || row["Phone"] || "").trim();
            if (!name) continue;
            const key = name.toLowerCase();
            if (!newMemberIndex[key]) {
              const { data: newM } = await supabase.from("members").insert([{ name, phone }]).select().single();
              if (newM) { newMemberIndex[key] = { id: newM.id, name: newM.name, phone: newM.phone || "" }; membersImported++; }
            }
          }
        }
        // Import transactions
        if (sheetNames.includes("Transactions")) {
          const typeMap = {
            "Contribution":"contribution","contribution":"contribution","Contributions":"contribution",
            "Don":"don","don":"don","Dons":"don",
            "Dépense":"depense","depense":"depense","Dépenses":"depense","depenses":"depense",
            "مساهمة":"contribution","المساهمات":"contribution",
            "تبرع":"don","التبرعات":"don",
            "مصروف":"depense","المصروفات":"depense"
          };
          const rows = XLSX.utils.sheet_to_json(wb.Sheets["Transactions"]);
          for (const row of rows) {
            const type = typeMap[row["Type"] || row["type"]] || "contribution";
            const amount = parseFloat(row["Montant"] || row["montant"] || row["Amount"] || 0);
            const memberName = String(row["Membre"] || row["membre"] || "—").trim();
            const date = parseDate(row["Date"] || row["date"]);
            const note = String(row["Note"] || row["note"] || "");
            txsImported += await insertTx(type, memberName, amount, date, note, newMemberIndex);
          }
        }
      }

      // ── FORMAT B : Contributions / Dons / Dépenses (fichier exporté par l'app) ─
      if (hasExportSheet) {
        // Parcourir toutes les feuilles et détecter le type
        for (const sheetName of sheetNames) {
          const sn = sheetName.toLowerCase();
          let txType = null;
          if (/^contribution/.test(sn)) txType = "contribution";
          else if (/^don/.test(sn)) txType = "don";
          else if (/^d.pense/.test(sn) || /^depense/.test(sn)) txType = "depense";
          if (!txType) continue;

          const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          // La matrice contributions/dons a : Membre | janvier | ... | décembre | TOTAL
          // La feuille dépenses a : Description | Date | Mois | Montant | Note
          const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

          for (const row of rows) {
            const firstKey = Object.keys(row)[0];
            const nameVal = String(row[firstKey] || "").trim();
            if (!nameVal || nameVal.toUpperCase() === "TOTAL" || !nameVal) continue;

            if (txType === "depense") {
              // Feuille dépenses : ligne par opération
              const amount = parseFloat(row["Montant (MRU)"] || row["Montant"] || row["montant"] || 0);
              const date = parseDate(row["Date"] || row["date"]);
              const note = String(row["Description / Objet"] || row["Note"] || row["note"] || nameVal || "");
              txsImported += await insertTx("depense", "—", amount, date, note, newMemberIndex);
            } else {
              // Feuille contributions / dons : matrice Membre × Mois
              // Vérifier ou créer le membre
              const memberName = nameVal;
              const key = memberName.toLowerCase();
              if (!newMemberIndex[key]) {
                const { data: newM } = await supabase.from("members").insert([{ name: memberName, phone: "" }]).select().single();
                if (newM) { newMemberIndex[key] = { id: newM.id, name: newM.name, phone: "" }; membersImported++; }
              }
              // Parcourir les colonnes mois
              for (let mi = 0; mi < 12; mi++) {
                const monthKey = MONTHS_FR[mi];
                // Chercher la colonne (case-insensitive, accent-insensitive)
                const colKey = Object.keys(row).find(k => k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"") === monthKey.normalize("NFD").replace(/[\u0300-\u036f]/g,""));
                if (!colKey) continue;
                const amount = parseFloat(row[colKey] || 0);
                if (amount <= 0) continue;
                // Utiliser le 1er du mois de l'année extraite du nom de la feuille
                const yearMatch = sheetName.match(/\d{4}/);
                const yr = yearMatch ? yearMatch[0] : new Date().getFullYear();
                const date = `${yr}-${String(mi+1).padStart(2,"0")}-01`;
                txsImported += await insertTx(txType, memberName, amount, date, "", newMemberIndex);
              }
            }
          }
        }
      }

      // ── Étape finale : recharger toutes les données depuis Supabase ──
      await onRefresh();
      setImportMsg(t.importSuccess(membersImported, txsImported));
    } catch(err) {
      console.error(err);
      setImportMsg(t.importError);
    }
    setImporting(false);
    e.target.value = "";
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
          { label: t.stats.contribution, value: yC, color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", icon: Ic.up("#8B5CF6", 15), sign: "+" },
          { label: t.stats.don,          value: yD, color: "#DB2777", bg: "rgba(219,39,119,0.08)", icon: Ic.heart("#DB2777", 15), sign: "+" },
          { label: t.stats.depense,      value: yE, color: C.red,     bg: C.redLt,                icon: Ic.dn(C.red, 15), sign: "−" },
        ].map(s => (
          <Card key={s.label} sx={{ padding: "12px 10px" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: C.muted, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>{s.label}</div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.sign}{fmt(s.value)}</div>
          </Card>
        ))}
      </div>

      {/* DONUT + TOP 5 + LINE CHART (données année sélectionnée) */}
      <DonutChart contrib={yC} dons={yD} dep={yE} lang={lang} chartReady={chartReady} />
      <TopMembers members={members} txs={txs2026} lang={lang} />
      <FinChart txs={txs2026} lang={lang} chartReady={chartReady} />

      {/* RESET */}
      <div style={{ marginTop: 20, borderTop: `1px solid ${C.mintLt}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.redLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🗑️</div>
          <span style={{ color: C.red, fontWeight: 700, fontSize: 14 }}>{t.resetBtn}</span>
        </div>
        {!resetConfirm ? (
          <button className="tbtn" onClick={() => setResetConfirm(true)}
            style={{ width: "100%", background: C.redLt, border: `1.5px solid rgba(224,82,82,0.3)`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.red }}>{t.resetBtn}</span>
          </button>
        ) : (
          <div style={{ background: C.redLt, border: `1.5px solid rgba(224,82,82,0.3)`, borderRadius: 14, padding: "16px" }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t.resetConfirmTitle}</div>
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>{t.resetConfirmMsg}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="tbtn" onClick={() => setResetConfirm(false)} style={{ flex: 1, background: C.card, border: `1.5px solid ${C.mintLt}`, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 500, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>{t.cancel}</button>
              <button className="tbtn" onClick={doReset} disabled={resetting} style={{ flex: 1, background: C.red, border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: resetting ? "not-allowed" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {resetting ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />...</> : t.delete}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* IMPORT */}
      <div style={{ marginTop: 20, borderTop: `1px solid ${C.mintLt}`, paddingTop: 20, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#EFF8FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📂</div>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{t.importBtn}</span>
          {!xlsxReady && <span style={{ fontSize: 10, color: C.muted, background: C.mintPale, borderRadius: 7, padding: "2px 8px", animation: "blink 1.4s infinite" }}>{t.xlsxWait}</span>}
        </div>
        <div style={{ fontSize: 10, color: C.muted, marginBottom: 10, lineHeight: 1.5 }}>{t.importInfo}</div>
        <label style={{ display: "block", cursor: xlsxReady ? "pointer" : "not-allowed" }}>
          <input type="file" accept=".xlsx,.xls" onChange={doImport} disabled={!xlsxReady || importing} style={{ display: "none" }} />
          <div style={{ background: importing ? C.mintPale : "#EFF8FF", border: `1.5px dashed ${importing ? C.mintLt : "#93C5FD"}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: xlsxReady ? 1 : 0.5 }}>
            {importing
              ? <><div style={{ width: 16, height: 16, border: `2px solid ${C.lime}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} /><span style={{ fontSize: 13, color: C.muted }}>Importation...</span></>
              : <><span style={{ fontSize: 18 }}>📥</span><span style={{ fontSize: 13, fontWeight: 600, color: "#2563EB" }}>{t.importBtn}</span></>
            }
          </div>
        </label>
        {importMsg && <div style={{ marginTop: 10, padding: "10px 14px", background: importMsg.startsWith("✅") ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 10, fontSize: 12, color: importMsg.startsWith("✅") ? "#15803D" : C.red, fontWeight: 500 }}>{importMsg}</div>}
      </div>

      {/* EXPORT */}
      <div style={{ marginTop: 6, borderTop: `1px solid ${C.mintLt}`, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: C.mintPale, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.dl(C.forestLt)}</div>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{t.exportBtn}</span>
          {!xlsxReady && <span style={{ fontSize: 10, color: C.muted, background: C.mintPale, border: `1px solid ${C.mintLt}`, borderRadius: 7, padding: "2px 8px", animation: "blink 1.4s infinite" }}>{t.xlsxWait}</span>}
        </div>
        {[
          { mode: "month", label: t.exportMonth, sub: `${t.monthsFull[month - 1]} ${year}`, color: C.forestLt, lt: C.mintPale, icon: "📊" },
          { mode: "all",   label: lang === "ar" ? "كل السنوات" : "Toutes les années", sub: `${txs.length} op · ${[...new Set(txs.map(tx => new Date(tx.date).getFullYear()))].length} an(s)`, color: C.gold, lt: C.goldLt, icon: "📥" },
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
      {showPdf && <PdfReportModal txs={txs} members={members} onClose={() => setShowPdf(false)} year={YEAR_STATS} />}
    </div>
  );
}
// ─── SETTINGS ─────────────────────────────────────────────────────────────────
const PROFILE_IMG = "data:image/jpeg;base64,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";

function Settings({ lang, setLang, t, onLogout }) {
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
      <div className="a1" style={{ background: "linear-gradient(135deg, #4C1D95, #7C3AED)", borderRadius: 22, padding: "22px 20px", marginBottom: 20, boxShadow: C.shadowMd }}>
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
        <button className="tbtn" onClick={onLogout} style={{ width: "100%", background: C.redLt, border: `1.5px solid rgba(224,82,82,0.2)`, borderRadius: 14, padding: "14px", color: C.red, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t.logout}</button>
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
    <button className="tbtn" onClick={onClick} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "2px 4px", fontFamily: "inherit" }}>
      <div style={{ width: 44, height: 32, borderRadius: 16, background: active ? "rgba(45,156,143,0.22)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s" }}>
        {active ? activeIcon : icon}
      </div>
      <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? "#6dcfc4" : "rgba(255,255,255,0.35)", transition: "color .18s", letterSpacing: 0.3 }}>{label}</span>
      {active && <div style={{ width: 16, height: 2.5, borderRadius: 4, background: "#2d9c8f", marginTop: 1 }} />}
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
  const { members, txs, loading, addTx, updateTx, deleteTx, addMember, deleteMember, fetchAll, resetAll } = useSupabaseData();

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
    { id: "home",     label: t.tabs.home,     icon: Ic.home(nC),   aicon: Ic.home(C.mint)  },
    { id: "ops",      label: t.tabs.ops,      icon: Ic.swap(nC),   aicon: Ic.swap(C.mint)  },
    { id: "members",  label: t.tabs.members,  icon: Ic.users(nC),  aicon: Ic.users(C.mint) },
    { id: "reports",  label: t.tabs.reports,  icon: Ic.bar(nC),    aicon: Ic.bar(C.mint)   },
    { id: "settings", label: t.tabs.settings, icon: Ic.gear(nC),   aicon: Ic.gear(C.mint)  },
  ];

  if (loading) return (
    <div style={{ background: "#F2EFE9", minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
      <div style={{ width: 36, height: 36, border: `3px solid ${C.mint}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <div style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>Chargement…</div>
    </div>
  );

  return (
    <div style={{ background: "#F2EFE9", minHeight: "100dvh", width: "100%", maxWidth: 430, margin: "0 auto", fontFamily: "'Times New Roman','Times',serif", color: C.text, position: "relative", paddingBottom: 90, overflowX: "hidden" }}>
      <style>{G}</style>
      <div style={{ padding: "20px 16px" }}>
        {tab === "home"     && <Dashboard txs={txs} members={members} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} onTabChange={setTab} lang={lang} setLang={setLang} chartReady={chartReady} />}
        {tab === "ops"      && <Operations txs={txs} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} lang={lang} />}
        {tab === "members"  && <Members members={members} txs={txs} onAddMember={() => setModal({ kind: "membre" })} onDeleteMember={deleteMember} lang={lang} />}
        {tab === "reports"  && <Reports txs={txs} members={members} lang={lang} xlsxReady={xlsxReady} chartReady={chartReady} onImportMembers={addMember} onImportTxs={addTx} onRefresh={fetchAll} onReset={resetAll} />}
        {tab === "settings" && <Settings lang={lang} setLang={setLang} t={t} onLogout={() => { try { sessionStorage.removeItem("cc_user"); } catch {} setLoggedIn(false); }} />}
      </div>
      <nav style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 398, background: "#1a2b2e", borderRadius: 36, display: "flex", padding: "10px 12px", zIndex: 200, gap: 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: "0 8px 32px rgba(26,43,46,0.30)" }}>
        {TABS.map((tb) => <NavItem key={tb.id} label={tb.label} icon={tb.icon} activeIcon={tb.aicon} active={tab === tb.id} onClick={() => setTab(tb.id)} />)}
      </nav>
      {modal?.kind === "tx"     && <TxSheet type={modal.txType} members={members} onSave={saveTx} onClose={() => setModal(null)} lang={lang} editTx={modal.editTx || null} />}
      {modal?.kind === "membre" && <MemberSheet onSave={addMember} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}
