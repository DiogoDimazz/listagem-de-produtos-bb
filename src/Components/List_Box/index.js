import { useSpring, easings, animated } from 'react-spring'
import './style.css'


export default function ListBox({ products }) {

    const dissolveSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000, easing: easings.easeOutCubic }
    })

    return (
        <animated.main style={dissolveSpring} className='listbox-container'>
            <div className='labels'>
                <div className='label label-name'>Produto</div>
                <div className='label label-category'>Categoria</div>
                <div className='label label-description'>Descrição</div>
            </div>
            {products.map((p) => (
                <div className='product-row' key={p.id}>
                    <div className='p-name'>{p.name}</div>
                    <div className='p-category'>{p.category.name}</div>
                    <div className='p-description'>{p.shortDescription}</div>
                </div>
            ))}
        </animated.main>
    )
}