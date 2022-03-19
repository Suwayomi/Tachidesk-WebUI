/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Props {
    values: any
    name: string
    state: number
    selected: Selected | undefined
    position: number
    updateFilterValue: Function
    group: number | undefined
    update: any
}

interface Selected {
    displayname: string
    value: string
    _value: string
}

function hasSelect(
    values: Selected[],
    name: string,
    state: number,
    position: number,
    updateFilterValue: Function,
    update: any,
    group?: number,
) {
    const [val, setval] = React.useState(state);
    if (values) {
        /**
         * It takes the value of the input and sets the state of the component to that value.
         * @param event - The event object that was passed to the callback.
         */
        const handleChange = (event: { target: { name: any; value: any; }; }) => {
            const vall = values.map((e) => e.displayname).indexOf(`${event.target.value}`);
            setval(vall);
            const upd = update.filter((e: {
                position: number; group: number | undefined;
            }) => !(position === e.position && group === e.group));
            updateFilterValue([...upd, { position, state: vall.toString(), group }]);
        };

        const rett = values.map((e: Selected) => (
            <MenuItem
                key={`${name} ${e.displayname}`}
                value={e.displayname}
            >
                {
                    e.displayname
                }
            </MenuItem>
        ));
        return (
            <Box key={name} sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel sx={{ margin: '10px 0 10px 0' }}>
                        {name}
                    </InputLabel>
                    <Select
                        name={name}
                        value={values[val].displayname}
                        label={name}
                        onChange={handleChange}
                        autoWidth
                        sx={{ margin: '10px 0 10px 0' }}
                    >
                        {rett}
                    </Select>
                </FormControl>
            </Box>
        );
    }
    return (<></>);
}

function noSelect(
    values: string[],
    name: string,
    state: number,
    position: number,
    updateFilterValue: Function,
    update: any,
    group?: number,
) {
    const [val, setval] = React.useState(state);

    if (values) {
        /**
         * It updates the state of the filter value.
         * @param event - The event object that was passed to the callback.
         */
        const handleChange = (event: { target: { name: any; value: any; }; }) => {
            const vall = values.indexOf(`${event.target.value}`);
            setval(vall);
            const upd = update.filter((e: {
                position: number; group: number | undefined;
            }) => !(position === e.position && group === e.group));
            updateFilterValue([...upd, { position, state: vall.toString(), group }]);
        };

        const rett = values.map((value: string) => (<MenuItem key={`${name} ${value}`} value={value}>{value}</MenuItem>));
        return (
            <Box key={name} sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel sx={{ margin: '10px 0 10px 0' }}>
                        {name}
                    </InputLabel>
                    <Select
                        name={name}
                        value={values[val]}
                        label={name}
                        onChange={handleChange}
                        autoWidth
                        sx={{ margin: '10px 0 10px 0' }}
                    >
                        {rett}
                    </Select>
                </FormControl>
            </Box>
        );
    }
    return (<></>);
}

/**
 * If the selected value is undefined, then render the noSelect function. Otherwise, render the
 * hasSelect function
 * @param {Props}  - values: The values to be displayed in the dropdown.
 * @returns A function that returns a function.
 */
export default function SelectFilter({
    values,
    name,
    state,
    selected,
    position,
    updateFilterValue,
    update,
    group,
}: Props) {
    if (selected === undefined) {
        return noSelect(
            values,
            name,
            state,
            position,
            updateFilterValue,
            update,
            group,
        );
    }

    return hasSelect(
        values,
        name,
        state,
        position,
        updateFilterValue,
        update,
        group,
    );
}
