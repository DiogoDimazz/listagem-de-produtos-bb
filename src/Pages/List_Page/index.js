import './style.css'
import ListBox from '../../Components/List_Box'
import downArrow from '../../assets/down_arrow.svg'
import productsJson from '../../productsCategory.json'
import { animated, easings, useChain, useSpringRef, useTransition } from 'react-spring'
import { useEffect, useState } from 'react'

export default function ListPage() {
    const allProducts = [...productsJson.data.nodes]
    const [products, setProducts] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const [filterHover, setFilterHover] = useState(false)
    const filterModalRef = useSpringRef()
    const dissolveTransitionRef = useSpringRef()


    const underlineMove = useTransition(filterHover, {
        from: { right: '50%', left: '50%' },
        enter: { right: '5%', left: '0%' },
        leave: { right: '50%', left: '50%' },
        config: { duration: 200, easing: easings.easeOutCubic }
    })

    const filterModal = useTransition(openFilter, {
        from: { height: '0rem' },
        enter: { height: '30rem' },
        leave: { height: '0rem' },
        config: { duration: 300, easing: easings.easeInSine },
        ref: filterModalRef
    })

    const dissolveTransition = useTransition(openFilter, {
        from: { opacity: '0' },
        enter: { opacity: '1' },
        leave: { opacity: '0' },
        config: { duration: 300, easing: easings.easeOutCubic },
        ref: dissolveTransitionRef
    })

    function handleCategory(e) {
        if (e.target.innerText === 'Todas as categorias') { return setProducts([...allProducts]) }
        const localArray = allProducts.filter((p) => {
            return p.category.name === e.target.innerText
        })

        setProducts([...localArray])
    }

    function getAllCategories() {
        let localArray = []
        allProducts.forEach((p) => {
            if (!localArray.includes(p.category.name)) {
                return localArray.push(p.category.name)
            }
        })
        setCategoryList(['Todas as categorias', ...localArray])
    }

    useChain(openFilter ? [filterModalRef, dissolveTransitionRef] : [dissolveTransitionRef, filterModalRef], [0, 0.3])

    useEffect(() => {
        console.log(products);
    }, [products])

    useEffect(() => {
        setProducts([...allProducts])
        getAllCategories()
        //eslint-disable-next-line
    }, [])

    return (
        <main className='main-list'>
            <header> <span style={{ color: 'var(--pink)', marginRight: '0.102em' }}>
                /
            </span>
                Listagem de Produtos
            </header>
            <div className='filter-div'>
                <div className='select-box'
                    onMouseOver={() => setFilterHover(true)}
                    onMouseLeave={() => setFilterHover(false)}>
                    <button
                        onClick={() => setOpenFilter(!openFilter)}
                        className='filter-btn'
                    >
                        Filtrar por categoria
                    </button>
                    <img style={{ marginLeft: '0.8rem' }} src={downArrow} alt='down-arrow' />
                    {underlineMove((style, filterHover) => (
                        filterHover &&
                        <animated.div style={style} className='underline' />
                    ))}
                    {filterModal((style, openFilter) => (
                        openFilter &&
                        <animated.div
                            style={style}
                            onMouseLeave={() => setOpenFilter(false)}
                            className='filter-modal'>
                            {dissolveTransition((style, openFilter) => (
                                openFilter &&
                                <animated.div style={style}>
                                    {categoryList.map((category) => (
                                        <p className='category-list' onClick={(e) => handleCategory(e)}>{category}</p>
                                    ))}
                                </animated.div>
                            ))}
                        </animated.div>
                    ))}
                </div>
            </div>
            <section className='list-box'>
                <ListBox products={products} />
            </section>
        </main>
    )
}