(async function () {
    const stage = document.getElementById("stage");
    const nameEl = document.getElementById("name");
    const dogEl = document.getElementById("dog");
    const counterEl = document.getElementById("counter");
    const progressFill = document.getElementById("progressFill");
    const prevBtn = document.getElementById("prev");
    const restartBtn = document.getElementById("restart");
    const nextBtn = document.getElementById("next");

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

    function updateControls() {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = nameShown && index === breeds.length - 1;
    }

    function showCurrent() {
        const breed = breeds[index];
        dogEl.src = breed.image;
        dogEl.alt = breed.name;
        counterEl.textContent = (index + 1) + " / " + breeds.length;
        progressFill.style.width = ((index + 1) / breeds.length) * 100 + "%";
        nameEl.textContent = "";
        nameShown = false;
        nameEl.classList.remove("visible");
        updateControls();
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
            updateControls();
        } else if (index < breeds.length - 1) {
            index += 1;
            showCurrent();
        }
    }

    function goTo(i) {
        index = Math.max(0, Math.min(i, breeds.length - 1));
        showCurrent();
    }

    function goPrev() {
        if (index > 0) goTo(index - 1);
    }

    stage.addEventListener("click", advance);
    stage.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
            e.preventDefault();
            advance();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
        }
    });

    prevBtn.addEventListener("click", goPrev);
    restartBtn.addEventListener("click", () => goTo(0));
    nextBtn.addEventListener("click", advance);

    showCurrent();
})();
