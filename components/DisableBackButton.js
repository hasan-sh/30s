import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

const DisableBackButton = ({ disable }) => {
    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => disable);
        return () => handler.remove();
    })
    return null;
}

export default DisableBackButton;