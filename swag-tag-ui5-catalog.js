import { XtalElement, define, symbolize, p } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import { templStampSym } from 'trans-render/plugins/templStamp.js';
import '@ui5/webcomponents-fiori/dist/SideNavigation.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationItem.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js';
import '@ui5/webcomponents-icons/dist/icons/menu.js';
import '@ui5/webcomponents-icons/dist/icons/home.js';
import '@ui5/webcomponents-icons/dist/icons/group.js';
import '@ui5/webcomponents-icons/dist/icons/tree.js';
import '@ui5/webcomponents-icons/dist/icons/calendar.js';
import '@ui5/webcomponents-icons/dist/icons/chain-link.js';
import '@ui5/webcomponents-icons/dist/icons/create-form.js';
import '@ui5/webcomponents-icons/dist/icons/history.js';
import '@ui5/webcomponents-icons/dist/icons/vertical-bar-chart.js';
import '@ui5/webcomponents/dist/ToggleButton.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import 'p-et-alia/p-d.js';
const mainTemplate = createTemplate(/* html */ `
<style>
iframe{
    width:100%;
    height:calc(100vh - 100px);
}
</style>
<slot name=linkList part=linksSlot style=display:none></slot>
<ui5-shellbar
primary-title="UI5 Web Component Catalog"
secondary-title="TBD"
show-co-pilot
>
    <ui5-togglebutton icon="menu" slot="startButton" id="startButton"></ui5-togglebutton>
    <p-d on=click from=ui5-shellbar to=div care-of=ui5-side-navigation[-collapsed] val=target.pressed parse-val-as=falsy></p-d>
</ui5-shellbar>
<div style="display:flex;flex-direction:row;">
    <ui5-side-navigation -collapsed>
        <ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Form Components" expanded icon="create-form" part=componentList></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Navigation Components" icon="tree"></ui5-side-navigation-item>
        <ui5-side-navigation-item text="Charting Components" icon="vertical-bar-chart"></ui5-side-navigation-item>

        <ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
        <ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
    </ui5-side-navigation>
    <p-d on=selection-change to=[-src] val=detail.item.dataset.href m=1 skip-init></p-d>
    <iframe name=demoFrame -src></iframe>
</div>
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
    [uiRefs.componentList]: [links, 'ui5-side-navigation-sub-item', , populateLink]
});
const updateTransforms = [
    bindLinks
];
const populateLink = ({ item }) => ({
    'ui5-side-navigation-sub-item': [{
            text: item.textContent,
            dataset: {
                href: item.href,
            }
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
