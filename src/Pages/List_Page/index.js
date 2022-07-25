import './style.css'
import ListBox from '../../Components/List_Box'
import downArrow from '../../assets/down_arrow.svg'
import exit from '../../assets/exit.svg'
import productsJson from '../../productsCategory.json'
import { animated, easings, useChain, useSpringRef, useTransition } from 'react-spring'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListPage() {
    const allProducts = [...productsJson.data.nodes]
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [categorySuggestion, setCategorySuggestion] = useState([])
    const [categoryNotFound, setCategoryNotFound] = useState(false)
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
        config: { duration: 150, easing: easings.easeInSine },
        ref: filterModalRef
    })

    const dissolveTransition = useTransition(openFilter, {
        from: { opacity: '0' },
        enter: { opacity: '1' },
        leave: { opacity: '0' },
        config: { duration: 150, easing: easings.easeOutCubic },
        ref: dissolveTransitionRef
    })

    const warningTransition = useTransition(categoryNotFound, {
        from: { opacity: '0' },
        enter: { opacity: '1' },
        leave: { opacity: '0' },
        config: { duration: 150, easing: easings.easeOutCubic }
    })

    function handleCategory(value) {
        setOpenFilter(false)
        if (value === 'Todas as categorias') { return setProducts([...allProducts]) }
        const localArray = allProducts.filter((p) => {
            return p.category.name === value
        })

        setProducts([...localArray])
    }


    function handleInput(e) {
        if (e.key !== "Enter") { return }
        let found = false
        categoryList.forEach((cat) => {
            if (inputValue.toLowerCase() === cat.toLowerCase()) {
                handleCategory(cat);
                found = true
            }
        })
        if (inputValue === '') {
            handleCategory('Todas as categorias')
        }
        if (!found) {
            handleCategory('Todas as categorias')
            setCategoryNotFound(true)
        }
        setInputValue('')
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

    function getCategorySuggestion() {
        const localArray = []
        if (!inputValue) { return setCategorySuggestion([]) }

        const localInputValue = inputValue.toLowerCase()

        let found = false
        categoryList.forEach((cat) => {
            if (cat === "Todas as categorias") { return }

            const lowerCat = cat.toLowerCase()
            const localCatWords = lowerCat.split(' ')

            localCatWords.forEach((localCat) => {
                if (localInputValue === localCat.slice(0, inputValue.length)) {
                    found = true
                    if (!localArray.includes(cat)) {
                        localArray.push(cat)
                    }
                }
                if (found) {
                    setCategorySuggestion([...localArray])
                } else {
                    setCategorySuggestion([])
                }
            })
        })
    }

    useChain(openFilter ? [filterModalRef, dissolveTransitionRef] : [dissolveTransitionRef, filterModalRef], [0, 0.15])

    useEffect(() => {
        if (categoryNotFound) {
            setTimeout(() => {
                setCategoryNotFound(false)
            }, 1000)
        }
    }, [categoryNotFound])

    useEffect(() => {
        getCategorySuggestion()
        // eslint-disable-next-line
    }, [inputValue])

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
                <img
                    src={exit} alt='exit'
                    className='exit-icon'
                    onClick={() => navigate('/')}
                />
            </header>
            <div className='filter-div'>
                <div className='input-grouping'>
                    <input
                        className='category-input'
                        type='text'
                        value={inputValue}
                        placeholder='Digite a categoria'
                        style={{ outline: categoryNotFound ? '2px solid var(--pink)' : '2px solid white' }}
                        onKeyDown={handleInput}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {categorySuggestion.length > 0 &&
                        <div className='suggestion-modal'>
                            {categorySuggestion.map((cat, index) => (
                                <p
                                    key={index}
                                    className='suggestion'
                                    onClick={(e) => handleCategory(e.target.innerText)}
                                >{cat}</p>
                            ))}
                        </div>
                    }
                    {warningTransition((style, categoryNotFound) => (
                        categoryNotFound &&
                        <animated.span
                            style={style}
                            className='warning'
                        >categoria não encontrada</animated.span>
                    ))}
                </div>
                <div className='select-box'
                    onMouseOver={() => setFilterHover(true)}
                    onMouseLeave={() => setFilterHover(false)}>
                    <button
                        onClick={() => setOpenFilter(!openFilter)}
                        className='filter-btn'
                    >
                        Filtrar por categoria
                        <img style={{ marginLeft: '1.3rem' }} src={downArrow} alt='down-arrow' />
                    </button>
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
                                    {categoryList.map((category, index) => (
                                        <p
                                            key={index}
                                            className='category-list'
                                            onClick={(e) => handleCategory(e.target.innerText)}
                                        >{category}</p>
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