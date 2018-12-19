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

$sql = "SELECT * FROM nat_sort order by SOUNDEX(number), LENGTH(number), number";
// $orderby = "ORDER BY SOUNDEX($orderby), LENGTH($orderby) $desc, $orderby ";

sql: "SELECT tbl_object.*, tbl_module_genobj_obj.*, c.name AS create_user_name, u.name AS update_user_name, c.disabled FROM tbl_object JOIN tbl_module_genobj_obj ON tbl_object.object_id = tbl_module_genobj_obj.object_id JOIN tbl_user c ON tbl_object.create_user = c.user_id JOIN tbl_user u ON tbl_object.update_user = u.user_id WHERE tbl_object.company = 33782837 AND ( tbl_module_genobj_obj.genobj_type_id = '9' )  ORDER BY SOUNDEX(name), LENGTH(name) DESC, name  DESC LIMIT 100"

// CAST(name AS UNSIGNED) DESC,

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
    echo "<br>";
    echo "sorted";
    echo "<br>";
    $rows = array_natsort_list($rows, "number");
    foreach($rows as $row){   
        echo "Number: " . $row["number"]. " - Name: " . $row["name"]." - Value: " . $row["value"]. "<br>";
        
    }

    // print_r($rows);
    // output data of each row
    //     natsort($row);
    //     $row = array_values($row);
    //     print_r($row);
} else {
    echo "0 results";
}
$conn->close();

function natsort2d(&$aryInput, $prop) {
    $aryTemp = $aryOut = array();
    foreach ($aryInput as $key=>$value) {
      reset($value);
      $aryTemp[$key]=current($value);
    }
    natsort($aryTemp, $prop);
    foreach ($aryTemp as $key=>$value) {
      $aryOut[] = $aryInput[$key];
    }
    $aryInput = $aryOut;
  }

  function array_natsort_list($array) {
    // for all arguments without the first starting at end of list
    for ($i=func_num_args();$i>1;$i--) {
        // get column to sort by
        $sort_by = func_get_arg($i-1);
        // clear arrays
        $new_array = array();
        $temporary_array = array();
        // walk through original array
        foreach($array as $original_key => $original_value) {
            // and save only values
            $temporary_array[] = $original_value[$sort_by];
        }
        // sort array on values
        natsort($temporary_array);
        // delete double values
        $temporary_array = array_unique($temporary_array);
        // walk through temporary array
        foreach($temporary_array as $temporary_value) {
            // walk through original array
            foreach($array as $original_key => $original_value) {
                // and search for entries having the right value
                if($temporary_value == $original_value[$sort_by]) {
                    // save in new array
                    $new_array[$original_key] = $original_value;
                }
            }
        }
        // update original array
        $array = $new_array;
    }
    return $array;
}
?>