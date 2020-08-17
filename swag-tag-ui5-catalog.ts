import { XtalElement, define, symbolize, p, TransformValueOptions, AttributeProps, SelectiveUpdate, Plugins, RenderContext } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import {templStampSym} from 'trans-render/plugins/templStamp.js';
import '@ui5/webcomponents-fiori/dist/SideNavigation.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationItem.js';
import '@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js';
import '@ui5/webcomponents-icons/dist/icons/menu.js';
import '@ui5/webcomponents-icons/dist/icons/home.js';
import '@ui5/webcomponents-icons/dist/icons/group.js';
import '@ui5/webcomponents-icons/dist/icons/calendar.js';
import '@ui5/webcomponents-icons/dist/icons/chain-link.js';
import '@ui5/webcomponents-icons/dist/icons/create-form.js';
import '@ui5/webcomponents-icons/dist/icons/history.js';
import '@ui5/webcomponents/dist/ToggleButton.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';

import 'p-et-alia/p-d.js';

const mainTemplate = createTemplate(/* html */`
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
    <p-d on=click from=ui5-shellbar to=ui5-side-navigation[-collapsed] val=target.pressed parse-val-as=falsy></p-d>
</ui5-shellbar>

<ui5-side-navigation -collapsed>
	<ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
    <ui5-side-navigation-item text="Form Components" expanded icon="create-form" part=componentList></ui5-side-navigation-item>
	<ui5-side-navigation-item text="Locations" icon="locate-me" selected></ui5-side-navigation-item>
	<ui5-side-navigation-item text="Events" icon="calendar">
		<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
		<ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>

	<ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link"></ui5-side-navigation-item>
	<ui5-side-navigation-item slot="fixedItems" text="History" icon="history"></ui5-side-navigation-item>
</ui5-side-navigation>
<p-d on=selection-change to=[-src] val=detail.item.dataset.href m=1 skip-init></p-d>

<iframe name=demoFrame -src></iframe>
`);
const uiRefs = {linksSlot: p, componentList: p};
symbolize(uiRefs);
const initTransform = ({onLinksSlotChange}: SwagTagCatalogUI5) => ({
	':host': [templStampSym, uiRefs],
	[uiRefs.linksSlot]:[{},{'slotchange': onLinksSlotChange}]
} as TransformValueOptions);

const linkLinks = ({ linkAssignedNodes, self }: SwagTagCatalogUI5) => {
    const links: HTMLAnchorElement[] = [];
    Array.from(linkAssignedNodes!).forEach(node => {
        if((<any>node).querySelectorAll) {
            Array.from((<Element>node).querySelectorAll('a')).forEach(a =>{
                links.push(a);
            })
        }
    });
    self.links = links;
}
const propActions = [
    linkLinks,
];

const bindLinks = ({links}: SwagTagCatalogUI5) => ({
	[uiRefs.componentList]: [links,'ui5-side-navigation-sub-item',,populateLink]
});
const updateTransforms = [
	bindLinks
] as SelectiveUpdate<any>[];
const populateLink = ({item}: RenderContext) => ({
    'ui5-side-navigation-sub-item': [{
         text: item.textContent,
         dataset:{
            href: item.href,
         }
    }]
});
export class SwagTagCatalogUI5 extends XtalElement{
	static is = 'swag-tag-catalog-ui5';
	static attributeProps = ({ linkAssignedNodes, links }: SwagTagCatalogUI5) => ({
        obj: [linkAssignedNodes, links],
    } as AttributeProps);
    readyToInit = true;
    readyToRender = true;
    mainTemplate = mainTemplate;
	initTransform = initTransform;
	links: HTMLAnchorElement[] | undefined;
	linkAssignedNodes: Node[] | undefined;
	updateTransforms = updateTransforms;
	propActions = propActions;
	onLinksSlotChange() {
        this.linkAssignedNodes = (<any>this)[uiRefs.linksSlot].assignedNodes();
    }
}
define(SwagTagCatalogUI5);