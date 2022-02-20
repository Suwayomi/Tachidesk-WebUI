/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { Link } from 'react-router-dom';

export default function ListItemLink(props: ListItemProps<Link, {}>) {
    return (
        <ListItem
            // @ts-ignore
            // sx={{ color: 'white', textDecoration: 'none', '-webkit-text-decoration': 'none' }}
            // @ts-ignore
            button
            component={Link}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
    // eslint-disable-next-line react/jsx-props-no-spreading
    // return <ListItem button component="a" {...props} />;
}
