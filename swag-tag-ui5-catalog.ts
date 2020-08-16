import { XtalElement, define, symbolize, p, TransformValueOptions, AttributeProps, SelectiveUpdate } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import {templStampSym} from 'trans-render/plugins/templStamp.js';
import 'xtal-side-nav/xtal-side-nav.js';
import '@ui5/webcomponents/dist/Button.js';

const mainTemplate = createTemplate(/* html */`
<slot name=linkList part=linksSlot style=display:none></slot>
<xtal-side-nav>
	<span slot=title>Catalog</span>
	<div part=componentList>
	</div>
</xtal-side-nav>
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
	[uiRefs.componentList]: [links,'ui5-button']
});
const updateTransforms = [
	bindLinks
] as SelectiveUpdate<any>[];
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