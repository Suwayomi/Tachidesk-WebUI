/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useState } from 'react';
import NavBarContext from 'components/context/NavbarContext';

interface IProps{
    children: React.ReactNode
}

/**
 * The NavBarProvider is a React context provider that provides the NavBarContext
 * @param {IProps}  - `children` is the child component that will be rendered.
 * @returns A provider that wraps the children and provides the value to the context.
 */
export default function NavBarProvider({ children }:IProps) {
    const [title, setTitle] = useState<string>('Tachidesk');
    const [action, setAction] = useState<any>(<div />);
    const [override, setOverride] = useState<INavbarOverride>({
        status: false,
        value: <div />,
    });

    const value = {
        title,
        setTitle,
        action,
        setAction,
        override,
        setOverride,
    };
    return (
        <NavBarContext.Provider value={value}>
            {children}
        </NavBarContext.Provider>
    );
}
