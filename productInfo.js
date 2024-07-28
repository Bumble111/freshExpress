function shuffleNumbers(from, to, noe) {
  let numbers = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  return numbers.slice(0, noe);
}

function checkImageExists(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(true); // Image loaded successfully
    };
    img.onerror = function () {
      resolve(false); // Image failed to load
    };
    img.src = imageUrl;
  });
}

window.addEventListener("load", async () => {
  const container = document.querySelector(".main-container");
  const loader = document.querySelector("#loader");
  const contact_us_btn = document.querySelector("#contact_us-btn");
  const footer = document.querySelector("#footer");
  contact_us_btn.addEventListener("click", () => {
    footer.scrollIntoView();
  });
  const elemInCart = JSON.parse(localStorage.getItem("cart") || "[]")?.length;
  document.querySelectorAll("#elements-in-cart").forEach((el) => {
    el.textContent = elemInCart;
  });

  const data = await fetch("./data/products.json").then((response) => {
    return response.json();
  });
  const index = new URLSearchParams(window.location.search).get("index");
  const currentProduct = data[index];

  let imagExists = false;

  await checkImageExists(currentProduct.img + (Number(index) + 1) + ".jpg")
    .then((exists) => {
      if (exists) {
        imagExists = true;
      }
    })
    .catch((error) => {
      console.error("Error checking image:", error);
    });

  function fillProductInfo(product) {
    const { img, title, desc, price, oldPrice } = product;

    return `<div class="w-full h-full flex justify-center items-center">
    <div class="flex flex-col items-center justify-center gap-4">
    
            <h1 class="text-3xl md:text-4xl font-semibold md:!hidden !block">${title}</h1>
            <img src="${
              imagExists
                ? img + (Number(index) + 1) + ".jpg"
                : "./assets/no-img.gif"
            }" alt="ldcsc" class="w-3/4 h-auto md:py-12 lg:!h-[550px] lg:!w-auto ${
      imagExists ? "floating" : ""
    }" />
    </div>
    </div>
        <div class="w-full flex flex-col justify-start gap-8 md:pt-12 md:pb-16">
            <h1 class="text-2xl md:text-4xl font-semibold !hidden md:!block">${title}</h1>
            <p class="text-lg md:text-2xl">
                ${desc}
            </p>
            <span class="text-5xl font-bold text-red-600">
                        <span>${new String(price).substring(
                          0,
                          new String(price).indexOf(".")
                        )}</span><span class="text-3xl font-semibold">${new String(
      price
    ).substring(
      new String(price).indexOf("."),
      new String(price).length
    )}$</span>
                        <s class="text-2xl text-gray-500 font-normal pr-1">${oldPrice}$</s>
            </span>
<div class="flex gap-2">
            <button class="transition-all w-fit px-12 py-2 text-base md:!text-xl font-semibold hover:bg-red-600 text-red-600 
                hover:text-white border-2 md:!border-3 border-red-600 rounded-sm transition-all block">
                Buy now
            </button>

            <button class="transition-all py-2 border-2 border-red-600 text-red-600 w-fit px-3 rounded-sm text-black hover:!text-white hover:bg-red-600" id="add-to-cart">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="false" focusable="false"><path d="M256 960a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m544 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128zM31.424 92.736a48 48 0 0 1 67.84 2.688 186.208 186.208 0 0 1 46.976 96.32l1.28 9.024 50.496 444.64a48 48 0 0 0 43.168 42.368l4.512 0.224H812.16a48 48 0 0 0 46.72-37.152l0.832-4.384 44.256-326.24a48 48 0 0 1 95.52 8.32l-0.384 4.576-44.256 326.24a144 144 0 0 1-135.776 124.48l-6.912 0.16H245.696a144 144 0 0 1-142.144-120.96l-0.928-6.784L52.16 211.584a90.208 90.208 0 0 0-19.2-46.176l-4.16-4.832a48 48 0 0 1 2.656-67.84z"></path><path d="M528 128c24.96 0 45.44 16.512 47.776 37.6L576 169.6V288h118.4c22.976 0 41.6 21.504 41.6 48 0 24.96-16.512 45.44-37.6 47.776L694.4 384H576v118.4c0 22.976-21.504 41.6-48 41.6-24.96 0-45.44-16.512-47.776-37.6L480 502.4V384h-118.4c-22.976 0-41.6-21.504-41.6-48 0-24.96 16.512-45.44 37.6-47.776L361.6 288H480V169.6c0-22.976 21.504-41.6 48-41.6z"></path></svg>
            </button>
</div>

    
    <div id="rating" class=" flex gap-1 py-2 items-center">
    <h1 class="text-xl md:text-2xl font-semibold mr-2 mb-0.5">
      Rate: 
    </h1>
    </div>
        </div>
`;
  }

  function moreProducts({ img, index: ind, price, oldPrice, desc, title }) {
    return `<a href="/productInfo.html?index=${ind}" class="rounded-lg w-fit card border border-gray-500 hover:scale-105 cursor-pointer transition-all shadow-lg hover:text-black">
                <img src="${img}${
      ind + 1
    }.jpg" class="card-img-top h-32 md:h-44 w-36 sm:w-44 md:w-52 object-contain p-2"
                    alt="product${ind}">
                <hr />
                <div class="pt-2 pb-7 px-3 w-36 sm:w-44 md:w-52">
                    <span class="block text-lg md:text-xl pt-1 truncate w-full" title="${title}">${title} </span>
                    <span class="text-xl font-bold text-red-600">
                        <span>${new String(price).substring(
                          0,
                          new String(price).indexOf(".")
                        )}</span><span class="text-sm font-semibold">${new String(
      price
    ).substring(
      new String(price).indexOf("."),
      new String(price).length
    )}$</span>
                        <s class="text-base text-gray-500 font-normal pr-1">${oldPrice}$</s>
                        <span class="text-base text-gray-500 font-normal">-${Math.floor(
                          (price * 100) / oldPrice
                        )}%</span>
                    </span>
                    <p class="text-xs pt-1 truncate w-full" title="${desc}">${desc}</p>
                </div>
            </a>`;
  }

  document.getElementById("category-btn").textContent =
    currentProduct.globalCategory;

  document
    .getElementById("product-info")
    .insertAdjacentHTML("beforeend", fillProductInfo(currentProduct));

  const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#F80" class="bi bi-star-fill" viewBox="0 0 17 17">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;

  const halfStar = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#F80" class="bi bi-star-half" viewBox="0 0 17 17">
    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
    </svg>`;

  for (let i = 0; i <= Math.ceil(currentProduct.rate); i++) {
    if (
      i + 1 === Math.ceil(currentProduct.rate) &&
      Math.ceil(currentProduct.rate) !== currentProduct.rate
    ) {
      document
        .getElementById("rating")
        .insertAdjacentHTML("beforeend", halfStar);
    } else if (
      i === Math.ceil(currentProduct.rate) &&
      Math.ceil(currentProduct.rate) !== currentProduct.rate
    ) {
      continue;
    } else {
      document
        .getElementById("rating")
        .insertAdjacentHTML("beforeend", starSvg);
    }
  }

  shuffleNumbers(1, 49, 8).map((index) => {
    if (data[index].globalCategory === currentProduct.globalCategory) {
      document
        .getElementById("more-products")
        .insertAdjacentHTML(
          "beforeend",
          moreProducts({ ...data[index], index })
        );
    }
  });

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    if (!parsedCart.includes(index)) {
      localStorage.setItem("cart", JSON.stringify([...parsedCart, index]));
    }
    const alertBox = document.getElementById("alert-box");
    if (alertBox.style.display === "none") {
      alertBox.style.display = "flex";

      setTimeout(function () {
        alertBox.style.display = "none";
      }, 2000);
    }

    window.location.reload();
  });

  setTimeout(() => {
    loader.style.display = "none";
    container.style.display = "inline-block";
  }, 1000);
});
