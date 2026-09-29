/* =========================================================
   CHRONOVA — PREMIUM WATCH WEBSITE
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
       ========================================================= */

    const pageLoader = document.getElementById("pageLoader");
    const typingText = document.getElementById("typingText");

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchBtn = document.getElementById("searchBtn");
    const searchBox = document.getElementById("searchBox");
    const searchInput = document.getElementById("searchInput");

    const cartBtn = document.getElementById("cartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    const themeBtn = document.getElementById("themeBtn");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const productGrid = document.getElementById("productGrid");
    const categoryButtons = document.querySelectorAll(".category-btn");

    const scrollProgress = document.getElementById("scrollProgress");


    /* =========================================================
       PAGE LOADER
       ========================================================= */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("hide");
            }

        }, 900);

    });


    /* =========================================================
       TYPING HERO EFFECT
       ========================================================= */

    if (typingText) {

        const words = [
            "Timeless Elegance",
            "Luxury On Your Wrist",
            "Crafted For Legends",
            "Time Meets Luxury"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);

                    return;
                }

            } else {

                typingText.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );
        }

        typeEffect();
    }


    /* =========================================================
       MOBILE MENU
       ========================================================= */

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            menuBtn.classList.toggle("active");

        });

        document.querySelectorAll(".mobile-menu a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuBtn.classList.remove("active");

            });

        });

    }


    /* =========================================================
       CLOSE MOBILE MENU OUTSIDE
       ========================================================= */

    document.addEventListener("click", (event) => {

        if (!mobileMenu || !menuBtn) return;

        if (
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");

            menuBtn.classList.remove("active");

        }

    });


    /* =========================================================
       SEARCH
       ========================================================= */

    if (searchBtn && searchBox) {

        searchBtn.addEventListener("click", () => {

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active")) {

                setTimeout(() => {

                    searchInput?.focus();

                }, 200);

            }

        });

    }


    /* =========================================================
       SEARCH PRODUCTS
       ========================================================= */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const value =
                searchInput.value.toLowerCase().trim();

            document.querySelectorAll(".product-card").forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /* =========================================================
       DARK / LIGHT THEME
       ========================================================= */

    const savedTheme =
        localStorage.getItem("chronova-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "chronova-theme",
                isDark ? "dark" : "light"
            );

            themeBtn.classList.add("theme-click");

            setTimeout(() => {

                themeBtn.classList.remove("theme-click");

            }, 400);

        });

    }


    /* =========================================================
       SCROLL PROGRESS
       ========================================================= */

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        if (scrollProgress) {

            scrollProgress.style.width =
                `${progress}%`;

        }

    });


    /* =========================================================
       NAVBAR SCROLL EFFECT
       ========================================================= */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =========================================================
       CART
       ========================================================= */

    let cart = JSON.parse(
        localStorage.getItem("chronova-cart")
    ) || [];


    function saveCart() {

        localStorage.setItem(
            "chronova-cart",
            JSON.stringify(cart)
        );

    }


    function updateCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {

            total +=
                Number(item.price) * item.quantity;

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>$${item.price}</p>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="minus"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="plus"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart"
                    data-index="${index}"
                >
                    ×
                </button>

            `;

            cartItems.appendChild(cartItem);

        });


        if (cartCount) {

            const count =
                cart.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                );

            cartCount.textContent = count;

            cartCount.classList.add("cart-pop");

            setTimeout(() => {

                cartCount.classList.remove("cart-pop");

            }, 400);

        }


        if (cartTotal) {

            cartTotal.textContent =
                `$${total.toFixed(2)}`;

        }


        saveCart();

    }


    /* =========================================================
       ADD TO CART
       ========================================================= */

    document.addEventListener("click", (event) => {

        const button =
            event.target.closest(".add-to-cart");

        if (!button) return;


        const card =
            button.closest(".product-card");

        if (!card) return;


        const name =
            card.dataset.name ||
            card.querySelector(".product-name")?.textContent ||
            "Luxury Watch";


        const priceText =
            card.dataset.price ||
            card.querySelector(".product-price")?.textContent ||
            "0";


        const price =
            parseFloat(
                priceText.replace(/[^0-9.]/g, "")
            );


        const image =
            card.dataset.image ||
            card.querySelector("img")?.src ||
            "";


        const existing =
            cart.find(item => item.name === name);


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        updateCart();


        /* Ripple animation */

        button.classList.add("added");

        setTimeout(() => {

            button.classList.remove("added");

        }, 500);


        /* Open cart */

        if (cartSidebar) {

            cartSidebar.classList.add("active");

        }

        if (cartOverlay) {

            cartOverlay.classList.add("active");

        }

    });


    /* =========================================================
       CART QUANTITY + REMOVE
       ========================================================= */

    if (cartItems) {

        cartItems.addEventListener("click", (event) => {

            const quantityButton =
                event.target.closest(".quantity-btn");

            const removeButton =
                event.target.closest(".remove-cart");


            if (quantityButton) {

                const index =
                    Number(quantityButton.dataset.index);

                const action =
                    quantityButton.dataset.action;


                if (action === "plus") {

                    cart[index].quantity++;

                }


                if (action === "minus") {

                    cart[index].quantity--;

                    if (cart[index].quantity <= 0) {

                        cart.splice(index, 1);

                    }

                }


                updateCart();

            }


            if (removeButton) {

                const index =
                    Number(removeButton.dataset.index);

                cart.splice(index, 1);

                updateCart();

            }

        });

    }


    /* =========================================================
       OPEN / CLOSE CART
       ========================================================= */

    function openCart() {

        cartSidebar?.classList.add("active");

        cartOverlay?.classList.add("active");

        document.body.classList.add("cart-open");

    }


    function closeCartPanel() {

        cartSidebar?.classList.remove("active");

        cartOverlay?.classList.remove("active");

        document.body.classList.remove("cart-open");

    }


    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCartPanel
        );

    }


    /* =========================================================
       PRODUCT CATEGORY FILTER
       ========================================================= */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const category =
                button.dataset.category;


            document.querySelectorAll(
                ".product-card"
            ).forEach(card => {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "all" ||
                    !category ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                    setTimeout(() => {

                        card.classList.add("show");

                    }, 30);

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================================
       WISHLIST
       ========================================================= */

    let wishlist =
        JSON.parse(
            localStorage.getItem("chronova-wishlist")
        ) || [];


    document.addEventListener("click", (event) => {

        const heart =
            event.target.closest(".wishlist-btn");

        if (!heart) return;


        const card =
            heart.closest(".product-card");

        if (!card) return;


        const name =
            card.dataset.name ||
            card.querySelector(".product-name")?.textContent ||
            "Watch";


        if (wishlist.includes(name)) {

            wishlist =
                wishlist.filter(
                    item => item !== name
                );

            heart.classList.remove("active");

        } else {

            wishlist.push(name);

            heart.classList.add("active");

            heart.classList.add("heart-pop");

            setTimeout(() => {

                heart.classList.remove("heart-pop");

            }, 500);

        }


        localStorage.setItem(
            "chronova-wishlist",
            JSON.stringify(wishlist)
        );

    });


    /* =========================================================
       RESTORE WISHLIST
       ========================================================= */

    document.querySelectorAll(
        ".product-card"
    ).forEach(card => {

        const name =
            card.dataset.name ||
            card.querySelector(".product-name")?.textContent;

        const heart =
            card.querySelector(".wishlist-btn");


        if (
            heart &&
            wishlist.includes(name)
        ) {

            heart.classList.add("active");

        }

    });


    /* =========================================================
       PRODUCT IMAGE LOADING
       ========================================================= */

    document.querySelectorAll(
        ".product-card img"
    ).forEach(image => {

        if (image.complete) {

            image.classList.add("loaded");

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add("loaded");

                }
            );

        }

    });


    /* =========================================================
       3D PRODUCT CARD TILT
       ========================================================= */

    function enableCardTilt() {

        if (window.innerWidth < 768) return;


        document.querySelectorAll(
            ".product-card"
        ).forEach(card => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;


                    const y =
                        event.clientY - rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) / centerY) * -4;


                    const rotateY =
                        ((x - centerX) / centerX) * 4;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    enableCardTilt();


    /* =========================================================
       HERO WATCH MOUSE PARALLAX
       ========================================================= */

    const heroWatch =
        document.querySelector(".hero-watch");


    if (
        heroWatch &&
        window.innerWidth >= 900
    ) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 12;


                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 12;


                heroWatch.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;

            }
        );

    }


    /* =========================================================
       SCROLL REVEAL
       ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .product-card, .brand-item, .feature-card, .about-content"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =========================================================
       BUTTON RIPPLE
       ========================================================= */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "button, .btn"
                );


            if (!button) return;


            const ripple =
                document.createElement("span");


            ripple.className =
                "click-ripple";


            const rect =
                button.getBoundingClientRect();


            ripple.style.left =
                `${event.clientX - rect.left}px`;


            ripple.style.top =
                `${event.clientY - rect.top}px`;


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );


    /* =========================================================
       NEWSLETTER
       ========================================================= */

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const email =
                    newsletterForm.querySelector(
                        "input"
                    );


                if (
                    !email ||
                    !email.value.trim()
                ) {

                    alert(
                        "Please enter your email address."
                    );

                    return;

                }


                alert(
                    "Thank you for subscribing to CHRONOVA!"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =========================================================
       CHECKOUT
       ========================================================= */

    const checkoutBtn =
        document.querySelector(
            ".checkout-btn"
        );


    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                alert(
                    "Checkout feature coming soon!"
                );

            }
        );

    }


    /* =========================================================
       SMOOTH SCROLL
       ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =========================================================
       CURSOR GLOW
       ========================================================= */

    if (window.innerWidth >= 900) {

        const cursorGlow =
            document.createElement("div");


        cursorGlow.className =
            "cursor-glow";


        document.body.appendChild(
            cursorGlow
        );


        document.addEventListener(
            "mousemove",
            (event) => {

                cursorGlow.style.left =
                    `${event.clientX}px`;


                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =========================================================
       IMAGE HOVER SHINE
       ========================================================= */

    document.querySelectorAll(
        ".product-card"
    ).forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "card-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-hover"
                );

            }
        );

    });


    /* =========================================================
       INITIAL CART
       ========================================================= */

    updateCart();


    /* =========================================================
       REDUCED MOTION SUPPORT
       ========================================================= */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }

});