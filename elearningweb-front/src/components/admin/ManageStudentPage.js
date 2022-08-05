import Sidebar from "../teacher/Sidebar";
import ManageStudent from "./ManageStudent";

export default function ManageStudentPage() {
    const role = localStorage.getItem("role");

    return (
        <div className = 'manage-student-page'>
            {role === "admin" ? (
        <ManageStudent/>
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