import Announcements from "@/app/component/comp/Announcements "
import AttendanceChart from "@/app/component/comp/attendanceChart"
import CounterChart from "@/app/component/comp/countChart"
import EventCalender from "@/app/component/comp/EventCalender"
import FinanceChart from "@/app/component/comp/FinanceChart"
import UserCard from "@/app/component/comp/userCard"

const AdminPage = () => {
    return (
        <div className=" p-4 flex gap-4 flex-col md:flex-row">
            {/* {left} */}
            <div className="w-full lg:w-2/3 flex-col gap-8">
                <div className=" flex gap-4 justify-between flex-wrap">
                    {/* {userCard} */}
                    <UserCard type="teacher" />
                    <UserCard type="student" />
                    <UserCard type="parent" />
                    <UserCard type="staff" />
                </div>
                {/* {middle chart} */}
                <div className="flex gap-4 flex-col lg:flex-row mt-3">
                    {/* countChart */}
                    <div className="w-full lg:w-1/3 h-[450px] ">
                    <CounterChart/>
                        </div>
                    {/* AttendChart */}
                    <div className="w-full lg:w-2/3 h-[450px] ">
                    <AttendanceChart/>
                    </div>
                </div>
                {/* {Bottom chart} */}
                <div className="w-full h-[500px]">
                    <FinanceChart/>
                </div>

            </div>
            {/* {right} */}
            <div className=" w-full  lg:w-1/3 flex flex-col gap-8">
            <EventCalender/>
            <Announcements/>
            </div>
        </div>
    )
}
export default AdminPage