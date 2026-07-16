/* MultiSphere Agency — interactions (vanilla JS, aucune dépendance) */
(function () {
    "use strict";

    // Loader : masqué au chargement (et filet de sécurité anti-page-blanche)
    function hideLoader() {
        var l = document.getElementById("loader");
        if (l) l.classList.add("hidden");
    }
    window.addEventListener("load", function () { setTimeout(hideLoader, 350); });
    setTimeout(hideLoader, 3500);

    document.addEventListener("DOMContentLoaded", function () {
        // Header au scroll
        var header = document.querySelector(".site-header");
        var toTop = document.querySelector(".to-top");
        function onScroll() {
            var y = window.scrollY;
            if (header) header.classList.toggle("scrolled", y > 20);
            if (toTop) toTop.classList.toggle("show", y > 600);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        if (toTop) toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Menu mobile
        var toggle = document.querySelector(".nav-toggle");
        if (toggle) {
            toggle.addEventListener("click", function () {
                document.body.classList.toggle("menu-open");
            });
            document.querySelectorAll(".mobile-menu a").forEach(function (a) {
                a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
            });
        }

        // Reveal on scroll
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

        // Compteurs animés
        var counted = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "", t0 = null;
                function tick(ts) {
                    if (!t0) t0 = ts;
                    var p = Math.min((ts - t0) / 1600, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(eased * target) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                counted.unobserve(el);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll("[data-count]").forEach(function (el) { counted.observe(el); });

        // Année du footer
        var yr = document.getElementById("year");
        if (yr) yr.textContent = new Date().getFullYear();

        // Formulaire → Google Sheets
        var form = document.querySelector("form.ms-form");
        if (form) {
            var url = form.dataset.endpoint;
            var note = form.querySelector(".form-note");
            form.addEventListener("submit", function (ev) {
                ev.preventDefault();
                var btn = form.querySelector('button[type="submit"]');
                var label = btn ? btn.textContent : "";
                if (btn) { btn.disabled = true; btn.textContent = "Envoi en cours…"; }
                if (note) { note.textContent = ""; note.className = "form-note"; }
                fetch(url, { method: "POST", body: new FormData(form) })
                    .then(function () {
                        if (note) { note.textContent = "Merci ! Votre message a bien été envoyé. Nous revenons vers vous sous 24 h ouvrées."; note.className = "form-note ok"; }
                        form.reset();
                    })
                    .catch(function () {
                        if (note) { note.textContent = "Une erreur est survenue. Écrivez-nous directement à multisphere.agency@gmail.com."; note.className = "form-note err"; }
                    })
                    .finally(function () {
                        if (btn) { btn.disabled = false; btn.textContent = label; }
                    });
            });
        }
    });
})();
