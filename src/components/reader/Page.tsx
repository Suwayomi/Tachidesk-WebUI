/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useEffect, useRef } from 'react';
import SpinnerImage from 'components/util/SpinnerImage';
import useLocalStorage from 'util/useLocalStorage';
import Box from '@mui/system/Box';

/**
 * It returns a style object that is used to style the image.
 * @param {IReaderSettings} settings - IReaderSettings
 * @returns The image style object.
 */
function imageStyle(settings: IReaderSettings): any {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (settings.readerType === 'DoubleLTR'
    || settings.readerType === 'DoubleRTL'
    || settings.readerType === 'ContinuesHorizontalLTR'
    || settings.readerType === 'ContinuesHorizontalRTL') {
        return {
            display: 'block',
            marginLeft: '7px',
            marginRight: '7px',
            width: 'auto',
            minHeight: '99vh',
            height: 'auto',
            maxHeight: '99vh',
            objectFit: 'contain',
            pointerEvents: 'none',
        };
    }

    return {
        display: 'block',
        marginBottom: settings.readerType === 'ContinuesVertical' ? '15px' : 0,
        minWidth: '50vw',
        width: dimensions.width < dimensions.height ? '100vw' : '100%',
        maxWidth: '100%',
    };
}

interface IProps {
    src: string
    index: number
    onImageLoad: () => void
    setCurPage: React.Dispatch<React.SetStateAction<number>>
    settings: IReaderSettings
}

const Page = React.forwardRef((props: IProps, ref: any) => {
    const {
        src, index, onImageLoad, setCurPage, settings,
    } = props;

    const [useCache] = useLocalStorage<boolean>('useCache', true);

    const imgRef = useRef<HTMLImageElement>(null);

    /**
     * If the image is scrolled out of view, set the current page to the current index
     */
    const handleVerticalScroll = () => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            if (rect.y < 0 && rect.y + rect.height > 0) {
                setCurPage(index);
            }
        }
    };

    /**
     * If the image is in the middle of the screen, set the current page to the current index
     */
    const handleHorizontalScroll = () => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            if (rect.left <= window.innerWidth / 2 && rect.right > window.innerWidth / 2) {
                setCurPage(index);
            }
        }
    };

    useEffect(() => {
        switch (settings.readerType) {
            case 'Webtoon':
            case 'ContinuesVertical':
                window.addEventListener('scroll', handleVerticalScroll);
                return () => window.removeEventListener('scroll', handleVerticalScroll);
            case 'ContinuesHorizontalLTR':
            case 'ContinuesHorizontalRTL':
                window.addEventListener('scroll', handleHorizontalScroll);
                return () => window.removeEventListener('scroll', handleHorizontalScroll);
            default:
                return () => {};
        }
    }, [handleVerticalScroll]);

    const imgStyle = imageStyle(settings);

    return (
        <Box ref={ref} sx={{ margin: 'auto' }}>
            <SpinnerImage
                src={`${src}?useCache=${useCache}`}
                onImageLoad={onImageLoad}
                alt={`Page #${index}`}
                imgRef={imgRef}
                spinnerStyle={{
                    ...imgStyle,
                    height: '100vh',
                    width: '70vw',
                    padding: '50px calc(50% - 20px)',
                    backgroundColor: '#525252',
                    marginBottom: 10,
                }}
                imgStyle={imgStyle}
            />
        </Box>
    );
});

export default Page;
