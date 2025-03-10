document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const gameSlider = document.querySelector(".game-slider");
    const gameList = document.querySelector(".game-list");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    function enableScrollEffect(container) {
        container.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener("mouseleave", () => {
            isDown = false;
        });

        container.addEventListener("mouseup", () => {
            isDown = false;
        });

        container.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }

    enableScrollEffect(gameSlider);
    enableScrollEffect(gameList);
});
