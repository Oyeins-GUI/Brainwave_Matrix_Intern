import pool from "./config/db";
import { QueryResult, RowDataPacket } from "mysql2";

export const createTable = (schema: string) => {
   return new Promise((resolve, reject) => {
      pool.query(schema, (err, result) => {
         if (err) {
            reject(err);
         } else {
            resolve(result);
         }
      });
   });
};

export const checkRecordExists = <T>(
   tableName: string,
   column: string,
   value: string
): Promise<T | null> => {
   return new Promise((resolve, reject) => {
      const query = `SELECT * from ${tableName} WHERE ${column} = ?`;

      pool.query<RowDataPacket[]>(
         query,
         [value],
         (err: Error | null, results: RowDataPacket[]) => {
            if (err) {
               reject(err);
            } else {
               resolve(results.length ? (results[0] as T) : null);
            }
         }
      );
   });
};

export const insertRecord = <T>(
   tableName: string,
   record: T
): Promise<QueryResult> => {
   return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${tableName} SET ?`;

      pool.query(query, [record], (err, results) => {
         if (err) {
            reject(err);
         } else {
            resolve(results as QueryResult);
         }
      });
   });
};

export const updateRecord = <T>(
   tableName: string,
   updates: Partial<T>,
   condition: { column: string; value: any }
): Promise<QueryResult> => {
   return new Promise((resolve, reject) => {
      const query = `UPDATE ${tableName} SET ? WHERE ${condition.column} = ?`;

      pool.query(query, [updates, condition.value], (err, results) => {
         if (err) {
            reject(err);
         } else {
            resolve(results as QueryResult);
         }
      });
   });
};
