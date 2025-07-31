//Employee data
const employees = [
  { id: 1, 
    name: "John Doe", 
    role: "Developer", 
    salary: 30000,
    payslip: {
      uif: 300,
      medicalAid: 400,
      tax: 2000
    } },

    {id: 2, 
    name: "Jane Smith", 
    role: "HR Manager", 
    salary: 28000,
    payslip: {
      uif: 260,
      medicalAid: 310,
      tax: 1600
    } },
    
    {id: 3, 
    name: "Yusra Abrahams", 
    role: "Head Designer", 
    salary: 40000,
    payslip: {
      uif: 500,
      medicalAid: 450,
      tax: 3000
    } },
    
    {id: 4, 
    name: "Avelile Mnyazana", 
    role: "Lead Developer", 
    salary: 40000,
    payslip: {
      uif: 500,
      medicalAid: 450,
      tax: 30000
    } },
    
    {id: 5, 
    name: "Khanya Morage", 
    role: "CEO", 
    salary: 60000,
    payslip: {
      uif: 600,
      medicalAid: 600,
      tax: 4000
    } },
    
    {id: 6, 
    name: "Akhona Phillips", 
    role: "QA", 
    salary: 30000,
    payslip: {
      uif: 250,
      medicalAid: 300,
      tax: 2000
    } },

    
  
    
];
 
//Simulating fetching employees
export function getAllEmployees() {
  return employees;
}