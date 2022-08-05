import Sidebar from "../teacher/Sidebar";
import CourseEvaluation from "./CourseEvaluation";

export default function ManageCourseRequest() {
    const role = localStorage.getItem("role");
    return (
        <div className = 'page'>
            {role === "admin" ? (
                    <CourseEvaluation/>
            ) : (
                <div className = 'permission-page'>
        {/* <Sidebar/> */}
        <div className = 'permission-text'>
        You have no permission to access this page!
        </div>
    </div>
            )}
        </div>
    )
}