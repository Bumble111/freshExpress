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

  function logSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    console.log(searchInput.value);
  }

  const form = document.getElementById("search-form");
  form.addEventListener("submit", logSubmit);

  const electronics_container = document.getElementById(
    "electronics_container"
  );

  const clothes_container = document.getElementById("clothes_container");

  const all_cards = document.getElementById("all_cards");

  function createCard({ img, index, price, oldPrice, desc, title }) {
    return `<a href="/freshExpress/productInfo.html?index=${index}" class="rounded-lg w-fit card border border-gray-500 hover:scale-105 cursor-pointer transition-all shadow-lg hover:text-black">
                <img src="/freshExpress${img}${
      index + 1
    }.jpg" class="card-img-top h-32 md:h-44 w-36 sm:w-44 md:w-52 object-contain p-2"
                    alt="product${index}">
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

  shuffleNumbers(1, 49, 8).map((index) => {
    if (data[index].globalCategory === "Electronics") {
      electronics_container.insertAdjacentHTML(
        "beforeend",
        createCard({ ...data[index], index })
      );
    }
  });

  shuffleNumbers(50, 90, 8).map((index) => {
    if (data[index].globalCategory === "Clothes") {
      clothes_container.insertAdjacentHTML(
        "beforeend",
        createCard({ ...data[index], index })
      );
    }
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  await shuffleArray(data);

  await data.slice(0, 16).map((_, index) => {
    all_cards.insertAdjacentHTML(
      "beforeend",
      createCard({ ...data[index], index })
    );
  });

  const seeMoreBtn = document.getElementById("see-more-btn");

  seeMoreBtn.addEventListener("click", () => {
    const currentLength = all_cards.children.length;
    data.map((_, index) => {
      if (index >= currentLength && index < currentLength + 16) {
        all_cards.insertAdjacentHTML(
          "beforeend",
          createCard({ ...data[index], index })
        );
      }
      if (all_cards.children.length === data?.length) {
        seeMoreBtn.disabled = true;
        seeMoreBtn.classList.add("border-neutral-400");
        seeMoreBtn.classList.add("bg-neutral-400");
        seeMoreBtn.classList.add("text-white");
        seeMoreBtn.classList.add("cursor-not-allowed");
        seeMoreBtn.classList.add("hover:border-neutral-400");
        seeMoreBtn.classList.add("hover:bg-neutral-400");
      }
    });
  });

  setTimeout(() => {
    loader.style.display = "none";
    container.style.display = "inline-block";
  }, 1000);
});
