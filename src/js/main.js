const hamBtn = document.querySelector(".ham-btn");
const menu = document.querySelector(".menu");
const menuMobile = document.querySelector(".menu-mobile");
const closeMenu = (el) => {
	if (el.target.classList.contains("menu__item")) {
		showMenu();
	}
};
const showMenu = () => {
	hamBtn.classList.toggle("active");
	menu.classList.toggle("active");
};
hamBtn.addEventListener("click", showMenu);
menuMobile.addEventListener("click", closeMenu);

/*SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll("section[id],header[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;
	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 150;
		const sectionId = current.getAttribute("id");
		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".menu-desktop a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".menu-desktop a[href*=" + sectionId + "] ")
				.classList.remove("active-link");
		}
	});
}

window.addEventListener("scroll", scrollActive);
//clear errors
const deleteErrors = (form) => {
	const allErrors = form.querySelectorAll(".error");
	if (allErrors) {
		allErrors.forEach((el) => {
			el.classList.remove("error");
		});
	}
};
//contact check

const contactForm = document.querySelector(".contact__form");
const newsletterForm = document.querySelector(".newsletter-form");

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
const clearForm = (form) => {
	const allInp = form.querySelectorAll(".input-text,.textarea");
	console.log(allInp);
	allInp.forEach((item) => {
		item.value = "";
	});
};
const checkForm = (form) => {
	deleteErrors(form);
	const allImportantInputs = form.querySelectorAll(".important-inp");

	allImportantInputs.forEach((el) => {
		if (el.value == "") {
			el.closest(".form-text").classList.add("error");
		}
	});
};
//emailjs use https://www.emailjs.com/
(function () {
	emailjs.init("GH5t6EmjRaxS_uMDp");
})();
function sendMail(form) {
	const fromName = document.querySelector("#inp-name").value;
	const fromSurName = document.querySelector("#inp-surName").value;
	const reason = document.querySelector("#inp-reason").value;
	const phone = document.querySelector("#inp-phone").value;
	const message = document.querySelector("#inp-message").value;
	form.preventDefault();
	checkForm(form.target);
	if (form.target.querySelectorAll(".error").length === 0) {
		emailjs
			.sendForm(
				"service_9py3aao",
				"template_3picxmn",
				"#contact-form",
				"GH5t6EmjRaxS_uMDp"
			)
			.then(
				() => {
					form.target.classList.add("success-send");
					setTimeout(() => {
						form.target.classList.remove("success-send");
					}, 5000);
				},
				(error) => {
					alert("ops", error);
				}
			);
	}
	clearForm(form.target);
}
contactForm.addEventListener("submit", sendMail);

function sendNewsletter(form) {
	form.preventDefault();
	const email = form.target.querySelector(".newsletter").value;
	const allImportantInputs = form.target.querySelectorAll(".important-inp");

	allImportantInputs.forEach((el) => {
		if (el.value == "" || !(validateEmail(el.value) != null)) {
			el.closest(".form-text").classList.add("error");
		}
	});
	checkForm(form.target);
	if (form.target.querySelectorAll(".error").length === 0) {
		emailjs
			.sendForm(
				"service_9py3aao",
				"template_7lnngh1",
				"#newsletter-form",
				"GH5t6EmjRaxS_uMDp"
			)
			.then(
				() => {
					form.target.classList.add("success-send");
					setTimeout(() => {
						form.target.classList.remove("success-send");
					}, 5000);
				},
				(error) => {
					alert("ops", error);
				}
			);
	}
	clearForm(form);
}
newsletterForm.addEventListener("submit", sendNewsletter);
