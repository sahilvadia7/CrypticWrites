import Button from 'react-bootstrap/Button';
import logo from '../Images/test.jpg';
import '../style/CardView.css';
import '../style/AppHeaderStyle.css'; 


const CardView = ({ image, title, description }) => {
  return (   
  <>
   <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>

      <button className='showMore'>Show More</button>
    </div>
  </>
  
)}

export default CardView;