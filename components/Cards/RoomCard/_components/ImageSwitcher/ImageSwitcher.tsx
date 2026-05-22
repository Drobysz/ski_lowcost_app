'use client';

import { useEffect, useRef, useState } from "react";
import { ImageSwitcherProps } from "./ImageSwitcher.props"
import s from "./style.module.scss";
import { 
    Switchers,
    ImageCover,
    CardPagination
} from "./_components";


export const ImageSwitcher = ({
    images,
    nb_lits
}: ImageSwitcherProps) => {
    const isImage = images.length > 0;
    const [imgIdx, setImgIdx] = useState(0);
    const [hover, setHover] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
	const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
		const container = containerRef.current;
		const el = itemsRef.current[imgIdx];

		if (!el) return;

		container?.scrollTo({
			behavior: "smooth",
			left: el.offsetLeft - container.offsetLeft
		});

		if (imgIdx === 0) {
			container!.scrollTo({ left: 0, behavior: 'smooth' });
			return;
		}

	}, [imgIdx]);

    return (
        <div 
            className="relative flex w-76.5 h-52 overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span className={s.tag}>
                {nb_lits} bed{nb_lits > 1 ? "s" : ""}
            </span>
            {!isImage && <ImageCover url={"/empty_room.jpg"} /> } 

            {isImage && 
                <div 
                    className={s.feed}
                    ref={containerRef}
                >
                    {images.map((img, idx) => (
                        <ImageCover
                            key={idx}
                            ref={(el) => {
                                itemsRef.current[idx] = el;
                            }}
                            url={img.url || "/empty_room.jpg"}
                        />
                    ))}
                </div>
            }

            {images.length > 1 && (
                <>
                    <Switchers 
                        imgIdx={imgIdx}
                        setImgIdx={setImgIdx}
                        lastIdx={images.length - 1}
                        hover={hover}
                    />
                    <CardPagination
                        qntty={images.length}
                        hover={hover}
                        imgIdx={imgIdx}
                        setImgIdx={setImgIdx}
                    />
                </>
            )}
        </div>
    );
}