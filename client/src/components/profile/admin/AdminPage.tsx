'use client';

import CreatePage from "./CreatePage";
import GetUsersPage from "./GetUsersPage";

const AdminPage = () => {
    return (
        <div className="flex flex-wrap max-w-[1000px] justify-center sm:justify-between">
            <div>
                <CreatePage />
            </div>
            <div>
                <GetUsersPage />
            </div>
        </div>
    )
}

export default AdminPage