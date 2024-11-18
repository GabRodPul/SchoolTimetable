import "./CourseCardStyle.css"

// Definimos la interfaz para las propiedades del componente
interface CourseCardProps {
    title: string;
    description: string;
  }
  
  // Usamos la interfaz como tipo de las props en la definición de la función
  const Card: React.FC<CourseCardProps> = ({ title, description }) => {
    return (
        <div className="courseCard">
          <h2 className="courseCard__title">{title}</h2>
          <p className="courseCard__description">{description}</p>
          <div className="courseCard__buttons">
            <button className="edit-button">Editar</button>
            <button className="delete-button">Eliminar</button>
          </div>
        </div>
    );
  };
  
  export default Card;