document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector(".chat-input");
    const sendButton = document.querySelector(".send-btn");
    const chatMessages = document.querySelector(".chat-messages");
    const choiceButtons = document.querySelectorAll(".chat-choice-btns .tab-btn");

    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const simulateRepresentativeReply = () => {
        setTimeout(() => {
            const replyElement = document.createElement("div");
            replyElement.classList.add("message", "received");
            replyElement.innerHTML = "הודעתך התקבלה במערכת! כבר נסייע. תודה על הסבלנות. 🎧";
            chatMessages.appendChild(replyElement);
            scrollToBottom();
        }, 1500);
    };

    const sendMessage = () => {
        const messageText = chatInput.value.trim();
        if (messageText === "") return;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "sent");
        messageElement.textContent = messageText;

        chatMessages.appendChild(messageElement);
        chatInput.value = "";
        scrollToBottom();

        simulateRepresentativeReply();
    };

    choiceButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("active")) return;

            choiceButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const choiceType = button.getAttribute("data-type");
            
            const userMessageElement = document.createElement("div");
            userMessageElement.classList.add("message", "sent");

            const botReplyElement = document.createElement("div");
            botReplyElement.classList.add("message", "received");

            if (choiceType === "employer") {
                userMessageElement.textContent = "אני מעסיק, רציתי לדעת איך מפרסמים משמרת דחופה באתר.";
                
                botReplyElement.textContent = "ברוך הבא! פרסום משמרת דחופה לוקח פחות מדקה. כל שעליך לעשות הוא להיכנס לדף 'פרסום משרה' בתפריט העליון, למלא את פרטי התפקיד והתשלום השעתי, והמשרה תופיע בזמן אמת במפות של העובדים באזורך. האם הסתדרת עם הטופס?";
            } else {
                userMessageElement.textContent = "אני מחפשת עבודה, רציתי לדעת איך פותחים עוסק זעיר דרך האתר.";
                
                botReplyElement.textContent = "בשמחה! זה תהליך מאוד פשוט שלוקח כמה דקות. קודם כל עליך לפתוח תיק מועמד באתר כדי שתוכלי להגיש מועמדות למשרות חמות. בנוסף, יש לנו דף מדריך מפורט עבור 'עוסק זעיר' בתפריט העליון שמלווה אותך צעד אחר צעד מול רשויות המס באופן מקוון. האם כבר נרשמת למערכת?";
            }

            chatMessages.appendChild(userMessageElement);
            
            setTimeout(() => {
                chatMessages.appendChild(botReplyElement);
                scrollToBottom();
            }, 800);

            scrollToBottom();
        });
    });

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }
});