"use client";
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Sun',
        Present: 30,
        Absent: 10,
    },
    {
        name: 'mon',
        Present: 35,
        Absent: 5,
    },
    {
        name: 'Tue',
        Present: 40,
        Absent: 0,
    },
    {
        name: 'Wed',
        Present: 32,
        Absent: 8,
    },
    {
        name: 'Thu',
        Present: 25,
        Absent: 15,
    },

];

const AttendanceChart = () => {
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendence</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    barSize={20}

                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tick={{fill:"black"}} tickLine={false} />
                    <YAxis axisLine={false} />
                    <Tooltip  contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
                    <Legend align='left' verticalAlign='top' wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
                    <Bar dataKey="Present"fill="#C3EBFA" radius={[ 5,5,0,0]}  legendType='circle' />
                    <Bar dataKey="Absent" fill="#FAE27C" radius={[ 5,5,0,0]}  legendType='circle'/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default AttendanceChart;