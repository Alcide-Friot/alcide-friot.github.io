const sections = document.querySelectorAll('.section');
const closeButton = document.querySelector('.panel-close');
const panels = document.querySelectorAll('.content-panel');

function closePanels() {
    panels.forEach(panel => panel.classList.remove('active'));
    closeButton.classList.remove('active');
}

sections.forEach(section => {
    section.addEventListener('click', e => {
        e.preventDefault();

        const target = section.dataset.panel;

        panels.forEach(panel => panel.classList.remove('active'));

        const panel = document.querySelector(
            `.content-panel[data-panel="${target}"]`
        );

        if (panel) {
            panel.classList.add('active');
            closeButton.classList.add('active');
        }
    });
});

closeButton.addEventListener('click', closePanels);
