/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as BroTest from '../../testing/BroTest';
import { getTabsterAttribute, Types } from '../Tabster';

const groupperItem = (
    tabsterAttr: ReturnType<typeof getTabsterAttribute>,
    count: number
) => {
    return (
        <div tabindex='0' {...tabsterAttr} data-count={`${count}`}>
            <button>Foo</button>
            <button>Bar</button>
        </div>
    );
};

describe('Groupper - default', () => {
    beforeAll(async () => {
        await BroTest.bootstrapTabsterPage();
    });

    const getTestHtml = () => {
        const rootAttr = getTabsterAttribute({ root: {} });
        const groupperAttr = getTabsterAttribute({ groupper: {} });

        return (
            <div {...rootAttr}>
                {groupperItem(groupperAttr, 1)}
                {groupperItem(groupperAttr, 2)}
                {groupperItem(groupperAttr, 3)}
                {groupperItem(groupperAttr, 4)}
            </div>
        );
    };

    it('should focus groupper', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .activeElement(el =>
                expect(el?.attributes['data-count']).toBe('1')
            );
    });

    it('should focus inside groupper with Tab key', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressTab()
            .activeElement(el => expect(el?.textContent).toBe('Foo'));
    });

    it('should escape focus inside groupper with Escape key', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressTab()
            .pressEsc()
            .activeElement(el =>
                expect(el?.attributes['data-count']).toBe('1')
            );
    });

    it('should focus next groupper with arrow key if focus is inside', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressTab()
            .pressDown()
            .activeElement(el =>
                expect(el?.attributes['data-count']).toBe('2')
            );
    });
});

describe('Groupper - limited focus trap', () => {
    beforeAll(async () => {
        await BroTest.bootstrapTabsterPage();
    });

    const getTestHtml = () => {
        const rootAttr = getTabsterAttribute({ root: {} });
        const groupperAttr = getTabsterAttribute({
            groupper: { isLimited: Types.GroupperFocusLimits.LimitedTrapFocus }
        });

        return (
            <div {...rootAttr}>
                {groupperItem(groupperAttr, 1)}
                {groupperItem(groupperAttr, 2)}
                {groupperItem(groupperAttr, 3)}
                {groupperItem(groupperAttr, 4)}
            </div>
        );
    };

    it('should focus inside groupper with Enter key', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressEnter()
            .activeElement(el => expect(el?.textContent).toBe('Foo'));
    });

    it('should escape focus inside groupper with Escape key', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressEnter()
            .pressEsc()
            .activeElement(el =>
                expect(el?.attributes['data-count']).toBe('1')
            );
    });

    it('should focus next groupper with arrow key if focus is inside', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressEnter()
            .pressDown()
            .activeElement(el =>
                expect(el?.attributes['data-count']).toBe('2')
            );
    });

    it('should trap focus within groupper', async () => {
        await new BroTest.BroTest(getTestHtml())
            .pressTab()
            .pressEnter()
            .pressTab()
            .activeElement(el => expect(el?.textContent).toBe('Bar'))
            .pressTab()
            .activeElement(el => expect(el?.textContent).toBe('Foo'));
    });
});
