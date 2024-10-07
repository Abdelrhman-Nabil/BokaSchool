import FormModal from "@/app/component/comp/FormModals";
import Pagination from "@/app/component/comp/Pagination";
import Table from "@/app/component/comp/Table";
import TableSearch from "@/app/component/comp/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import { currnetUserId, role } from "@/lib/utils";
type announcementList=Announcement & {class:Class}

 
const renderRow = (item: announcementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.title}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.class?.name || "-"}</td>
    <td className="hidden md:table-cell"> {new Intl.DateTimeFormat("en-US").format(item.date)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
          <FormModal table="announcement" type="update" data={item}/>
          <FormModal table="announcement" type="delete" id={item.id}/>

          </>
        )}
      </div>
    </td>
  </tr>
);

const columns = [
{
  header: "Title",
  accessor: "title",
  className: "",

},
{
  header: "Class",
  accessor: "class",
  className: "",
},

{
  header: "Date",
  accessor: "date",
  className: "hidden lg:table-cell",
},
...(role === "admin"
  ? [
      {
        header: "Actions",
        accessor: "action",
      },
    ]
  : []),
];

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
 
 
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const {sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;


  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currnetUserId! } } },
    student: { students: { some: { id: currnetUserId! } } },
    parent: { students: { some: { parentId: currnetUserId! } } },
  };

  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];
  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class:true
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="announcement" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination  page={p} count={count}/>
    </div>
  );
};

export default EventsListPage;