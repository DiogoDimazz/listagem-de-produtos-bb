import './styles.css';
import { useNavigate } from 'react-router-dom'


function OpeningPage() {
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='photo-container'>
        <button onClick={() => navigate('/products_list')} className='product-list-btn'>listar produtos</button>
      </div>
    </div>
  );
}

export default OpeningPage;
