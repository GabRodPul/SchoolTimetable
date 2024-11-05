import "./CardStyle.css"

// Definimos la interfaz para las propiedades del componente
interface CourseCardProps {
    title: string;
    description: string;
  }
  
  // Usamos la interfaz como tipo de las props en la definición de la función
  const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
    return (
        <div className="course-card">
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>
          <div className="course-buttons">
            <button className="edit-button">Editar</button>
            <button className="delete-button">Eliminar</button>
            {/* <button className="add-button">Añadir</button> */}
          </div>
        </div>
    );
  };
  
  
  export default CourseCard;