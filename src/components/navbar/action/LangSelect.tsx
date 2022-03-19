/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { List, ListItemSecondaryAction, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { langCodeToName } from 'util/language';
import cloneObject from 'util/cloneObject';

/**
 * Remove all items from the first list that are also in the second list
 * @param {any[]} firstList - The array to remove the items from.
 * @param {any[]} secondList - The list to remove items from.
 * @returns The firstList array with the items from the secondList removed.
 */
function removeAll(firstList: any[], secondList: any[]) {
    secondList.forEach((item) => {
        const index = firstList.indexOf(item);
        if (index !== -1) {
            firstList.splice(index, 1);
        }
    });

    return firstList;
}

interface IProps {
    shownLangs: string[]
    setShownLangs: (arg0: string[]) => void
    allLangs: string[]
    forcedLangs?: string[]
}

/* The `export default` is not needed. */
export default function LangSelect(props: IProps) {
    const {
        shownLangs, setShownLangs, allLangs, forcedLangs,
    } = props;
    // hold a copy and only sate state on parent when OK pressed, improves performance
    const [mShownLangs, setMShownLangs] = useState(
        removeAll(cloneObject(shownLangs), forcedLangs!),
    );
    const [open, setOpen] = useState<boolean>(false);

    /**
     * It sets the state of the open variable to false.
     */
    const handleCancel = () => {
        setOpen(false);
    };

    /**
     * It sets the state of the component to false and sets the state of the component to the value of
     * the variable mShownLangs.
     */
    const handleOk = () => {
        setOpen(false);
        setShownLangs(mShownLangs);
    };

    /**
     * It takes an event and a language, and then checks if the language is in the list of shown
     * languages. If it is, it removes it from the list. If it isn't, it adds it to the list
     * @param event - React.ChangeEvent<HTMLInputElement>
     * @param {string} lang - The language to be added or removed from the list of shown languages.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, lang: string) => {
        const { checked } = event.target as HTMLInputElement;

        if (checked) {
            setMShownLangs([...mShownLangs, lang]);
        } else {
            const clone = cloneObject(mShownLangs);
            clone.splice(clone.indexOf(lang), 1);
            setMShownLangs(clone);
        }
    };

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                aria-label="display more actions"
                edge="end"
                color="inherit"
                size="large"
            >
                <FilterListIcon />
            </IconButton>
            <Dialog
                sx={{
                    '.MuiDialog-paper': {
                        maxHeight: 435,
                        width: '80%',
                    },
                }}
                maxWidth="xs"
                open={open}
            >
                <DialogTitle>Enabled Languages</DialogTitle>
                <DialogContent dividers sx={{ padding: 0 }}>
                    <List>
                        {allLangs.map((lang) => (
                            <ListItem key={lang}>
                                <ListItemText primary={langCodeToName(lang)} />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={mShownLangs.indexOf(lang) !== -1}
                                        onChange={(e) => handleChange(e, lang)}
                                    />
                                </ListItemSecondaryAction>

                            </ListItem>
                        ))}
                    </List>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

LangSelect.defaultProps = {
    forcedLangs: [] as string[],
};
