var empTotalSalary = 0;
var empNumber = 1;

$(document).ready(function(){


	getData();

	$('#employeeForm').on('submit', sendEmployeeData);

	//$('#container').on('click', '.deleteEmp', function() {
	//	empTotalSalary -= parseInt($(this).parent().children().last().text());
	//	$('.empTotalSalary').text('Total Employee Salary: $' + empTotalSalary);
	//	$(this).parent().remove();
	//});
});

function getData() {
	$.ajax({
		type: 'GET',
		url: '/data',
		success: function(data) {
			appendDom(data);
			//console.log(data);
		}
	});
}

function sendEmployeeData() {
	event.preventDefault();

	var values = {};

	$.each($('#employeeForm').serializeArray(), function (i, field) {
		values[field.name] = field.value;
	});

	$('#employeeForm').find('input[type=text]').val('');

	$.ajax({
		type: 'POST',
		url: '/data',
		data: values,
		beforeSend: function () {
			console.log('before!' + values.name);
		},
		success: function (data) {
			appendDom(data);
			console.log('From Server: ', data);
			console.log(data);
		}
	});
}

function appendDom(empInfo) {
	$('#container').append('<div class="emp"></div>');
	var $el = $('#container').children().last();
	console.log(empInfo);

	for (var i = 0; i < empInfo.length; i++) {
		$el.append('<button class="deleteEmp">Delete Employee</button>');
		$el.append('<p>' + empInfo[i].emp_first_name + '</p>');
		$el.append('<p>' + empInfo[i].emp_last_name + '</p>');
		$el.append('<p>' + empInfo[i].emp_id + '</p>');
		$el.append('<p>' + empInfo[i].emp_job_title + '</p>');
		$el.append('<p>' + empInfo[i].emp_salary + '</p>');

		//$('#container').find('emp').addClass('empStyle');
	}

	empNumber++;
}