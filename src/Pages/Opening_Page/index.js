import './styles.css';
import { useNavigate } from 'react-router-dom'
import photo from '../../assets/Foto_5.jpeg'
import githubIcon from '../../assets/github_icon.svg'
import linkedinIcon from '../../assets/linkedin_icon.svg'
import devpostIcon from '../../assets/devpost_icon.svg'


function OpeningPage() {
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='photo-container'>
        <img src={photo} alt='Diogo-Dimazz' className='bg-photo' />
        <button onClick={() => navigate('/products_list')} className='product-list-btn'>listar produtos</button>
      </div>
      <section className='bottom-section'>
        <div className='contact-social'>
          <h5><span style={{ color: '#19b2c0' }}>/</span>contato</h5>
          <div>
            <ul className='text-grouping'>
              <li className='li-text'>Rua Alfredo Gomes de Oliveira</li>
              <li className='li-text'>n217 - Jardim Armação</li>
              <li className='li-text'>Salvador - BA</li>
            </ul>
            <ul className='text-grouping'>
              <li className='li-text'>+55 (71) 9 9229-7816</li>
              <li className='li-text'>diogo.fullstack@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='contact-social'>
          <h5><span style={{ color: 'var(--pink)' }}>/</span>social</h5>
          <div className='social-icons'>
            <a href='https://github.com/DiogoDimazz' target='_blank' rel="noreferrer" >
              <img src={githubIcon} alt='github_icon' />
            </a>
            <a href='https://www.linkedin.com/in/diogo-dimazz/' target='_blank' rel="noreferrer" >
              <img src={linkedinIcon} alt='linkedin_icon' />
            </a>
            <a href='https://devpost.com/DiogoDimazz' target='_blank' rel="noreferrer" >
              <img src={devpostIcon} alt='devpost_icon' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OpeningPage;
