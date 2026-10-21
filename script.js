(function () {
  const EMAIL = "santoshkarajagi21@gmail.com";
  const PHONE = "+919901321245";
  const MAIL_GMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(EMAIL) + "&su=" + encodeURIComponent("Hello Santosh");
  const MAILTO = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Hello Santosh");

  const PROJECTS = {
    teslon: {
      kicker: "Jun 2024 — Present · 2.6 years",
      title: "Teslon Technologies",
      lede: "Software Engineer I in Bengaluru. Production HealthTech on CarePortal / RPM.",
      points: [
        "Tele ICU: live ECG/MQTT ward cards and bed monitors, HL7 v2 / FHIR, BP device errors, paper-style traces.",
        "Tele Radiology: DICOM viewer, study lists, teleradiology orders and reports.",
        "Appointment flows: booking, payments, WebRTC consults with chat, prescriptions, and vitals.",
        "Home healthcare: nurse visit calendar, day timeline, and HHC payment settings.",
        "Redis locking and idempotent REST APIs so bookings and payments are not charged twice."
      ],
      tags: ["Vue.js", "Node.js", "MQTT", "HL7", "DICOM", "WebRTC"]
    },
    nirosol: {
      kicker: "May 2023 — May 2024 · Freelance",
      title: "Nirosol Solutions",
      lede: "Associate Software Developer. Desktop and POS UI that staff actually use.",
      points: [
        "WPF desktop UI: layout, styling, and navigation flow.",
        "Android XML POS app: screens and frontend navigation.",
        "UI and checkout / workflow fixes across desktop and Android POS."
      ],
      tags: ["WPF", "Android XML", "UI"]
    },
    "tele-icu": {
      kicker: "01 · Live monitoring",
      title: "Tele ICU",
      lede: "Command-center ward list and per-bed monitor so a remote doctor can watch live physiology, not a screenshot.",
      points: [
        "Ward cards stream live ECG over MQTT, with a shared sweep renderer so list and bed stay in time.",
        "Bed detail draws a paper-style ECG grid, 1-second marks, HR / SpO2 / BP / temp, and a DICOM tab.",
        "Playback buffer and batch de-dupe so QRS is not double-spiked on dual room delivery.",
        "Card traces use a wider mV window so R-peaks are not clipped; bed gain stays selectable.",
        "BP failures show the device message outside the card — no invented FAILED badge.",
        "HL7 v2 / FHIR mapping and MQTT → Mongo so bedside monitors land as plottable vitals."
      ],
      tags: ["Vue.js", "MQTT", "HL7", "FHIR", "Canvas ECG", "MongoDB"]
    },
    "tele-radiology": {
      kicker: "02 · Imaging",
      title: "Tele Radiology",
      lede: "Order, view, and report imaging without sitting next to the PACS workstation.",
      points: [
        "Teleradiology order list and form: status, notes, and report lookup by order id.",
        "DICOM viewer inside Telemed consults and the ICU bed — study list, upload, viewer by StudyInstanceUID.",
        "PACS / patient DICOM APIs so a specialist can open the right study during a call.",
        "Hospital setting to enable teleradiology and optionally translate a prescription into a radiology order."
      ],
      tags: ["DICOM", "PACS", "Vue.js", "Node.js", "Teleradiology"]
    },
    appointments: {
      kicker: "03 · Care delivery",
      title: "Appointment flows",
      lede: "From slot pick to video consult — booking, payments, and a clinical workspace in one visit.",
      points: [
        "Doctor / nurse / patient appointment create and detail, including kiosk booking with PR and VC slots.",
        "Payment grace window and provider flags (Razorpay, Paytm, PayU, credit points).",
        "Telemed consult: WebRTC video / audio, chat, prescriptions, vitals dock, and DICOM.",
        "Desktop consult header with in-call state, pause / close, and nurse PSTN fallback."
      ],
      tags: ["Vue.js", "WebRTC", "Node.js", "Payments", "Chat"]
    },
    hhc: {
      kicker: "04 · Field care",
      title: "Home healthcare",
      lede: "A nurse’s day as a timeline of home visits, not a spreadsheet.",
      points: [
        "Nurse HHC home: month header, swipeable day pills, and a 24-hour visit timeline.",
        "Day summary — visit count, jump to a visit, empty state when the day is clear.",
        "Home visit detail, lab visits, and nurse appointment create from the field app.",
        "HHC settings: subscription reminders and cash / online / credit-point payments."
      ],
      tags: ["Vue.js", "Node.js", "Home visits", "Payments"]
    }
  };

  function openEmail(event) {
    if (event) event.preventDefault();
    const tab = window.open(MAIL_GMAIL, "_blank", "noopener");
    if (!tab) window.location.href = MAILTO;
  }

  function openCall(event) {
    if (event) event.preventDefault();
    window.location.href = "tel:" + PHONE;
  }

  ["email-btn", "email-link"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openEmail);
  });
  ["call-btn", "call-link"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openCall);
  });

  function lead2(p) {
    const c = ((p % 1) + 1) % 1;
    if (c > 0.12 && c < 0.20) return Math.sin((c - 0.12) / 0.08 * Math.PI) * 7;
    if (c > 0.27 && c < 0.30) return -9;
    if (c > 0.30 && c < 0.318) return 48;
    if (c > 0.318 && c < 0.34) return -14;
    if (c > 0.44 && c < 0.58) return Math.sin((c - 0.44) / 0.14 * Math.PI) * 11;
    return Math.sin(c * Math.PI * 8) * 0.7;
  }

  function pleth(p) {
    const c = ((p % 1) + 1) % 1;
    const pulse = Math.pow(Math.max(0, Math.sin(c * Math.PI)), 1.35) * 22;
    const notch = c > 0.42 && c < 0.58 ? Math.sin((c - 0.42) / 0.16 * Math.PI) * 5 : 0;
    return pulse - notch - 6;
  }

  function resp(p) {
    const c = ((p % 1) + 1) % 1;
    const inhale = Math.pow(Math.sin(Math.min(1, c / 0.42) * Math.PI * 0.5), 1.1) * 16;
    const hold = c > 0.42 && c < 0.52 ? 16 : 0;
    const exhale = c >= 0.52 ? Math.pow(Math.cos(((c - 0.52) / 0.48) * Math.PI * 0.5), 1.2) * 16 : 0;
    return (c < 0.42 ? inhale : (c < 0.52 ? hold : exhale)) - 6;
  }

  function mountWave(id, kind, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;
    const seconds = kind === "resp" ? 12 : (kind === "pleth" ? 3.2 : 4.8);
    const glow = kind === "pleth" ? "rgba(62,207,255,0.16)" : (kind === "resp" ? "rgba(245,197,66,0.16)" : "rgba(45,252,136,0.16)");
    const sweep = kind === "pleth" ? "rgba(62,207,255,0.28)" : (kind === "resp" ? "rgba(245,197,66,0.28)" : "rgba(45,252,136,0.28)");

    function size() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function sample(frac) {
      if (kind === "pleth") return pleth(frac);
      if (kind === "resp") return resp(frac);
      return lead2(frac);
    }

    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const mid = h * 0.55;
      const amp = h / 110;
      ctx.strokeStyle = glow;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = kind === "ecg" ? 2.1 : 1.8;
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const cycles = kind === "resp" ? 2.2 : (kind === "pleth" ? 3.4 : 5);
      for (let x = 0; x <= w; x += 2) {
        const frac = (x / w) * cycles + t;
        const y = mid - sample(frac) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const head = ((t / seconds) % 1) * w;
      const g = ctx.createLinearGradient(head - 36, 0, head + 8, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(1, sweep);
      ctx.fillStyle = g;
      ctx.fillRect(Math.max(0, head - 36), 0, 44, h);

      t += kind === "resp" ? 0.0048 : (kind === "pleth" ? 0.012 : 0.0085);
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", size);
    size();
    draw();
  }

  mountWave("wave-ecg", "ecg", "#2dfc88");
  mountWave("wave-spo2", "pleth", "#3ecfff");
  mountWave("wave-resp", "resp", "#f5c542");

  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  function applyFilter(key) {
    document.querySelectorAll(".work-filters .chip").forEach(function (chip) {
      chip.classList.toggle("is-on", chip.getAttribute("data-filter") === key);
    });
    document.querySelectorAll(".project-card[data-skills]").forEach(function (card) {
      const skills = (card.getAttribute("data-skills") || "").split(",");
      card.classList.toggle("is-hidden", !(key === "all" || skills.indexOf(key) !== -1));
    });
  }

  document.querySelectorAll(".work-filters .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      applyFilter(chip.getAttribute("data-filter"));
    });
  });
  document.querySelectorAll("#skill-grid .skill-card").forEach(function (card) {
    card.addEventListener("click", function () {
      applyFilter(card.getAttribute("data-jump"));
      const work = document.getElementById("work");
      if (work) work.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const drawer = document.getElementById("drawer");
  function closeDrawer() {
    if (!drawer) return;
    drawer.hidden = true;
    document.body.style.overflow = "";
  }
  function openProject(id) {
    const data = PROJECTS[id];
    if (!data || !drawer) return;
    document.getElementById("drawer-kicker").textContent = data.kicker;
    document.getElementById("drawer-title").textContent = data.title;
    document.getElementById("drawer-lede").textContent = data.lede;
    document.getElementById("drawer-list").innerHTML = data.points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    document.getElementById("drawer-tags").innerHTML = data.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
  }
  document.querySelectorAll(".project-card[data-project]").forEach(function (card) {
    card.addEventListener("click", function () {
      openProject(card.getAttribute("data-project"));
    });
  });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) closeDrawer();
    });
    const closeBtn = drawer.querySelector(".drawer-close");
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }
})();
