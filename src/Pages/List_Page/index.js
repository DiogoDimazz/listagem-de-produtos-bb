import './style.css'
import ListBox from '../../Components/List_Box'
import Filter from '../../Components/Filter'
import exit from '../../assets/exit.svg'
import productsJson from '../../productsCategory.json'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListPage() {
    const allProducts = [...productsJson.data.nodes]
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [categoryList, setCategoryList] = useState([])


    function getAllCategories() {
        let localArray = []
        allProducts.forEach((p) => {
            if (!localArray.includes(p.category.name)) {
                return localArray.push(p.category.name)
            }
        })
        setCategoryList(['Todas as categorias', ...localArray])
    }



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
            <Filter
                allProducts={allProducts}
                setProducts={setProducts}
                categoryList={categoryList}
            />
            <section className='list-box'>
                <ListBox products={products} />
            </section>
        </main>
    )
}