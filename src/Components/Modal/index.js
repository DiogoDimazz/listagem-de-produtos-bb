import './style.css'
import closeBtn from '../../assets/close.svg'
import { useSpring, animated, easings } from 'react-spring'
import { useEffect, useState } from 'react'
import { CircularProgress, Skeleton } from '@chakra-ui/react'

export default function Modal({ openModal, setOpenModal, info }) {
    const [showInfo, setShowInfo] = useState(true)
    const [loadingImg, setLoadingImg] = useState(true)
    const enlargeModal = useSpring({
        from: showInfo
            ? { minHeight: '0rem', transform: 'rotateX(90deg)', perspective: '500px' }
            : { minHeight: '30rem', transform: 'rotateX(0deg)', perspective: '500px' },
        to: showInfo
            ? { minHeight: '30rem', transform: 'rotateX(0deg)', perspective: '500px' }
            : { minHeight: '0rem', transform: 'rotateX(90deg)', perspective: '500px' },
        config: { duration: showInfo ? 600 : 300, easing: easings.easeInSine }
    })


    function handleCloseModal() {
        setShowInfo(false)
        setTimeout(() => {
            setOpenModal(false)
        }, 350)
    }

    function handleLoad() {
        setTimeout(() => {
            setLoadingImg(false)
        }, 600)

    }

    useEffect(() => {
        return () => {
            setLoadingImg(true)
        }
    }, [openModal])

    return (
        <div className='backdrop'>
            <animated.main style={enlargeModal} className='modal-box'>
                <img src={closeBtn} alt='close-icon' className='close-icon' onClick={handleCloseModal} />
                <div className='modal-info' onLoad={handleLoad}>
                    <div className='modal-img'>
                        {loadingImg &&
                            <CircularProgress className='circular-progress' isIndeterminate color='var(--pink)' />
                        }
                        <Skeleton
                            fadeDuration={1}
                            isLoaded={!loadingImg}>
                            <img className='product-img' src={info.url} alt={info.alt} />
                        </Skeleton>
                    </div>
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