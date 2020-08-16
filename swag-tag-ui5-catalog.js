import { XtalElement, define, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import 'xtal-side-nav/xtal-side-nav.js';
import '@ui5/webcomponents/dist/Link.js';
//import 'p-et-alia/p-d.js';
const mainTemplate = createTemplate(/* html */ `
<style>
iframe{
    width:100%;
    height:calc(100vh - 100px);
}
</style>
<slot name=linkList part=linksSlot style=display:none></slot>
<xtal-side-nav>
	<span slot=title>Catalog</span>
	<div part=componentList>
	</div>
</xtal-side-nav>
<iframe name=demoFrame></iframe>
`);
const uiRefs = { linksSlot: p, componentList: p };
symbolize(uiRefs);
const initTransform = ({ onLinksSlotChange }) => ({
    ':host': [templStampSym, uiRefs],
    [uiRefs.linksSlot]: [{}, { 'slotchange': onLinksSlotChange }]
});
const linkLinks = ({ linkAssignedNodes, self }) => {
    const links = [];
    Array.from(linkAssignedNodes).forEach(node => {
        if (node.querySelectorAll) {
            Array.from(node.querySelectorAll('a')).forEach(a => {
                links.push(a);
            });
        }
    });
    self.links = links;
};
const propActions = [
    linkLinks,
];
const bindLinks = ({ links }) => ({
    [uiRefs.componentList]: [links, 'ui5-link', , populateLink]
});
const updateTransforms = [
    bindLinks
];
const populateLink = ({ item }) => ({
    'ui5-link': [{
            textContent: item.textContent,
            href: item.href,
            target: 'demoFrame',
        }]
});
export class SwagTagCatalogUI5 extends XtalElement {
    constructor() {
        super(...arguments);
        this.readyToInit = true;
        this.readyToRender = true;
        this.mainTemplate = mainTemplate;
        this.initTransform = initTransform;
        this.updateTransforms = updateTransforms;
        this.propActions = propActions;
    }
    onLinksSlotChange() {
        this.linkAssignedNodes = this[uiRefs.linksSlot].assignedNodes();
    }
}
SwagTagCatalogUI5.is = 'swag-tag-catalog-ui5';
SwagTagCatalogUI5.attributeProps = ({ linkAssignedNodes, links }) => ({
    obj: [linkAssignedNodes, links],
});
define(SwagTagCatalogUI5);
