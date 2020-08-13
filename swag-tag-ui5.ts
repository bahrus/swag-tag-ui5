import {
    SwagTag, uiRefs, bindName, addEventListeners, linkWcInfo, triggerImportReferencedModule, 
    adjustValueAndType, bindSelf, showHideEditor, linkInnerTemplate, copyPropInfoIntoEditor} from 'swag-tag/swag-tag.js';
  import { WCSuiteInfo, WCInfo, PropertyInfo, CustomEventInfo, SlotInfo, AttribInfo } from "wc-info/types.js";
  import {define} from 'xtal-element/XtalElement.js';
  import {RenderContext, PEATSettings} from 'trans-render/types.d.js';
  import {SwagTagUI5Input} from './lib/swag-tag-ui5-input.js';
  import {SwagTagUI5Checkbox} from './lib/swag-tag-ui5-checkbox.js';
  import {SwagTagJsonEditor} from 'swag-tag/lib/swag-tag-json-editor.js';
  import {SwagTagUI5Select} from './lib/swag-tag-ui5-select.js';
  import { SelectiveUpdate} from "../xtal-element/types.js";
  
  
  
  const copyPropInfoIntoEditors = {
    [`${SwagTagUI5Input.is},${SwagTagUI5Checkbox.is},${SwagTagJsonEditor.is},${SwagTagUI5Select.is}`]: copyPropInfoIntoEditor,
  };
  
  export const addEditors =   ({massagedProps, name}: SwagTag) => ({
      // Loop over massagedProps, and insert dynamic editor via tag name (item.editor is the tag name)
      [uiRefs.fieldset]: [
        //Array to loop over
        massagedProps, 
        //A **toTagOrTemplate** function that returns a string -- used to generate a (custom element) with the name of the string.
        ({item}: RenderContext) => (<any>item).editor,
        //empty range
        ,
        //now that document.createElement(tag) done, apply transform
        copyPropInfoIntoEditors
      ]
  });
  
  const massaged = Symbol();
  export const linkMassagedProps = ({properties, self, block}: SwagTag) => {
      if(properties === undefined || (<any>properties)[massaged as any as string]) return;
      properties.forEach(prop =>{
        adjustValueAndType(prop);
        const anyProp = <any>prop;
        let defaultVal = anyProp.default;
        switch(prop.type){
          case 'string':
          case 'number':
            anyProp.editor = SwagTagUI5Input.is;
            break;
          case 'boolean':
            anyProp.editor = SwagTagUI5Checkbox.is;
            break;
          case 'object':
            anyProp.editor = SwagTagJsonEditor.is;
            break;
          case 'stringArray':
            anyProp.editor = SwagTagUI5Select.is;
            break;
          default:
            throw 'Not implemented';
            
        }
      });
      (<any>properties)[massaged as any as string] = true;
      self.massagedProps = block !== undefined ? properties.filter(prop => !block.includes(prop.name!)) : properties;
    }
  
  const updateTransforms = [
      bindName,
      addEventListeners,
      addEditors,
      bindSelf,
    ] as SelectiveUpdate<any>[];
  
  export class SwagTagUI5 extends SwagTag{
      static is = 'swag-tag-ui5';
  
      updateTransforms = updateTransforms;
  
      propActions = [
          linkWcInfo, linkMassagedProps, triggerImportReferencedModule, showHideEditor, linkInnerTemplate
      ];
  
  }
  
  define(SwagTagUI5);