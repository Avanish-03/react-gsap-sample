import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

function Cube() {

    useGSAP(() => {
        gsap.registerPlugin(Draggable);

        // Track rotation state for x and y axes
        let rotationX = 0;
        let rotationY = 0;

        // Track Starting pointer possition for the drag calculation
        let startPointerX = 0;
        let startPointerY = 0;

        Draggable.create(".scene", {
            type: "rotation",
            onPress: function (e) {
                startPointerX = e.clientX;
                startPointerY = e.clientY;
            },

            onDrag: function (e) {
                const currentPointerX = e.clientX;
                const currentPointerY = e.clientY;

                const deltaX = currentPointerX - startPointerX;
                const deltaY = currentPointerY - startPointerY;

                rotationY += deltaX * 0.5;
                rotationX -= deltaY * 0.5;

                rotationX = Math.max(-90, Math.min(90, rotationX));

                gsap.set(".cube", {
                    rotationX,
                    rotationY
                })

                startPointerX = currentPointerX;
                startPointerY = currentPointerY;

            },
        });

    },[]);

    return (
        <>
            <div className='h-screen bg-neutral-950 flex items-center justify-center'>
                <h1 className='text-[5rem] font-bold pointer-events-none z-10 tracking-widest text-white uppercase absolute'>3D-Animation</h1>
                <div className='scene w-[300px] h-[300px] perspective-[1000px]'>
                    <div className='cube h-full w-full relative transform-3d -rotate-x-45'>
                        <div className='front absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                        <div className='back absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                        <div className='right absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                        <div className='left absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                        <div className='top absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                        <div className='bottom absolute w-[300px] h-[300px] backdrop-blur-lg'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cube