/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { getAbilityHelpersAttribute } from './AbilityHelpers';
import * as BroTest from '../utils/BroTest';

describe('Deloser', () => {
    beforeAll(async () => {
        await BroTest.bootstrapAbilityHelpersPage();
    });

    it('should restore focus', async () => {
        await new BroTest.BroTest(
            <div {...getAbilityHelpersAttribute({ root: {}, deloser: {} })}>
                <button>Button1</button>
                <button>Button2</button>
                <button>Button3</button>
                <button>Button4</button>
            </div>
        )
        .pressTab()
        .pressTab()
        .activeElement(el => {
            expect(el?.textContent).toBe('Button2');
        })
        .removeElement()
        .wait(300)
        .activeElement(el => {
            expect(el?.textContent).toBe('Button1');
        });
    });
});
