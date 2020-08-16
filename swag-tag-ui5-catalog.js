import { XtalElement, define, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import 'xtal-side-nav/xtal-side-nav.js';
import '@ui5/webcomponents/dist/Button.js';
const mainTemplate = createTemplate(/* html */ `
<slot name=linkList part=linksSlot style=display:none></slot>
<xtal-side-nav>
	<span slot=title>Catalog</span>
	<div part=componentList>
	</div>
</xtal-side-nav>
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
    [uiRefs.componentList]: [links, 'ui5-button']
});
const updateTransforms = [
    bindLinks
];
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
