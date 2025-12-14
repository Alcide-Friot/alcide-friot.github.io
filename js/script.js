const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

closeBtn.onclick = () => modal.classList.add('hidden');
modal.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };
function fitCollage() {
    const wrapper = document.querySelector('.collage-wrapper');
    const collage = document.querySelector('.head-collage');

    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;

    const collageWidth = collage.scrollWidth;
    const collageHeight = collage.scrollHeight;

    const scaleX = wrapperWidth / collageWidth;
    const scaleY = wrapperHeight / collageHeight;

    // Use the smaller scale to fit both width and height
    const scale = Math.min(scaleX, scaleY);

    // Set transform origin to top-left for scaling
    collage.style.transformOrigin = 'top left';
    collage.style.transform = `scale(${scale})`;

    // Center collage in wrapper
    const scaledWidth = collageWidth * scale;
    const scaledHeight = collageHeight * scale;

    collage.style.position = 'absolute';
    collage.style.left = `${(wrapperWidth - scaledWidth) / 2}px`;
    collage.style.top = `${(wrapperHeight - scaledHeight) / 2}px`;
}

// Run on load and resize
window.addEventListener('load', fitCollage);
window.addEventListener('resize', fitCollage);

// ============================================================
// POPUP ELEMENTS
// ============================================================
const popup = document.getElementById("popup");
const popupInner = document.getElementById("popup-inner");
const popupClose = document.querySelector(".popup-close");

// ============================================================
// CONTENT FOR EACH PIECE (edit as needed)
// ============================================================
const POPUP_CONTENT = {
    "piece-game_design": "Game Design Content",
    "piece-games": "Games Content",
    "piece-graphic_design": "Graphic Design Content",
    "piece-me": "About Me Content",
    "piece-music": "Music Content"
};


// ============================================================
// OPEN POPUP (with animation)
// ============================================================
function openPopup(html) {
    popupInner.innerHTML = html;

    // show popup
    popup.classList.remove("hidden");

    // restart animation
    popup.classList.remove("animate");
    void popup.offsetWidth; // forces reflow
    popup.classList.add("animate");

    scalePopup();
    scaleTitleForPopup();
}


// ============================================================
// CLOSE POPUP
// ============================================================
function closePopup() {
    popup.classList.remove("animate");
    popup.classList.add("hidden");
    resetTitleScale();
}


// ============================================================
// SCALE THE POPUP INNER CONTENT
// ============================================================
function scalePopup() {
    const outer = document.querySelector(".popup-outer");

    const designW = 2592;
    const designH = 2894;

    const scaleX = outer.clientWidth / designW;
    const scaleY = outer.clientHeight / designH;

    const scale = Math.min(scaleX, scaleY);

    popupInner.style.transform = `scale(${scale})`;
}


// rescale if window size changes
window.addEventListener("resize", scalePopup);
//window.addEventListener("resize", scaleTitleForPopup);



// ============================================================
// PIECE CLICK HANDLER (opens popup)
// ============================================================
document.querySelectorAll(".piece").forEach(piece => {
    piece.addEventListener("click", () => {

        // extract the "piece-xxx" class
        const id = [...piece.classList].find(c => c.startsWith("piece-"));

        // get the actual content
        const content = POPUP_CONTENT[id];

        if (!content) {
            console.warn("No content for:", id);
            return;
        }

        openPopup(getPopupLayoutFor(content));
    });
});



// ============================================================
// CLICK OUTSIDE POPUP TO CLOSE
// ============================================================
popupClose.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
});


// ============================================================
// POPUP HTML LAYOUT (YOUR MOCKUP)
// ============================================================
function getPopupLayoutFor(text) {
    return `
        <div style="
            font-family: 'Foremost', serif;
            padding: 120px;
            display: flex;
            gap: 240px;
        ">
            <div style="width: 700px;">
                <h1 style="color:#FF061D; font-size:170px;">TITLE</h1>
                <h2 style="color:#FF061D; font-size:140px;">SUBTITLE</h2>

                <p style="font-size:60px; line-height:1.3;">
                    ${text}
                </p>
            </div>

            <div>
                <img src="img/game_mock.jpg" style="width:700px; margin-bottom:80px;">
                <img src="img/game_mock.jpg" style="width:700px; margin-bottom:80px;">
                <img src="img/game_mock.jpg" style="width:700px;">
            </div>
        </div>
    `;
}


const mainTitle = document.getElementById("main-title");

function scaleTitleForPopup() {
    const titleRect = mainTitle.getBoundingClientRect();
    const popupOuter = document.querySelector(".popup-outer");
    const popupRect = popupOuter.getBoundingClientRect();

    const availableSpace = popupRect.top;
    const neededSpace = titleRect.height;

    // If it fits already, reset scale
    if (neededSpace <= availableSpace) {
        mainTitle.style.transform = "scale(1)";
        return;
    }

    // Scale factor: how much we must shrink to fit above popup
    const scale = availableSpace / neededSpace;

    // Clamp scale so it never inverts or becomes too tiny
    const finalScale = Math.max(0.3, Math.min(scale, 1));

    mainTitle.style.transform = `scale(${finalScale})`;
}

function resetTitleScale() {
    mainTitle.style.transform = "scale(1)";
}
