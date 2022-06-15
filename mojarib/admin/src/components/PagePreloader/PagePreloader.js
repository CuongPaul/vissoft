import React, {useState} from "react";
import Preloader from "../../components/Preloader"
import {useLoaderContext} from "../../contexts/PageLoaderContext";

export default function PagePreloader() {
    const {showLoader} = useLoaderContext();
    return (
        showLoader && (
            <div className={'page-loader-container'}>
                <div className={'page-preloader'}>
                    <Preloader type={'chasing-dots'} />
                </div>
            </div>
        )
    )
}