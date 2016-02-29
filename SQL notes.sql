CREATE TABLE employees_info 
(
	id SERIAL NOT NULL,
	emp_first_name character varying(60) NOT NULL,
	emp_last_name character varying(60) NOT NULL,
	emp_id character varying(60) NOT NULL,
	emp_job_title character varying(60) NOT NULL,
	emp_salary integer NOT NULL,
	CONSTRAINT employees_info_pkey PRIMARY KEY (id)
);
	
	