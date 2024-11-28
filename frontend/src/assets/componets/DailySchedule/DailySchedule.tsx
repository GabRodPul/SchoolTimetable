import "./CourseCardStyle.css"


interface DailyHourCardProps {
    course: string;
    subjet: string;
    classroom: string;


}

const DailyHourCard: React.FC<DailyHourCardProps> = ({ course, subjet, classroom }) => {
    return (
        <div className="hourCard">
            <p>{course}</p>
            <p>{subjet}</p>
            <p>{classroom}</p>
        </div>
    );
};

export default DailyHourCard;