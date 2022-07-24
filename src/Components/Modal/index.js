import './style.css'
import closeBtn from '../../assets/close.svg'
import { useSpring, animated, easings } from 'react-spring'
import { useEffect, useState } from 'react'

export default function Modal({ openModal, setOpenModal, info }) {
    const [showInfo, setShowInfo] = useState(true)
    const enlargeModal = useSpring({
        from: showInfo
            ? { minHeight: '0rem', transform: 'rotateX(90deg)', perspective: '100px' }
            : { minHeight: '30rem', transform: 'rotateX(0deg)', perspective: '0px' },
        to: showInfo
            ? { minHeight: '30rem', transform: 'rotateX(0deg)', perspective: '0px' }
            : { minHeight: '0rem', transform: 'rotateX(90deg)', perspective: '100px' },
        config: { duration: showInfo ? 600 : 300, easing: easings.easeInSine }
    })

    function handleCloseModal() {
        setShowInfo(false)
        setTimeout(() => {
            setOpenModal(false)
        }, 350)
    }


    return (
        <div className='backdrop'>
            <animated.main style={enlargeModal} className='modal-box'>
                <img src={closeBtn} alt='close-icon' className='close-icon' onClick={handleCloseModal} />
                <div className='upper-modal-info'>
                    <img style={{ width: '250px' }} src={info.url} alt={info.alt} />
                    <div>
                        <p className='info-name'>{info.name}</p>
                        <p className='info-category'>Categoria: {info.category}</p>
                        <p className='info-short-description'>{info.shortDescription}</p>
                    </div>
                </div>

            </animated.main>
        </div>
    )
}