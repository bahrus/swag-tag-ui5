import { SwagTagPrimitiveBase } from 'swag-tag/lib/swag-tag-primitive-base.js';
import { define } from 'xtal-element/XtalElement.js';
import { createTemplate } from 'trans-render/createTemplate.js';
import("@ui5/webcomponents/dist/Select.js");
const mainTemplate = createTemplate(/* html */ `
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
const initTransform = ({ self, handleChange }) => ({
    selectPart: [{}, { change: handleChange }, , , ui5Select],
});
const updateInput = ({ readOnly, inputType, disabled, value, name, description }) => ({
    [ui5Select]: [{ value: value, text: name }]
});
export const linkEditedValue = ({ value, self }) => {
    self.editedValue = value;
};
export class SwagTagUI5Select extends SwagTagPrimitiveBase {
    constructor() {
        super(...arguments);
        this.mainTemplate = mainTemplate;
        this.initTransform = initTransform;
        this.updateTransforms = [
            updateInput
        ];
        this.propActions = [
            linkEditedValue
        ];
    }
    handleChange(e) {
        debugger;
    }
}
SwagTagUI5Select.is = 'swag-tag-ui5-select';
define(SwagTagUI5Select);
