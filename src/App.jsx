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

// ─── DESIGN TOKENS — Crème & Violet ──────────────────────────────────────────
const C = {
  forest:    "#1A1429",
  forestMid: "#5B21B6",
  forestLt:  "#6B21E8",
  mint:      "#E9E0FF",
  mintLt:    "#EDE5F5",
  mintPale:  "#F5F0FA",
  lime:      "#C4B5FD",
  sage:      "#A78BFA",
  bg:        "#F2EFE9",
  card:      "#FFFFFF",
  text:      "#1A1429",
  muted:     "#7A6E8A",
  sub:       "#A899BC",
  red:       "#E53E3E",
  redLt:     "#FEE2E2",
  gold:      "#6B21E8",
  goldLt:    "#F0EBFF",
  shadow:    "0 2px 12px rgba(107,33,232,0.07)",
  shadowMd:  "0 6px 24px rgba(107,33,232,0.10)",
  shadowLg:  "0 16px 48px rgba(107,33,232,0.14)",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');`;

const G = `
  ${FONTS}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;overscroll-behavior:none;}
  body{background:#F2EFE9;-webkit-font-smoothing:antialiased;font-family:'Inter',sans-serif;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;font-size:15px;}
  #root{height:100%;display:flex;justify-content:center;background:#F2EFE9;}
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
  search: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  trophy: (c, s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><path d="M5 3h14"/><path d="M5 3v5a7 7 0 0014 0V3"/><path d="M9 17v-4"/><path d="M15 17v-4"/></svg>),
  xcircle: (c, s = 12) => (<svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><circle cx="12" cy="12" r="10" opacity="0.25"/><line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>),
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    dir: "ltr", font: "'DM Sans', sans-serif",
    greeting: "Trésorier", userName: "Cheikh Brahim", subtitle: "Caisse communautaire",
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
    dir: "rtl", font: "'DM Sans', sans-serif",
    greeting: "أمين الصندوق", userName: "الشيخ إبراهيم", subtitle: "صندوق تعاوني",
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
  return <div className={className} style={{ background: C.card, borderRadius: 22, boxShadow: "0 2px 16px rgba(107,33,232,0.06)", border: "1px solid rgba(107,33,232,0.08)", ...sx }}>{children}</div>;
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
        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `2px solid ${f ? "#6B21E8" : "rgba(107,33,232,0.2)"}`, borderRadius: 0, padding: "10px 2px", color: "#1A1429", fontSize: 15, outline: "none", direction: dir, fontFamily: "inherit", transition: "border-color .2s", ...sx }} />
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
      style={{ background: disabled ? "#C4B5FD" : "#6B21E8", border: "none", color: "#fff", borderRadius: 50, padding: "16px 20px", fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", width: "100%", marginTop: 8, boxShadow: disabled ? "none" : "0 8px 24px rgba(107,33,232,0.30)", fontFamily: "inherit", letterSpacing: 0.2, ...sx }}>
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
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(26,20,41,0.5)", backdropFilter: "blur(14px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#F2EFE9", borderRadius: "26px 26px 0 0", width: "100%", maxWidth: 430, maxHeight: "93vh", overflowY: "auto", padding: "0 20px 44px", animation: "sheet .32s cubic-bezier(.16,1,.3,1)", direction: dir, boxShadow: "0 -12px 50px rgba(26,20,41,0.18)" }}>
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
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(26,20,41,0.55)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
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
  const btnStyle = { background: C.card, border: "1.5px solid #EDEDF5", borderRadius: 20, padding: "20px 8px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 11, boxShadow: "0 2px 12px rgba(91,33,182,0.06)", transition: "all .22s" };
  const iconBg = { width: 54, height: 54, borderRadius: "50%", background: "#EEEAF8", display: "flex", alignItems: "center", justifyContent: "center" };
  const lblStyle = { fontSize: 12, fontWeight: 500, color: C.text, textAlign: "center" };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>

      {/* Contribution - cercle avec + */}
      <button className="tbtn cat-card" onClick={() => onAdd("contribution")} style={btnStyle}>
        <div style={iconBg}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
        <span style={lblStyle}>{T[lang].txTypes.contribution}</span>
      </button>

      {/* Don - mains tendant un cœur */}
      <button className="tbtn cat-card" onClick={() => onAdd("don")} style={btnStyle}>
        <div style={iconBg}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {/* Cœur */}
            <path d="M12 7.5C12 7.5 11 5.5 9 5.5C7.5 5.5 6 6.8 6 8.5C6 10.5 8 12 12 14C16 12 18 10.5 18 8.5C18 6.8 16.5 5.5 15 5.5C13 5.5 12 7.5 12 7.5Z" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.6"/>
            {/* Main gauche */}
            <path d="M5 17C5 17 4 16 4 15V13C4 12.4 4.4 12 5 12H7L9 14H15L17 12H19C19.6 12 20 12.4 20 13V15C20 16 19 17 19 17H5Z" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.6"/>
          </svg>
        </div>
        <span style={lblStyle}>{T[lang].txTypes.don}</span>
      </button>

      {/* Dépense - portefeuille */}
      <button className="tbtn cat-card" onClick={() => onAdd("depense")} style={btnStyle}>
        <div style={iconBg}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {/* Corps portefeuille */}
            <rect x="2" y="7" width="20" height="13" rx="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.7"/>
            {/* Rabat haut */}
            <path d="M16 7V5.5C16 4.7 15.3 4 14.5 4H6C4.9 4 4 4.9 4 6V7" stroke="#7C3AED" strokeWidth="1.7"/>
            {/* Poche pièce */}
            <rect x="15" y="12" width="5" height="4" rx="1.5" fill="#7C3AED" opacity="0.25" stroke="#7C3AED" strokeWidth="1.5"/>
            {/* Pièce */}
            <circle cx="17.5" cy="14" r="1" fill="#7C3AED"/>
          </svg>
        </div>
        <span style={lblStyle}>{T[lang].txTypes.depense}</span>
      </button>

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
  const curYear  = new Date().getFullYear();
  const prevYear = curYear - 1;
  const txsPrev   = txs.filter(tx => new Date(tx.date).getFullYear() === prevYear);
  const soldePrev = txsPrev.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
  const solde   = txs.reduce((a, tx) => tx.type === "depense" ? a - tx.amount : a + tx.amount, 0);
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
        <div style={{ background: "linear-gradient(135deg, #7B2FE8 0%, #5B16CC 100%)", borderRadius: 24, padding: "24px 22px 20px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: 40, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -10, bottom: -8, width: 130, height: 130, opacity: 0.92, pointerEvents: "none" }}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="55" cy="165" rx="22" ry="7" fill="#F5C842" opacity="0.9"/>
              <ellipse cx="55" cy="158" rx="22" ry="7" fill="#E8A838"/>
              <ellipse cx="55" cy="151" rx="22" ry="7" fill="#F5C842" opacity="0.9"/>
              <ellipse cx="55" cy="144" rx="22" ry="7" fill="#E8A838"/>
              <ellipse cx="42" cy="170" rx="14" ry="5" fill="#F5C842" opacity="0.8"/>
              <ellipse cx="42" cy="165" rx="14" ry="5" fill="#E8A838"/>
              <ellipse cx="120" cy="130" rx="52" ry="55" fill="#C084FC"/>
              <ellipse cx="120" cy="130" rx="52" ry="55" fill="url(#bagGrad)"/>
              <rect x="105" y="68" width="30" height="22" rx="8" fill="#7C3AED"/>
              <ellipse cx="120" cy="66" rx="18" ry="10" fill="#6D28D9"/>
              <text x="120" y="140" textAnchor="middle" fontSize="38" fontWeight="bold" fill="white" opacity="0.9">$</text>
              <defs>
                <radialGradient id="bagGrad" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
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
            <div style={{ background: C.bg, borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, padding: "0 20px 40px", animation: "sheet .3s cubic-bezier(.16,1,.3,1)" }}
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
            style={{ background: C.card, border: "1.5px solid #EDEDF5", borderRadius: 18, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: "0 2px 12px rgba(91,33,182,0.06)", transition: "all .2s" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(139,92,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.contribution}</div>
              <div style={{ color: "#8B5CF6", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>+{fmtSh(contrib)}</div>
            </div>
          </button>
          {/* Dons */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[1])}
            style={{ background: C.card, border: "1.5px solid #F0C0D8", borderRadius: 18, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: "0 2px 16px rgba(219,39,119,0.08)", transition: "all .2s" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(219,39,119,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.don}</div>
              <div style={{ color: "#DB2777", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>+{fmtSh(dons)}</div>
            </div>
          </button>
          {/* Dépenses */}
          <button className="tbtn" onClick={() => setStatModal(statsRow[2])}
            style={{ background: C.card, border: "1.5px solid #EDEDF5", borderRadius: 18, padding: "16px 14px 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, boxShadow: "0 2px 12px rgba(91,33,182,0.06)", transition: "all .2s" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(91,33,182,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.depense}</div>
              <div style={{ color: "#5B21B6", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>-{fmtSh(dep)}</div>
            </div>
          </button>
          {/* Solde année passée */}
          <div style={{ background: soldePrev >= 0 ? "linear-gradient(135deg,rgba(124,58,237,0.07),rgba(196,181,253,0.14))" : "rgba(254,226,226,0.6)", border: `1.5px solid ${soldePrev >= 0 ? "#EDE9FE" : "#FECACA"}`, borderRadius: 18, padding: "16px 14px 14px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: soldePrev >= 0 ? "rgba(124,58,237,0.08)" : "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={soldePrev >= 0 ? "#7C3AED" : "#EF4444"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
            </div>
            <div>
              <div style={{ color: "#A0A0B8", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{lang === "ar" ? `رصيد ${prevYear}` : `Solde ${prevYear}`}</div>
              <div style={{ color: soldePrev >= 0 ? "#7C3AED" : "#EF4444", fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>{soldePrev >= 0 ? "+" : ""}{fmtSh(soldePrev)}</div>
            </div>
          </div>
        </div>
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
  const [selYear,  setSelYear]  = useState("all");
  const [selType,  setSelType]  = useState("all");
  const [selMonth, setSelMonth] = useState("all");

  const sorted = [...txs]
    .filter(tx => {
      const d = new Date(tx.date);
      if (selYear  !== "all" && d.getFullYear()   !== Number(selYear))  return false;
      if (selType  !== "all" && tx.type           !== selType)           return false;
      if (selMonth !== "all" && d.getMonth() + 1  !== Number(selMonth)) return false;
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

  const selStyle = {
    width: "100%", background: "#fff", border: `1.5px solid ${C.mintLt}`,
    borderRadius: 12, padding: "10px 30px 10px 13px", color: C.text,
    fontSize: 13, outline: "none", fontFamily: "inherit",
    appearance: "none", cursor: "pointer", boxShadow: C.shadow,
  };

  // Libellé du filtre actif
  const activeLabel = [
    selYear  !== "all" ? selYear  : null,
    selType  !== "all" ? CFG(lang)[selType]?.label : null,
    selMonth !== "all" ? t.months[Number(selMonth) - 1] : null,
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
          <button className="tbtn" onClick={() => { setSelYear("all"); setSelType("all"); setSelMonth("all"); }} style={pillStyle(selYear === "all")}>
            {lang === "ar" ? "الكل" : "Toutes"}
          </button>
          {allYears.map(y => (
            <button key={y} className="tbtn" onClick={() => { setSelYear(String(y)); setSelType("all"); setSelMonth("all"); }}
              style={pillStyle(selYear === String(y), C.forestLt)}>
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* ─ ÉTAPE 2 : Type (activé seulement si année sélectionnée) ─ */}
      <div style={{ marginBottom: 10, opacity: selYear === "all" ? 0.4 : 1, pointerEvents: selYear === "all" ? "none" : "auto", transition: "opacity .2s" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7, paddingLeft: 2 }}>
          {lang === "ar" ? "② نوع العملية" : "② Type"}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
          <button className="tbtn" onClick={() => { setSelType("all"); setSelMonth("all"); }} style={pillStyle(selType === "all")}>
            {lang === "ar" ? "الكل" : "Tous"}
          </button>
          {["contribution", "don", "depense"].map(tp => {
            const cfg = CFG(lang)[tp];
            return (
              <button key={tp} className="tbtn" onClick={() => { setSelType(tp); setSelMonth("all"); }}
                style={pillStyle(selType === tp, cfg.color)}>
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─ ÉTAPE 3 : Mois (activé seulement si type sélectionné) ─ */}
      <div style={{ marginBottom: 14, opacity: selType === "all" ? 0.4 : 1, pointerEvents: selType === "all" ? "none" : "auto", transition: "opacity .2s" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7, paddingLeft: 2 }}>
          {lang === "ar" ? "③ الشهر" : "③ Mois"}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
          <button className="tbtn" onClick={() => setSelMonth("all")} style={pillStyle(selMonth === "all")}>
            {lang === "ar" ? "الكل" : "Tous"}
          </button>
          {t.months.map((m, i) => (
            <button key={i} className="tbtn" onClick={() => setSelMonth(String(i + 1))}
              style={pillStyle(selMonth === String(i + 1), C.forestLt)}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Compteur + badge filtre actif */}
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
                    <div style={{ color: C.forestLt, fontWeight: 700, fontSize: 12 }}>{fmtSh(total)}</div>
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
            ticks: { color: "#6B5E8A", font: { size: 11, family: "DM Sans", weight: "600" } },
            border: { display: false },
          },
          y: {
            grid: { color: "#EDE9FE" },
            ticks: { color: "#9D8BC0", font: { size: 9, family: "DM Sans" }, callback: v => v >= 1000 ? (v/1000).toFixed(0)+"k" : v },
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
      const typeMap = {
        "Contribution": "contribution", "contribution": "contribution",
        "Contributions": "contribution", "contributions": "contribution",
        "Don": "don", "don": "don", "Dons": "don", "dons": "don",
        "Dépense": "depense", "depense": "depense",
        "Dépenses": "depense", "depenses": "depense",
        "مساهمة": "contribution", "المساهمات": "contribution",
        "تبرع": "don", "التبرعات": "don",
        "مصروف": "depense", "المصروفات": "depense"
      };

      // ── Étape 1 : construire un index des membres existants (nom → id) ──
      const memberIndex = {};
      members.forEach(m => { memberIndex[m.name.trim().toLowerCase()] = m; });

      // ── Étape 2 : importer les membres de la feuille Membres ──
      let membersImported = 0;
      const newMemberIndex = { ...memberIndex };
      if (wb.SheetNames.includes("Membres")) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets["Membres"]);
        for (const row of rows) {
          const name = String(row["Membre"] || row["membre"] || row["Name"] || row["name"] || "").trim();
          const phone = String(row["Téléphone"] || row["telephone"] || row["Phone"] || "").trim();
          if (!name) continue;
          const key = name.toLowerCase();
          if (!newMemberIndex[key]) {
            // Créer le membre dans Supabase et récupérer son ID
            const { data: newM } = await supabase.from("members").insert([{ name, phone }]).select().single();
            if (newM) {
              const m = { id: newM.id, name: newM.name, phone: newM.phone || "" };
              newMemberIndex[key] = m;
              membersImported++;
            }
          }
        }
      }

      // ── Étape 3 : importer les transactions en liant l'ID du membre ──
      let txsImported = 0;
      if (wb.SheetNames.includes("Transactions")) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets["Transactions"]);
        for (const row of rows) {
          const type = typeMap[row["Type"] || row["type"]] || "contribution";
          const amount = parseFloat(row["Montant"] || row["montant"] || row["Amount"] || 0);
          const memberName = String(row["Membre"] || row["membre"] || "—").trim();
          let date = row["Date"] || row["date"];
          if (date instanceof Date) date = date.toISOString().split("T")[0];
          else if (typeof date === "number") { const d = new Date(Math.round((date - 25569)*86400*1000)); date = d.toISOString().split("T")[0]; }
          else {
            date = String(date || "").trim();
            // Handle formats: "01\03\2026", "01/03/2026", "2026-03-01"
            if (date.includes("\\") || date.includes("/")) {
              const parts = date.split(/[\\/]/);
              if (parts.length === 3) {
                // DD/MM/YYYY → YYYY-MM-DD
                const [d, m, y] = parts;
                date = `${y.padStart(4,"0")}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
              }
            }
            if (!date || date === "undefined") date = new Date().toISOString().split("T")[0];
          }
          const note = String(row["Note"] || row["note"] || "");
          if (amount <= 0) continue;

          // Chercher l'ID du membre par son nom
          const foundMember = newMemberIndex[memberName.toLowerCase()];
          const memberId = foundMember ? foundMember.id : null;
          const finalMemberName = type === "depense" ? "—" : (foundMember ? foundMember.name : memberName);

          const { data: newTx } = await supabase.from("transactions").insert([{
            type, member_id: memberId, member_name: finalMemberName,
            amount, date, note
          }]).select().single();
          if (newTx) txsImported++;
        }
      }

      // ── Étape 4 : recharger toutes les données depuis Supabase ──
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
      {/* Sélecteurs mois/année pour export */}
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

      {/* TITRE STATS */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 4, height: 20, background: "linear-gradient(180deg,#7C3AED,#C084FC)", borderRadius: 2 }} />
        <span style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{lang === "ar" ? `إحصائيات ${YEAR_STATS}` : `Statistiques ${YEAR_STATS}`}</span>
      </div>

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
            <div style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.sign}{fmtSh(s.value)}</div>
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
    </div>
  );
}
// ─── SETTINGS ─────────────────────────────────────────────────────────────────
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
      <div style={{ width: 44, height: 32, borderRadius: 16, background: active ? "rgba(107,33,232,0.22)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s" }}>
        {active ? activeIcon : icon}
      </div>
      <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? "#D4BFFF" : "rgba(255,255,255,0.30)", transition: "color .18s", letterSpacing: 0.3 }}>{label}</span>
      {active && <div style={{ width: 16, height: 2.5, borderRadius: 4, background: "#6B21E8", marginTop: 1 }} />}
    </button>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const VALID_PIN = "2526";

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [pinFocus, setPinFocus] = useState(false);

  const handleLogin = () => {
    if (!name.trim()) { setError("Veuillez saisir votre nom."); return; }
    if (pin !== VALID_PIN) {
      setError("Code PIN incorrect.");
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
      return;
    }
    onLogin(name.trim());
  };

  const LOGIN_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .login-wrap{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) both}
    .login-input::placeholder{color:rgba(220,210,255,0.45)}
    .login-btn:active{transform:scale(.97)}
    .login-btn:hover{filter:brightness(1.08)}
  `;

  return (
    <div style={{
      position: "relative", minHeight: "100vh", minHeight: "100dvh",
      width: "100%", maxWidth: 430, margin: "0 auto", overflow: "hidden",
      background: "linear-gradient(160deg, #3B1A6E 0%, #5B2AA0 40%, #7B3FCC 70%, #9B5DE5 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "40px 28px",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{LOGIN_CSS}</style>

      {/* ── Motif géométrique — lignes polygonales ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 430 900" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Coins haut */}
        <polygon points="0,0 120,0 60,90" stroke="rgba(200,170,255,0.18)" strokeWidth="1" fill="none"/>
        <polygon points="0,0 90,0 0,80" stroke="rgba(200,170,255,0.12)" strokeWidth="1" fill="none"/>
        <polygon points="430,0 310,0 380,100" stroke="rgba(200,170,255,0.18)" strokeWidth="1" fill="none"/>
        <polygon points="430,0 340,0 430,90" stroke="rgba(200,170,255,0.12)" strokeWidth="1" fill="none"/>
        {/* Coins bas */}
        <polygon points="0,900 130,900 50,800" stroke="rgba(200,170,255,0.15)" strokeWidth="1" fill="none"/>
        <polygon points="430,900 300,900 400,800" stroke="rgba(200,170,255,0.15)" strokeWidth="1" fill="none"/>
        <polygon points="430,900 350,900 430,820" stroke="rgba(200,170,255,0.10)" strokeWidth="1" fill="none"/>
        {/* Lignes décoratives diagonales */}
        <line x1="0" y1="200" x2="120" y2="80" stroke="rgba(200,170,255,0.10)" strokeWidth="1"/>
        <line x1="430" y1="200" x2="310" y2="80" stroke="rgba(200,170,255,0.10)" strokeWidth="1"/>
        <line x1="0" y1="700" x2="130" y2="820" stroke="rgba(200,170,255,0.08)" strokeWidth="1"/>
        <line x1="430" y1="700" x2="300" y2="820" stroke="rgba(200,170,255,0.08)" strokeWidth="1"/>
      </svg>

      {/* ── Titre centré ── */}
      <div className="login-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 48, animationDelay: "0ms" }}>
        <div style={{
          fontSize: 52, fontWeight: 900, lineHeight: 1.0, letterSpacing: -1,
          fontFamily: "'Playfair Display', serif",
          background: "linear-gradient(180deg, #FFFFFF 0%, #D4B8FF 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Caisse<br/>CHEBAB
        </div>
        <div style={{ fontSize: 15, color: "rgba(220,205,255,0.80)", fontWeight: 400, marginTop: 12, letterSpacing: 0.2 }}>
          Connectez-vous pour continuer
        </div>
      </div>

      {/* ── Carte glassmorphism ── */}
      <div className="login-wrap" style={{
        position: "relative", zIndex: 1, width: "100%",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.22)",
        padding: "32px 28px 28px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
        animationDelay: "80ms",
      }}>

        {/* Champ NOM */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(220,205,255,0.75)", letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 10 }}>NOM</div>
          <input
            className="login-input"
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Votre nom..."
            style={{
              width: "100%",
              background: nameFocus ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.10)",
              border: `1.5px solid ${nameFocus ? "rgba(200,170,255,0.7)" : "rgba(200,170,255,0.25)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              fontSize: 15,
              color: "#fff",
              outline: "none",
              fontFamily: "inherit",
              transition: "all .2s",
              boxShadow: nameFocus ? "0 0 0 3px rgba(180,120,255,0.20)" : "none",
            }}
          />
        </div>

        {/* Champ CODE PIN */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(220,205,255,0.75)", letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 10 }}>CODE PIN</div>
          <input
            className="login-input"
            value={pin}
            onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 4); setPin(v); setError(""); }}
            onFocus={() => setPinFocus(true)}
            onBlur={() => setPinFocus(false)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="● ● ● ●"
            type="password"
            inputMode="numeric"
            maxLength={4}
            style={{
              width: "100%",
              background: pinFocus ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.10)",
              border: `1.5px solid ${shake ? "rgba(255,100,100,0.8)" : pinFocus ? "rgba(200,170,255,0.7)" : "rgba(200,170,255,0.25)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              fontSize: 22,
              color: "#fff",
              outline: "none",
              fontFamily: "inherit",
              transition: "all .2s",
              letterSpacing: 10,
              boxShadow: shake ? "0 0 0 3px rgba(255,100,100,0.20)" : pinFocus ? "0 0 0 3px rgba(180,120,255,0.20)" : "none",
              animation: shake ? "shake .4s ease" : "none",
            }}
          />
        </div>

        {/* Erreur */}
        {error && (
          <div style={{ background: "rgba(255,80,80,0.18)", border: "1px solid rgba(255,100,100,0.35)", borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: "#FFB3B3", fontWeight: 500 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Bouton Se connecter */}
        <button className="tbtn login-btn" onClick={handleLogin}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #6B21E8 0%, #8B35FF 100%)",
            border: "none",
            color: "#fff",
            borderRadius: 12,
            padding: "17px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 6px 24px rgba(107,33,232,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
            letterSpacing: 0.3,
            transition: "all .18s",
          }}>
          Se connecter
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
    <div style={{ background: "#F2EFE9", minHeight: "100vh", minHeight: "100dvh", width: "100%", maxWidth: 430, margin: "0 auto", fontFamily: "'Inter',sans-serif", color: C.text, position: "relative", paddingBottom: 90, overflowX: "hidden" }}>
      <style>{G}</style>
      <div style={{ padding: "20px 16px" }}>
        {tab === "home"     && <Dashboard txs={txs} members={members} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} onTabChange={setTab} lang={lang} setLang={setLang} chartReady={chartReady} />}
        {tab === "ops"      && <Operations txs={txs} onAdd={(tp) => setModal({ kind: "tx", txType: tp })} onDelete={deleteTx} onEdit={editTx} lang={lang} />}
        {tab === "members"  && <Members members={members} txs={txs} onAddMember={() => setModal({ kind: "membre" })} onDeleteMember={deleteMember} lang={lang} />}
        {tab === "reports"  && <Reports txs={txs} members={members} lang={lang} xlsxReady={xlsxReady} chartReady={chartReady} onImportMembers={addMember} onImportTxs={addTx} onRefresh={fetchAll} onReset={resetAll} />}
        {tab === "settings" && <Settings lang={lang} setLang={setLang} t={t} onLogout={() => { try { sessionStorage.removeItem("cc_user"); } catch {} setLoggedIn(false); }} />}
      </div>
      <nav style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 398, background: "#1A1429", borderRadius: 36, display: "flex", padding: "10px 12px", zIndex: 200, gap: 0, flexDirection: t.dir === "rtl" ? "row-reverse" : "row", boxShadow: "0 8px 32px rgba(26,20,41,0.28)" }}>
        {TABS.map((tb) => <NavItem key={tb.id} label={tb.label} icon={tb.icon} activeIcon={tb.aicon} active={tab === tb.id} onClick={() => setTab(tb.id)} />)}
      </nav>
      {modal?.kind === "tx"     && <TxSheet type={modal.txType} members={members} onSave={saveTx} onClose={() => setModal(null)} lang={lang} editTx={modal.editTx || null} />}
      {modal?.kind === "membre" && <MemberSheet onSave={addMember} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}
