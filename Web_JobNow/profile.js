document.addEventListener("DOMContentLoaded", () => {
    
    // 1. מנגנון אישור מועמדות וסגירת משמרת
    const approveBtn = document.querySelector(".profile-actions .apply-btn:not(.apply-blue)");
    const profileNameSub = document.querySelector(".profile-name-sub");

    if (approveBtn) {
        approveBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const isApproved = approveBtn.classList.contains("approved-status");

            if (!isApproved) {
                approveBtn.classList.add("approved-status");
                approveBtn.innerHTML = '<i class="fa fa-lock"></i> המשמרת סגורה ומאושרת!';
                approveBtn.style.backgroundColor = "#2ecc71";
                approveBtn.style.color = "#fff";
                approveBtn.style.boxShadow = "none";

                if (profileNameSub) {
                    profileNameSub.textContent = "(אושר/ה למשמרת שלך!)";
                    profileNameSub.style.color = "#2ecc71";
                    profileNameSub.style.fontWeight = "bold";
                }
            } else {
                approveBtn.classList.remove("approved-status");
                approveBtn.innerHTML = '<i class="fa fa-check"></i> אשר מועמדות וסגור משמרת';
                approveBtn.style.backgroundColor = "";
                approveBtn.style.color = "";

                if (profileNameSub) {
                    profileNameSub.textContent = "(הגישה מועמדות לפני 12 דקות)";
                    profileNameSub.style.color = "";
                    profileNameSub.style.fontWeight = "";
                }
            }
        });
    }

    // 2. מנגנון הוספת המועמדת למועדפים (❤️ Favorite Toggle)
    const profileName = document.querySelector(".profile-name");
    
    if (profileName) {
        // יצירת אלמנט לב אינטראקטיבי והוספתו ליד שם המועמדת
        const heartBtn = document.createElement("i");
        heartBtn.classList.add("fa", "fa-heart-o");
        heartBtn.style.marginRight = "15px";
        heartBtn.style.cursor = "pointer";
        heartBtn.style.color = "#ccc";
        heartBtn.style.transition = "all 0.2s ease";
        heartBtn.title = "הוסף לרשימת המועמדים השמורים";

        profileName.insertBefore(heartBtn, profileName.firstChild);

        heartBtn.addEventListener("click", () => {
            if (heartBtn.classList.contains("fa-heart-o")) {
                heartBtn.classList.remove("fa-heart-o");
                heartBtn.classList.add("fa-heart");
                heartBtn.style.color = "#e74c3c"; // צביעה באדום חם
                heartBtn.style.transform = "scale(1.2)";
                setTimeout(() => heartBtn.style.transform = "scale(1)", 200);
            } else {
                heartBtn.classList.remove("fa-heart");
                heartBtn.classList.add("fa-heart-o");
                heartBtn.style.color = "#ccc";
            }
        });
    }

    // 3. הוספת אפקט ריחוף דינמי (Hover Overlay) על תמונות תיק העבודות
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach(item => {
        const img = item.querySelector(".portfolio-img");
        if (!img) return;

        // הפיכת מיקום האלמנט ליחסי כדי שהטקסט יצוף עליו נכון
        item.style.position = "relative";
        item.style.overflow = "hidden";

        // יצירת שכבת כיסוי כהה ואלגנטית בזמן שמרחפים עם העכבר
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.3s ease";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "#fff";
        overlay.style.fontWeight = "bold";
        overlay.innerHTML = '<i class="fa fa-search-plus" style="font-size: 24px;"></i>';

        item.appendChild(overlay);

        item.addEventListener("mouseenter", () => {
            overlay.style.opacity = "1";
            img.style.transform = "scale(1.05)";
            img.style.transition = "transform 0.3s ease";
        });

        item.addEventListener("mouseleave", () => {
            overlay.style.opacity = "0";
            img.style.transform = "scale(1)";
        });
    });
});