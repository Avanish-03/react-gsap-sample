import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

function index() {

    const boxRef = useRef(null)

    const handleClick = () => {
        gsap.to(boxRef.current, { rotation: 360, duration: 1, repeat: -1, ease: 'none' })
    }

    return (
        <div className='flex items-center justify-center gap-6'>
            <button onClick={handleClick} className='px-4 py-2 curso bg-blue-500 text-white rounded-lg'>Click Me</button>
            <div ref={boxRef} className='box rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 h-20 w-20'> </div>
        </div>
    )
}

export default index