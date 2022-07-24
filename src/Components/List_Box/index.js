import { useState } from 'react';
import { useSpring, easings, animated } from 'react-spring'
import './style.css'
import Modal from '../Modal';


export default function ListBox({ products }) {
    const [openModal, setOpenModal] = useState(false)
    const [info, setInfo] = useState({
        name: '',
        category: '',
        shortDescription: '',
        url: '',
        alt: ''
    })

    const dissolveSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000, easing: easings.easeOutCubic }
    })

    function handleInfo(p) {
        setOpenModal(true)
        setInfo({
            name: p.name,
            category: p.category.name,
            shortDescription: p.shortDescription,
            url: p.images[0].asset.url,
            alt: p.images[0].alt
        })
    }

    return (
        <animated.main style={dissolveSpring} className='listbox-container'>
            <div className='labels'>
                <div className='label label-name'>Produto</div>
                <div className='label label-category'>Categoria</div>
                <div className='label label-description'>Descrição</div>
            </div>
            {products.map((p) => (
                <div className='product-row' key={p.id} onClick={() => handleInfo(p)}>
                    <div className='p-name'>{p.name}</div>
                    <div className='p-category'>{p.category.name}</div>
                    <div className='p-description'>{p.shortDescription}</div>
                </div>
            ))}
            {openModal &&
                <Modal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    info={info}
                />
            }
        </animated.main>
    )
}