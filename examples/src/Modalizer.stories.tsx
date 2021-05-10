/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Meta } from '@storybook/react';
import { Modal } from './components/Modal';
import * as React from 'react';
import { getCurrentTabster, getDeloser, getModalizer, getTabsterAttribute } from 'tabster';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Modalizer',
} as Meta;

export const ModalDialog = () => {
    const ref = React.useRef<Modal>(null);

    const onClick = () => ref.current?.show();
    return (
        <>
            <div aria-label='Main' { ...getTabsterAttribute({ modalizer: { id: 'main' }, deloser: {} })}>
                <button onClick={onClick}>Open modal</button>
            </div>
            <Modal ref={ref} />
        </>
    );
};

export const PopupContent = () => {
    const [open, setOpen ] = React.useState<boolean>(false);
    const popupRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const popupEl = popupRef.current;
        const tabster = getCurrentTabster(window);
        if (popupEl && open && tabster) {
            const modalizer = getModalizer(tabster);
            const deloser = getDeloser(tabster);
            modalizer.add(popupEl, {id: 'popup'});
            deloser.add(popupEl);
            modalizer.focus(popupEl);
        }

        return () => {
            const tabster = getCurrentTabster(window);
            if (popupEl && tabster && open) {
                const modalizer = getModalizer(tabster);
                const deloser = getDeloser(tabster);
                modalizer.remove(popupEl);
                deloser.remove(popupEl);
            }
        };

    }, [open, popupRef]);

    const onClick = () => setOpen(s => !s);

    const popupStyles = {
        maxWidth: 400,
        maxHeight: 400,
        border: '1px solid',
        padding: 5
    };

    return (
        <>
            <div aria-label='Main' { ...getTabsterAttribute({ modalizer: { id: 'main' }, deloser: {} })}>
                <button onClick={onClick}>Toggle popup</button>
            </div>
            <div>
                {open && <div aria-label={'popup'} ref={popupRef} style={popupStyles}>
                    <div tabIndex={0}>Focusable item</div>
                    <div tabIndex={0}>Focusable item</div>
                    <div tabIndex={0}>Focusable item</div>
                    <div tabIndex={0}>Focusable item</div>
                    <button onClick={onClick}>Dismiss</button>
                </div>}
            </div>
            <div aria-label='Main' { ...getTabsterAttribute({ modalizer: { id: 'main' }, deloser: {} })}>
                <button>Do not focus</button>
            </div>
        </>
    );
};
