/*==============================================================*/
// Contact Form JS
/*==============================================================*/
(function () {
    "use strict";

    var whatsappNumber = "5567998874461";

    function getFieldValue(id) {
        var field = document.getElementById(id);
        return field ? field.value.trim() : "";
    }

    function submitMessage(valid, message) {
        var messageBox = document.getElementById("msgSubmit");

        if (!messageBox) {
            return;
        }

        messageBox.className = valid ? "h4 text-left tada animated text-success" : "h4 text-left text-danger";
        messageBox.textContent = message;
    }

    function showFeedback(success) {
        var successMessage = document.querySelector(".input-success");
        var errorMessage = document.querySelector(".input-error");

        if (successMessage) {
            successMessage.style.display = success ? "block" : "none";
        }

        if (errorMessage) {
            errorMessage.style.display = success ? "none" : "block";
        }
    }

    function formError(form) {
        form.classList.remove("shake", "animated");
        window.requestAnimationFrame(function () {
            form.classList.add("shake", "animated");
        });
    }

    function buildWhatsappMessage() {
        return [
            "Olá, Cauã! Vim pelo portfólio.",
            "",
            "Nome: " + getFieldValue("name"),
            "Email: " + getFieldValue("email"),
            "Assunto: " + getFieldValue("subject"),
            "",
            "Mensagem:",
            getFieldValue("message")
        ].join("\n");
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("contactForm");

        if (!form) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                formError(form);
                showFeedback(false);
                submitMessage(false, "Preencha todos os campos corretamente.");
                return;
            }

            var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(buildWhatsappMessage());

            var whatsappWindow = window.open(whatsappUrl, "_blank");

            if (whatsappWindow) {
                whatsappWindow.opener = null;
                showFeedback(true);
                submitMessage(true, "Mensagem pronta. O WhatsApp foi aberto para envio.");
            } else {
                window.location.href = whatsappUrl;
            }
        });
    });
}());
