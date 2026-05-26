(async function () {
    const stage = document.getElementById("stage");
    const nameEl = document.getElementById("name");
    const dogEl = document.getElementById("dog");

    let breeds = [];
    try {
        const res = await fetch("breeds.json", { cache: "no-cache" });
        breeds = await res.json();
    } catch (e) {
        nameEl.textContent = "Грешка при зареждане";
        nameEl.classList.add("visible");
        return;
    }

    // Sort alphabetically by Bulgarian name so the order is always the same.
    breeds.sort((a, b) => a.name.localeCompare(b.name, "bg"));

    let index = 0;
    let nameShown = false;

    function showCurrent() {
        const breed = breeds[index];
        dogEl.src = breed.image;
        dogEl.alt = breed.name;
        nameEl.textContent = "";
        nameShown = false;
        nameEl.classList.remove("visible");
        // preload next image to avoid flicker on tap
        const next = breeds[(index + 1) % breeds.length];
        const pre = new Image();
        pre.src = next.image;
    }

    function advance() {
        if (!nameShown) {
            nameEl.textContent = breeds[index].name;
            nameEl.classList.add("visible");
            nameShown = true;
        } else {
            index = (index + 1) % breeds.length;
            showCurrent();
        }
    }

    function goTo(i) {
        index = ((i % breeds.length) + breeds.length) % breeds.length;
        showCurrent();
    }

    stage.addEventListener("click", advance);
    stage.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
            e.preventDefault();
            advance();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
        }
    });

    document.getElementById("prev").addEventListener("click", () => goTo(index - 1));
    document.getElementById("restart").addEventListener("click", () => goTo(0));
    document.getElementById("next").addEventListener("click", advance);

    showCurrent();
})();
