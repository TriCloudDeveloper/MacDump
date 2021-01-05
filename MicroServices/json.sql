SELECT row_to_json(employee_salary) FROM employee_salary;


SELECT row_to_json(t) FROM 
(
 
SELECT department, employee_number, 
salary, rank() OVER ( PARTITION BY department ORDER BY salary DESC) 
FROM employee_salary

) as t;


SELECT row_to_json(row(employee_number  , salary)) 
FROM employee_salary
LIMIT 3;

SELECT row_to_json(row(department, employee_number, 
salary, rank() OVER ( PARTITION BY department ORDER BY salary DESC) 
))
FROM employee_salary


SELECT row_to_json(t)
    FROM (
      SELECT employee_number, salary FROM employee_salary
    ) t
 
SELECT  array_agg(row_to_json(t))
    FROM (
      SELECT employee_number, salary FROM employee_salary
    ) t
    
   
SELECT array_to_json(array_agg(row_to_json(t)))
    FROM (
      SELECT employee_number, salary FROM employee_salary
    ) t

