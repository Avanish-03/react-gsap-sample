import React from 'react'
import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import gsap from 'gsap';

function ImageScrollRevel() {

    const images = [
        {
            id: 1,
            image: service1,
            title: 'Service 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.'
        },
        {
            id: 2,
            image: service2,
            title: 'Service 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.'
        },
        {
            id: 3,
            image: service1,
            title: 'Service 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.'
        },
        {
            id: 4,
            image: service2,
            title: 'Service 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.'
        }
    ]

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.slider .image').forEach((img ,i) => {
            gsap.fromTo(
                img,
                {
                    clipPath : 'inset(0% 100% 100% 0% round 25px)'
                },
                {
                    clipPath : 'inset(0% 0% 0% 0% round 25px)',
                    duration : 1,
                    ease : "none",
                    scrollTrigger : {
                        trigger : img,
                        start : 'clamp(top bottom)',
                        end : 'clamp(top top)',
                        scrub : true
                    }
                }
            )
        })
    })

    return (
        <>
            <div className='bg-neutral-950 text-white py-20'>
                <h1 className='text-5xl text-center font-bold font-serif py-20'>Image Scroll Revel</h1>
                <div className=''>
                    {images.map((item, i) => {
                        return <div key={item.id} className='slider flex border-b border-white/25 p-3'>
                            <div className='w-[40%] text-4xl self-end p-8'>
                            <h1>{item.title}</h1>
                            </div>
                            <div className='w-[60%] h-88'>
                            <div className='image w-full h-full' style={{background:`url(${item.image})`, backgroundPosition: 'center' , backgroundSize: 'cover'}}></div>
                            </div>

                        </div>
                    })}
                </div>

            </div>
        </>
    )
}

export default ImageScrollRevel