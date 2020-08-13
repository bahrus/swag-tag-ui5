import {SwagTagPrimitiveBase} from 'swag-tag/lib/swag-tag-primitive-base.js';
import {SelectiveUpdate} from 'xtal-element/types.d.js';
import {define} from 'xtal-element/XtalElement.js';
import {createTemplate} from 'trans-render/createTemplate.js';

import ("@ui5/webcomponents/dist/Select.js");

const mainTemplate = createTemplate(/* html */`
  <style>
      :host{
          display:block;
      }
      ui5-select{
          width: 100%;
      }
  </style>
  <ui5-select part=select></ui5-checkbox>
`);

const [ui5Select] = [Symbol('ui5Select')];

const initTransform = ({self, handleChange}: SwagTagUI5Select) => ({
    selectPart: [{},{change:handleChange},,,ui5Select],
});

const updateInput = ({readOnly, inputType, disabled, value, name, description}: SwagTagUI5Select) => ({
    [ui5Select]: [{value: value, text: name}]
});

export const linkEditedValue = ({value, self}: SwagTagUI5Select) => {
    self.editedValue = value;
}

export class SwagTagUI5Select extends SwagTagPrimitiveBase{
    static is = 'swag-tag-ui5-select';
    
    mainTemplate = mainTemplate;

    initTransform = initTransform;

    updateTransforms = [
        updateInput
    ]  as SelectiveUpdate<any>[];

    propActions = [
        linkEditedValue
    ];

    handleChange(e: Event){
        debugger;
    }
}
define(SwagTagUI5Select);