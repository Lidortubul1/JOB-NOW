document.addEventListener("DOMContentLoaded", () => {
    
    const jobsData = {
        "restaurants": [
            { title: "מלצר/ית דחוף!", price: '60 ש"ח לשעה', location: "📍 הרצליה, פיתוח" },
            { title: "טבח/ית פס חם", price: '65 ש"ח לשעה', location: "📍 תל אביב, מרכז" },
            { title: "ברמן/ית לאירוע משפחתי", price: '70 ש"ח לשעה', location: "📍 חיפה, צ'ק פוסט" }
        ],
        "security": [
            { title: "מאבטח/ת משמרת", price: '65 ש"ח לשעה', location: "📍 תל אביב, מרכז" },
            { title: 'שומר/ת לקניון (סופ"ש)', price: '58 ש"ח לשעה', location: "📍 נתניה, תעשייה" }
        ],
        "logistics": [
            { title: "עובד/ת אריזה", price: '55 ש"ח לשעה', location: "📍 חיפה, צ'ק פוסט" },
            { title: "מלקט/ת סחורה דחוף", price: '62 ש"ח לשעה', location: "📍 חולון" },
            { title: "נהג/ת שליחויות קלות", price: '68 ש"ח לשעה', location: "📍 פתח תקווה" }
        ],
        "sales": [
            { title: "נציג/ת מכירות פרונטלי", price: '55 ש"ח + עמלות', location: "📍 ראשון לציון" },
            { title: "קופאי/ת זמני/ת לעמדת פופ-אפ", price: '52 ש"ח לשעה', location: "📍 תל אביב, דיזנגוף" }
        ]
    };

    const tabButtons = document.querySelectorAll(".tab-btn");
    const jobCardsContainer = document.querySelector(".job-cards-container");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const categoryName = button.getAttribute("data-category");
            
            jobCardsContainer.style.opacity = "0";
            jobCardsContainer.style.transform = "translateY(10px)";
            jobCardsContainer.style.transition = "all 0.3s ease";

            setTimeout(() => {
                jobCardsContainer.innerHTML = "";
                
                const selectedJobs = jobsData[categoryName] || [];
                
                if (selectedJobs.length === 0) {
                    jobCardsContainer.innerHTML = `<p class="no-jobs">לא נמצאו משרות פעילות בקטגוריה זו כרגע.</p>`;
                } else {
                    selectedJobs.forEach(job => {
                        const cardHtml = `
                            <div class="job-card" style="animation: fadeInUp 0.4s ease forwards">
                                <h3>${job.title}</h3>
                                <p><strong>💰 ${job.price}</strong></p>
                                <p class="job-location">${job.location}</p>
                                <a href="#" class="apply-btn">הגש מועמדות</a>
                            </div>
                        `;
                        jobCardsContainer.insertAdjacentHTML("beforeend", cardHtml);
                    });
                }
                
                jobCardsContainer.style.opacity = "1";
                jobCardsContainer.style.transform = "translateY(0)";
                
                initApplyButtons();
            }, 300);
        });
    });

    function initApplyButtons() {
        const applyButtons = document.querySelectorAll(".apply-btn");

        applyButtons.forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });

        document.querySelectorAll(".apply-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                
                const jobCard = button.closest(".job-card");
                const isApplied = button.classList.contains("applied");

                if (!isApplied) {
                    button.classList.add("applied");
                    button.textContent = "✓ ביטול מועמדות";
                    button.style.backgroundColor = "#e74c3c";
                    button.style.color = "#fff";
                    
                    jobCard.style.border = "1px solid #2ecc71";
                    jobCard.style.backgroundColor = "#f9fff9";
                } else {
                    button.classList.remove("applied");
                    button.textContent = "הגש מועמדות";
                    button.style.backgroundColor = ""; 
                    button.style.color = "";
                    
                    jobCard.style.border = "";
                    jobCard.style.backgroundColor = "";
                }
            });
        });
    }

    initApplyButtons();
});