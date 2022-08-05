
import Sidebar from '../teacher/Sidebar'
import TeacherManageCourse from './TeacherManageCourse';
export default function ManageCoursePage() {
    const role = localStorage.getItem("role");
    return (
        <>
    {role === "teacher" ? (
            <TeacherManageCourse/>
    ) : (
        <div className = 'permission-page'>
        {/* <Sidebar/> */}
        <div className = 'permission-text'>
        You have no permission to access this page!
        </div>
    </div>
    )}
        </>
    )
}