import * as S from "./styles";
import { ReactNode } from "react";
import { Table } from "@/components/ui";

export interface IDataTableColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface IDataTableProps<T> {
  columns: IDataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string | number;
  getRowClassName?: (row: T, index: number) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  getRowClassName,
  emptyMessage = "Nenhum registro encontrado.",
}: IDataTableProps<T>) {
  return (
    <S.Wrapper>
      <Table.Table>
        <Table.TableHeader>
          <Table.TableRow>
            {columns.map((column, index) => (
              <S.Head key={column.key} $isLast={index === columns.length - 1}>
                {column.label}
              </S.Head>
            ))}
          </Table.TableRow>
        </Table.TableHeader>

        <Table.TableBody>
          {rows.length > 0 && rows.map((row, rowIndex) => (
            <Table.TableRow key={getRowKey(row, rowIndex)} className={getRowClassName?.(row, rowIndex)}>
              {columns.map((column, colIndex) => (
                <S.Cell key={`${column.key}-${rowIndex}`} $isLast={colIndex === columns.length - 1}>
                  {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? "-")}
                </S.Cell>
              ))}
            </Table.TableRow>
          ))}

          {rows.length === 0 && (
            <Table.TableRow>
              <S.EmptyCell colSpan={columns.length}>{emptyMessage}</S.EmptyCell>
            </Table.TableRow>
          )}
        </Table.TableBody>
      </Table.Table>
    </S.Wrapper>
  );
}
