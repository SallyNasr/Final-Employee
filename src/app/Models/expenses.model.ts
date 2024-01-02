export interface ExpenseClaimEntryModel {
  id: number;
  date: Date;
  expenseType:number;
  expenseClaim: number;
  description: string;
  total: number;
  expenseTypes: ExpenseTypeModel;
  expenseClaims: ExpenseClaimModel;
}

export interface ExpenseClaimModel {
  id: number;
  date: Date;
  description: string;
  total: number;
  status: string;
  employeeId: number;
}
export interface ExpenseTypeModel {
  id: number;
  name: string;
}
export interface EmployeeModel {
  id: number;
  name: string;
  email: string;
  address: string;
  departmentId: number;
}

export interface TotalClaimsPerTypePerEmployeeModel {
  expenseType: string;
  totalAmount: number;
}

export interface ExpenseDetailModel {
  date: Date;
  description: string;
  employeeId: number;
  entryDTOs: EntriesDetailModel[];
}

export interface EntriesDetailModel {
  date: Date;
  expenseType: number;
  description: string;
  total: number;
}
