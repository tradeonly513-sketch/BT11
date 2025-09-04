import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useOptimizedGSAP } from '../../hooks/useOptimizedGSAP'

const Stairs = (props) => {

    const currentPath = useLocation().pathname

    const stairParentRef = useRef(null)
    const pageRef = useRef(null)

    // Ensure content is visible on initial load
    useEffect(() => {
        if (pageRef.current) {
            gsap.set(pageRef.current, { opacity: 1 })
        }
    }, [])
    
    useOptimizedGSAP(function () {
        // Ensure stairs are hidden initially
        gsap.set(stairParentRef.current, { display: 'none' })
        
        const tl = gsap.timeline({ 
            defaults: { force3D: true, ease: "power2.inOut" }
        })
        tl.to(stairParentRef.current, {
            display: 'block',
        })
        tl.from('.stair', {
            height: 0,
            force3D: true,
            stagger: {
                amount: -0.2
            }
        })
        tl.to('.stair', {
            y: '100%',
            force3D: true,
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        })
        tl.to('.stair', {
            y: '0%',
            force3D: true,
        })

        gsap.fromTo(pageRef.current, {
            opacity:0,
            scale:1.2,
            force3D: true
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 1.3,
            ease: "power2.out",
            force3D: true
        })
    }, [currentPath], { 
        enableScrollTrigger: false, 
        enableGPUAcceleration: true 
    })
    

    return (
        <div>
            <div ref={stairParentRef} className='h-screen w-full fixed z-20 top-0'>
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                </div>
            </div>
            <div ref={pageRef} style={{ opacity: 1 }}>
                {props.children}
            </div>
        </div>
    )
}

export default Stairs