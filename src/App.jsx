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
    flds: { amount: "Montant", desc: "Description", member: "Membre", date: "Date", donor: "Nom du donateur", donorPh: "Anonyme", memberPh: "Sélectionner un membre", notePh: "Description…" },
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
    flds: { amount: "المبلغ", desc: "الوصف", member: "العضو", date: "التاريخ", donor: "اسم المتبرع", donorPh: "مجهول", memberPh: "اختر عضواً", notePh: "وصف العملية…" },
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
const fmt = (n) => new Intl.NumberFormat("fr-FR").format(n);
const fmtN = (n) => new Intl.NumberFormat("fr-FR").format(n);
const fmtSh = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
const fmtDt = (d, l) => new Date(d).toLocaleDateString(l === "ar" ? "ar-MA" : "fr-FR", { day: "2-digit", month: "short", year: "numeric" });
const inits = (n) => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const getYrs = (txs) => { const s = new Set(txs.map((t) => new Date(t.date).getFullYear())); s.add(new Date().getFullYear()); return [...s].sort((a, b) => b - a); };

const CFG = (lang) => ({
  contribution: { label: T[lang].txTypes.contribution, color: C.forestLt, lt: "rgba(200,135,42,0.12)", icon: () => Ic.up(C.forestLt), sign: "" },
  don:          { label: T[lang].txTypes.don,          color: C.gold,      lt: C.goldLt,              icon: () => Ic.heart(C.gold),   sign: "" },
  depense:      { label: T[lang].txTypes.depense,      color: C.red,       lt: C.redLt,               icon: () => Ic.dn(C.red),       sign: "" },
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

  const fetchAll = async (silent = false) => {
    if (!silent) setLoading(true);
    const [{ data: mData }, { data: tData }] = await Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: true }),
      supabase.from("transactions").select("*").order("created_at", { ascending: false }),
    ]);
    if (mData) setMembers(mData.map(m => ({ id: m.id, name: m.name, phone: m.phone || "" })));
    if (tData) setTxs(tData.map(t => ({ id: t.id, type: t.type, memberId: t.member_id, memberName: t.member_name, amount: t.amount, date: t.date, note: t.note || "" })));
    if (!silent) setLoading(false);
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
          <span style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.sign}{fmtN(tx.amount)}</span>
          <div className="txacts" style={{ display: "flex", gap: 4, opacity: 0, transition: "opacity .15s" }}>
            <button className="tbtn" onClick={() => onEdit(tx)} style={{ background: C.mintPale, border: "none", color: C.forestLt, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.edit(C.forestLt)}</button>
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
    { label: t.stats.contribution, value: contrib, accentColor: C.mint,   sign: "", type: "contribution" },
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
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(45,156,143,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Icône pièce/contribution */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d9c8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M9.5 10.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-2.5 3-2.5 3s-2.5-1.5-2.5-3z" fill="rgba(45,156,143,0.18)"/><path d="M9.5 13.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"/></svg>
            </div>
            <div>
              <div style={{ color: C.sub, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.stats.contribution}</div>
              <div style={{ color: "#2d9c8f", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{fmtN(contrib)}</div>
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
              <div style={{ color: "#20b2aa", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{fmtN(dons)}</div>
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
                {fmtN(Math.abs(soldePrev))}
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
                <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 7 }}>{lang === "ar" ? `رصيد ${prevYear}` : `Solde ${prevYear}`}</div>
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
                    <span style={{ color: C.forestLt, fontSize: 13, fontWeight: 700 }}>{fmtN(val)}</span>
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
                    <div style={{ color: C.forestLt, fontWeight: 700, fontSize: 12 }}>{fmtN(total)}</div>
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
            callbacks: { label: ctx => " " + new Intl.NumberFormat("fr-FR").format(ctx.parsed.y) }
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
              <span style={{ color: AVC2[i], fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{new Intl.NumberFormat("fr-FR").format(m.total)}</span>
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
          <div style={{ width: 40, height: 4, background: C.sage, borderRadius: 4 }} />
        </div>

        {/* Header */}
        <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 17 }}>تقرير الصندوق {year}</div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>تقرير مالي شامل — معاينة</div>
          </div>
          <button onClick={onClose} className="tbtn" style={{ background: C.mintPale, border: `1px solid ${C.mintLt}`, color: C.muted, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", flexShrink: 0 }}>✕</button>
        </div>

        {/* Preview card */}
        <div style={{ padding: "0 20px" }}>

          {/* KPI summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "المساهمات", val: totalC, color: "#2d9c8f", bg: "rgba(45,156,143,0.07)", sign: "" },
              { label: "التبرعات",  val: totalD, color: "#20b2aa", bg: "rgba(32,178,170,0.07)", sign: "" },
              { label: "المصروفات", val: totalE, color: "#e05252", bg: "rgba(224,82,82,0.07)",  sign: "" },
              { label: "الرصيد الصافي", val: Math.abs(solde), color: solde >= 0 ? "#2d9c8f" : "#e05252", bg: solde >= 0 ? "rgba(45,156,143,0.07)" : "rgba(224,82,82,0.07)", sign: "" },
            ].map(k => (
              <div key={k.label} style={{ background: k.bg, borderRadius: 14, padding: "14px 12px", border: `1.5px solid ${k.color}22` }}>
                <div style={{ color: C.muted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{k.label}</div>
                <div style={{ color: k.color, fontSize: 16, fontWeight: 800 }}>{k.sign}{new Intl.NumberFormat("ar-MA").format(k.val)}</div>
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
                      <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700 }}>{fmtAR(m.total)}</span>
                    </div>
                    <div style={{ background: C.mintPale, borderRadius: 3, height: 4, overflow: "hidden" }}>
                      <div style={{ width: `${(m.total / (topMembers[0]?.total || 1)) * 100}%`, height: "100%", background: "#2d9c8f", borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div style={{ background: C.mintPale, borderRadius: 12, padding: "11px 14px", marginBottom: 16, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
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
                  { label: "إجمالي المساهمات", val: totalC, color: "#2d9c8f", sign: "" },
                  { label: "إجمالي التبرعات",  val: totalD, color: "#20b2aa", sign: "" },
                  { label: "إجمالي المصروفات", val: totalE, color: "#e05252", sign: "" },
                  { label: "الرصيد الصافي",    val: Math.abs(solde), color: solde >= 0 ? "#2d9c8f" : "#e05252", sign: "" },
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
                            <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700 }}>{fmtAR(m.total)}</span>
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
                          <td style={{ color: "#2d9c8f" }}>{m.c > 0 ? fmtAR(m.c) : "—"}</td>
                          <td style={{ color: "#20b2aa" }}>{m.d > 0 ? fmtAR(m.d) : "—"}</td>
                          <td style={{ color: "#e05252" }}>{m.e > 0 ? fmtAR(m.e) : "—"}</td>
                          <td style={{ fontWeight: 700, color: net >= 0 ? "#2d9c8f" : "#e05252" }}>{net >= 0 ? "" : ""}{fmtAR(net)}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "#f0faf9", fontWeight: 700 }}>
                      <td style={{ fontWeight: 800 }}>الإجمالي</td>
                      <td style={{ color: "#2d9c8f", fontWeight: 800 }}>{fmtAR(totalC)}</td>
                      <td style={{ color: "#20b2aa", fontWeight: 800 }}>{fmtAR(totalD)}</td>
                      <td style={{ color: "#e05252", fontWeight: 800 }}>{fmtAR(totalE)}</td>
                      <td style={{ color: solde >= 0 ? "#2d9c8f" : "#e05252", fontWeight: 800 }}>{solde >= 0 ? "" : ""}{fmtAR(Math.abs(solde))}</td>
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
                            <td style={{ color: m.total > 0 ? "#2d9c8f" : "#7a9ea2", fontWeight: 700 }}>
                              {m.total > 0 ? `${fmtAR(m.total)}` : "—"}
                            </td>
                            <td>
                              {m.total > 0 ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <div style={{ flex: 1, background: "#e0f5f3", borderRadius: 3, height: 6 }}>
                                    <div style={{ width: `${pct}%`, height: "100%", background: "#2d9c8f", borderRadius: 3 }} />
                                  </div>
                                  <span style={{ fontSize: 10, color: "#2d9c8f", fontWeight: 700, minWidth: 28 }}>{pct}%</span>
                                </div>
                              ) : "—"}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                    <tr style={{ background: "#f0faf9", fontWeight: 700 }}>
                      <td colSpan={2} style={{ fontWeight: 800 }}>الإجمالي</td>
                      <td style={{ color: "#2d9c8f", fontWeight: 800 }}>{fmtAR(totalC)}</td>
                      <td style={{ color: "#2d9c8f", fontWeight: 800 }}>100%</td>
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
      ["Description / Objet", "Date", "Mois", "Montant", "Note"],
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
      ["Indicateur", "Montant"],
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

      // ── Étape 4 : recharger toutes les données depuis Supabase (silencieux) ──
      await onRefresh(true);
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
      <div style={{ marginTop: 20, borderTop: `1px solid ${C.mintLt}`, paddingTop: 20 }}>
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
const PROFILE_IMG = "/profile.png";

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
    <div style={{ background: "#F2EFE9", minHeight: "100vh", minHeight: "100dvh", width: "100%", maxWidth: 430, margin: "0 auto", fontFamily: "'Times New Roman','Times',serif", color: C.text, position: "relative", paddingBottom: 90, overflowX: "hidden" }}>
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
