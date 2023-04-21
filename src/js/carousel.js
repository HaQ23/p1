const carouselItems = document.querySelector(".projects__items");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const allCategoryBtns = document.querySelectorAll(".projects__category-btn");
const allCategoryBtnsBox = document.querySelector(".projects__categories");
let activeCategory = "wszystkie";
let currentSlide = 0;
let availableProductsNumber;
let dotsContainer;
//add active on categoryBtn
const addActiveBtn = (elementToAdd) => {
	allCategoryBtns.forEach((el) => {
		if (el.classList.contains("active")) {
			el.classList.remove("active");
		}
	});
	elementToAdd.classList.add("active");
	activeCategory = elementToAdd.textContent.toLowerCase();
	currentSlide = 0;
	generateSlider();
	addActiveOnItem(".projects__item-container");
};

//create slide
const createSlide = (container, product) => {
	const slide = document.createElement("div");
	slide.classList.add("projects__item");
	slide.innerHTML = `<img
    src="${product.imgLink}"
    alt="${product.alt}"
    class="projects__img"
/>
<div class="projects__text-box">
    <h3 class="subsection-title">${product.title}</h3>
    <p class="projects__description">
        ${product.description}
    </p>`;
	container.appendChild(slide);
};
// find products that fit into categories
const findProducts = (category) => {
	let copyProducts = productsObj.slice();
	if (category === "wszystkie") {
		return copyProducts;
	}
	let storeProducts = [];
	copyProducts.forEach((product) => {
		product.category === category ? storeProducts.push(product) : "";
	});
	return storeProducts;
};
// add dots
const addDots = () => {
	const dotsBox = document.querySelector(".dots");
	const howManyDots = document.querySelectorAll(
		".projects__item-container"
	).length;
	dotsBox.innerHTML = "";
	for (let i = 0; i < howManyDots; i++) {
		const dot = document.createElement("div");
		dot.setAttribute("data-id", i);
		dot.classList.add("dot");
		dotsBox.appendChild(dot);
	}
};
//slider generation function, for the desktop version there are more slides in the container
function generateSlider() {
	carouselItems.innerHTML = "";
	const availableProducts = findProducts(activeCategory);
	availableProductsNumber = availableProducts.length;
	if (window.screen.width > 992) {
		availableProductsNumber = Math.round(availableProductsNumber / 4);
	}
	while (availableProducts.length !== 0) {
		const slideContainer = document.createElement("div");
		slideContainer.classList.add("projects__item-container");
		if (window.innerWidth > 992) {
			for (let i = 0; i < 4; i++) {
				let store = availableProducts.shift();
				createSlide(slideContainer, store);
				if (availableProducts.length === 0) {
					break;
				}
			}
		} else {
			let store = availableProducts.shift();
			createSlide(slideContainer, store);
		}
		carouselItems.appendChild(slideContainer);
	}
	if (window.innerWidth > 992) {
		addDots();
		addActiveOnItem(".dot");
		dotsContainer = document.querySelector(".dots");
	}
	currentSlide = 0;
}

const addActiveOnItem = (nameItem) => {
	const storeItems = document.querySelectorAll(nameItem);
	storeItems.forEach((el) => {
		el.classList.remove("active");
	});
	storeItems[currentSlide].classList.add("active");
};

[generateSlider(), addActiveOnItem(".projects__item-container")].forEach(
	(el) => {
		window.addEventListener("onload", el);
	}
);

// LISTENERS
//change slide
prevBtn.addEventListener("click", function () {
	if (currentSlide === 0) {
		currentSlide = availableProductsNumber - 1;
	} else {
		currentSlide--;
	}
	addActiveOnItem(".projects__item-container");
	if (window.innerWidth > 992) {
		addActiveOnItem(".dot");
	}
});
nextBtn.addEventListener("click", function () {
	if (currentSlide === availableProductsNumber - 1) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}
	addActiveOnItem(".projects__item-container");

	if (window.innerWidth > 992) {
		addActiveOnItem(".dot");
	}
});
allCategoryBtnsBox.addEventListener("click", function (e) {
	if (e.target.classList.contains("projects__category-btn")) {
		addActiveBtn(e.target);
	}
});
// change slide onCLick on dot
if (window.innerWidth > 992) {
	dotsContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dot")) {
			currentSlide = e.target.dataset.id;
			addActiveOnItem(".projects__item-container");
			addActiveOnItem(".dot");
		}
	});
}
