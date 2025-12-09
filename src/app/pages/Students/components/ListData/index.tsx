import * as S from "./styles";
import { StudentData } from "..";
import { useStudents } from "../../hook";
import { Pagination } from "@/components/template";

export const ListData = () => {
  const studentsContext = useStudents();

  return (
    <>
      <S.ListData>
        {studentsContext.students.length > 0 && studentsContext.students.map((item) => (
          <StudentData key={item.id} data={item} />
        ))}
      </S.ListData>

      {studentsContext.totalOfPages > 1 &&
        <Pagination
          numberOfPageButton={studentsContext.totalOfPages}
          currentPage={studentsContext.currentPage}
          onChangePage={studentsContext.setCurrentPage}
        />
      }
    </>
  )
}