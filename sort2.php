<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "adev";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// echo "Connected successfully<br>";

$sql = "SELECT * FROM nat_sort";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);;
    // while($row = $result->fetch_assoc()) {
    //     $rows += $row;
    // }
    echo "output";
    echo "<br>";
    foreach($rows as $row){   
        echo "Number: " . $row["number"]. " - Name: " . $row["name"]." - Value: " . $row["value"]. "<br>";
        
    }
    echo "<br>";
} else {
    echo "0 results";
}

$sql = "SELECT * FROM nat_sort order by SOUNDEX(number), LENGTH(number), number";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);;
    // while($row = $result->fetch_assoc()) {
    //     $rows += $row;
    // }
    echo "sorted";
    echo "<br>";
    foreach($rows as $row){   
        echo "Number: " . $row["number"]. " - Name: " . $row["name"]." - Value: " . $row["value"]. "<br>";
        
    }
    echo "<br>";
} else {
    echo "0 results";
}
$conn->close();
?>