import { r as reactExports } from './index.CgF3vwW3.js';
import { r as reactDomExports } from './index.0k42pOGA.js';
import './_commonjsHelpers.BFTU3MAI.js';

var hydrateRoot;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  hydrateRoot = m.hydrateRoot;
}

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name, hydrate = true }) => {
	if (!value) return null;
	const tagName = hydrate ? 'astro-slot' : 'astro-static-slot';
	return reactExports.createElement(tagName, {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

function isAlreadyHydrated(element) {
	for (const key in element) {
		if (key.startsWith('__reactContainer')) {
			return key;
		}
	}
}

function createReactElementFromDOMElement(element) {
	let attrs = {};
	for (const attr of element.attributes) {
		attrs[attr.name] = attr.value;
	}
	// If the element has no children, we can create a simple React element
	if (element.firstChild === null) {
		return reactExports.createElement(element.localName, attrs);
	}

	return reactExports.createElement(
		element.localName,
		attrs,
		Array.from(element.childNodes)
			.map((c) => {
				if (c.nodeType === Node.TEXT_NODE) {
					return c.data;
				} else if (c.nodeType === Node.ELEMENT_NODE) {
					return createReactElementFromDOMElement(c);
				} else {
					return undefined;
				}
			})
			.filter((a) => !!a),
	);
}

function getChildren(childString, experimentalReactChildren) {
	if (experimentalReactChildren && childString) {
		let children = [];
		let template = document.createElement('template');
		template.innerHTML = childString;
		for (let child of template.content.children) {
			children.push(createReactElementFromDOMElement(child));
		}
		return children;
	} else if (childString) {
		return reactExports.createElement(StaticHtml, { value: childString });
	} else {
		return undefined;
	}
}

// Keep a map of roots so we can reuse them on re-renders
let rootMap = new WeakMap();
const getOrCreateRoot = (element, creator) => {
	let root = rootMap.get(element);
	if (!root) {
		root = creator();
		rootMap.set(element, root);
	}
	return root;
};

const client = (element) =>
	(Component, props, { default: children, ...slotted }, { client }) => {
		if (!element.hasAttribute('ssr')) return;

		const actionKey = element.getAttribute('data-action-key');
		const actionName = element.getAttribute('data-action-name');
		const stringifiedActionResult = element.getAttribute('data-action-result');

		const formState =
			actionKey && actionName && stringifiedActionResult
				? [JSON.parse(stringifiedActionResult), actionKey, actionName]
				: undefined;

		const renderOptions = {
			identifierPrefix: element.getAttribute('prefix'),
			formState,
		};
		for (const [key, value] of Object.entries(slotted)) {
			props[key] = reactExports.createElement(StaticHtml, { value, name: key });
		}

		const componentEl = reactExports.createElement(
			Component,
			props,
			getChildren(children, element.hasAttribute('data-react-children')),
		);
		const rootKey = isAlreadyHydrated(element);
		// HACK: delete internal react marker for nested components to suppress aggressive warnings
		if (rootKey) {
			delete element[rootKey];
		}
		if (client === 'only') {
			return reactExports.startTransition(() => {
				const root = getOrCreateRoot(element, () => {
					const r = createRoot(element);
					element.addEventListener('astro:unmount', () => r.unmount(), { once: true });
					return r;
				});
				root.render(componentEl);
			});
		}
		reactExports.startTransition(() => {
			const root = getOrCreateRoot(element, () => {
				const r = hydrateRoot(element, componentEl, renderOptions);
				element.addEventListener('astro:unmount', () => r.unmount(), { once: true });
				return r;
			});
			root.render(componentEl);
		});
	};

export { client as default };
