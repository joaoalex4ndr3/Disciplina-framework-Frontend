import React from 'react';
import {LazyLoadImage, trackWindowScroll}
    from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from "./gallery.module.css"

const DEFAULT_IMG_WIDTH = 280;
const DEFAULT_IMG_HEIGHT = 280;
const DEFAULT_IMG_EFFECT = 'blur';

//read more about lazy image loader https://www.npmjs.com/package/react-lazy-load-image-component
const Gallery = ({images,scrollPosition}: {images:string[],scrollPosition:{x:number,y:number} } ) => {
    return (
        <div className={styles["gallery"]}>
            {images.map((url: any, index: number) =>
                <LazyLoadImage role="img" className={styles["lazy-load-img"]}
                               key={index}
                               alt={url}
                               width={DEFAULT_IMG_WIDTH}
                               height={DEFAULT_IMG_HEIGHT}
                               effect={DEFAULT_IMG_EFFECT}
                               visibleByDefault={false}
                               //scrollPosition={scrollPosition}
                               src={url}
                               placeholderSrc={url}
                    // Make sure to pass down the scrollPosition,
                    // this will be used by the component to know
                    // whether it must track the scroll position or not
                />
            )}
        </div>
    );
}
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);