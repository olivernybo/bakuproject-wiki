let id;

function insertMetaDates() {
	const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
	if (!frontmatter) {
		return;
	}

	const price = frontmatter["price"];
	const bakugan = frontmatter["bakugan"];
	if (!price) {
		return;
	}

	const frontmatterEl = document.querySelector(".frontmatter");
	if (!frontmatterEl) {
		return;
	}

/*	frontmatterEl.insertAdjacentHTML(
		"afterend",
		`
<div style="display: flex; justify-content: end; gap: 3px;">
    <span class="tag" target="_blank" rel="noopener">
        ${price} HSP
    </span>
    <a href="#${bakugan}" class="tag" target="_blank" rel="noopener">
        ${bakugan}
    </a>
</div>
`
	);*/

	let html = `<div style="display: flex; justify-content: end; gap: 3px; flex-direction: column; align-items: flex-end;">`;

	if (price) {
		html += `<span target="_blank" rel="noopener">Price: ${price} HSP</span>`;
	}

	if (bakugan) {
		html += `<span>Requires <a href="${bakugan}" class="internal-link" target="_blank" rel="noopener">${bakugan}</a></span>`;
	}

	html += `</div>`;

	frontmatterEl.insertAdjacentHTML("afterend", html);

	clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
	for (let mutation of mutationsList) {
		if (
			mutation.type === "childList" &&
			mutation.addedNodes[0]?.className === "page-header"
		) {
			clearInterval(id);
			id = setInterval(insertMetaDates, 50);
		}
	}
};

const targetNode = document.querySelector(
	".markdown-preview-sizer.markdown-preview-section"
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);