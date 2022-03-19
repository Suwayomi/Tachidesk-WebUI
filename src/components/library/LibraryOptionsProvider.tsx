/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from 'react';
import LibraryOptionsContext from 'components/context/LibraryOptionsContext';
import useLocalStorage from 'util/useLocalStorage';

interface IProps {
    children: React.ReactNode;
}

/**
 * The LibraryOptionsContextProvider is a React context provider that provides the current library
 * display options and a function to change them
 * @param {IProps}  - IProps {
 * @returns A context provider that wraps the children.
 */
export default function LibraryOptionsContextProvider({ children }: IProps) {
    const [options, setOptions] = useLocalStorage<LibraryDisplayOptions>('libraryOptions',
        {
            showDownloadBadge: false, showUnreadBadge: false, gridLayout: 0, SourcegridLayout: 0,
        });

    return (
        <LibraryOptionsContext.Provider value={{ options, setOptions }}>
            {children}
        </LibraryOptionsContext.Provider>
    );
}
