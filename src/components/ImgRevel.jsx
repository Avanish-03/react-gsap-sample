import React from 'react'
import service1 from '../assets/service1.jpg'
import service2 from '../assets/service2.jpg'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';


function ImgRevel() {

    const imgs = [service1, service2, service1, service2, service1, service2];

    const generateClipPaths = (type) => {

        const gridSize = 5;
        const step = 100 / gridSize;
        const paths = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x1 = col * step;
                const y1 = row * step;
                const x2 = (col + 1) * step;
                const y2 = (row + 1) * step;

                if (type === 'visible') {
                    paths.push(`polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`);
                } else {
                    paths.push(`polygon(${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%, ${x1}% ${y1}%)`);
                }
            }
        }
        return paths;
    };


    const hiddenClipPaths = generateClipPaths('hidden');
    const visibleClipPaths = generateClipPaths('visible');


    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.image').forEach((img) => {
            const marks = img.querySelectorAll('.mask');
            marks.forEach((mark, i) => {
                gsap.to(mark, {
                    clipPath: hiddenClipPaths[i],
                });
            });

            let t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: img,
                    scrub: true,
                    start: "top 100%",
                    end: "bottom 80%"
                }
            });

            t1.to(marks, {
                clipPath: (i) => visibleClipPaths[i],
                duration: 1,
                ease: "power2.out",
                stagger: 0.1
            });
        });
    });

    return (
        <>
            <div className='bg-neutral-950 text-white min-h-screen'>
                <div className='w-full h-full flex flex-wrap gap-18 p-40'>
                    {imgs.map((img, i) => {
                        return (
                            <div key={i} className='image h-[700px] w-[550px] overflow-hidden relative' >
                                {[...Array(25)].map((_, j) => (
                                    <div
                                        key={j}
                                        className={`h-full w-full mask mask${j} absolute top-0 left-0`}
                                        style={{ background: `url(${img})` , backgroundPosition: "center", backgroundSize : "cover" }}
                                    ></div>
                                ))}
                            </div>
                        )
                    })}

                </div>

            </div>
        </>
    )
}

export default ImgRevel