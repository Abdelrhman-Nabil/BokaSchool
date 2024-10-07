import prisma from "@/lib/prisma";
import FormModal from "./FormModals";
import { currnetUserId, role } from "@/lib/utils";

export type FormContaierProps={
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}
const FormContaier=async({
    table,
    type,
    data,
    id,
  }: FormContaierProps) => {
  let relatedData;
    if (type !== "delete") {
        switch (table) {
          case "subject":
            const subjectTeachers = await prisma.teacher.findMany({
              select: { id: true, name: true, surname: true },
            });
            relatedData = { teachers: subjectTeachers };
            break;

    
          default:
            break;
        }
      }
    
      return (
        <div className="">
          <FormModal
            table={table}
            type={type}
            data={data}
            id={id}
            relatedData={relatedData}
          />
        </div>
      );
    };
export default FormContaier