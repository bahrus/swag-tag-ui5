import { XtalElement, define, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import '@ui5/webcomponents-fiori/dist/SideNavigation.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationItem.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js';
import '@ui5/webcomponents-icons/dist/icons/menu.js';
import '@ui5/webcomponents-icons/dist/icons/home.js';
import '@ui5/webcomponents-icons/dist/icons/group.js';
import '@ui5/webcomponents-icons/dist/icons/calendar.js';
import '@ui5/webcomponents-icons/dist/icons/chain-link.js';
import '@ui5/webcomponents-icons/dist/icons/history.js';
//import 'p-et-alia/p-d.js';
const mainTemplate = createTemplate(/* html */ `
<style>
iframe{
    width:100%;
    height:calc(100vh - 100px);
}
</style>
<slot name=linkList part=linksSlot style=display:none></slot>
<ui5-shellbar
primary-title="UI5 Web Components"
secondary-title="The Best Run SAP"
show-co-pilot
>
	<ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
</ui5-shellbar>

<ui5-side-navigation>
	<ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
	<ui5-side-navigation-item text="People" expanded icon="group">
		<ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
		<ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>
	<ui5-side-navigation-item text="Locations" icon="locate-me" selected></ui5-side-navigation-item>
	<ui5-side-navigation-item text="Events" icon="calendar">
		<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
		<ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>

	<ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
	<ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
</ui5-side-navigation>
<!-- <xtal-side-nav>
	<span slot=title>Catalog</span>
	<div part=componentList>
	</div>
</xtal-side-nav> -->
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
