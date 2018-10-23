$(document).ready(function () {

    var myDB;
    //Open Database Connection
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        myDB = window.openDatabase("employees", "1.0", "Dustin", 200000);
    }
    //Create new table
    $("#createTable").click(function () {
        myDB.transaction(function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS employeesList (id integer primary key, empNumber text, empName text)', [],
                function (tx, result) {
                    alert("Table created successfully");
                },
                function (error) {
                    alert("Error occurred while creating the table.");
                });
        });
    });

    //Insert New Data
    $("#insert").click(function () {
        var empNumber = $("#empNumber").val();
        var empName = $("#empName").val();
        if (empNumber == "" || empName == "") {
            alert("Please fill Number and Name !!!");
        } else {
            console.log(empNumber + " | " + empName);
            myDB.transaction(function (transaction) {
                var executeQuery = "INSERT INTO employeesList (empNumber, empName) VALUES (?,?)";
                transaction.executeSql(executeQuery, [empNumber, empName]
                    , function (tx, result) {
                        alert('Insert Successful !!!');
                    },
                    function (error) {
                        alert('Error occurred');
                    });
            });
        }
    });

    //Display Table Data
    $("#showTable").click(function () {
        $("#TableData").html("");
        myDB.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM employeesList', [], function (tx, results) {
                var len = results.rows.length, i;
                $("#rowCount").html(len);
                for (i = 0; i < len; i++) {
                    $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).empNumber + "</td><td>" + results.rows.item(i).empName + "</td><td><a href='edit.html?id=" + results.rows.item(i).id + "&empNumber=" + results.rows.item(i).empNumber + "&empName=" + results.rows.item(i).empName + "'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='" + results.rows.item(i).id + "'>Delete</a></td></tr>");
                }
            }, null);
        });
    });

    //Delete Data from Database
    $(document.body).on('click', '.delete', function () {
        var id = this.id;
        myDB.transaction(function (transaction) {
            var executeQuery = "DELETE FROM employeesList where id=?";
            transaction.executeSql(executeQuery, [id],
                //On Success
                function (tx, result) {
                    alert('Delete successfully');
                    $(location).attr('href', "index.html");
                },
                //On Error
                function (error) { alert('Something went Wrong'); });
        });
    });


    //Update Employee
    $("#update").click(function () {
        var id = $("#id").text();
        var empNumber = $("#empNumber").val();
        var empName = $("#empName").val()
        myDB.transaction(function (transaction) {
            var executeQuery = "UPDATE employeesList SET empNumber=?, empName=? WHERE id=?";
            transaction.executeSql(executeQuery, [empNumber, empName, id],
                //On Success
                function (tx, result) {
                    alert('Updated successfully');
                    $(location).attr('href', "index.html");
                },
                //On Error
                function (error) { alert('Something went Wrong'); });
        });
    });

});


